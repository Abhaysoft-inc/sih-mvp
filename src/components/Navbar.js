"use client";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-black/40 bg-black backdrop-blur supports-[backdrop-filter]:bg-black/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="flex items-center justify-between h-[3.2rem]">
                    {/* Logo and Brand */}
                    <Link href="/" className="flex items-center group">
                        <span className="ml-3 text-xl font-bold tracking-tight text-white">VanAdhikar Atlas</span>
                    </Link>

                    {/* Login Button */}
                    <Link
                        href="/auth"
                        className="inline-flex items-center gap-2 rounded bg-white px-3 py-1.5 font-medium text-black ring-1 ring-inset ring-white/40 transition-all hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    >
                        <span>Login</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}