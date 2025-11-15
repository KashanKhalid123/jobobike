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
  title: 'JOBOBIKE Norge | Premium El-sykler - Gratis Frakt',
  description: 'Norges ledende leverandør av premium el-sykler. Over 300 partnere i Europa, 50.000+ solgte sykler. Gratis frakt, 2 års garanti. Fatbike, lastesykkel og pendlersykler.',
  keywords: 'el-sykkel, elektrisk sykkel, jobobike, fatbike, lastesykkel, pendlersykkel, norge, gratis frakt, el-sykkel norge, elektrisk transport',
  authors: [{ name: 'JOBOBIKE Norge' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  icons: {
    icon: '/images/favicon.jpg',
  },
  openGraph: {
    title: 'JOBOBIKE Norge - Premium El-sykler med Gratis Frakt',
    description: 'Norges største utvalg av premium el-sykler. 300+ partnere i Europa, gratis frakt til hele Norge.',
    type: 'website',
    url: 'https://jobobike.no',
    siteName: 'JOBOBIKE Norge',
    locale: 'nb_NO',
    images: [
      {
        url: '/images/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'JOBOBIKE Premium El-sykler Norge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JOBOBIKE Norge - Premium El-sykler',
    description: 'Norges største utvalg av premium el-sykler. Gratis frakt til hele Norge.',
    images: ['/images/banner.jpg'],
  },
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
        <link rel="canonical" href="https://jobobike.no" />
        <meta name="geo.region" content="NO" />
        <meta name="geo.placename" content="Norge" />
        <meta name="language" content="Norwegian" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
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
          <div className="mt-32 md:mt-36">
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
