import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] });
const socialImage = 'https://andrewflores-23.github.io/BananaStore-AW/og.png?v=2';

export const metadata: Metadata = {
  metadataBase: new URL('https://andrewflores-23.github.io/BananaStore-AW/'),
  title: 'Banana Store | Tu estilo, sin complicaciones',
  description: 'Moda para hombre y mujer en Huacas, Guanacaste. Prendas frescas, alegres y fáciles de combinar.',
  openGraph: {
    title: 'Banana Store | Tu estilo, sin complicaciones',
    description: 'Moda con color para hombre y mujer en Huacas, Guanacaste.',
    url: 'https://andrewflores-23.github.io/BananaStore-AW/',
    siteName: 'Banana Store',
    images: [{ url: socialImage, width: 1200, height: 630, alt: 'Banana Store — Tu estilo. Sin complicaciones.', type: 'image/png' }],
    locale: 'es_CR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banana Store | Tu estilo, sin complicaciones',
    description: 'Moda con color para hombre y mujer en Huacas, Guanacaste.',
    images: [socialImage],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body className={outfit.variable}>{children}</body></html>; }
