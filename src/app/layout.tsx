import type { Metadata } from "next"
import { Providers } from "@/app/providers"
import { appFont } from "@/config/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "App",
    template: "%s · App",
  },
  description: "Next.js app template with authentication.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={appFont.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
