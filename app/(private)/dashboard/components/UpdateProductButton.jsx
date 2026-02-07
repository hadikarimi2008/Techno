"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import React from "react";

export default function UpdateProductButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="w-10 h-10 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
    >
      <Edit className="w-4 h-4" />
    </Button>
  );
}
