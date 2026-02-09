import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import img1 from "./image/image-1.jpg";
import img2 from "./image/image-2.jpg";
import img3 from "./image/image-3.jpg";
import Image from "next/image";

export function Banner() {
  return (
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
                    // جلوگیری از دانلود تصویر پهنای کامل روی موبایل
                    sizes="(min-width: 1024px) 900px, (min-width: 768px) 700px, 100vw"
                    className="w-full h-auto object-contain rounded-lg"
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
  );
}
