import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panaversity Research - AI, Robotics & Agentic Intelligence",
  description: "Leading research in artificial intelligence, robotics, and agentic systems. Explore cutting-edge AI research, tools, and publications.",
  keywords: ["AI Research", "Agentic AI", "Machine Learning", "Robotics", "Artificial Intelligence", "Research Papers", "AI Tools"],
  authors: [{ name: "Panaversity Research Team" }],
  creator: "Panaversity Research",
  publisher: "Panaversity Research",
  robots: "index, follow",
  openGraph: {
    title: "Panaversity Research - AI, Robotics & Agentic Intelligence",
    description: "Leading research in artificial intelligence, robotics, and agentic systems.",
    url: "https://research.panaversity.org",
    siteName: "Panaversity Research",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Panaversity Research - AI, Robotics & Agentic Intelligence",
    description: "Leading research in artificial intelligence, robotics, and agentic systems.",
  },
  alternates: {
    canonical: "https://research.panaversity.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  Panaversity Research
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Blog
                </Link>
                <Link href="/research" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Research
                </Link>
                <Link href="/admin" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
