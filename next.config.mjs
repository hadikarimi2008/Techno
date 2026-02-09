/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // برای رفع هشدار quality=80 باید کیفیت ۸۰ را اینجا مجاز کنیم
    qualities: [75, 80],
  },
};

export default nextConfig;
