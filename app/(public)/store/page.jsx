"use client";

import React, { useState, useMemo } from "react";
import ProductList from "@/modules/products/components/ProductList";
import ProductFilter from "@/modules/products/components/ProductFilter";
import ProductSearch from "@/modules/products/components/ProductSearch";

const categories = ["Phones", "laptops", "tablets", "watches"];

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // بارگذاری محصولات
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // فیلتر و جستجوی محصولات
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // فیلتر بر اساس دسته‌بندی
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // فیلتر بر اساس جستجو
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-black text-[#343A40] mb-8 tracking-tighter">
        Store
      </h1>

      <ProductSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ProductList products={filteredProducts} loading={loading} />
    </div>
  );
}
