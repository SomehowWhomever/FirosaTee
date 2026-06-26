"use client";
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Link from 'next/link';

export default function July4thPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F4F7F6] text-[#2D3A3A] font-sans pb-24">
      <Navbar toggleMenu={() => setIsMenuOpen(true)} />

      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Return Button back to the Occasions Hub */}
        <Link href="/occasions" className="text-[#008080] font-bold mb-8 inline-block hover:underline">
          ← Return to Occasions
        </Link>
        
        <h1 className="text-5xl font-bold text-[#008080] mb-4">July 4th Collection</h1>
        <p className="text-neutral-500 mb-12">The exclusive Firosa streetwear drop celebrating Independence Day.</p>

        {/* Placeholder Grid for when you add your custom holiday shirts */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center text-neutral-400">
            [July 4th Graphic Tee Coming Soon]
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center text-neutral-400">
            [Firework Heavyweight Hoodie Coming Soon]
          </div>
        </div>
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
            <Link href="/children" className="text-4xl font-bold hover:text-[#008080]">Children</Link>
            <Link href="/about" className="text-4xl font-bold hover:text-[#008080]">About</Link>
          </nav>
        </div>
      )}
    </main>
  );
}