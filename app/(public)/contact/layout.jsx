import React from "react";
import StructuredData from "@/components/seo/StructuredData";
import { generateStoreStructuredData } from "@/lib/seo";

export const metadata = {
  title: "Contact Us",
  description:
    "Have a question or need assistance? Get in touch with our team today. We're here to help with product inquiries, order support, and any other requests. Reach out through phone, email, or our contact form, and we'll get back to you as soon as possible.",
  alternates: {
    canonical: "/contact",
  },
};

export default function layout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const storeData = generateStoreStructuredData(baseUrl);
  return (
    <div>
      <StructuredData data={storeData} />
      {children}
    </div>
  );
}
