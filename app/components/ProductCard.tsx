"use client";
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 flex flex-col justify-between hover:shadow-md transition-shadow group">
      
      {/* Clickable image container passing down URL params */}
      <Link 
        href={`/product?id=${product.id}&title=${encodeURIComponent(product.title)}&price=${product.price}&img=${encodeURIComponent(product.imageSrc)}`} 
        className="block overflow-hidden rounded-2xl bg-neutral-100 relative aspect-square"
      >
        <img 
          src={product.imageSrc} 
          alt={product.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </Link>

      <div className="mt-4">
        <Link href={`/product?id=${product.id}&title=${encodeURIComponent(product.title)}&price=${product.price}&img=${encodeURIComponent(product.imageSrc)}`}>
          <h3 className="font-bold text-base text-[#2D3A3A] line-clamp-1 hover:text-[#008080] transition-colors cursor-pointer">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-3 gap-2">
          <span className="text-lg font-bold text-[#008080]">{product.price}</span>
          <button 
            onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, imageSrc: product.imageSrc })}
            className="bg-[#2D3A3A] text-white font-bold text-xs px-4 py-2.5 rounded-full hover:bg-[#008080] transition-colors cursor-pointer"
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}