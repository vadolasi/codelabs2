import FileExplorer from "./components/FileExplorer"

export default function EditorPage(): JSX.Element {
  return (
    <div className="w-screen h-screen flex">
      <FileExplorer />
    </div>
  )
}
