import { atom } from "jotai"

export interface File {
  type: "file"
  name: string
  content: string
  parent: string
}

export interface Folder {
  type: "folder"
  name: string
  parent: string
  isOpen: boolean
}

export const filesAtom = atom<(File | Folder)[]>([
  { type: "folder", name: "test", parent: "", isOpen: false },
  { type: "folder", name: "test", parent: "/test", isOpen: false },
  { type: "folder", name: "test", parent: "/test/test", isOpen: false },
  { type: "file", name: "test", parent: "/test/test", content: "" },
  { type: "folder", name: "test2", parent: "", isOpen: false },
])
