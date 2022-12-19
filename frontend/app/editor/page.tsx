"use client"

import { useAtom } from "jotai"
import FileExplorer from "./components/FileExplorer"
import Split from "react-split"
import { layoutAtom, Split as ISplit } from "./components/Split/store"
import Tabs from "./components/Split/components/Tabs"
import { default as MySplit } from "./components/Split"

export default function EditorPage(): JSX.Element {
  const [layout] = useAtom(layoutAtom)
  const split = layout[0] as ISplit

  return (
    <Split
      direction="horizontal"
      gutterAlign="center"
      cursor="col-resize"
      className="flex h-screen w-screen p-2 box-border"
      gutterSize={7.5}
      gutter={(_index, direction) => {
        const gutter = document.createElement("div")
        gutter.className = "bg-blue-gray-800 flex items-center justify-center group col-resize"
        if (direction == "vertical") {
          gutter.className += " w-full"
        } else {
          gutter.className += " h-full"
        }
        gutter.style.cursor = "col-resize"
        const gutterDecorator = document.createElement("div")
        gutterDecorator.className = `bg-gray-400 group-active:bg-light-blue-400 ${direction == "vertical" ? "w-10 h-0.5 group-active:w-30" : "w-0.5 h-10 group-active:h-30"} rounded-full group-hover:bg-white transition-all duration-200 ease-in-out`
        gutter.appendChild(gutterDecorator)
        return gutter
      }}
    >
      <FileExplorer />
      {split.children.map(child => {
        switch (layout[child].type) {
          case "split":
            return <MySplit key={child} id={child} />
          case "tabs":
            return <Tabs key={child} id={child} />
        }
      })}
    </Split>
  )
}
