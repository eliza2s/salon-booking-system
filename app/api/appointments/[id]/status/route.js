// app/api/appointments/[id]/status/route.js
import db from '@/lib/db';
import { NextResponse } from 'next/server';

const VALID_STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

export async function PATCH(request, { params }) {
  const { id } = await params;
  const { status } = await request.json();

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
  }

  const existing = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
  if (!existing) {
    return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
  }

  db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, id);
  const updated = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
  return NextResponse.json(updated);
}