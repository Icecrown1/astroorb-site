import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LangHtml from "@/components/LangHtml";

export const metadata: Metadata = {
  openGraph: { locale: "en_US" },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LangHtml lang="en" />
      <Nav locale="en" />
      {children}
      <Footer locale="en" />
    </>
  );
}
