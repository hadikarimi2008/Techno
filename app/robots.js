export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/sign-in/", "/sign-up/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

