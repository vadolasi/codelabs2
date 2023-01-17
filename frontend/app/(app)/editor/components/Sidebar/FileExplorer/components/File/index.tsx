import { useEmit } from "../../../../../context"

interface Props {
  name: string
  parent: string
  id: number
}

export default function File({ name, id }: Props): JSX.Element {
  const openFile = useEmit<[number]>("file:open")

  return (
    <div>
      <button onClick={() => openFile(id)} className="w-full border-0 bg-white bg-opacity-0 hover:bg-opacity-25 text-left rounded p-2 text-white font-medium text-base transition-all duration-200 ease-in-out">{name}</button>
    </div>
  )
}
