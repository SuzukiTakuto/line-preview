import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilProvider from "./recoilProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Line Preview",
  description: "Generate a pseudo line talk screen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <RecoilProvider>
          <div className="bg-[#8FAACE] h-screen max-w-[430px] mx-auto overflow-auto">
            {children}
          </div>
        </RecoilProvider>
      </body>
    </html>
  );
}
