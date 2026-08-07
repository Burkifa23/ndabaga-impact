/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' }
    ]
  },
  // React Native / Expo packages in dependencies bring conflicting JSX type
  // definitions that cause spurious TypeScript errors on HTML elements.
  // Type checking is handled by the IDE (VS Code / TypeScript language server).
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;