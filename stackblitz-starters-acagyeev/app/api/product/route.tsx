"use client";
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { useState, Suspense } from 'react';

function ProductContent() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');

  const id = searchParams.get('id') || '1';
  const title = searchParams.get('title') || 'Premium Firosa Item';
  const price = searchParams.get('price') || '$28.00';
  const img = searchParams.get('img') || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[2.5rem] border border-neutral-100 shadow-sm items-center">
      {/* Big Hero Image */}
      <div className="rounded-[2rem] overflow-hidden bg-neutral-50 border border-neutral-100">
        <img src={img} alt={title} className="w-full h-[50vh] object-cover" />
      </div>

      {/* Core Purchasing Text */}
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-[#2D3A3A] leading-tight">{title}</h1>
        <p className="text-3xl font-bold text-[#008080]">{price}</p>
        
        <p className="text-neutral-500 leading-relaxed font-medium">
          Heavyweight premium cotton material engineered with signature geometric shapes. Built flat-lock stitches for a smooth feel and premium streetwear aesthetic longevity.
        </p>

        {/* Size Select Bubbles */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Select Size</span>
          <div className="flex gap-3">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 rounded-full font-bold text-sm border transition-all ${
                  selectedSize === size 
                    ? 'bg-[#2D3A3A] text-white border-[#2D3A3A]' 
                    : 'bg-transparent text-[#2D3A3A] border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            addToCart({ id: `${id}-${selectedSize}`, title: `${title} (${selectedSize})`, price, imageSrc: img });
            alert(`${title} (${selectedSize}) added to your bag!`);
          }}
          className="mt-4 bg-[#008080] text-white text-center font-bold py-4 rounded-full shadow-lg hover:bg-[#2D3A3A] transition-colors cursor-pointer"
        >
          Add Item to Bag
        </button>
      </div>
    </div>
  );
}

export default function ProductPreviewPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F4F7F6] text-[#2D3A3A] font-sans pb-24">
      <Navbar toggleMenu={() => setIsMenuOpen(true)} />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/" className="text-[#008080] font-bold mb-8 inline-block hover:underline">
          ← Back to Marketplace
        </Link>

        {/* Wrap this in Suspense so Next.js doesn't crash the layout build */}
        <Suspense fallback={<div className="text-center py-12 font-medium">Loading product details...</div>}>
          <ProductContent />
        </Suspense>
      </section>
    </main>
  );
}
