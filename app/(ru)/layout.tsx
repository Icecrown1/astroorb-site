import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav locale="ru" />
      {children}
      <Footer locale="ru" />
    </>
  );
}
