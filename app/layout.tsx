import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Ahorradito - Comparador de Precios de Supermercados",
    template: "%s | Ahorradito"
  },
  description: "Compará precios de supermercados y ahorrá en tus compras. Encontrá las mejores ofertas en productos de tu ciudad con nuestro comparador inteligente.",
  keywords: [
    "comparador de precios",
    "supermercados",
    "ahorro",
    "precios",
    "argentina",
    "compras",
    "oferta",
    "descuentos"
  ],
  authors: [{ name: "Ahorradito Team" }],
  creator: "Ahorradito",
  publisher: "Ahorradito",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ahorradito.com.ar"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://ahorradito.com.ar",
    title: "Ahorradito - Comparador de Precios de Supermercados",
    description: "Compará precios de supermercados y ahorrá en tus compras. Encontrá las mejores ofertas en productos de tu ciudad.",
    siteName: "Ahorradito",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahorradito - Comparador de Precios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahorradito - Comparador de Precios de Supermercados",
    description: "Compará precios de supermercados y ahorrá en tus compras.",
    images: ["/og-image.png"],
    creator: "@ahorradito",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tu-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0F1117" />
        <meta name="msapplication-TileColor" content="#0F1117" />
        
        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Ahorradito",
              "description": "Comparador de precios de supermercados para ahorrar en tus compras",
              "url": "https://ahorradito.com.ar",
              "applicationCategory": "ShoppingApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "ARS"
              },
              "author": {
                "@type": "Organization",
                "name": "Ahorradito Team"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
