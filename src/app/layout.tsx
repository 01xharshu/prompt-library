import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PromptLib | Copy. Paste. Generate.",
  description: "Accelerate your AI workflows with our beautifully designed collection of copy-pasteable production-ready prompts.",
  keywords: ["prompt engineering", "ai prompts", "chatgpt prompts", "midjourney", "claude", "developer tools"],
  authors: [{ name: "PromptLib Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
