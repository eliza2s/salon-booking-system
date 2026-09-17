'use client';

export default function StatusSelect({ value, onChange }) {
  return (
    <select
      className="border border-[#ddd9d2] px-2 py-1 bg-white text-sm outline-none focus:border-[#5f7161]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option>Pending</option>
      <option>Confirmed</option>
      <option>Completed</option>
      <option>Cancelled</option>
    </select>
  );
}