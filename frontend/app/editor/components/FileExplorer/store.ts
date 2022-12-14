import { atom } from "jotai"

interface File {
  type: "file"
  name: string
  content: string
  parent: string
}

interface Folder {
  type: "folder"
  name: string
  parent: string
}

export const filesAtom = atom<(File | Folder)[]>([{ type: "folder", name: "test", parent: "/" }])
