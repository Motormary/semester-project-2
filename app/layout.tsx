import BackgroundImage from "@/components/background"
import Footer from "@/components/footer"
import TopNav from "@/components/nav/top-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/theme-toggle-button"
import type { Metadata } from "next"
import localFont from "next/font/local"
import logo from "public/logo_filled_white.png"
import icon from "public/favico_white.png"
import { Toaster } from "sonner"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://mkm-semester-project-2.netlify.app/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: "EBOX",
  description: "BOX up and sell your stuff on EBOX",
  icons: icon.src,
  openGraph: {
    images: {
      url: logo.src,
      alt: "Logo",
      type: "image/png",
      width: 1200,
      height: 630,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative flex min-h-svh flex-col items-center bg-muted antialiased dark:bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopNav />
          <main className="relative mb-[15rem] flex h-full w-full max-w-content px-4 peer-has-[[data-search]]:animate-pulse">
            {children}
            <ModeToggle />
          </main>
          <Toaster richColors />
          <Footer />
        </ThemeProvider>
        <div className="bg-cross pointer-events-none fixed -z-50 h-screen w-screen bg-cover bg-no-repeat" />
        <BackgroundImage />
      </body>
    </html>
  )
}
