
import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*' },
    ],
  },
  redirects() {
    return Promise.resolve([
      {
        source: '/',
        destination: '/tracks',
        permanent: false,
      },
    ]);
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  productionBrowserSourceMaps: true,
}

export default withBundleAnalyzer(nextConfig)
