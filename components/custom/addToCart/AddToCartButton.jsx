"use client";

import React from "react";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

export default function AddToCartButton({ product }) {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const { user, isLoaded: userLoaded } = useUser();
  const quantity = getItemQuantity(product.id);

  // اگر کاربر لاگین نکرده باشد، دکمه Sign In نمایش بده
  if (userLoaded && !user) {
    return (
      <SignInButton mode="modal">
        <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#343A40] text-white px-12 py-5 rounded-2xl font-black text-xs tracking-[0.1em] active:scale-95 transition-all shadow-2xl shadow-gray-200 uppercase cursor-pointer hover:bg-black">
          <ShoppingBag size={18} />
          Sign In to Add
        </button>
      </SignInButton>
    );
  }

  if (quantity === 0) {
    return (
      <button
        onClick={() => addToCart(product)}
        className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#343A40] text-white px-12 py-5 rounded-2xl font-black text-xs tracking-[0.1em] active:scale-95 transition-all shadow-2xl shadow-gray-200 uppercase cursor-pointer hover:bg-black"
      >
        <ShoppingBag size={18} />
        Add to Cart
      </button>
    );
  }

  return (
    <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-100 shadow-inner w-fit sm:w-fit">
      <button
        onClick={() => removeFromCart(product.id)}
        className="w-12 h-12 flex items-center justify-center text-slate-500 hover:bg-white hover:text-red-500 rounded-xl transition-all duration-200 hover:shadow-sm"
      >
        <span className="text-2xl font-medium">−</span>
      </button>

      <span className="px-6 text-xl font-black text-slate-900 min-w-[60px] text-center font-mono">
        {quantity}
      </span>

      <button
        onClick={() => addToCart(product)}
        className="w-12 h-12 flex items-center justify-center bg-slate-900 text-white rounded-xl transition-all duration-200 hover:bg-blue-600 active:scale-90 shadow-md shadow-slate-200"
      >
        <span className="text-2xl font-medium">+</span>
      </button>
    </div>
  );
}
