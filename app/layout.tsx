import "./globals.css";
import ReduxProvider from "./this/providers/redux-provider";
import NextThemeProvider from "./this/providers/theme-provider";
import TranslateProvider from "./this/providers/translate-provider";
import { Toaster } from "@/components/ui/toaster"

import { Onest } from 'next/font/google';

const onest = Onest({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-onest',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className={onest.variable}>
      <body className={onest.className}>
        <ReduxProvider>
          <NextThemeProvider> 
            <TranslateProvider>
              {children}
              <Toaster/>
            </TranslateProvider>
          </NextThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
