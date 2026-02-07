"use client";

import React, { useEffect, useState, useRef } from "react";
import { Check, Home, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {
  const { clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const orderNumberRef = useRef(null);
  const hascleared = useRef(false);

  useEffect(() => {
    if (!orderNumberRef.current) {
      orderNumberRef.current = Math.floor(Math.random() * 900000) + 100000;
    }

    setMounted(true);

    if (!hascleared.current) {
      clearCart();
      toast.success("Order confirmed successfully!");
      hascleared.current = true;
    }
  }, [clearCart]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg p-6">
            <Check size={48} color="white" strokeWidth={3} />
          </div>
        </div>

        <div className="space-y-3 mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
            Order Confirmed!
          </h1>
          <p className="text-slate-500">Your order is being prepared.</p>
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-6 mb-10 border border-slate-100 space-y-4">
          <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-4">
            <span className="text-slate-400">Order Number</span>
            <span className="text-slate-900 font-bold">
              # {orderNumberRef.current}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Status</span>
            <span className="text-blue-600 font-bold flex items-center gap-1">
              <Package size={14} /> Processing
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/">
            <button
              onClick={() => clearCart()}
              className="w-full bg-slate-900 text-white h-14 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-3"
            >
              <Home size={18} /> Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
