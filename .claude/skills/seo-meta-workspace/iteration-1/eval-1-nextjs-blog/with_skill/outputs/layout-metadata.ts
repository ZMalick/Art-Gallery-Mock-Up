import { Metadata } from "next";

// Root layout metadata — provides defaults for all pages
export const metadata: Metadata = {
  metadataBase: new URL("https://devblog.example.com"),
  title: {
    default: "DevBlog",
    template: "%s — DevBlog",
  },
  description: "Developer blog covering programming tutorials, best practices, and tech insights.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devblog.example.com",
    siteName: "DevBlog",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "DevBlog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    // Add your Twitter handle if you have one:
    // creator: "@devblog",
    // site: "@devblog",
  },
  robots: {
    index: true,
    follow: true,
  },
};
