import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [85],
  },
  
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://lancamentos.sanremoimoveis.com.br',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
