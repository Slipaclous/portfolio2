import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/components/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gauthier Minor | Web Developer',
  description: 'Professional portfolio of Gauthier Minor, Web Developer',
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LanguageProvider>
            <div className="flex min-h-screen">
              <div className="dark">
                <Sidebar />
                <MobileNav />
              </div>
              <main className="flex-1 md:ml-64 p-8 bg-background">
                {children}
              </main>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}