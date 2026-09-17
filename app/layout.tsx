import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Booking Management System",
  description: "Manage services and appointments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <header className="border-b border-[#ddd9d2]">
          <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-[#2b2b28] font-semibold">
              Ispecial Syalon
            </Link>
            <div className="flex gap-6 text-sm text-[#6b6862]">
              <Link href="/services" className="hover:text-[#5f7161]">
                Services
              </Link>
              <Link href="/appointments" className="hover:text-[#5f7161]">
                Bookings
              </Link>
              <Link href="/appointments/list" className="hover:text-[#5f7161]">
                Listings
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[#ddd9d2] mt-12">
          <div className="max-w-3xl mx-auto px-6 py-8 text-sm text-[#6b6862] flex flex-col sm:flex-row sm:justify-between gap-2">
            <p>Fewa Tal, 24 Lakeside Road, Pokhara</p>
            <p>01-4567890 &nbsp;·&nbsp; Mon-Fri, 10am–7pm</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
