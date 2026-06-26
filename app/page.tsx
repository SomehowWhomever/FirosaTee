'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Load Live Catalog Data from Printify API Bridge
  useEffect(() => {
    async function loadShopData() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data || []);
      } catch (err) {
        console.error('Could not load items:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadShopData();
  }, []);

  // 2. Setup Dynamic Workspace Carousel Slides
  const slides = [
    {
      image:
        'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200&auto=format&fit=crop',
      title: '250th Anniversary Limited Drop',
      description:
        "Celebrate the national milestone with Firosa's own, 7626 Edition Apparel.",
      link: '/occasions',
    },
    {
      image:
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop',
      title: 'Mens Clothing',
      description:
        'Premium materials, clean silhouettes, crafted for absolute comfort.',
      link: '/mens',
    },
    {
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
      title: 'Women & Children',
      description:
        'Cozy essential wear and matching looks crafted with ultra-soft ring-spun cotton.',
      link: '/womens',
    },
    {
      image:
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
      title: 'Featured Hot Drops',
      description:
        'The absolute highest trending pieces from our live catalog feed.',
      link: '/',
    },
  ];

  // 3. Auto-Turning Carousel Logic
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
  };

  useEffect(() => {
    if (slides && slides.length > 0) {
      resetTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
    resetTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    resetTimer();
  };

  return (
    <main className="min-h-screen bg-[#F4F7F6] pb-24">
      {/* Universal Navigation */}
      <Navbar toggleMenu={() => setIsMenuOpen(true)} />

      {/* Main Section Containment */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Clickable Auto-Turning Carousel Banner */}
        <div className="relative w-full overflow-hidden rounded-[2rem] bg-white border border-neutral-100 shadow-sm h-[400px] mb-16">
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <Link
                href={slide.link}
                key={index}
                className="w-full h-full flex-shrink-0 relative block cursor-pointer"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                  <span className="text-xs font-bold tracking-widest text-[#21ff51] uppercase mb-1">
                    Spotlight Drop
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {slide.title}
                  </h3>
                  <p className="text-neutral-200 text-sm mt-1 max-w-md font-medium">
                    {slide.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md text-[#2D3A3A] flex items-center justify-center font-bold shadow-md hover:bg-white transition-all cursor-pointer z-30"
          >
            ←
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md text-[#2D3A3A] flex items-center justify-center font-bold shadow-md hover:bg-white transition-all cursor-pointer z-30"
          >
            ❯
          </button>
        </div>

        {/* Live Catalog Feed Section Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#2D3A3A] tracking-tight">
            Latest <span className="text-[#008080]">Drops</span>
          </h2>
          <p className="mt-1 text-neutral-400 font-medium">
            Freshly published pieces synced direct from our warehouse.
          </p>
        </div>

        {/* Dynamic Cards Grid Rendering */}
        {isLoading ? (
          <div className="text-center py-24 font-semibold text-[#008080] animate-pulse">
            Syncing catalog...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white rounded-[2rem] border border-neutral-100 p-8 shadow-sm">
                <span className="material-symbols-rounded text-4xl text-neutral-300 block mb-2">
                  inventory_2
                </span>
                <p className="text-neutral-400 font-medium">
                  No live listings matching this category yet.
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Items will show up here as soon as Printify finishes
                  publishing!
                </p>
              </div>
            ) : (
              products.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))
            )}
          </div>
        )}
      </section>

      {/* Synchronized Global Menu Overlay Link Canopy */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[300] bg-[#F4F7F6] flex flex-col items-center justify-center">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-3xl p-2 text-[#2D3A3A]"
          >
            ✕
          </button>
          <nav className="flex flex-col gap-6 text-center">
            <Link href="/" className="text-3xl font-bold text-[#008080]">
              Home
            </Link>
            <Link
              href="/occasions"
              className="text-3xl font-bold text-[#2D3A3A] hover:text-[#008080]"
            >
              Occasions
            </Link>
            <Link
              href="/mens"
              className="text-3xl font-bold text-[#2D3A3A] hover:text-[#008080]"
            >
              Mens
            </Link>
            <Link
              href="/womens"
              className="text-3xl font-bold text-[#2D3A3A] hover:text-[#008080]"
            >
              Women & Children
            </Link>
            <Link
              href="/bag"
              className="text-3xl font-bold text-[#2D3A3A] hover:text-[#008080]"
            >
              Shopping Bag
            </Link>
            <Link
              href="/about"
              className="text-3xl font-bold text-[#2D3A3A] hover:text-[#008080]"
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </main>
  );
}