import { atom } from "jotai"

type Rect =  { x: number, y: number, width: number, height: number }

export const draggingTabAtom = atom<{ isDragging: boolean, rect?: Rect, preRect?: Rect }>({ isDragging: false })
