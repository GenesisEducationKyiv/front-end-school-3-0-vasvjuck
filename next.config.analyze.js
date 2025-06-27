const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  reportFilename: './bundle-analysis.html',
});

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*' },
    ],
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/tracks',
        permanent: false,
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  productionBrowserSourceMaps: true,
};

module.exports = withBundleAnalyzer(nextConfig); 