import React, { useState, useEffect } from 'react';
import { Plus, Printer, Download } from 'lucide-react';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';

import { API_URL } from '../config';

export default function Billing() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    patientId: '',
    amount: 0,
    paymentMethod: 'CASH',
    items: [{ description: 'Consultation', price: 2000 }],
  });

  useEffect(() => {
    fetchInvoices(); // You'll need to implement this endpoint or just mock for now
    fetchPatients();
  }, []);

  const fetchInvoices = async () => {
    // Mock data for now as we didn't implement GET /api/invoices in server.ts yet
    // But let's assume we did or add it later.
    // For now, let's just use local state if fetch fails or returns empty
    setInvoices([
      { id: '1', patient: { firstName: 'Ahmed', lastName: 'Benali' }, totalAmount: 2500, status: 'PAID', date: new Date() },
      { id: '2', patient: { firstName: 'Fatima', lastName: 'Zohra' }, totalAmount: 4000, status: 'UNPAID', date: new Date() },
    ]);
  };

  const fetchPatients = async () => {
    const res = await fetch(`${API_URL}/api/patients`);
    const data = await res.json();
    setPatients(data);
  };

  const handleAddItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { description: '', price: 0 }]
    });
  };

  const calculateTotal = () => {
    return newInvoice.items.reduce((sum, item) => sum + Number(item.price), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const total = calculateTotal();
    
    await fetch(`${API_URL}/api/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientId: newInvoice.patientId,
        amount: total,
        taxAmount: 0, // Calculate based on NIF/Tax rules
        totalAmount: total,
        status: 'PAID',
        paymentMethod: newInvoice.paymentMethod,
        items: JSON.stringify(newInvoice.items),
      }),
    });
    
    setIsModalOpen(false);
    fetchInvoices(); // Refresh list
  };

  const generatePDF = (invoice: any) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('CLINIX DZ', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Dr. Example Doctor', 105, 30, { align: 'center' });
    doc.text('123 Medical Street, Algiers', 105, 35, { align: 'center' });
    
    // Invoice Details
    doc.text(`Invoice #: ${invoice.id.substring(0, 8)}`, 20, 50);
    doc.text(`Date: ${format(new Date(invoice.date), 'dd/MM/yyyy')}`, 150, 50);
    doc.text(`Patient: ${invoice.patient.firstName} ${invoice.patient.lastName}`, 20, 60);
    
    // Table Header
    doc.line(20, 70, 190, 70);
    doc.text('Description', 20, 75);
    doc.text('Price (DZD)', 160, 75);
    doc.line(20, 78, 190, 78);
    
    // Items (Mock items for list view)
    doc.text('Medical Consultation', 20, 85);
    doc.text(invoice.totalAmount.toString(), 160, 85);
    
    // Total
    doc.line(20, 100, 190, 100);
    doc.setFontSize(14);
    doc.text(`Total: ${invoice.totalAmount} DZD`, 140, 110);
    
    // Footer
    doc.setFontSize(10);
    doc.text('Thank you for your trust.', 105, 130, { align: 'center' });
    
    doc.save(`invoice_${invoice.id}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Plus size={20} className="mr-2" />
          Create Invoice
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{invoice.id.substring(0, 6)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.patient.firstName} {invoice.patient.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{format(new Date(invoice.date), 'dd/MM/yyyy')}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{invoice.totalAmount} DZD</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => generatePDF(invoice)} className="text-gray-600 hover:text-gray-900 mr-3" title="Download PDF">
                    <Download size={18} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900" title="Print Thermal">
                    <Printer size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">New Invoice</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient</label>
                  <select
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newInvoice.patientId}
                    onChange={e => setNewInvoice({...newInvoice, patientId: e.target.value})}
                  >
                    <option value="">Select Patient...</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newInvoice.paymentMethod}
                    onChange={e => setNewInvoice({...newInvoice, paymentMethod: e.target.value})}
                  >
                    <option value="CASH">Cash</option>
                    <option value="CCP">CCP</option>
                    <option value="BARIDIMOB">BaridiMob</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Items</h3>
                {newInvoice.items.map((item, index) => (
                  <div key={index} className="flex gap-4 mb-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="flex-1 border border-gray-300 rounded-md p-2"
                      value={item.description}
                      onChange={e => {
                        const newItems = [...newInvoice.items];
                        newItems[index].description = e.target.value;
                        setNewInvoice({...newInvoice, items: newItems});
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      className="w-32 border border-gray-300 rounded-md p-2"
                      value={item.price}
                      onChange={e => {
                        const newItems = [...newInvoice.items];
                        newItems[index].price = Number(e.target.value);
                        setNewInvoice({...newInvoice, items: newItems});
                      }}
                    />
                  </div>
                ))}
                <button type="button" onClick={handleAddItem} className="text-sm text-emerald-600 hover:text-emerald-700">
                  + Add Item
                </button>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <div className="text-lg font-bold">
                  Total: {calculateTotal()} DZD
                </div>
                <div className="flex space-x-3">
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
                    Generate Invoice
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
