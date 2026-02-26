import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

import { API_URL } from '../config';

export default function Appointments() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    date: '',
    time: '09:00',
    notes: '',
  });

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    const res = await fetch(`${API_URL}/api/appointments`);
    const data = await res.json();
    setAppointments(data);
  };

  const fetchPatients = async () => {
    const res = await fetch(`${API_URL}/api/patients`);
    const data = await res.json();
    setPatients(data);
  };

  const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 6 }); // Saturday start for Algeria
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dateTime = new Date(`${newAppointment.date}T${newAppointment.time}`);
    
    await fetch(`${API_URL}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientId: newAppointment.patientId,
        doctorId: 'user-id-placeholder', // In real app, get from auth context
        date: dateTime.toISOString(),
        status: 'PENDING',
        notes: newAppointment.notes,
      }),
    });
    
    setIsModalOpen(false);
    fetchAppointments();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Plus size={20} className="mr-2" />
          New Appointment
        </button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4">
        <button onClick={handlePrevWeek} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft />
        </button>
        <h2 className="text-lg font-semibold">
          {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
        </h2>
        <button onClick={handleNextWeek} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <div key={day.toString()} className="bg-white rounded-lg shadow min-h-[200px] flex flex-col">
            <div className={`p-2 text-center border-b font-medium ${isSameDay(day, new Date()) ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50'}`}>
              {format(day, 'EEE d')}
            </div>
            <div className="flex-1 p-2 space-y-2">
              {appointments
                .filter(apt => isSameDay(new Date(apt.date), day))
                .map(apt => (
                  <div key={apt.id} className="p-2 bg-blue-50 text-blue-700 rounded text-xs border-l-4 border-blue-500">
                    <div className="font-bold">{format(new Date(apt.date), 'HH:mm')}</div>
                    <div className="truncate">{apt.patient?.firstName} {apt.patient?.lastName}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Schedule Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={newAppointment.patientId}
                  onChange={e => setNewAppointment({...newAppointment, patientId: e.target.value})}
                >
                  <option value="">Select Patient...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newAppointment.date}
                    onChange={e => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newAppointment.time}
                    onChange={e => setNewAppointment({...newAppointment, time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  rows={3}
                  value={newAppointment.notes}
                  onChange={e => setNewAppointment({...newAppointment, notes: e.target.value})}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
