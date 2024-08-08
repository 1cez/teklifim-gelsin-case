/** @type {import('next').NextConfig} */

import path from "path";

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
  async rewrites() {
    return [
      {
        source: "/api/cocktails/:path*",
        destination: "https://www.thecocktaildb.com/api/json/v1/1/:path*",
      },
    ];
  },
};

export default nextConfig;
