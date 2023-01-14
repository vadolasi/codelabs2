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
  { type: "folder", name: "test.py", parent: "", isOpen: false, id: 1 },
  { type: "folder", name: "test.py", parent: "/test", isOpen: false, id: 2 },
  { type: "folder", name: "test.py", parent: "/test/test", isOpen: false, id: 3 },
  { type: "file", name: "test.py", parent: "/test/test", content: "", id: 4 },
  { type: "folder", name: "test2.py", parent: "", isOpen: false, id: 5 },
  { type: "file", name: "file.py", parent: "", content: "", id: 6 }
])
