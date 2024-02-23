import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Layout from "./(frontend)/components/UI/Layout";
const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";

export const metadata: Metadata = {
  title: "Range International Property Investments12",
  description: "Range International Property Investments12",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics id="G-ENW575XKY6" />
      <body className={inter.className} suppressHydrationWarning={true}>
        <Layout>
          {children}
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Layout>
      </body>
    </html>
  );
}
