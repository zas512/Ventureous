import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import { FooterServer, FooterSkeleton } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { getNavigationData } from "@/lib/navigation";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans"
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const nav = await getNavigationData();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers>
          <Navbar navbarData={nav.navbarData} settingsData={nav.settingsData} />
          {children}
          <Suspense fallback={<FooterSkeleton />}>
            <FooterServer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
