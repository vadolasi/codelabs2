"use client"

import { useAtom } from "jotai"
import { filesAtom } from "./store"
import File from "./components/File"
import Folder from "./components/Folder"

export default function FileExplorer() {
  const [files] = useAtom(filesAtom)

  return (
    <div className="h-full bg-blue-500">
      <div>
        {files.filter(file => file.parent == "/").map(file => {
          switch (file.type) {
            case "file":
              return <File key={`${file.parent}/${file.name}`} name={file.name} parent={file.parent} />
            case "folder":
              return <Folder key={`${file.parent}/${file.name}`} name={file.name} parent={file.parent} />
          }
        })}
      </div>
    </div>
  )
}
