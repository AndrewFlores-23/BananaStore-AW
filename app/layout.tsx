import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] });
export const metadata: Metadata = {
  metadataBase: new URL('https://andrewflores-23.github.io/BananaStore-AW/'),
  title: 'Banana Store | Tu estilo, sin complicaciones',
  description: 'Moda para hombre y mujer con una selección fresca, alegre y versátil.',
  openGraph: {
    title: 'Banana Store | Tu estilo, sin complicaciones',
    description: 'Prendas frescas, versátiles y con mucha actitud.',
    url: 'https://andrewflores-23.github.io/BananaStore-AW/',
    images: [{ url: 'https://andrewflores-23.github.io/BananaStore-AW/og.png', width: 1200, height: 630, alt: 'Banana Store — Tu estilo. Sin complicaciones.' }],
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banana Store | Tu estilo, sin complicaciones',
    description: 'Prendas frescas, versátiles y con mucha actitud.',
    images: ['https://andrewflores-23.github.io/BananaStore-AW/og.png'],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body className={outfit.variable}>{children}</body></html>; }
