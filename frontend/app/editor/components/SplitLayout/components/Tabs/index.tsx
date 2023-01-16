import { useAtom } from "jotai"
import { layoutAtom, Tabs as ITabs, Split as ISplit, Tab as ITab } from "../../store"
import Tab from "./components/Tab"
import { Droppable } from "react-beautiful-dnd"
import Editor from "./components/Editor"
import { draggingTabAtom } from "../../../../store"
import { PointerEventHandler } from "react"
import { useEmit } from "../../../../context"

interface Props {
  id: number
}

export default function Tabs({ id }: Props): JSX.Element {
  const [layout, setLayout] = useAtom(layoutAtom)
  const tabs = layout[id] as ITabs
  const parent = layout[tabs.parent] as ISplit
  const [dragging, setDragging] = useAtom(draggingTabAtom)

  const test = useEmit<[any, any]>("test")

  let listener: PointerEventHandler<HTMLDivElement> = () => {}

  if (dragging.isDragging) {
    listener = (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const quadrant = x > y ? (x > rect.width - y ? "right" : "top") : (x > rect.width - y ? "bottom" : "left")
      setDragging(dragging => {
        dragging.preRect = dragging.rect

        if (quadrant == "left") {
          dragging.rect = {
            x: rect.left,
            y: rect.top,
            width: rect.width / 2,
            height: rect.height
          }
        } else if (quadrant == "right") {
          dragging.rect = {
            x: rect.left + rect.width / 2,
            y: rect.top,
            width: rect.width / 2,
            height: rect.height
          }
        } else if (quadrant == "top") {
          dragging.rect = {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height / 2
          }
        } else if (quadrant == "bottom") {
          dragging.rect = {
            x: rect.left,
            y: rect.top + rect.height / 2,
            width: rect.width,
            height: rect.height / 2
          }
        }

        if (!dragging.preRect) {
          dragging.preRect = dragging.rect
        }

        test(dragging.rect, dragging.preRect)

        return dragging
      })
    }
  }

  const selected = parent.selected == id

  const focus = () => {
    setLayout(layout => {
      ;(layout[tabs.parent] as ISplit).selected = id
    })
  }

  return (
    <div className={`rounded-lg bg-gray-700 ${selected ? tabs.focused ? "border border-gray-400" : "border border-gray-500" : ""} flex flex-col`} onClick={focus}>
      <Droppable droppableId={id.toString()} direction="horizontal">
        {provided => (
          <div className="flex overflow-hidden hover:overflow-x-auto border-b-1 border-gray-600 py-1" {...provided.droppableProps} ref={provided.innerRef}>
            {tabs.tabs.map((tab, index) => <Tab key={tab} parentId={id} id={tab} index={index} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="h-full overflow-auto" onPointerMove={listener} onMouseUp={() => setDragging({ isDragging: false })}>
        {(layout[tabs.selected] as ITab).tabType == "editor" ? <Editor id={tabs.selected} /> : null}
      </div>
    </div>
  )
}
