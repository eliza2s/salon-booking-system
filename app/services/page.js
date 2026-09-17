'use client';

import { useState, useEffect } from 'react';
import ServiceForm from '../components/ServiceForm';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingService, setEditingService] = useState(null);

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

  async function handleAdd(values) {
    setError('');
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add service');
      loadServices();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(values) {
    setError('');
    try {
      const res = await fetch(`/api/services/${editingService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update service');
      setEditingService(null);
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

      <ServiceForm
        key={editingService ? editingService.id : 'new'}
        initialValues={editingService}
        onSubmit={editingService ? handleUpdate : handleAdd}
        submitLabel={editingService ? 'Save changes' : 'Add service'}
        onCancel={editingService ? () => setEditingService(null) : null}
      />

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
                <td className="py-4 text-right space-x-3">
                  <button
                    onClick={() => setEditingService(s)}
                    className="text-[#5f7161] text-sm hover:underline"
                  >
                    Edit
                  </button>
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