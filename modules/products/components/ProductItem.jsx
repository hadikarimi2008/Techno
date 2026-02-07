"use client";

import React from "react";
import { ShoppingBag, Star, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

export default function ProductItem({ product }) {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  if (!product) return null;

  const quantity = getItemQuantity(product.id);

  const handlePlus = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleMinus = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(product.id);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-3xl p-4 duration-300 shadow-2xl h-full flex flex-col">
      <Link href={`/store/${product.id}`} className="flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] font-bold text-gray-600">
                {product.rate}
              </span>
            </div>

            {product.category && (
              <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                <Tag size={10} className="text-[#0056B3]" />
                <span className="text-[9px] font-extrabold text-[#0056B3] uppercase tracking-tighter">
                  {product.category}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full h-48 mb-6 overflow-hidden flex items-center justify-center hover:scale-105 transition-transform duration-500">
          <Image
            src={product.img}
            alt={product.title}
            title={product.title}
            width={400}
            height={400}
            className="object-contain w-full h-full transition-transform duration-500"
            loading="lazy"
            quality={80}
          />
        </div>

        <div className="flex flex-col flex-grow space-y-3">
          <h3 className="text-sm font-bold text-[#343A40] line-clamp-1">
            {product.title}
          </h3>

          <div className="flex gap-1.5">
            {product.colors?.slice(0, 4).map((color, index) => (
              <div
                key={index}
                style={{ backgroundColor: color }}
                className="w-3 h-3 rounded-full border border-gray-100 shadow-sm"
              />
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-4 mt-auto">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Price
              </span>
              <span className="text-xl font-black text-[#0056B3]">
                ${product.price?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="w-full mt-4" onClick={(e) => e.stopPropagation()}>
        {quantity === 0 ? (
          <button
            onClick={handleAddClick}
            className="w-full flex items-center justify-center gap-2 bg-[#343A40] text-white py-3.5 rounded-xl font-bold text-[11px] tracking-wider uppercase transition-all active:scale-95 shadow-lg shadow-gray-200 hover:bg-black"
          >
            <ShoppingBag size={16} />
            <span>Add to Cart</span>
          </button>
        ) : (
          <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-1 border border-slate-100 shadow-inner w-full">
            <button
              onClick={handleMinus}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-white hover:text-red-500 rounded-xl transition-all duration-200 hover:shadow-sm"
            >
              <span className="text-xl font-medium">−</span>
            </button>

            <span className="text-base font-black text-slate-900 font-mono">
              {quantity}
            </span>

            <button
              onClick={handlePlus}
              className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-xl transition-all duration-200 hover:bg-blue-600 active:scale-90 shadow-md shadow-slate-200"
            >
              <span className="text-xl font-medium">+</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
