import { useAtom } from "jotai"
import { layoutAtom, Tabs as ITabs } from "../../store"
import { AiOutlineClose } from "react-icons/ai"

interface Props {
  id: number
}

export default function Tabs({ id }: Props): JSX.Element {
  const [layout, setLayout] = useAtom(layoutAtom)
  const tabs = layout[id] as ITabs
  const parent = layout[tabs.parent]

  const selected = parent.selected == id

  const select = (tabId: number) => {
    setLayout(layout => {
      const newLayout = { ...layout }
      newLayout[id].selected = tabId
      return newLayout
    })
  }

  return (
    <div className={`rounded-lg bg-gray-700 ${selected ? "border border-gray-500" : ""}`}>
      <div className="flex gap-1 overflow-hidden hover:overflow-x-auto border-b-1 border-gray-600">
        {tabs.tabs.map(child => <div key={child.id} className={`p-2 w-30 relative group text-center ${tabs.selected == child.id ? "border-b-2 border-blue-400" : ""}`} onClick={() => select(child.id)}>
          <span className={`w-full truncate ${tabs.selected == child.id ? "font-medium text-blue-400" : "text-white"}`}>{child.name}</span>
          <div className="absolute opacity-0 right-1 top-1/2 -translate-y-1/2 p-1 rounded-lg bg-white bg-opacity-0 hover:bg-opacity-25 flex items-center justify-center group-hover:opacity-100 transition-all duration-200 ease-in-out text-white"><AiOutlineClose /></div>
        </div>)}
      </div>
    </div>
  )
}
