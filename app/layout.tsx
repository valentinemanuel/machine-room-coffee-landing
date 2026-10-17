import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://machineroom.coffee"),
  title: "Machine Room Coffee | Roastery and espresso bar on Foundry Row",
  description:
    "A fictional coffee shop landing page demo. Weekly house roasting, espresso pulled by hand on a restored 1974 lever machine, warm tables all afternoon. Reserve a table or the Saturday roastery tour.",
  openGraph: {
    title: "Machine Room Coffee",
    description:
      "Weekly house roasting and hand pulled espresso on a restored 1974 lever machine. Reserve a table on Foundry Row.",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 800, alt: "The Machine Room espresso bar counter at dusk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Machine Room Coffee",
    description: "Roastery and espresso bar on Foundry Row. Reserve a table.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
