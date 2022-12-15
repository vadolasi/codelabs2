import { useSpring, a } from "@react-spring/web"
import useMeasure from "react-use-measure"
import { useAtom } from "jotai"
import { filesAtom, Folder as IFolder } from "../../store"
import File from "../File"
import { memo, useEffect, useRef } from "react"

interface Props {
  name: string
  parent: string
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

const Folder = memo<Props>(({ name, parent }) => {
  const [files, setFiles] = useAtom(filesAtom)
  const file = files.find(file => file.type == "folder" && file.name == name && file.parent == parent) as IFolder
  const previous = usePrevious(file.isOpen)

  const [ref, { height: viewHeight }] = useMeasure()

  const setIsOpen = (isOpen: boolean) => {
    setFiles(files => {
      const newFiles = [...files]
      const file = newFiles.find(file => file.type == "folder" && file.name == name && file.parent == parent) as IFolder
      file.isOpen = isOpen
      return newFiles
    })
  }

  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: "translate3d(30px,0,0)" },
    to: {
      height: file.isOpen ? viewHeight : 0,
      opacity: file.isOpen ? 1 : 0,
      transform: `translate3d(${file.isOpen ? 0 : 30}px,0,0)`
    }
  })

  return (
    <div>
      <button onClick={() => setIsOpen(!file.isOpen)} className="w-full border-0 bg-white bg-opacity-0 hover:bg-opacity-25 text-left rounded p-2 text-white font-medium text-base">{viewHeight}</button>
      <a.div style={{ height, opacity, overflow: "hidden" }}>
        <div className="flex ml-2" ref={ref}>
          <div style={{ height: file.isOpen && previous === file.isOpen ? 'auto' : viewHeight }} className="group w-3 flex justify-center" onClick={() => setIsOpen(!file.isOpen)}>
            <div className="w-0.1 bg-gray-500 group-hover:bg-white" />
          </div>
          <a.div className="w-full" style={{ transform }}>
            {file.isOpen && files.filter(file => file.parent == `${parent}/${name}`).map(file => {
              switch (file.type) {
                case "file":
                  return <File key={`${file.parent}/${file.name}`} name={file.name} parent={file.parent} />
                case "folder":
                  return <Folder key={`${file.parent}/${file.name}`} name={file.name} parent={file.parent} />
              }
            })}
          </a.div>
        </div>
      </a.div>
    </div>
  )
})

export default Folder
