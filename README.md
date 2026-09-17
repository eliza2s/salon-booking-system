# Salon Booking System

This is a simple appointment booking app for a salon. Staff can add/edit/delete services, book appointments for customers, and update the status of each appointment.

Built with Next.js (frontend + backend together) and SQLite for the database.

## How to run it

1. Clone this repo
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000` in your browser

The database file (`salon.db`) gets created automatically the first time you run it, and it comes with 3 sample services already added (Haircut, Hair Coloring, Facial) so you're not starting with an empty list.

## Pages

- `/` – homepage with links to everything
- `/services` – add, view, and delete services
- `/appointments` – book a new appointment
- `/appointments/list` – see all appointments, filter by status, update status, or delete

## API routes

- `GET /api/services` – get all services
- `POST /api/services` – add a service
- `PUT /api/services/:id` – edit a service
- `DELETE /api/services/:id` – delete a service
- `GET /api/appointments` – get all appointments
- `POST /api/appointments` – book an appointment
- `PATCH /api/appointments/:id/status` – update appointment status
- `DELETE /api/appointments/:id` – delete an appointment

## Some things I made sure to handle

- Can't book the same service at the same date and time twice (returns an error if you try)
- Phone number has to be exactly 10 digits
- All the required fields have to be filled in before an appointment can be created
- Price and duration for a service have to be positive numbers

