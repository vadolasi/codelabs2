import { Inter } from "@next/font/google"
import { EditorContextProvider } from "./editor/context"

const inter = Inter()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EditorContextProvider>
      <html lang="pt-BR" className={inter.className}>
        <head />
        <body className="m-0 bg-blue-gray-800">{children}</body>
      </html>
    </EditorContextProvider>
  )
}
