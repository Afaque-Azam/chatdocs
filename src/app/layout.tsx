import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "ChatDoc – Chat with Your PDFs Instantly",
  description: "Upload your PDFs and talk to them like a friend. ChatDoc turns long documents into smart conversations.",
  keywords: "ChatDoc, PDF chatbot, Chat with PDF, AI PDF, PDF summarizer, AI document assistant, Research helper, PDF question answer, smart document reader",
  openGraph: {
    title: "ChatDoc – Chat with Your PDFs Instantly",
    description: "No more endless scrolling. Just upload your PDF and ask anything. Perfect for students, researchers, and professionals.",
    url: "https://chatdocs.vercel.app", // ✅ Replace with your actual domain
    siteName: "ChatDoc",
    images: [
      {
        url: "https://chatdocs.vercel.app/og-image.png", // ✅ Replace with your OG image
        width: 1200,
        height: 630,
        alt: "ChatDoc AI – Chat with PDF Instantly",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatDoc – Chat with PDF Instantly",
    description: "Talk to your documents like never before. Upload, ask, done.",
    images: ["https://chatdoc.ai/og-image.jpg"], // ✅ Replace with image
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* 🔍 SEO & Identity */}
          <meta name="robots" content="index, follow" />
          <meta name="google-site-verification" content="G2swBI0MBGznGNU4S18HR_g2urdYQdP1KsL0fGd7-sM" />
          <meta name="publisher" content="Arpit Agrahari" />
          <meta name="author" content="Arpit Agrahari" />
          <meta name="theme-color" content="#0f172a" />
          <link rel="canonical" href="https://chatdoc.ai" />

          {/* 🔗 Favicon */}
          <link rel="icon" href="/favicon.png" sizes="any" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />

          {/* 🔍 Open Graph Tags */}
          <meta property="og:title" content="ChatDoc – Chat with Your PDFs Instantly" />
          <meta property="og:description" content="Upload your PDFs and talk to them like a friend. ChatDoc turns long documents into smart conversations." />
          <meta property="og:image" content="/favicon.png" />
          <meta property="og:url" content="https://chatdoc.ai" />
          <meta property="og:type" content="website" />

          {/* 🐦 Twitter Meta */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="ChatDoc – Chat with PDF Instantly" />
          <meta name="twitter:description" content="Talk to your documents like never before. Upload, ask, done." />
          <meta name="twitter:image" content="/favicon.png" />

          <title>ChatDoc – Chat with Your PDFs Instantly</title>
        </head>
        <body className="bg-background text-foreground font-sans">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
