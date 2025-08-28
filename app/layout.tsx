import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { AuthProvider } from "@/components/auth/auth-provider"

export const metadata: Metadata = {
  title: "Adfinitum Trails - Premium Electronics & Appliances",
  description:
    "Shop the latest electronics and home appliances with flexible financing options. Quality products, competitive prices, and exceptional service.",
  generator: "v0.app",
  keywords: "electronics, appliances, phones, Samsung, iPhone, TVs, microwaves, financing",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
