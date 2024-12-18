import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plantify - 홈",
  description: "나의 페이/카드 정보가 궁금할 때",
  keywords: ["plantify", "pay", "point", "money", "페이", "포인트", "기부"],
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
