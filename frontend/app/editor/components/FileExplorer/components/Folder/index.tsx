interface Props {
  name: string
  parent: string
}

export default function Folder({ name, parent }: Props): JSX.Element {
  return (
    <div>
      <div>{name}</div>
    </div>
  )
}
