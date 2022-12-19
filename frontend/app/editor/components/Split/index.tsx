import { useAtom } from "jotai"
import { layoutAtom, Split as ISplit } from "./store"
import Tabs from "./components/Tabs"
import { default as ReactSplit } from "react-split"

interface Props {
  id: number
}

export default function Split({ id }: Props): JSX.Element {
  const [layout] = useAtom(layoutAtom)
  const split = layout[id] as ISplit
  const parent = layout[split.parent]

  const selected = parent && parent.selected == id

  return (
    <div className={`bg-blue-800 p-2 rounded-lg ${selected ? "border border-gray-400" : ""}`}>
      <ReactSplit
        direction={split.direction}
        gutterAlign="center"
        cursor="col-resize"
        className="flex h-screen w-screen"
        gutterSize={8}
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
          gutterDecorator.className = `bg-gray-400 group-active:bg-light-blue-400 ${direction == "vertical" ? "w-10 h-1/3 group-active:w-30" : "w-1/3 h-10 group-active:h-30"} rounded-full group-hover:bg-white transition-all duration-200 ease-in-out`
          gutter.appendChild(gutterDecorator)
          return gutter
        }}
      >
        {split.children.map((child) => {
          switch (layout[child].type) {
            case "split":
              return <Split key={child} id={child} />
            case "tabs":
              return <Tabs key={child} id={child} />
          }
        })}
      </ReactSplit>
    </div>
  )
}
