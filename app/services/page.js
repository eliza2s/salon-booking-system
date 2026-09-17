'use client';

import { useState, useEffect } from 'react';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', price: '', duration: '' });

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/services');
      if (!res.ok) throw new Error('Failed to load services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          price: parseFloat(form.price),
          duration: parseInt(form.duration, 10),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add service');
      setForm({ name: '', price: '', duration: '' });
      loadServices();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      loadServices();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#2b2b28] mb-8">Services</h1>

      {error && (
        <p className="border-l-2 border-[#a6564f] pl-3 text-[#a6564f] text-sm mb-6">
          {error}
        </p>
      )}

      <form onSubmit={handleAdd} className="flex flex-wrap gap-3 mb-10 pb-10 border-b border-[#ddd9d2]">
        <input
          className="border border-[#ddd9d2] px-3 py-2 flex-1 min-w-[160px] bg-white outline-none focus:border-[#5f7161]"
          placeholder="Service name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border border-[#ddd9d2] px-3 py-2 w-24 bg-white outline-none focus:border-[#5f7161]"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          className="border border-[#ddd9d2] px-3 py-2 w-28 bg-white outline-none focus:border-[#5f7161]"
          placeholder="Minutes"
          type="number"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          required
        />
        <button
          className="bg-[#5f7161] text-white px-5 py-2 hover:bg-[#4c5c4e] transition-colors"
          type="submit"
        >
          Add service
        </button>
      </form>

      {loading ? (
        <p className="text-[#6b6862]">Loading…</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#6b6862] text-sm border-b border-[#ddd9d2]">
              <th className="py-2 font-medium">Name</th>
              <th className="py-2 font-medium">Price</th>
              <th className="py-2 font-medium">Duration</th>
              <th className="py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-[#ddd9d2]">
                <td className="py-4">{s.name}</td>
                <td className="py-4">NPR {s.price}</td>
                <td className="py-4">{s.duration} min</td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-[#a6564f] text-sm hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}