import type { Metadata } from "next";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Layout from "./(frontend)/components/UI/Layout";
const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";
import Script from 'next/script'
export const metadata: Metadata = {
  title: "Range International Property Investments",
  description: "Range International Property Investments",
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
      <head>

<Script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-E7NY2W59JZ"
/>

<Script id="google-analytics">
  {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
  `}
</Script>

</head>
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
