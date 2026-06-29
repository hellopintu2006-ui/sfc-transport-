import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { SEO_CONFIG } from "@/config/seo.config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollSectionProgress from "@/components/layout/ScrollSectionProgress";
import { ToastContainer } from "@/shared/ui/Toast";
import PageWrapper from "@/components/layout/PageWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  openGraph: SEO_CONFIG.openGraph,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-text-primary" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          <PageWrapper>{children}</PageWrapper>
        </main>
        <Footer />
        <ScrollSectionProgress />
        <ToastContainer />
      </body>
    </html>
  );
}
