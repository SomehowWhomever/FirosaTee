"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Navbar from "@/components/Navbar";
import { useState } from 'react';

export default function FullBagPage() {
  const { cart, cartTotal, removeFromCart, addToCart, cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const deliveryFee = cartTotal > 50 || cartTotal === 0 ? 0 : 4.99;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <main className="min-h-screen bg-[#F4F7F6] text-[#2D3A3A] font-sans pb-24">
      <Navbar toggleMenu={() => setIsMenuOpen(true)} />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/" className="text-[#008080] font-bold mb-8 inline-block hover:underline">
          ← Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold text-[#2D3A3A] mb-10">Shopping Bag</h1>

        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] text-center border border-neutral-100 shadow-sm">
            <span className="material-symbols-rounded text-6xl text-neutral-300 block mb-4">shopping_bag</span>
            <p className="text-xl text-neutral-400 font-medium mb-6">Your shopping bag is completely empty.</p>
            <Link href="/" className="inline-block bg-[#008080] text-white font-bold px-8 py-3 rounded-full">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-[2rem] flex flex-col sm:flex-row gap-6 items-center border border-neutral-100 shadow-sm">
                  <img src={item.imageSrc} alt={item.title} className="w-24 h-24 rounded-2xl object-cover" />
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-lg text-[#2D3A3A]">{item.title}</h3>
                    <p className="text-[#008080] font-bold mt-1">{item.price}</p>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex items-center gap-3 bg-[#F4F7F6] px-4 py-2 rounded-full">
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-neutral-500 hover:text-[#008080] font-bold px-1"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart({ id: item.id, title: item.title, price: item.price, imageSrc: item.imageSrc })} 
                      className="text-neutral-500 hover:text-[#008080] font-bold px-1"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="text-red-400 hover:text-red-600 p-2 sm:ml-4"
                  >
                    <span className="material-symbols-rounded">delete</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Right Summary Column */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm flex flex-col gap-6">
              <h3 className="text-xl font-bold text-[#2D3A3A] pb-4 border-b border-neutral-100">Order Summary</h3>
              
              <div className="flex justify-between text-neutral-500 font-medium">
                <span>Subtotal ({cartCount} items)</span>
                <span className="text-[#2D3A3A] font-bold">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-neutral-500 font-medium">
                <span>Shipping Fee</span>
                <span className="text-[#2D3A3A] font-bold">
                  {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-between items-center">
                <span className="font-bold text-[#2D3A3A]">Total Cost</span>
                <span className="text-3xl font-bold text-[#008080]">${grandTotal.toFixed(2)}</span>
              </div>

              <button 
                onClick={() => alert("Connecting to Stripe API payment processing line...")}
                className="w-full bg-[#008080] text-white text-center font-bold py-4 rounded-full shadow-lg hover:scale-[1.02] transition-transform block mt-4"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}
      </section>
    </main>
  );
}