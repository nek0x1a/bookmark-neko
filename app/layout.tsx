import Footer from "@/components/Framework/Footer";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookmark Neko",
  description: "猫猫的书签",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans">
      <body className={`bg-slate-700 text-slate-100 antialiased`}>
        <div className="page-w-[95%] md:w-[91%] lg:w-[88%] xl:w-[86%] 2xl:w-[85%] md:min-w-[45.6rem] lg:min-w-[58.24rem] xl:min-w-[70.4rem] 2xl:min-w-[82.56rem] 2xl:max-w-[96rem] mx-auto my-[5vw]">
          {children}
          <Footer />
          {/* <Debug /> */}
        </div>
      </body>
    </html>
  );
}
