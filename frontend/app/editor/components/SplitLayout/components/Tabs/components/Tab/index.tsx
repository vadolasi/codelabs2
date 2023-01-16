import { useAtom } from "jotai"
import { layoutAtom, Tabs as ITabs, Tab as ITab } from "../../../../store"
import { AiOutlineClose } from "react-icons/ai"
import { Draggable } from "react-beautiful-dnd"

interface Props {
  parentId: number
  id: number
  index: number
}

export default function Tab({ parentId, id, index }: Props): JSX.Element {
  const [layout, setLayout] = useAtom(layoutAtom)
  const tabs = layout[parentId] as ITabs
  const tab = layout[id] as ITab

  const select = () => {
    setLayout(layout => {
      ;(layout[parentId] as ITabs).selected = id
    })
  }

  return (
    <Draggable key={id} draggableId={id.toString()} index={index}>
      {provided => (
        <div onClick={select} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`relative group cursor-pointer bg-opacity-25 bg-gray-500 mx-1 p-1 rounded w-25 hover:bg-opacity-50 truncate ${tabs.selected == tab.id ? "text-blue-400" : "text-white"} transition-all duration-200 ease-in-out`} id={id.toString()}>
          <span
            className={`w-full p-1`}
          >
            {tab.name}
          </span>
          <div className="absolute opacity-0 right-1 top-1/2 -translate-y-1/2 p-1 rounded-lg bg-white bg-opacity-0 hover:bg-opacity-25 flex items-center justify-center group-hover:opacity-100 transition-all duration-200 ease-in-out text-white">
            <AiOutlineClose />
          </div>
        </div>
      )}
    </Draggable>
  )
}
