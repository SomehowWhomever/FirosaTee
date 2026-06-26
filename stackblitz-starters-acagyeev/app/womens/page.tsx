"use client";
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Link from 'next/link';

export default function WomensAndChildrenPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadShopData() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        // Filter to display both women's and children's items together
        const filtered = data.filter((p: any) => p.category === 'womens' || p.category === 'children');
        setProducts(filtered);
      } catch (err) {
        console.error("Could not load items:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadShopData();
  }, []);

  return (
    <main className="min-h-screen bg-[#F4F7F6] pb-24">
      <Navbar toggleMenu={() => setIsMenuOpen(true)} />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/" className="text-[#008080] font-bold mb-8 inline-block hover:underline">
          ← Return to Home
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3A3A] tracking-tight">
            Women & <span className="text-[#008080]">Children</span>
          </h1>
          <p className="mt-2 text-neutral-500 font-medium max-w-xl">
            Explore premium streetwear fits, relaxed aesthetics, and durable threads for women and kids.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-24 font-semibold text-[#008080] animate-pulse">Syncing catalog...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-12 text-neutral-400 font-medium">No items found in this section.</div>
            ) : (
              products.map((item) => <ProductCard key={item.id} product={item} />)
            )}
          </div>
        )}
      </section>

      {/* Synchronized Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[300] bg-[#F4F7F6] flex flex-col items-center justify-center">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-3xl p-2 text-[#2D3A3A]">✕</button>
          <nav className="flex flex-col gap-6 text-center">
            <Link href="/" className="text-3xl font-bold text-[#2D3A3A] hover:text-[#008080]">Home</Link>
            <Link href="/occasions" className="text-3xl font-bold text-[#2D3A3A] hover:text-[#008080]">Occasions</Link>
            <Link href="/mens" className="text-3xl font-bold text-[#2D3A3A] hover:text-[#008080]">Mens</Link>
            <Link href="/womens" className="text-3xl font-bold text-[#008080]">Women & Children</Link>
            <Link href="/bag" className="text-3xl font-bold text-[#2D3A3A] hover:text-[#008080]">Shopping Bag</Link>
            <Link href="/about" className="text-3xl font-bold text-[#2D3A3A] hover:text-[#008080]">About</Link>
          </nav>
        </div>
      )}
    </main>
  );
}