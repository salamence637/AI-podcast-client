// src/app/layout.tsx
import "./globals.css";  // 引入全局样式（包含 Tailwind CSS 的编译结果）
import { ReactNode } from "react";

export const metadata = {
  title: "AI 播客生成系统",
  description: "使用 Next.js 13 + Tailwind CSS 构建的前端",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="bg-blue-50 text-gray-800">
        {children}
      </body>
    </html>
  );
}
