import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
class MyDocument extends Document {
  render() {
    console.log('testdsd')
    return (
      <Html lang="en">
        <Head>
          {/* Add any other meta tags or head elements you need */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-ENW575XKY6`}
            onLoad={() => {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ENW575XKY6');
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
