import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from 'react-toastify';

const vazirFont = localFont({
  src: [
    {
      path: "../../public/fonts/Farsi-Digits-Without-Latin/Vazir-Medium-FD-WOL.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Farsi-Digits-Without-Latin/Vazir-Medium-FD-WOL.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "جهان سایپا",
  description: "لوازم یدکی نیسان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.className} antialiased  select-none overflow-x-hidden overflow-y-auto`}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
