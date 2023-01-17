import FileExplorer from "./FileExplorer"
import { FaFile } from 'react-icons/fa'

export default function Sidebar(): JSX.Element {
  return (
    <div className="flex">
      <div className="h-full flex flex-col items-center border-r-1 border-gray-500 -mx-2 p-3">
        <FaFile className="text-2xl text-gray-400" />
      </div>
      <FileExplorer />
    </div>
  )
}
