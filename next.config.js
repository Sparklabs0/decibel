/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['aws-amplify'],
  outputFileTracing: {
    // If true, trace the entire application.
    // If false, trace only serverless functions.
    // If not present, Next.js will automatically decide what to trace.
    traceNextPages: true,
  },
}

module.exports = nextConfig
