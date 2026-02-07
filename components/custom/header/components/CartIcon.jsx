"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@clerk/nextjs";

export default function CartIcon() {
  const { cartItems } = useCart();
  const { userId, isLoaded } = useAuth();

  // اگر کاربر لاگین نکرده باشد، آیکون سبد خرید را نمایش نده
  if (!isLoaded || !userId) {
    return null;
  }

  // محاسبه تعداد کل محصولات در سبد خرید
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <Link href="/cart" className="relative group p-2">
      <ShoppingBag
        size={26}
        strokeWidth={1.5}
        className="text-slate-900 group-hover:text-slate-600 transition-colors"
      />
      {totalItems > 0 && (
        <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-in zoom-in duration-300 shadow-sm border border-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
