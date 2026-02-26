import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-me';

// --- Security Middleware ---
app.use(helmet());
app.use(compression());
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Local dev
  'http://localhost:3000', // Local dev preview
  process.env.FRONTEND_URL // Production Netlify URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// --- Routes ---

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    // Basic validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: role || 'DOCTOR' },
    });
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Patients Routes
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({ orderBy: { updatedAt: 'desc' } });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

app.post('/api/patients', async (req, res) => {
  try {
    const patient = await prisma.patient.create({ data: req.body });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: 'Could not create patient' });
  }
});

app.get('/api/patients/:id', async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
      include: { appointments: true, prescriptions: true, invoices: true },
    });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patient details' });
  }
});

// Appointments Routes
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: { patient: true, doctor: true },
      orderBy: { date: 'asc' },
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { patientId, doctorId, date, status, notes } = req.body;
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId: doctorId || 'placeholder-doctor-id', // In prod, get from JWT
        date: new Date(date),
        status: status || 'PENDING',
        notes,
      },
    });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: 'Could not create appointment' });
  }
});

// Invoices Routes
app.post('/api/invoices', async (req, res) => {
  try {
    const invoice = await prisma.invoice.create({ data: req.body });
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ error: 'Could not create invoice' });
  }
});

// Stats Route
app.get('/api/stats', async (req, res) => {
  try {
    const patientCount = await prisma.patient.count();
    const appointmentCount = await prisma.appointment.count();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appointmentsToday = await prisma.appointment.count({
      where: { date: { gte: today } },
    });
    
    const invoices = await prisma.invoice.findMany();
    const totalRevenue = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);

    res.json({
      patientCount,
      appointmentCount,
      appointmentsToday,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

export default app;
