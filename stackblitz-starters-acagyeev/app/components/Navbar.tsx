"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';

interface NavbarProps {
  toggleMenu: () => void;
}

export default function Navbar({ toggleMenu }: NavbarProps) {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-[#F4F7F6] px-6 py-5 flex items-center justify-between border-b border-neutral-200/60 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
        <Link href="/" className="text-2xl font-bold tracking-wider text-[#008080] hover:opacity-80 transition-opacity">
          FIROSA
        </Link>

        <div className="flex items-center gap-4">
          {/* Shopping Cart Trigger */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full hover:bg-neutral-200/50 transition-colors flex items-center justify-center text-[#2D3A3A] cursor-pointer"
            aria-label="Open Shopping Cart"
          >
            <span className="material-symbols-rounded text-2xl">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#008080] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center scale-90">
                {cartCount}
              </span>
            )}
          </button>

          {/* Menu Hamburger */}
          <button onClick={toggleMenu} className="p-2.5 rounded-full hover:bg-neutral-200/50 transition-colors flex items-center justify-center text-[#2D3A3A] cursor-pointer">
            <span className="material-symbols-rounded text-2xl">menu</span>
          </button>
        </div>
      </nav>

      {/* The separate sliding drawer panel component */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}