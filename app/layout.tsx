import type { Metadata } from "next";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Head from "next/head";
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/react';
import Layout from "./(frontend)/components/UI/Layout";
const inter = Inter({ subsets: ["latin"], display: 'swap' });

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

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WFPP3R38');`,
          }}
        />
        {/* google analytics code start*/}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
        </Script>


        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16515013820"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-16515013820');
              `,
          }}
        />

        <link rel="preload" href="/videos/ramadan-desktop.webp" as="image" />
        <link rel="preload" href="/videos/ramzan-mobile.webp" as="image" />

      </head>
      <body className={inter.className} suppressHydrationWarning={true}>

        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WFPP3R38"
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>

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
