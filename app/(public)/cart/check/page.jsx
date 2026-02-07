"use client";

import React, { useEffect, useRef } from "react"; // useRef اضافه شد
import { Check, Home, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {
  const { clearCart } = useCart();
  const orderNumber = Math.floor(Math.random() * 900000) + 100000;

  // استفاده از useRef برای چک کردن اینکه آیا توست قبلاً نمایش داده شده یا نه
  const hasNotified = useRef(false);

  useEffect(() => {
    if (!hasNotified.current) {
      clearCart();

      toast.success("Order placed successfully!", {
        duration: 4000,
        position: "bottom-right",
        style: {
          color: "#343A40",
          background: "#fff",
          borderRadius: "16px",
          fontSize: "14px",
          fontWeight: "bold",
          padding: "16px",
          border: "1px solid rgba(0,0,0,0.05)",
        },
        iconTheme: {
          primary: "#10b981",
          secondary: "#fff",
        },
      });

      hasNotified.current = true; // علامت‌گذاری برای عدم تکرار
    }
  }, [clearCart]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-green-100 rounded-full scale-150 blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200 p-6">
            <Check
              size={48}
              color="green"
              strokeWidth={3}
              className="animate-in zoom-in duration-500"
            />
          </div>
        </div>

        <div className="space-y-3 mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
            Order Confirmed!
          </h1>
          <p className="text-slate-500 leading-relaxed">
            Your payment was successful and your order is now being prepared for
            shipment.
          </p>
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-6 mb-10 border border-slate-100 space-y-4">
          <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-4">
            <span className="text-slate-400 font-medium">Order Number</span>
            <span className="text-slate-900 font-bold"># {orderNumber}</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-4">
            <span className="text-slate-400 font-medium">Status</span>
            <span className="flex items-center gap-1.5 text-blue-600 font-bold">
              <Package size={14} /> Processing
            </span>
          </div>
          <p className="text-[11px] text-slate-400 text-center pt-2">
            A confirmation email has been sent to your inbox.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/">
            <button className="w-full bg-slate-900 text-white h-14 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl shadow-slate-200">
              <Home size={18} />
              Return Home
            </button>
          </Link>

          <Link href="/store">
            <button className="w-full bg-transparent text-slate-400 h-14 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:text-slate-900 transition-colors">
              Continue Shopping
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
