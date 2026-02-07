"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Welcome() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-[5vh]">
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-10 right-[5%] w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-70" />

      <div className="max-w-[1440px] mx-auto px-[6%] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 z-10">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-8">
            <span className="h-2 w-2 rounded-full bg-[#0056B3]"></span>
            <span className="text-[10px] font-black tracking-[0.2em] text-[#343A40] uppercase">
              Digital Experience
            </span>
          </div>

          <div>
            <h1 className="text-5xl md:text-8xl lg:text-[130px] font-black text-[#343A40] leading-[0.8] tracking-tighter mb-10">
              THE NEW <br />
              <span className="text-[#0056B3]">STANDARD</span> <br />
              OF TECH.
            </h1>
          </div>

          <div className="flex flex-wrap gap-8 items-center">
            <Link
              href="/store"
              className="bg-[#343A40] text-white px-10 py-6 rounded-2xl flex items-center gap-4 transition-all"
            >
              <span className="font-black text-xs tracking-[0.2em] uppercase">
                Explore Store
              </span>
              <ArrowUpRight size={20} />
            </Link>

            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                Scroll Down
              </span>
              <span className="text-[10px] font-black text-[#343A40] uppercase tracking-widest">
                To Discover
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 relative flex justify-center lg:justify-end">
          <div className="relative w-full aspect-square max-w-[350px] border-2 border-black rounded-[4rem] flex items-center justify-center p-4">
            <div className="w-full h-full border border-dashed border-gray-200 rounded-[3.5rem] flex items-center justify-center">
              <div className="flex flex-col items-center">
                <span className="text-[80px] font-black text-black leading-none">
                  TC
                </span>
                <div className="h-1 w-12 bg-[#0056B3] mt-2"></div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-[#0056B3] text-white p-6 rounded-3xl shadow-2xl">
              <p className="text-[10px] font-black tracking-[0.2em] uppercase">
                Premium <br /> Quality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
