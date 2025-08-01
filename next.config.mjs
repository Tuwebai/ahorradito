/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de ESLint y TypeScript para producción
  eslint: {
    ignoreDuringBuilds: false, // Cambiar a false para producción
  },
  typescript: {
    ignoreBuildErrors: false, // Cambiar a false para producción
  },
  
  // Optimización de imágenes
  images: {
    unoptimized: false, // Habilitar optimización de imágenes
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configuración de compresión
  compress: true,

  // Configuración de headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Configuración de redirecciones
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Configuración de rewrites (si necesitas proxy a APIs)
  async rewrites() {
    return []
  },

  // Configuración de experimental features
  experimental: {
    optimizeCss: false, // Deshabilitado para evitar error con critters
    optimizePackageImports: ['lucide-react'],
  },

  // Configuración de webpack para optimización
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones solo para producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }

    return config
  },

  // Configuración de output
  output: 'standalone',

  // Configuración de trailing slash
  trailingSlash: false,

  // Configuración de base path (si es necesario)
  basePath: '',

  // Configuración de asset prefix (si es necesario)
  assetPrefix: '',

  // Configuración de powered by header
  poweredByHeader: false,
}

export default nextConfig
