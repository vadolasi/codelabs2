"use client"

import { ThemeProvider } from "next-themes"

interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return <ThemeProvider>{children}</ThemeProvider>
}
