import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ['mapbox-gl', 'react-map-gl'],
};

export default nextConfig;
