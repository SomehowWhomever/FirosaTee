"use client";
import { useCart } from '@/context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, cartCount, cartTotal, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Dark background panel layer mask */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Slider Container Panel */}
      <div className="relative w-full max-w-md h-full bg-[#F4F7F6] shadow-2xl flex flex-col z-10">
        
        {/* Top Header Block */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-white">
          <h2 className="text-2xl font-bold text-[#008080]">Your Bag ({cartCount})</h2>
          <button 
            onClick={onClose} 
            className="p-2 text-2xl cursor-pointer hover:opacity-70 flex items-center justify-center text-[#2D3A3A]"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {/* Scrollable list section for stacked clothing */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center gap-2">
              <span className="material-symbols-rounded text-5xl text-neutral-300">shopping_bag</span>
              <p className="text-neutral-400 font-medium text-sm">Your cart is currently empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl flex gap-4 items-center border border-neutral-100 shadow-sm">
                <img src={item.imageSrc} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-[#2D3A3A] text-sm line-clamp-1">{item.title}</h4>
                  <p className="text-neutral-500 font-medium text-xs mt-0.5">{item.price} × {item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-red-400 hover:text-red-600 p-2 flex items-center justify-center cursor-pointer"
                >
                  <span className="material-symbols-rounded">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Persistent Bottom Action Footer */}
        <div className="p-6 border-t border-neutral-200 bg-white rounded-t-[2rem] shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-neutral-500 font-semibold">Subtotal:</span>
            <span className="text-2xl font-bold text-[#2D3A3A]">${cartTotal.toFixed(2)}</span>
          </div>
          <a 
            href="/bag"
            className="w-full bg-[#008080] text-white text-center font-bold py-4 rounded-full shadow-lg hover:bg-[#2D3A3A] transition-colors block cursor-pointer"
          >
            View Full Bag & Checkout
          </a>
        </div>

      </div>
    </div>
  );
}