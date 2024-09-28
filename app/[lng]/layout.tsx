import type { Metadata } from "next";
// import { useRouter } from 'next/router';
import localFont from "next/font/local";
import "./globals.css";
import { dir } from "i18next";
import { languages } from "../i18n/settings";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// 所有页面的SEO
export const metadata: Metadata = {
  // 元数据的基础 URL
  metadataBase: new URL(process.env.NEXT_PUBLIC_SEVER_URL!),
  // 应用名称
  applicationName: "Mahu-meeting",
  // 页面标题
  title: "Mahu-meeting | Efficient Video Conferencing Solution",
  // 页面描述
  description:
    "Mahu-meeting is a modern video conferencing application built with Next.js, offering high-quality, secure, and reliable online meeting experiences.",
  // 关键词
  keywords: [
    "Mahu-meeting",
    "video conferencing",
    "online meetings",
    "remote collaboration",
    "Next.js",
    "React",
  ],
  // 作者信息
  authors: [{ name: "Rascal-Coder", url: "https://github.com/Rascal-Coder" }],
  // 搜索引擎爬虫设置
  robots: {
    index: false, // Don't index this page
    follow: true, // Follow links on this page
    nocache: true, // Don't cache this page
    googleBot: {
      index: true, // Allow Google to index this page
      noimageindex: false, // Allow Google to index images on this page
    },
  },
  // PWA manifest file path
  manifest: `${process.env.NEXT_PUBLIC_SEVER_URL}/manifest.json`,
  // Website icon settings
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: {
    lng: string;
  };
}>) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
export default RootLayout;
