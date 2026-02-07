import AboutSection from "@/components/custom/about";
import { Banner } from "@/components/custom/banner";
import RandomProducts from "@/components/custom/SuggestionProduct";
import Welcome from "@/components/custom/welcome";
import StructuredData from "@/components/seo/StructuredData";
import {
  generateWebsiteStructuredData,
  generateOrganizationStructuredData,
} from "@/lib/seo";

export const metadata = {
  title: "Techno Shop",
  description:
    "Explore Techno: Your ultimate hub for the latest smartphones, laptops, and premium gadgets. High-quality tech, original warranty, and fast delivery in one place.",
};

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const websiteData = generateWebsiteStructuredData(baseUrl);
  const organizationData = generateOrganizationStructuredData(baseUrl);

  return (
    <>
      <StructuredData data={websiteData} />
      <StructuredData data={organizationData} />
      <Welcome />
      <Banner />
      <AboutSection />
      <RandomProducts />
    </>
  );
}
