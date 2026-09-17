import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-2xl font-semibold text-[#2b2b28] mb-3">
        Booking Management System
      </h1>
      <p className="text-[#6b6862] mb-16">
        At iSpecial Syalon, we believe great style starts with great care. From
        everyday beauty treatments to special-occasion makeovers, our team is
        here to help you look and feel your best in a comfortable, welcoming
        space.
      </p>

      <div className="border-t border-[#ddd9d2]">
        <Link
          href="/services"
          className="block py-5 border-b border-[#ddd9d2] group"
        >
          <p className="text-[#2b2b28] font-medium group-hover:text-[#5f7161]">
            Manage services
          </p>
          <p className="text-sm text-[#6b6862] mt-1">
            Add, edit, or remove the services we offer.
          </p>
        </Link>
        <Link
          href="/appointments"
          className="block py-5 border-b border-[#ddd9d2] group"
        >
          <p className="text-[#2b2b28] font-medium group-hover:text-[#5f7161]">
            Book an appointment
          </p>
          <p className="text-sm text-[#6b6862] mt-1">
            Schedule a new appointment for a customer.
          </p>
        </Link>
        <Link
          href="/appointments/list"
          className="block py-5 border-b border-[#ddd9d2] group"
        >
          <p className="text-[#2b2b28] font-medium group-hover:text-[#5f7161]">
            View appointments
          </p>
          <p className="text-sm text-[#6b6862] mt-1">
            See all bookings, filter by status, and make updates.
          </p>
        </Link>
      </div>
    </div>
  );
}
