import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  staticPageGenerationTimeout: 600, // 10 minutes per page
  experimental: {
    workerThreads: false,
    cpus: 1, // single worker avoids parallel WP API hammering
  },
};

export default nextConfig;
