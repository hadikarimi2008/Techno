"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, ShieldCheck, Zap } from "lucide-react";
import React from "react";

const blockVariants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  hiddenUp: { opacity: 0, y: -100 },
  hiddenDown: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutSection() {
  return (
    <section className="pt-20 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[6%] md:px-[4%]">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
          <motion.div
            variants={blockVariants}
            initial="hiddenLeft"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-2 md:row-span-2 bg-[#F8F9FA] rounded-[3rem] p-10 flex flex-col justify-between border border-gray-50"
          >
            <div className="bg-[#0056B3] w-14 h-14 rounded-2xl flex items-center justify-center text-white">
              <Cpu size={30} />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-[#343A40] tracking-tighter leading-none mb-6">
                TECHNO <br /> <span className="text-gray-500">EVOLUTION.</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
                We bridge the gap between world-class innovation and your daily
                digital lifestyle. Not just a store, but a curated tech
                ecosystem.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={blockVariants}
            initial="hiddenUp"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-2 bg-[#343A40] rounded-[3rem] p-10 flex flex-col justify-between text-white relative overflow-hidden"
          >
            <Zap className="absolute right-[-20px] top-[-20px] w-40 h-40 opacity-10 text-white" />
            <h3 className="text-2xl font-black tracking-tight relative z-10">
              FASTEST <br /> DELIVERY
            </h3>
            <p className="text-gray-400 text-sm relative z-10">
              Your tech reaches you in record time, anywhere.
            </p>
          </motion.div>

          <motion.div
            variants={blockVariants}
            initial="hiddenDown"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-1 bg-[#0056B3] rounded-[3rem] p-8 flex flex-col justify-between text-white"
          >
            <ShieldCheck size={35} />
            <h3 className="text-xl font-bold tracking-tight mt-4">
              100% <br /> ORIGINAL
            </h3>
          </motion.div>

          <motion.div
            variants={blockVariants}
            initial="hiddenRight"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-1 bg-gray-100 rounded-[3rem] p-8 flex flex-col justify-between border border-gray-200"
          >
            <Globe size={35} className="text-[#343A40]" />
            <h3 className="text-xl font-bold tracking-tight text-[#343A40] mt-4">
              GLOBAL <br /> SUPPORT
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
