import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Layout from './(frontend)/components/UI/Layout'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Range International Property Investments',
  description: 'Range International Property Investments',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={inter.className} suppressHydrationWarning={true}>
        <Layout>
        {children}
        </Layout>
      </body>
    </html>
  )
}
