import Container from "@/components/custom/container";
import React from "react";
import StructuredData from "@/components/seo/StructuredData";
import { generateStoreStructuredData } from "@/lib/seo";

export const metadata = {
  title: "Store | Techno",
  description:
    "Browse the latest tech at Techno Store. Shop high-end smartphones, powerful laptops, and premium accessories. Compare top brands, enjoy official warranties, and get fast delivery on every order.",
  alternates: {
    canonical: "/store",
  },
};

export default function layout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const storeData = generateStoreStructuredData(baseUrl);

  return (
    <div>
      <StructuredData data={storeData} />
      <Container>{children}</Container>
    </div>
  );
}
