/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    // Enable the experimental feature to trust the proxy headers
    serverActions: {
      // allowedForwardedHosts: ['localhost'],
      allowedOrigins: [
        "https://v2cfgrg0-3000.euw.devtunnels.ms",
        "https://staging.b-trend.digital",
      ],
    },
  },
};

export default config;
