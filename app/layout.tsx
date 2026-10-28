import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "MOSQUE ATLAS 3D", template: "%s · MOSQUE ATLAS 3D" },
  description: "A multilingual, evidence-linked atlas of mosque architecture and heritage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
