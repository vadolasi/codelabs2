import ReactSplit from "react-split"

interface Props {
  direction: "horizontal" | "vertical"
  children: React.ReactNode
  [key: string]: any
}

export default function Split({ direction, children, onDragEnd, sizes, ...rest }: Props): JSX.Element {
  return (
    <ReactSplit
      direction={direction}
      gutterAlign="center"
      cursor="col-resize"
      className="flex h-screen w-screen p-2 box-border"
      gutterSize={7.5}
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
        gutterDecorator.className = `bg-gray-400 group-active:bg-light-blue-400 ${direction == "vertical" ? "w-10 h-0.5 group-active:w-30" : "w-0.5 h-10 group-active:h-30"} rounded-full group-hover:bg-white transition-all duration-200 ease-in-out`
        gutter.appendChild(gutterDecorator)
        return gutter
      }}
      {...rest}
    >
      {children}
    </ReactSplit>
  )
}
