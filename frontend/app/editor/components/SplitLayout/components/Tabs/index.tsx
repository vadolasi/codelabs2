import { useAtom } from "jotai"
import { layoutAtom, Tabs as ITabs, Split as ISplit, Tab as ITab } from "../../store"
import Tab from "./components/Tab"
import { Droppable } from "react-beautiful-dnd"
import Editor from "./components/Editor"

interface Props {
  id: number
}

export default function Tabs({ id }: Props): JSX.Element {
  const [layout, setLayout] = useAtom(layoutAtom)
  const tabs = layout[id] as ITabs
  const parent = layout[tabs.parent] as ISplit

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
          <div className="flex gap-2 overflow-hidden hover:overflow-x-auto border-b-1 border-gray-600 p-2" {...provided.droppableProps} ref={provided.innerRef}>
            {tabs.tabs.map((tab, index) => <Tab key={tab} parentId={id} id={tab} index={index} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="h-full overflow-auto">
        {(layout[tabs.selected] as ITab).tabType == "editor" ? <Editor id={tabs.selected} /> : null}
      </div>
    </div>
  )
}
