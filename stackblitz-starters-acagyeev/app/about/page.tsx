"use client";
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Link from 'next/link';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F4F7F6] text-[#2D3A3A] font-sans pb-24">
      <Navbar toggleMenu={() => setIsMenuOpen(true)} />

      <section className="max-w-4xl mx-auto px-6 py-12">
        {/* Return Button */}
        <Link href="/" className="text-[#008080] font-bold mb-8 inline-block hover:underline">
          ← Return to Home
        </Link>
        
        <h1 className="text-5xl font-bold text-[#008080] mb-10">About Firosa Apparel</h1>
        
        <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-sm border border-neutral-100 leading-relaxed text-lg flex flex-col gap-6">
          <p className="text-xl font-semibold text-[#008080]">
            Welcome to Firosa Apparel!
          </p>
          
          <p>
            It is our position that you should have access to a high quality shirt for significant life events or for regular daily activities. We established this brand so that it is simple for you to locate specific items for any event. By using our own processes, we create and print clothing that is durable and clear in three primary groups:
          </p>

          <ul className="list-none pl-0 flex flex-col gap-6 my-4">
            <li className="bg-[#F4F7F6]/60 p-6 rounded-2xl border-l-4 border-[#008080]">
              <strong className="text-xl block mb-1 text-[#008080]">Holiday Events</strong>
              In this category, we provide clothing for holidays like Christmas, Halloween & Valentine's Day.
            </li>
            
            <li className="bg-[#F4F7F6]/60 p-6 rounded-2xl border-l-4 border-[#008080]">
              <strong className="text-xl block mb-1 text-[#008080]">Custom Birthdays</strong>
              To make an event unique, we provide birthday clothing that you can change. If you wish to create a gift, you can add names, ages and specific jokes to the items.
            </li>
            
            <li className="bg-[#F4F7F6]/60 p-6 rounded-2xl border-l-4 border-[#008080]">
              <strong className="text-xl block mb-1 text-[#008080]">Regular or Diverse Items</strong>
              On some occasions, you may want a shirt that displays your thoughts, causes people to laugh or matches your current mood. Because of this need, our daily collection is full of various designs for times when you want to wear a shirt without a specific reason.
            </li>
          </ul>

          <p>
            And every shirt is printed after you place an order, which means that your items are produced specifically for you. As you search through our store, you can find a shirt that you prefer so that we can assist you in representing your current situation.
          </p>
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