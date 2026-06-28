"use client";

import Link from 'next/link';

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#F4F7F6] text-[#2D3A3A] font-sans p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#008080] font-bold mb-6 inline-block hover:underline">
          ← Back Home
        </Link>
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-neutral-500">FAQ content coming soon for Firosa Apparel!</p>
      </div>
    </main>
  );
}