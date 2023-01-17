import { atom } from "jotai"

export interface File {
  type: "file"
  name: string
  content: string
  parent: string
  id: number
}

export interface Folder {
  type: "folder"
  name: string
  parent: string
  isOpen: boolean
  id: number
}

export const filesAtom = atom<(File | Folder)[]>([
  { type: "file", name: "index.ts", parent: "", content: "", id: 2 }
])
