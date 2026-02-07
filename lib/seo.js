// SEO Helper Functions

export function generateProductStructuredData(product, baseUrl) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.img,
    brand: {
      "@type": "Brand",
      name: "Techno Shop",
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/store/${product.id}`,
      priceCurrency: "USD",
      price: product.price,
      availability: product.quantity > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Techno Shop",
      },
    },
    aggregateRating: product.rate
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rate,
          reviewCount: 1,
        }
      : undefined,
  };
}

export function generateWebsiteStructuredData(baseUrl) {
  return {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Techno Shop",
    url: baseUrl,
    description:
      "Explore Techno: Your ultimate hub for the latest smartphones, laptops, tablets, and premium gadgets.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/store?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationStructuredData(baseUrl) {
  return {
    "@context": "https://schema.org/",
    "@type": "Organization",
    name: "Techno Shop",
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    description:
      "Premium tech store offering the latest smartphones, laptops, tablets, and gadgets with original warranty and fast delivery.",
    sameAs: [
      // Add your social media links here when available
      // "https://www.facebook.com/technoshop",
      // "https://www.twitter.com/technoshop",
      // "https://www.instagram.com/technoshop",
    ],
  };
}

export function generateBreadcrumbStructuredData(items, baseUrl) {
  return {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function generateStoreStructuredData(baseUrl) {
  return {
    "@context": "https://schema.org/",
    "@type": "Store",
    name: "Techno Shop",
    image: `${baseUrl}/icon.png`,
    description:
      "Premium tech store offering the latest smartphones, laptops, tablets, and gadgets.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    priceRange: "$$",
  };
}

