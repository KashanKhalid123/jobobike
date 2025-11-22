import type { Metadata } from 'next';
import { Anton, Inter , Roboto_Condensed } from 'next/font/google'
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartContext';
import PromoButton from '@/components/PromoButton';
import PromotionalGiftBox from '@/components/PromotionalGiftBox';


const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"], // you can add more if needed
  variable: "--font-roboto-condensed",
});

// Configure Anton font for headings/branding
const anton = Anton({
  subsets: ['latin'],
  weight: '400', // Anton only has one weight
  variable: '--font-anton',
  display: 'swap',
})

// Configure Inter for body text (similar to Anton Sport's clean look)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'JOBOBIKE Norge | Premium El-sykler - Gratis Frakt',
    template: '%s | JOBOBIKE Norge'
  },
  description: 'Norges ledende leverandør av premium el-sykler. Over 300 partnere i Europa, 50.000+ solgte sykler. Gratis frakt, 2 års garanti. Fatbike, lastesykkel og pendlersykler.',
  keywords: 'el-sykkel, elektrisk sykkel, jobobike, fatbike, lastesykkel, pendlersykkel, norge, gratis frakt, el-sykkel norge, elektrisk transport, ebike, electric bike',
  authors: [{ name: 'JOBOBIKE Norge', url: 'https://jobobike.no' }],
  creator: 'JOBOBIKE Norge',
  publisher: 'JOBOBIKE Norge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jobobike.no'),
  alternates: {
    canonical: '/',
    languages: {
      'nb-NO': '/',
      'en-US': '/en',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://jobobike.no',
    siteName: 'JOBOBIKE Norge',
    title: 'JOBOBIKE Norge - Premium El-sykler med Gratis Frakt',
    description: 'Norges største utvalg av premium el-sykler. 300+ partnere i Europa, gratis frakt til hele Norge. Fatbike, lastesykkel og pendlersykler.',
    images: [
      {
        url: '/images/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'JOBOBIKE Premium El-sykler Norge - Fatbike og Lastesykkel',
        type: 'image/jpeg',
      },
      {
        url: '/images/logo.jpg',
        width: 800,
        height: 600,
        alt: 'JOBOBIKE Norge Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jobobike',
    creator: '@jobobike',
    title: 'JOBOBIKE Norge - Premium El-sykler',
    description: 'Norges største utvalg av premium el-sykler. Gratis frakt til hele Norge.',
    images: {
      url: '/images/banner.jpg',
      alt: 'JOBOBIKE Premium El-sykler Norge',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#12b190" />
        <meta name="msapplication-TileColor" content="#12b190" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="canonical" href="https://jobobike.no" />
        <meta name="geo.region" content="NO" />
        <meta name="geo.placename" content="Norge" />
        <meta name="language" content="Norwegian" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="JOBOBIKE" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="JOBOBIKE Norge" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "JOBOBIKE Norge",
              "url": "https://jobobike.no",
              "logo": "https://jobobike.no/images/logo.jpg",
              "description": "Norges ledende leverandør av premium el-sykler. Over 300 partnere i Europa, 50.000+ solgte sykler.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NO",
                "addressLocality": "Norge"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "Norwegian"
              },
              "sameAs": [
                "https://facebook.com/jobobike",
                "https://instagram.com/jobobike",
                "https://twitter.com/jobobike"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "El-sykler",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Premium El-sykler",
                      "category": "Electric Bicycles"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Analytics - Replace with your tracking codes */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> */}
      </head>
      <body className={` ${robotoCondensed.variable} ${anton.variable} ${inter.variable}`}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-4 z-50"
        >
          Skip to main content
        </a>
        
        <div id="main-content">
         <CartProvider>
          <Navbar />
          <div className="mt-24 md:mt-32 lg:mt-36">
            {children}
          </div>
          </CartProvider>
        </div>
        
        {/* Global scripts can be added here */}
        <Footer />
        <PromotionalGiftBox />
      </body>
    </html>
  );
}
