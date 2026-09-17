// app/api/appointments/route.js
import db from '@/lib/db';
import { NextResponse } from 'next/server';

// Handles GET /api/appointments — return all appointments,
// joined with service info so the frontend can show the service name.
export async function GET() {
  const appointments = db.prepare(`
    SELECT appointments.*, services.name AS service_name
    FROM appointments
    JOIN services ON appointments.service_id = services.id
    ORDER BY date, time
  `).all();
  return NextResponse.json(appointments);
}

// Handles POST /api/appointments — create a new appointment
export async function POST(request) {
  const body = await request.json();
  const { customer_name, customer_phone, service_id, date, time, notes } = body;

  // --- Validation ---
  if (!customer_name || customer_name.trim() === '') {
    return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
  }
    if (!customer_phone || customer_phone.trim() === '') {
    return NextResponse.json({ error: 'Customer phone is required' }, { status: 400 });
  }
  if (!/^\d{10}$/.test(customer_phone.trim())) {
    return NextResponse.json({ error: 'Customer phone must be exactly 10 digits' }, { status: 400 });
  }
  if (!service_id) {
    return NextResponse.json({ error: 'A service must be selected' }, { status: 400 });
  }
  if (!date || !time) {
    return NextResponse.json({ error: 'Appointment date and time are required' }, { status: 400 });
  }

  const service = db.prepare('SELECT * FROM services WHERE id = ?').get(service_id);
  if (!service) {
    return NextResponse.json({ error: 'Selected service does not exist' }, { status: 400 });
  }

  // --- Conflict check ---
  // Look for an existing, non-cancelled appointment for the SAME service
  // at the SAME date and time. If one exists, this is a double-booking.
  const conflict = db.prepare(`
    SELECT * FROM appointments
    WHERE service_id = ? AND date = ? AND time = ? AND status != 'Cancelled'
  `).get(service_id, date, time);

  if (conflict) {
    // 409 = "Conflict" — the correct status code for "this already exists / clashes"
    return NextResponse.json(
      { error: 'This time slot is already booked for this service' },
      { status: 409 }
    );
  }

  const result = db.prepare(`
    INSERT INTO appointments (customer_name, customer_phone, service_id, date, time, notes, status)
    VALUES (?, ?, ?, ?, ?, ?, 'Pending')
  `).run(customer_name, customer_phone, service_id, date, time, notes || null);

  const newAppointment = db
    .prepare('SELECT * FROM appointments WHERE id = ?')
    .get(result.lastInsertRowid);

  return NextResponse.json(newAppointment, { status: 201 });
}