"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

import img1 from "./image/image-1.jpg";
import img2 from "./image/image-2.jpg";
import img3 from "./image/image-3.jpg";
import Image from "next/image";

export function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 1.3,
        ease: [0.22, 1, 0.36, 1], 
      }}
    >
      <Carousel opts={{ loop: true }} className="w-full mx-auto mb-5">
        <CarouselContent>
          {[img1, img2, img3].map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="border-none shadow-none bg-transparent">
                  <CardContent className="flex items-center justify-center p-0">
                    <Image
                      src={image}
                      alt={`Banner ${index + 1}`}
                      priority={index === 0}
                      sizes="(min-width: 1024px) 900px, (min-width: 768px) 700px, 100vw"
                      className="w-full h-auto object-contain rounded-lg shadow-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </motion.div>
  );
}
