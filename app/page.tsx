import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-2xl font-semibold text-[#2b2b28] mb-2">
        Salon Booking System
      </h1>
      <p className="text-[#6b6862] mb-10">
        Manage services and appointments in one place.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/services"
          className="border border-[#ddd9d2] px-5 py-3 text-[#2b2b28] hover:border-[#5f7161] hover:text-[#5f7161] transition-colors"
        >
          Manage Services
        </Link>
        <Link
          href="/appointments"
          className="border border-[#ddd9d2] px-5 py-3 text-[#2b2b28] hover:border-[#5f7161] hover:text-[#5f7161] transition-colors"
        >
          Book Appointment
        </Link>
        <Link
          href="/appointments/list"
          className="border border-[#ddd9d2] px-5 py-3 text-[#2b2b28] hover:border-[#5f7161] hover:text-[#5f7161] transition-colors"
        >
          Appointment Listing
        </Link>
      </div>
    </div>
  );
}
