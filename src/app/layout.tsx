import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQuery from "./ReactQuery";
import EmotionRegistry from "./EmotionRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spelar | 책 검색",
  description: "카카오 책 검색 API 기반 도서 검색 서비스 — 무한 스크롤로 책을 빠르게 탐색하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EmotionRegistry>
          <ReactQuery>{children}</ReactQuery>
        </EmotionRegistry>
      </body>
    </html>
  );
}
