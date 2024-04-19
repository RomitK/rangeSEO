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
import { GoogleTagManager } from "@next/third-parties/google";
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
            __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.GOOGLE_TAG_MANAGER}');
          `,
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


        {/* Add the script for Google Tag Manager */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16515013820"
        />
        {/* Add the inline script for Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16515013820');
            `,
          }}
        />
        <Script
          id="facebook-pixel-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1852087601909713');
            fbq('track', 'PageView');
          `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1852087601909713&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>


        <link rel="preload" href="/videos/homeSearchBannerImageWithText.webp" as="image" />
        <link rel="preload" href="/videos/homeSearchBannerImage.webp" as="image" />
        <meta name="robots" content="noindex,nofollow" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>

        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

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
