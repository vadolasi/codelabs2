"use client"

import { useCallback, useRef } from "react"
import CodeMirror, { ReactCodeMirrorRef }  from "@uiw/react-codemirror"
import { loadLanguage } from "@uiw/codemirror-extensions-langs"
import { useAtom } from "jotai"
import { layoutAtom, Tab as ITab } from "../../../../store"
import languageMap from "./languageMap"

interface Props {
  id: number
}

export default function Editor({ id }: Props): JSX.Element {
  const [layout, setLayout] = useAtom(layoutAtom)
  const tab = layout[id] as ITab

  const language = languageMap[tab.data.name.split(".").pop() as keyof typeof languageMap]
  const extensions = []

  if (language) {
    extensions.push(loadLanguage(language.language))
  }

  const refs = useRef<ReactCodeMirrorRef>({})

  const onChange = useCallback((value: string, viewUpdate: any) => {
    setLayout(layout => {
      ;(layout[id] as ITab).data.content = value
    })
  }, [id])

  return (
    <CodeMirror
      ref={refs}
      height="100%"
      className="h-full"
      value={tab.data.content}
      onChange={onChange}
      theme="dark"
      extensions={extensions as any[]}
    />
  )
}
