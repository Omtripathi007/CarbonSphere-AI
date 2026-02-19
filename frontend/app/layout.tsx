"use client";

import "./globals.css";

import { motion } from "framer-motion";
import { Home, User, Factory, Landmark, Coins, Banknote, Menu, Leaf } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: <Home size={18} /> },
  { href: "/personal", label: "Citizen", icon: <User size={18} /> },
  { href: "/industrial", label: "Industry", icon: <Factory size={18} /> },
  { href: "/government", label: "Government", icon: <Landmark size={18} /> },
  { href: "/marketplace", label: "Exchange", icon: <Coins size={18} /> },
  { href: "/finance", label: "Finance", icon: <Banknote size={18} /> },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show nav on landing or login if preferred, but for demo let's show it
  const isAuthPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="antialiased">
        {!isAuthPage && (
          <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
            <div className="glass-card px-8 py-3 flex justify-between items-center bg-black/50 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
              <Link href="/" className="flex items-center gap-3 font-bold group">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                  <Leaf size={20} />
                </div>
                <span className="hidden md:inline text-white tracking-tight">CarbonSphere <span className="text-emerald-500">AI</span></span>
              </Link>

              <div className="hidden lg:flex gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-semibold transition-all hover:text-emerald-400 relative py-1 ${pathname === item.href ? "text-emerald-500" : "text-gray-400"
                      }`}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                      />
                    )}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Link href="/login" className="hidden sm:block text-sm font-bold bg-white/5 px-6 py-2.5 rounded-full hover:bg-white/10 border border-white/10 transition-all hover:scale-105 active:scale-95">
                  Sign In
                </Link>
                <button
                  className="lg:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu />
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:hidden mt-4 glass-card p-6 space-y-4 rounded-3xl border border-white/10 shadow-2xl bg-black/60 backdrop-blur-2xl"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-gray-300 hover:text-emerald-400"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </nav>
        )}
        <div className="pt-24 md:pt-32">
          {children}
        </div>
      </body>
    </html>
  );
}
