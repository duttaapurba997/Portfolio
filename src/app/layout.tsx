import type { Metadata } from "next";
import "./globals.css";
import { SmoothAnchors } from "@/components/smooth-anchors";

export const metadata: Metadata = {
  title: {
    default: "Apurba Dutta — Senior Graphic Designer",
    template: "%s — Apurba Dutta",
  },
  description:
    "Apurba Dutta (Eden) — Senior Graphic Designer at Swiggy. Branding, campaigns, UI/UX and illustration for brands that want to be remembered. Available for freelance & full-time.",
  openGraph: {
    title: "Apurba Dutta — Senior Graphic Designer",
    description:
      "Branding, campaigns, UI/UX and illustration. Available for freelance & full-time.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothAnchors />
        {children}
      </body>
    </html>
  );
}