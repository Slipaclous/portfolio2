import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";
import { Providers } from "@/components/Providers";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Mon portfolio personnel',
  icons: {
    icon: [
      { url: 'images/favicon.ico' },
      { url: 'images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: 'images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <meta name="google-site-verification" content="X3XaMATl8UlFkcSJu2vNjuEKWI-nMdEX-QVhaz9ehPI" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div className="flex min-h-screen">
            <div className="dark">
              <Sidebar />
              <MobileNav />
            </div>
            <main className="flex-1 md:ml-64 p-8 bg-background">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}