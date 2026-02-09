import React from "react";
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Quote,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/custom/addToCart/AddToCartButton";
import ProductItem from "@/modules/products/components/ProductItem";
import StructuredData from "@/components/seo/StructuredData";
import {
  generateProductStructuredData,
  generateBreadcrumbStructuredData,
} from "@/lib/seo";

export default async function ProductDetail({ params }) {
  const { id } = await params;
  const products = await prisma.product.findMany();

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  const randomProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center font-black text-[#343A40] tracking-tighter">
        PRODUCT NOT FOUND
      </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const productStructuredData = generateProductStructuredData(product, baseUrl);
  const breadcrumbData = generateBreadcrumbStructuredData(
    [
      { name: "Home", url: "/" },
      { name: "Store", url: "/store" },
      { name: product.title, url: `/store/${product.id}` },
    ],
    baseUrl
  );

  return (
    <>
      <StructuredData data={productStructuredData} />
      <StructuredData data={breadcrumbData} />
      <div className="min-h-screen bg-white pt-[12vh] pb-20">
        <div className="max-w-[1440px] mx-auto px-[6%] md:px-[4%]">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-gray-500 mb-12 group"
          >
            <ArrowLeft size={16} />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase group-hover:text-black transition-colors">
              Back to Store
            </span>
          </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 mb-32">
          <div className="bg-[#FBFBFB] rounded-[2.5rem] p-8 md:p-16 flex items-center justify-center border border-gray-50 shadow-sm h-fit">
            <img
              src={product.img}
              alt={product.title}
              className="w-full max-w-sm h-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                <Star size={14} className="fill-[#343A40] text-[#343A40]" />
                <span className="text-xs font-bold text-[#343A40]">
                  {product.rate}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Premium Device
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-[#343A40] mb-6 leading-[0.9] tracking-tighter uppercase">
              {product.title}
            </h1>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-md">
              {product.description}
            </p>

            {product.colors && product.colors.length > 0 && (
              <div className="mb-10">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block mb-5">
                  Select Color
                </span>
                <div className="flex gap-4">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      style={{ backgroundColor: color }}
                      className="w-8 h-8 rounded-full border-4 border-white ring-1 ring-gray-100 shadow-sm active:scale-90 transition-transform cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 pt-10 border-t border-gray-100">
              <div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">
                  Price
                </span>
                <span className="text-4xl font-black text-[#0056B3] tracking-tighter">
                  ${product.price?.toLocaleString()}
                </span>
              </div>

              <AddToCartButton product={product} />
              <Link
                href="/cart"
                aria-label="Go to cart"
                className="inline-flex items-center justify-center"
              >
                <ShoppingBag
                  size={25}
                  className="text-gray-400 hover:text-[#0056B3] transition-colors"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="flex gap-8 mt-12">
              <div className="flex items-center gap-2">
                <Truck className="text-gray-400" size={18} />
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                  Global Delivery
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-gray-400" size={18} />
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                  Originality Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>

        {product.aboutBrand && (
          <section className="relative mt-20 pt-20 border-t border-gray-50 overflow-hidden">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
              <div className="mb-8">
                {product.brand && (
                  <span className="text-[10px] font-black text-[#0056B3] uppercase tracking-[0.4em] block mb-4">
                    {product.brand}
                  </span>
                )}
                <h2 className="text-3xl md:text-5xl font-black text-[#343A40] tracking-tighter uppercase leading-none">
                  The Vision Behind <br /> {product.brand || "The Brand"}
                </h2>
              </div>

              <div className="relative group">
                <Quote
                  size={80}
                  className="absolute -top-10 -left-6 md:-left-12 text-gray-50 -z-10 transition-colors group-hover:text-blue-50/50"
                />
                <p className="text-gray-500 text-base md:text-xl leading-[1.8] font-medium italic relative z-10">
                  {product.aboutBrand}
                </p>
              </div>

              <div className="mt-12 w-24 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>

            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl -z-20"></div>
          </section>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
