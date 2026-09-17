'use client';

import { useState, useEffect } from 'react';

export default function ServiceForm({ initialValues, onSubmit, submitLabel, onCancel }) {
  const [form, setForm] = useState({
    name: initialValues?.name || '',
    price: initialValues?.price || '',
    duration: initialValues?.duration || '',
  });

  useEffect(() => {
    setForm({
      name: initialValues?.name || '',
      price: initialValues?.price || '',
      duration: initialValues?.duration || '',
    });
  }, [initialValues]);

  const inputClass =
    "border border-[#ddd9d2] px-3 py-2 bg-white outline-none focus:border-[#5f7161]";

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: form.name,
      price: parseFloat(form.price),
      duration: parseInt(form.duration, 10),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 mb-10 pb-10 border-b border-[#ddd9d2]">
      <input
        className={`${inputClass} flex-1 min-w-[160px]`}
        placeholder="Service name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className={`${inputClass} w-24`}
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        required
      />
      <input
        className={`${inputClass} w-28`}
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
        {submitLabel}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="text-[#6b6862] px-3 py-2 hover:text-[#2b2b28]"
        >
          Cancel
        </button>
      )}
    </form>
  );
}