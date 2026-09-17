'use client';

import { useState, useEffect } from 'react';
import StatusSelect from '../../components/StatusSelect';

export default function AppointmentListPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/appointments');
      if (!res.ok) throw new Error('Failed to load appointments');
      setAppointments(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, newStatus) {
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      loadAppointments();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this appointment?')) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      loadAppointments();
    } catch (err) {
      setError(err.message);
    }
  }

  const visible =
    statusFilter === 'All'
      ? appointments
      : appointments.filter((a) => a.status === statusFilter);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#2b2b28] mb-8">Appointment Listing</h1>

      {error && (
        <p className="border-l-2 border-[#a6564f] pl-3 text-[#a6564f] text-sm mb-6">
          {error}
        </p>
      )}

      <div className="flex items-center gap-2 mb-6">
        <label className="text-sm text-[#6b6862]">Filter by status</label>
        <select
          className="border border-[#ddd9d2] px-2 py-1 bg-white outline-none focus:border-[#5f7161] text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p className="text-[#6b6862]">Loading…</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#6b6862] text-sm border-b border-[#ddd9d2]">
                <th className="py-2 font-medium">Customer</th>
                <th className="py-2 font-medium">Service</th>
                <th className="py-2 font-medium">Date</th>
                <th className="py-2 font-medium">Time</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Update</th>
                <th className="py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((a) => (
                <tr key={a.id} className="border-b border-[#ddd9d2]">
                  <td className="py-4">{a.customer_name}</td>
                  <td className="py-4">{a.service_name}</td>
                  <td className="py-4">{a.date}</td>
                  <td className="py-4">{a.time}</td>
                  <td className="py-4">{a.status}</td>
                  <td className="py-4">
                    <StatusSelect
                      value={a.status}
                      onChange={(newStatus) => handleStatusChange(a.id, newStatus)}
                    />
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-[#a6564f] text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}