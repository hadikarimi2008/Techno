import React from "react";
import ProductItem from "@/modules/products/components/ProductItem";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductsList from "./AnimatedProduct";


export default async function RandomProducts() {
  const products = await prisma.product.findMany();

  const randomProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-[6%] md:px-[4%]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-[10px] font-black text-[#0056B3] uppercase tracking-[0.3em] block mb-2">
              Our Suggestions
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#343A40] tracking-tighter">
              DISCOVER MORE
            </h2>
          </div>
          <div className="h-[2px] flex-1 bg-gray-50 mb-2 hidden md:block mx-10"></div>
          <Link href="/store">
            <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b-2 border-transparent hover:border-[#0056B3] hover:text-black transition-all cursor-pointer">
              View All Products
            </button>
          </Link>
        </div>

        <ProductsList>
          {randomProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ProductsList>
      </div>
    </section>
  );
}
