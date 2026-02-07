import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: `${product.title} - Techno Shop`,
    description: product.description || `Buy ${product.title} at Techno Shop. Premium quality, original warranty, fast delivery.`,
    keywords: [
      product.title,
      product.category,
      "tech",
      "electronics",
      "premium",
      "warranty",
    ],
    alternates: {
      canonical: `${baseUrl}/store/${product.id}`,
    },
    openGraph: {
      title: `${product.title} - Techno Shop`,
      description: product.description || `Buy ${product.title} at Techno Shop.`,
      type: "product",
      url: `${baseUrl}/store/${product.id}`,
      images: [
        {
          url: product.img,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      siteName: "Techno Shop",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - Techno Shop`,
      description: product.description || `Buy ${product.title} at Techno Shop.`,
      images: [product.img],
    },
  };
}

