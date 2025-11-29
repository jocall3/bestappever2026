/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React's Strict Mode to help identify potential problems in an application.
  // It activates additional checks and warnings for its descendants.
  reactStrictMode: true,

  // Enable SWC minification for faster builds.
  swcMinify: true,

  // Compiler options for Next.js.
  compiler: {
    // Optionally remove console.log statements from production builds for cleaner output and potential performance gains.
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Output 'standalone' creates an optimized build output for deployment with Docker.
  // It automatically copies only the necessary files for a production deployment.
  output: 'standalone',

  // Experimental features that might be useful for a large-scale application.
  experimental: {
    // Allows Next.js to trace the files that are needed for a standalone build,
    // which helps in creating a smaller and more efficient Docker image.
    outputFileTracing: true,

    // If using ESM in server components and external packages, this might be needed.
    // serverComponentsExternalPackages: [],
  },

  // Image optimization configuration.
  images: {
    // Define remote patterns to allow image optimization for images from external URLs.
    // This is crucial for applications that fetch images from CDNs or third-party services.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Example: Unsplash for demo content
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Example: Placeholder service
        port: '',
        pathname: '/**',
      },
      // Add other remote image hosts as needed for your application.
      // Example for an internal CDN or S3 bucket:
      // {
      //   protocol: 'https',
      //   hostname: 'my-cdn.example.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },

  // Environment variables that should be available to the browser and server.
  // Prefixing with NEXT_PUBLIC_ makes them available on the client-side.
  env: {
    // Example: API URL
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
    // Example: Feature flag
    NEXT_PUBLIC_FEATURE_X_ENABLED: process.env.NEXT_PUBLIC_FEATURE_X_ENABLED || 'false',
  },

  // In a monorepo, this is essential to transpile packages located outside the `web` app's node_modules.
  // This ensures that packages from other workspaces (e.g., shared UI components, utility libraries)
  // are correctly processed by Next.js's build system.
  transpilePackages: [
    '@bestappever2026/ui', // Example: A shared UI component library
    '@bestappever2026/utils', // Example: Shared utility functions
    '@bestappever2026/config', // Example: Shared configuration
    // Add any other internal packages that need to be transpiled here.
  ],

  // Asynchronous webpack configuration.
  // This allows for custom webpack loaders, plugins, or modifications to the build process.
  // Useful for specific optimizations or integrating with unique build tools.
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Example: Add a custom plugin or rule here.
    // config.plugins.push(new MyCustomWebpackPlugin());

    // Important: return the modified config.
    return config;
  },
};

export default nextConfig;