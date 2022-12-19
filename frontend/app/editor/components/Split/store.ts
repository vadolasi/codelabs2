import { atom } from "jotai"

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
}

export interface Tab {
  type: "editor" | "terminal"
  id: number
  name: string
}

const intialStore: { [key: number]: (Split | Tabs) } = {
  0: {
    type: "split",
    id: 0,
    direction: "horizontal",
    sizes: [50, 50],
    children: [1, 2],
    selected: 1,
    parent: -1
  },
  1: {
    type: "tabs",
    id: 1,
    parent: 0,
    selected: 3,
    tabs: [
      { type: "editor", id: 3, name: "test" },
      { type: "editor", id: 4, name: "test2" }
    ]
  },
  2: {
    type: "tabs",
    id: 2,
    parent: 0,
    selected: 5,
    tabs: [
      { type: "editor", id: 5, name: "test" },
      { type: "editor", id: 6, name: "test2" }
    ]
  }
}

export const layoutAtom = atom<{ [key: number]: (Split | Tabs) }>(intialStore)
