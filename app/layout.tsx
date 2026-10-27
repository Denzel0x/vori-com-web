import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://invorious.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Invorious Software Agency — Custom Software & Web3 Development",
    template: "%s — Invorious Software Agency",
  },
  description:
    "Invorious builds tailored web, mobile and blockchain software, delivered by a fully remote team working from all over the world. Technology consulting, Web2 apps and Web3 development.",
  keywords: [
    "custom software development",
    "web3 development agency",
    "blockchain development",
    "technology consulting",
    "fully remote software team",
    "Sydney software agency",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "Invorious Software Agency",
    title: "Invorious Software Agency — Custom Software & Web3 Development",
    description:
      "Tailored software solutions across technology consulting, Web2 and Web3, delivered by a fully remote team worldwide.",
    images: [{ url: "/brand/cover.jpg", width: 1128, height: 191 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invorious Software Agency — Custom Software & Web3 Development",
    description: "Tailored software solutions across technology consulting, Web2 and Web3.",
    images: ["/brand/cover.jpg"],
  },
  robots: { index: true, follow: true },
};

// Dark is the default; only an explicit "light" choice is applied before first paint.
const themeScript = `(function(){try{if(localStorage.getItem('invorious-theme')==='light')document.documentElement.classList.add('light');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <CursorTrail />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-base"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
