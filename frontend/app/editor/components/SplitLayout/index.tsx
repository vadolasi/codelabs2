import { useAtom } from "jotai"
import { layoutAtom, Split as ISplit } from "./store"
import Tabs from "./components/Tabs"
import Split from "../Split"

interface Props {
  id: number
}

export default function SplitLayout({ id }: Props): JSX.Element {
  const [layout, setLayout] = useAtom(layoutAtom)
  const split = layout[id] as ISplit
  const parent = layout[split.parent] as ISplit

  const selected = parent && parent.selected == id

  const onDragEnd = (sizes: number[]) => {
    setLayout(layout => {
      ;(layout[id] as ISplit).sizes = sizes
    })
  }

  return (
    <div className={`bg-blue-800 p-2 rounded-lg ${selected && "border border-gray-400"}`}>
      <Split direction={split.direction} onDragEnd={onDragEnd} sizes={split.sizes}>
        {split.children.map((child) => {
          switch (layout[child].type) {
            case "split":
              return <SplitLayout key={child} id={child} />
            case "tabs":
              return <Tabs key={child} id={child} />
          }
        })}
      </Split>
    </div>
  )
}
