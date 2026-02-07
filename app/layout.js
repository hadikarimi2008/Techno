import "./globals.css";
import { Inter } from "next/font/google";

import Container from "@/components/custom/container";
import Header from "@/components/custom/header";
import Footer from "@/components/custom/footer";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "./provider/ReactQuery";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Techno Shop - Premium Tech Store",
    template: "%s | Techno Shop",
  },
  description:
    "Explore Techno: Your ultimate hub for the latest smartphones, laptops, tablets, and premium gadgets. High-quality tech, original warranty, and fast delivery in one place.",
  keywords: [
    "smartphones",
    "laptops",
    "tablets",
    "watches",
    "tech store",
    "electronics",
    "gadgets",
    "premium tech",
  ],
  authors: [{ name: "Techno Shop" }],
  creator: "Techno Shop",
  publisher: "Techno Shop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Techno Shop",
    title: "Techno Shop - Premium Tech Store",
    description:
      "Explore Techno: Your ultimate hub for the latest smartphones, laptops, tablets, and premium gadgets.",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Techno Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Techno Shop - Premium Tech Store",
    description:
      "Explore Techno: Your ultimate hub for the latest smartphones, laptops, tablets, and premium gadgets.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#343A40" />
        <link rel="canonical" href={baseUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#0f172a",
              colorText: "#1e293b",
              borderRadius: "1.25rem",
              fontFamily: "inherit",
            },
            elements: {
              formButtonPrimary:
                "bg-slate-900 hover:bg-black border-none transition-all duration-300 shadow-lg shadow-slate-200",
              card: "shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100",
              formFieldInput:
                "border-slate-200 focus:border-slate-900 focus:ring-slate-900 transition-all",
              userButtonAvatarBox: "rounded-xl",
              userButtonPopoverCard: "rounded-3xl border-slate-100 shadow-2xl",
            },
          }}
        >
          <ReactQueryProvider>
            <CartProvider>
              <Header />
              <Container>
                {children}
                <Toaster />
              </Container>
              <Footer />
            </CartProvider>
          </ReactQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
