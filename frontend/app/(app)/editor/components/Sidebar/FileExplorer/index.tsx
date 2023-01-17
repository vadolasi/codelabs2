"use client"

import { useAtom } from "jotai"
import { filesAtom } from "./store"
import File from "./components/File"
import Folder from "./components/Folder"

export default function FileExplorer() {
  const [files] = useAtom(filesAtom)

  return (
    <div className="box-border ml-2 p-4 w-full">
      <div>
        <span className="text-gray-400 font-bold">Seus arquivos</span>
      </div>
      <div>
        {files.filter(file => file.parent == "").map(file => {
          switch (file.type) {
            case "file":
              return <File key={`file:${file.parent}/${file.name}`} name={file.name} id={file.id} parent={file.parent} />
            case "folder":
              return <Folder key={`folder:${file.parent}/${file.name}`} name={file.name} parent={file.parent} id={file.id} />
          }
        })}
      </div>
      <div>
        <span className="text-gray-400 font-bold">Arquivos do professor</span>
      </div>
    </div>
  )
}
