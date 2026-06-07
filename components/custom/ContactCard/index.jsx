"use client";

import { motion } from "framer-motion";
import React from "react";
import { CardImage } from "./components/Card";
import imagePhone from "@/public/contact-image/contact-image-phone.jpg" 
import imageEmail from "@/public/contact-image/contact-image-email.webp" 
import imageOffice from "@/public/contact-image/contact-image-office.jpg" 

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ContactCard() {
  const data = [
    {
      title: "Phone Number",
      description: "+1 (212) 555-0187",
      image: imagePhone,
    },
    {
      title: "Email Address",
      description: "contact@company.com",
      image: imageEmail,
    },
    {
      title: "Office Address",
      description: "350 5th Ave, New York, NY 10118, USA",
      image: imageOffice,
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[6%] md:px-[4%]">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-5">
            <span className="h-2 w-2 rounded-full bg-[#0056B3]" />
            <span className="text-[10px] font-black tracking-[0.2em] text-[#343A40] uppercase">
              Get In Touch
            </span>
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#343A40] tracking-tighter">
            CONTACT <span className="text-[#0056B3]">US.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {data.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <CardImage
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
