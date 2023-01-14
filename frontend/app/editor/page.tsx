"use client"

import { useAtom } from "jotai"
import FileExplorer from "./components/FileExplorer"
import Split from "./components/Split"
import { layoutAtom, Split as ISplit, Tabs as ITabs, Tab as ITab } from "./components/SplitLayout/store"
import Tabs from "./components/SplitLayout/components/Tabs"
import { default as MySplit } from "./components/SplitLayout"
import useMeasure from "react-use-measure"
import { useEvent } from "./context"
import { filesAtom } from "./components/FileExplorer/store"
import { DragDropContext } from "react-beautiful-dnd"

export default function EditorPage(): JSX.Element {
  const [layout, setLayout] = useAtom(layoutAtom)
  const split = layout[0] as ISplit
  const [ref, bounds] = useMeasure()

  const [files] = useAtom(filesAtom)

  useEvent<[number]>("file:open", (id) => {
    const file = files.find(file => file.id == id)!

    if (!layout[0]) {
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
          tabs: [id],
          parent: 0,
          id: 1,
          selected: id,
          focused: true
        },
        [id]: {
          type: "tab",
          tabType: "editor",
          name: file.name,
          id: id,
          data: file,
          parent: 1
        }
      })
    } else {
      setLayout(layout => {
        const split = layout[0] as ISplit
        const tabs = layout[split.selected] as ITabs
        const tab = layout[id] as ITab

        if (tab) {
          tabs.selected = id
        } else {
          const newTab = {
            type: "tab",
            tabType: "editor",
            name: file.name,
            id: id,
            data: file,
            parent: split.selected
          } as ITab

          layout[id] = newTab
          tabs.tabs.push(id)
          tabs.selected = id
        }
      })
    }
  })

  const moveTab = (id: number, tabsId: number, index: number) => {
    setLayout(layout => {
      const tab = layout[id] as ITab
      const tabs = layout[tabsId] as ITabs

      tabs.tabs.splice(tabs.tabs.indexOf(id), 1)
      tabs.tabs.splice(index, 0, id)
      tab.parent = tabsId
    })
  }

  const onDragEnd = (sizes: number[]) => {
    setLayout(layout => {
      ;(layout[0] as ISplit).sizes = sizes
    })
  }

  return (
    <div ref={ref}>
      <DragDropContext onDragEnd={({ source, destination, draggableId }) => {
        if (!destination) return

        if (source.droppableId == destination.droppableId) {
          moveTab(parseInt(draggableId), parseInt(source.droppableId), destination.index)
        } else {
          moveTab(parseInt(draggableId), parseInt(destination.droppableId), destination.index)
        }
      }}>
        <Split direction="horizontal" maxSize={[300, Infinity]} minSize={[200, 0]} onDragEnd={onDragEnd} sizes={[250 * 100 / bounds.width, 100 - (250 * 100 / bounds.width)]}>
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
      </DragDropContext>
    </div>
  )
}
