// app/api/services/[id]/route.js
import db from '@/lib/db';
import { NextResponse } from 'next/server';

// Handles PUT /api/services/:id — update a service
export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const { name, price, duration } = body;

  const existing = db.prepare('SELECT * FROM services WHERE id = ?').get(id);
  if (!existing) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  if (!name || name.trim() === '') {
    return NextResponse.json({ error: 'Service name is required' }, { status: 400 });
  }
  if (typeof price !== 'number' || price <= 0) {
    return NextResponse.json({ error: 'Price must be a positive number' }, { status: 400 });
  }
  if (typeof duration !== 'number' || duration <= 0) {
    return NextResponse.json({ error: 'Duration must be greater than zero' }, { status: 400 });
  }
  db.prepare('UPDATE services SET name = ?, price = ?, duration = ? WHERE id = ?')
    .run(name, price, duration, id);

  const updated = db.prepare('SELECT * FROM services WHERE id = ?').get(id);
  return NextResponse.json(updated);
}

// Handles DELETE /api/services/:id
export async function DELETE(request, { params }) {
  const { id } = await params;
  const existing = db.prepare('SELECT * FROM services WHERE id = ?').get(id);
  if (!existing) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }
  db.prepare('DELETE FROM services WHERE id = ?').run(id);
  return NextResponse.json({ success: true });
}