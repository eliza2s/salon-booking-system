// app/api/appointments/[id]/route.js
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  const { id } = await params;
  const existing = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
  if (!existing) {
    return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
  }
  db.prepare('DELETE FROM appointments WHERE id = ?').run(id);
  return NextResponse.json({ success: true });
}
