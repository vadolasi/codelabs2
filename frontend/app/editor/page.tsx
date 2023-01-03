"use client"

import { useAtom } from "jotai"
import FileExplorer from "./components/FileExplorer"
import Split from "./components/Split"
import { layoutAtom, Split as ISplit, Tabs as ITabs } from "./components/SplitLayout/store"
import Tabs from "./components/SplitLayout/components/Tabs"
import { default as MySplit } from "./components/SplitLayout"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import useMeasure from "react-use-measure"
import { useEvent } from "./context"
import { filesAtom, File } from "./components/FileExplorer/store"
import { useEffect } from "react"

export default function EditorPage(): JSX.Element {
  const [layout, setLayout] = useAtom(layoutAtom)
  const split = layout[0] as ISplit
  const [ref, bounds] = useMeasure()

  const [files] = useAtom(filesAtom)

  useEvent<[string, string]>("file:open", (name, parent) => {
    const file = files.find(file => file.type == "file" && file.name == name && file.parent == parent) as File

    if (!layout[0]) {
      const id = Math.random()

      setLayout({
        0: {
          type: "split",
          direction: "horizontal",
          children: [1],
          parent: -1,
          id: 0,
          selected: 1,
          sizes: [250 * 100 / bounds.width, 100 - (250 * 100 / bounds.width)]
        },
        1: {
          type: "tabs",
          tabs: [{ type: "editor", data: file, name: file.name, id }],
          parent: 0,
          id: 1,
          selected: id,
          focused: true
        }
      })
    } else {
      setLayout(layout => {
        const focusedTabsId = Object.values(layout).find((item: ITabs | ISplit) => item.type == "tabs" && item.focused)?.id!

        ;(layout[focusedTabsId] as ITabs).tabs.push({ type: "editor", data: file, name: file.name, id: Math.random() })
      })
    }
  })

  return (
    <div ref={ref}>
      <DndProvider backend={HTML5Backend}>
        <Split direction="horizontal" sizes={[250 * 100 / bounds.width, 100 - (250 * 100 / bounds.width)]} maxSize={[300, Infinity]} minSize={[200, 0]}>
          <FileExplorer />
          {split ? split.children.map(child => {
            switch (layout[child].type) {
              case "split":
                return <MySplit key={child} id={child} />
              case "tabs":
                return <Tabs key={child} id={child} />
            }
          }) : (
            <div className="flex-1 bg-gray-700 rounded-lg">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-2xl text-gray-400">No files open</div>
                <div className="text-gray-400">Open a file from the file explorer on the left</div>
              </div>
            </div>
          )}
        </Split>
      </DndProvider>
    </div>
  )
}
