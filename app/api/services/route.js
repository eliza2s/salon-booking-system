// app/api/services/route.js
import db from '@/lib/db';
import { NextResponse } from 'next/server';

// Handles GET /api/services — return every service
export async function GET() {
  const services = db.prepare('SELECT * FROM services').all();
  return NextResponse.json(services);
}

// Handles POST /api/services — create a new service
export async function POST(request) {
  const body = await request.json();
  const { name, price, duration } = body;

  // Validation: reject bad data BEFORE it touches the database.
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json({ error: 'Service name is required' }, { status: 400 });
  }
  if (typeof price !== 'number' || price <= 0) {
    return NextResponse.json({ error: 'Price must be a positive number' }, { status: 400 });
  }
  if (typeof duration !== 'number' || duration <= 0) {
    return NextResponse.json({ error: 'Duration must be greater than zero' }, { status: 400 });
  }

  const result = db
    .prepare('INSERT INTO services (name, price, duration) VALUES (?, ?, ?)')
    .run(name, price, duration);

  const newService = db
    .prepare('SELECT * FROM services WHERE id = ?')
    .get(result.lastInsertRowid);

  // 201 = "Created" — the correct status code for a successful POST.
  return NextResponse.json(newService, { status: 201 });
}