"use client";
import clsx from "clsx";
import { Size } from "@/types";

export default function SizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: { size: Size; inStock: boolean }[];
  selected: Size | null;
  onSelect: (s: Size) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {sizes.map(({ size, inStock }) => (
        <button
          key={size}
          disabled={!inStock}
          onClick={() => onSelect(size)}
          className={clsx(
            "w-12 h-12 border text-sm font-medium transition-colors",
            selected === size
              ? "bg-black text-white border-black"
              : "border-neutral-300 hover:border-black",
            !inStock && "opacity-30 line-through cursor-not-allowed"
          )}
        >
          {size}
        </button>
      ))}
    </div>
  );
}