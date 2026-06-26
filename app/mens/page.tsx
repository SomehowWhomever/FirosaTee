"use client";
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Link from 'next/link';

export default function MensPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F4F7F6] text-[#2D3A3A] font-sans pb-24">
      <Navbar toggleMenu={() => setIsMenuOpen(true)} />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <Link href="/" className="text-[#008080] font-bold mb-8 inline-block hover:underline">
          ← Return to Home
        </Link>
        <h1 className="text-5xl font-bold text-[#008080] mb-8">Mens Collection</h1>
        <p className="text-neutral-500">Premium Firosa threads curated for men.</p>
      </section>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#F4F7F6] flex flex-col items-center justify-center">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-4xl">✕</button>
          <nav className="flex flex-col gap-8 text-center">
            <Link href="/" className="text-4xl font-bold hover:text-[#008080]">Home</Link>
            <Link href="/occasions" className="text-4xl font-bold hover:text-[#008080]">Occasions</Link>
            <Link href="/mens" className="text-4xl font-bold hover:text-[#008080]">Mens</Link>
            <Link href="/womens" className="text-4xl font-bold hover:text-[#008080]">Womens</Link>
            <Link href="/about" className="text-4xl font-bold hover:text-[#008080]">About</Link>
          </nav>
        </div>
      )}
    </main>
  );
}