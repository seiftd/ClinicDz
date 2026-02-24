import express from 'express';
import { createServer as createViteServer } from 'vite';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-key-change-in-prod';

async function createServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API Routes ---

  // Auth
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, name, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name, role: role || 'DOCTOR' },
      });
      const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY);
      res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
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
      const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY);
      res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Patients
  app.get('/api/patients', async (req, res) => {
    const patients = await prisma.patient.findMany({ orderBy: { updatedAt: 'desc' } });
    res.json(patients);
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
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
      include: { appointments: true, prescriptions: true, invoices: true },
    });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  });

  // Appointments
  app.get('/api/appointments', async (req, res) => {
    const appointments = await prisma.appointment.findMany({
      include: { patient: true, doctor: true },
      orderBy: { date: 'asc' },
    });
    res.json(appointments);
  });

  app.post('/api/appointments', async (req, res) => {
    try {
      const { patientId, doctorId, date, status, notes } = req.body;
      const appointment = await prisma.appointment.create({
        data: {
          patientId,
          doctorId,
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

  // Invoices
  app.post('/api/invoices', async (req, res) => {
    try {
      const invoice = await prisma.invoice.create({ data: req.body });
      res.json(invoice);
    } catch (error) {
      res.status(400).json({ error: 'Could not create invoice' });
    }
  });

  // Dashboard Stats
  app.get('/api/stats', async (req, res) => {
    const patientCount = await prisma.patient.count();
    const appointmentCount = await prisma.appointment.count();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appointmentsToday = await prisma.appointment.count({
      where: { date: { gte: today } },
    });
    
    // Calculate revenue (mock logic for now as aggregation might be complex with sqlite/prisma in one go)
    const invoices = await prisma.invoice.findMany();
    const totalRevenue = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);

    res.json({
      patientCount,
      appointmentCount,
      appointmentsToday,
      totalRevenue,
    });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

createServer();
