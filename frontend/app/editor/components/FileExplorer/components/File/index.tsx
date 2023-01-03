import { useEmit } from "../../../../context"

interface Props {
  name: string
  parent: string
}

export default function File({ name, parent }: Props): JSX.Element {
  const openFile = useEmit<[string, string]>("file:open")

  return (
    <div>
      <button onClick={() => openFile(name, parent)} className="w-full border-0 bg-white bg-opacity-0 hover:bg-opacity-25 text-left rounded p-2 text-white font-medium text-base transition-all duration-200 ease-in-out">{name}</button>
    </div>
  )
}
