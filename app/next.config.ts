import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // App ini seluruhnya dinamis (data per-rumah, per-user) — Cache Components
  // nggak relevan dan cuma nambah ribet Suspense di tiap halaman.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
