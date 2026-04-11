import type { Metadata } from "next";
import { Bebas_Neue, Work_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const headingFont = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grip Safe Industries | Exporter of Boxing, Sports & Workwear",
  description:
    "Grip Safe Industries manufactures and exports boxing gear, sportswear, streetwear, and safety workwear for global buyers.",
  metadataBase: new URL("https://gripsafeindustries.com"),
  keywords: [
    "boxing gloves manufacturer",
    "sportswear exporter",
    "sialkot manufacturer",
    "safety workwear supplier",
    "private label apparel",
    "motorbike gear exporter",
  ],
  openGraph: {
    title: "Grip Safe Industries | Trusted Export Manufacturing",
    description:
      "Manufacturer and exporter of premium boxing gear, sports uniforms, streetwear, and workwear.",
    url: "https://gripsafeindustries.com",
    siteName: "Grip Safe Industries",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grip Safe Industries",
    description: "Export-quality boxing, sportswear, and safety workwear manufacturing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="site-header">
          <div className="site-shell nav-wrap">
            <Link href="/" className="brand-mark" aria-label="Grip Safe Industries homepage">
              Grip Safe Industries
            </Link>
            <nav className="nav-links" aria-label="Main navigation">
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
              <Link href="/contact">Contact</Link>
              <a href="https://gripsafeindustries.trustpass.alibaba.com/" target="_blank" rel="noreferrer">
                Alibaba Store
              </a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="site-shell footer-wrap">
            <p>Export-ready manufacturing from Sialkot, Pakistan.</p>
            <p>info@gripsafeindustries.com | +92 316 7249098</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
