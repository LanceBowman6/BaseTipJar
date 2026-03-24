import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "BaseTipJar - Send Tips on Base",
  description: "Send tips with messages on Base blockchain",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  icons: {
    icon: "/icon.png",
  },
  other: {
    "base:app_id": "69c0b6c73beb94a927e63d57",
  },
  openGraph: {
    title: "BaseTipJar",
    description: "Send tips with messages on Base blockchain",
    images: ["/screenshot.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69c0b6c73beb94a927e63d57" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
