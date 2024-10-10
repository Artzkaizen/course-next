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
      allowedOrigins: [
        "v2cfgrg0-3000.euw.devtunnels.ms",
        "localhost:3000",
        "staging.b-trend.digital",
        "course-next.onrender.com",
      ],
    },
  },
};

export default config;
