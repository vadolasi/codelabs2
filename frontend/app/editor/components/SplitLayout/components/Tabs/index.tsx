import { useAtom } from "jotai"
import { layoutAtom, Tabs as ITabs, Split as ISplit } from "../../store"
import Tab from "./components/Tab"

interface Props {
  id: number
}

export default function Tabs({ id }: Props): JSX.Element {
  const [layout, setLayout] = useAtom(layoutAtom)
  const tabs = layout[id] as ITabs
  const parent = layout[tabs.parent]

  const selected = parent.selected == id

  const focus = () => {
    setLayout(layout => {
      ;(layout[tabs.parent] as ISplit).selected = id
    })
  }

  return (
    <div className={`rounded-lg bg-gray-700 ${selected ? tabs.focused ? "border border-gray-400" : "border border-gray-500" : ""}`} onClick={focus}>
      <div className="flex gap-1 overflow-hidden hover:overflow-x-auto border-b-1 border-gray-600">
        {tabs.tabs.map((tab, index) => <Tab key={tab.id} parentId={id} id={tab.id} index={index} />)}
      </div>
    </div>
  )
}
