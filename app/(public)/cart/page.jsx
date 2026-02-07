"use client";

import React from "react";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@clerk/nextjs";
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, LogIn } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { user, isLoaded: userLoaded } = useUser();

  // اگر کاربر لاگین نکرده باشد، پیام مناسب نمایش بده
  if (userLoaded && !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="bg-slate-50 p-8 rounded-full">
          <LogIn size={48} className="text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Please Sign In
        </h2>
        <p className="text-slate-500 text-center max-w-md">
          You need to be signed in to view your shopping cart. Please sign in to continue.
        </p>
        <Link href="/sign-in">
          <button className="mt-4 mb-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2">
            <LogIn size={18} />
            Sign In
          </button>
        </Link>
      </div>
    );
  }

  // محاسبات مالی
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.05; // ۵ درصد مالیات
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="bg-slate-50 p-8 rounded-full">
          <ShoppingBag size={48} className="text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Your cart is empty
        </h2>
        <p className="text-slate-500">
          Looks like you haven't added anything yet.
        </p>
        <Link href="/store">
          <button className="mt-4 mb-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all">
            Go to Store
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-[4%] ">
      <h1 className="text-3xl font-black text-slate-900 mb-10 tracking-tighter py-6">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* لیست محصولات - سمت چپ */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-6 bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
            >
              {/* تصویر محصول */}
              <div className="w-32 h-32 bg-slate-50 rounded-2xl flex-shrink-0 p-2">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* جزئیات محصول */}
              <div className="flex-1 text-center sm:text-left space-y-1">
                <h3 className="font-bold text-slate-800 text-lg">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  {item.category}
                </p>
                <p className="text-[#0056B3] font-black text-xl mt-2">
                  ${item.price?.toLocaleString()}
                </p>
              </div>

              {/* کنترلر تعداد */}
              <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100 shadow-inner">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-white hover:text-red-500 rounded-xl transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 text-sm font-black text-slate-900 min-w-[35px] text-center font-mono">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="w-8 h-8 flex items-center justify-center bg-[#343A40] text-white rounded-xl transition-all shadow-md active:scale-90"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* فاکتور نهایی - سمت راست */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] sticky top-28 shadow-2xl shadow-slate-200">
            <h2 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-bold text-white">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax (5%)</span>
                <span className="font-bold text-white">
                  ${tax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className="text-green-400 font-bold uppercase text-[10px] bg-green-400/10 px-2 py-1 rounded">
                  Free
                </span>
              </div>

              <div className="h-[1px] bg-white/10 my-6" />

              <div className="flex justify-between items-end">
                <span className="text-lg font-medium text-slate-300">
                  Total Price
                </span>
                <span className="text-3xl font-black text-white">
                  ${total.toLocaleString()}
                </span>
              </div>

              <Link
                href="/cart/check"
                className="w-full bg-white text-slate-900 py-4 rounded-2xl mt-8 font-black uppercase tracking-widest text-sm hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                Checkout Now
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
