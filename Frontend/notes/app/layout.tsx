import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ThemeRegistry from "@/components/ThemeRegistry";
import BgImage from "@/components/BgImage";

export const metadata: Metadata = {
  title: "Notes App",
  description: "Create and share your notes with ease using our Notes App. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-w-screen min-h-screen transition-colors duration-300 `}
      >
        <ThemeRegistry>
          <Header/>
            {children}
        </ThemeRegistry>
        <BgImage />
      </body>
    </html>
  );
}
