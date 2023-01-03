import "./uno.css"
import { Inter } from "@next/font/google"
import { EditorContextProvider } from "./editor/context"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EditorContextProvider>
      <html lang="pt-BR">
        <head />
        <body className={`${inter.className} m-0 bg-blue-gray-800`}>{children}</body>
      </html>
    </EditorContextProvider>
  )
}
