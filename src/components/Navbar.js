"use client";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-green-900/40 bg-gradient-to-r from-green-700/90 to-green-800/90 backdrop-blur supports-[backdrop-filter]:bg-green-800/70 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <Link href="/" className="flex items-center group">
                        <span className="text-2xl rounded-md bg-white/10 p-2 shadow-sm ring-1 ring-white/10 group-hover:bg-white/20 transition-colors">🌳</span>
                        <span className="ml-3 text-xl font-bold tracking-tight text-white">VanAdhikar Atlas</span>
                    </Link>

                    {/* Login Button */}
                    <Link
                        href="/admin/login"
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-green-700 shadow-sm ring-1 ring-inset ring-white/40 transition-all hover:bg-gray-50 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    >
                        <span>Login</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}