import { useAtom } from "jotai"
import { layoutAtom, Tabs as ITabs, Tab as ITab } from "../../../../store"
import { AiOutlineClose } from "react-icons/ai"
import { useDrag, useDrop } from "react-dnd"
import type { Identifier, XYCoord } from "dnd-core"
import { useRef } from "react"

interface Props {
  parentId: number
  id: number
  index: number
}

interface DragItem {
  index: number
  id: string
  type: string
}

export default function Tab({ parentId, id, index }: Props): JSX.Element {
  const [layout, setLayout] = useAtom(layoutAtom)
  const tabs = layout[parentId] as ITabs
  const tab = tabs.tabs.find(tab => id == tab.id) as ITab

  const ref = useRef<HTMLDivElement>(null)

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = tabs.tabs[dragIndex]

    setLayout(layout => {
      ;(layout[parentId] as ITabs).tabs.splice(dragIndex, 1)
      ;(layout[parentId] as ITabs).tabs.splice(hoverIndex, 0, dragCard)
    })
  }

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "tab",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)

      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "tab",
      item: { id, parentId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    []
  )

  const select = () => {
    setLayout(layout => {
      layout[parentId].selected = id
    })
  }

  drag(drop(ref))

  return (
    <div
      className={`p-2 w-30 relative group text-center ${tabs.selected == tab.id ? "border-b-2 border-blue-400" : ""} ${isDragging ? "invisible" : ""}}`}
      onClick={select}
      ref={ref}
      data-handler-id={handlerId}
    >
      <span
        className={`w-full truncate ${tabs.selected == tab.id ? "font-medium text-blue-400" : "text-white"}`}
      >
        {tab.name}
      </span>
      <div className="absolute opacity-0 right-1 top-1/2 -translate-y-1/2 p-1 rounded-lg bg-white bg-opacity-0 hover:bg-opacity-25 flex items-center justify-center group-hover:opacity-100 transition-all duration-200 ease-in-out text-white">
        <AiOutlineClose />
      </div>
    </div>
  )
}
