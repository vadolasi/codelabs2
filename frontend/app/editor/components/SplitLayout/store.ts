import { atomWithImmer } from "jotai-immer"

export interface Split {
  type: "split"
  id: number
  direction: "horizontal" | "vertical"
  sizes: number[]
  children: number[]
  selected: number
  parent: number
}

export interface Tabs {
  type: "tabs"
  id: number
  selected: number
  tabs: Tab[]
  parent: number
  focused: boolean
}

export interface Tab {
  type: "editor" | "terminal"
  id: number
  name: string
  data: any
}

const intialStore: { [key: number]: (Split | Tabs) } = {}

export const layoutAtom = atomWithImmer<{ [key: number]: (Split | Tabs) }>(intialStore)
