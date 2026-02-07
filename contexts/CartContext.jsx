"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [dbItems, setDbItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (isLoaded && userId) {
        setLoading(true);
        try {
          const res = await fetch("/api/cart");
          if (res.ok) {
            const data = await res.json();
            setDbItems(data.cartItems || []);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setDbItems([]);
      }
    };
    fetchCart();
  }, [userId, isLoaded]);

  const addToCart = async (product) => {
    if (!userId) return;

    setDbItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (productId, removeCompletely = false) => {
    if (!userId) return;

    setDbItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (!existingItem) return prev;

      if (removeCompletely || existingItem.quantity <= 1) {
        return prev.filter((item) => item.id !== productId);
      } else {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
    });

    try {
      const url = `/api/cart?productId=${productId}${removeCompletely ? "&removeCompletely=true" : ""}`;
      await fetch(url, { method: "DELETE" });
    } catch (error) {
      console.error(error);
    }
  };

  const getItemQuantity = (productId) => {
    return dbItems.find((item) => item.id === productId)?.quantity || 0;
  };

  const clearCart = () => {
    setDbItems([]);
  };

  const cartItems = userId ? dbItems : [];

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getItemQuantity,
        loading,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
