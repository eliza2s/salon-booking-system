'use client';

import { useState, useEffect } from 'react';

export default function AppointmentsPage() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    service_id: '',
    date: '',
    time: '',
    notes: '',
  });

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    const res = await fetch('/api/services');
    setServices(await res.json());
  }

  async function handleBook(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          service_id: parseInt(form.service_id, 10),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to book appointment');
      setForm({ customer_name: '', customer_phone: '', service_id: '', date: '', time: '', notes: '' });
      setSuccess('Appointment booked.');
    } catch (err) {
      setError(err.message);
    }
  }

  const inputClass =
    "border border-[#ddd9d2] px-3 py-2 bg-white outline-none focus:border-[#5f7161]";

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#2b2b28] mb-8">Book Appointment</h1>

      {error && (
        <p className="border-l-2 border-[#a6564f] pl-3 text-[#a6564f] text-sm mb-6">
          {error}
        </p>
      )}
      {success && (
        <p className="border-l-2 border-[#5f7161] pl-3 text-[#5f7161] text-sm mb-6">
          {success}
        </p>
      )}

      <form onSubmit={handleBook} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          className={inputClass}
          placeholder="Customer name"
          value={form.customer_name}
          onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
          required
        />
                <input
          className={inputClass}
          placeholder="Customer phone"
          value={form.customer_phone}
          onChange={(e) =>
            setForm({ ...form, customer_phone: e.target.value.replace(/\D/g, '').slice(0, 10) })
          }
          inputMode="numeric"
          maxLength={10}
          required
        />
        <select
          className={inputClass}
          value={form.service_id}
          onChange={(e) => setForm({ ...form, service_id: e.target.value })}
          required
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <input
          className={inputClass}
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          className={inputClass}
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
        <input
          className={inputClass}
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button
          className="bg-[#5f7161] text-white px-5 py-2 hover:bg-[#4c5c4e] transition-colors sm:col-span-2"
          type="submit"
        >
          Book appointment
        </button>
      </form>
    </div>
  );
}