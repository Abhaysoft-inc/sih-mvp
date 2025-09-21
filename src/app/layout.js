import "./globals.css";
import { Nunito } from 'next/font/google';
import { TranslationProvider } from '@/translations/TranslationContext';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sans-nunito',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

export const metadata = {
  title: "FRA Claims Surveyor",
  description: "Field Officer app for registering FRA claims offline",
  // manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FRA Surveyor",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FRA Surveyor" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${nunito.variable} font-sans antialiased`} style={{ backgroundColor: 'hsl(0 0% 100%)', color: 'hsl(222.2 84% 4.9%)' }}>
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
