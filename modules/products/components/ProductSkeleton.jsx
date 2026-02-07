"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-3xl p-4 duration-300 shadow-2xl h-full flex flex-col">
      {/* Header badges */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full h-48 mb-6 overflow-hidden flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-2xl" />
      </div>

      {/* Title and colors */}
      <div className="flex flex-col flex-grow space-y-3">
        <Skeleton className="h-5 w-3/4" />
        
        {/* Color dots */}
        <div className="flex gap-1.5">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="w-3 h-3 rounded-full" />
        </div>

        {/* Price */}
        <div className="pt-2 flex flex-col gap-4 mt-auto">
          <div className="flex flex-col">
            <Skeleton className="h-3 w-12 mb-2" />
            <Skeleton className="h-7 w-24" />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="w-full mt-4">
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

