import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "./components/layout/header/header";
import { StoreProvider } from "./redux/storeProvider";
import "@/src/app/styles/layout/layout.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teklifim Gelsin",
  description: "Teklifim gelsin Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${inter.className} main-layout-wrapper`}>
          <Header />
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </html>
    </StoreProvider>
  );
}
