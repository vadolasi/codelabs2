"use client"

import { createContext, useContext, useEffect } from "react"

class EventEmitter {
  events: Record<string, Function[]> = {}

  on(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(callback)
  }

  emit(event: string, ...args: any[]) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args))
    }
  }

  off(event: string, callback: Function) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  }

  once(event: string, callback: Function) {
    const wrapper = (...args: any[]) => {
      callback(...args)
      this.off(event, wrapper)
    }

    this.on(event, wrapper)
  }
}

interface EditorContextValue {
  emitter: EventEmitter
}

const EditorContext = createContext<EditorContextValue>({} as EditorContextValue)

export function EditorContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const emitter = new EventEmitter()

  return (
    <EditorContext.Provider value={{ emitter }}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEvent<T extends any[]>(event: string, callback: (...args: T) => void): void {
  const { emitter } = useContext(EditorContext)

  useEffect(() => {
    emitter.on(event, callback)

    return () => emitter.off(event, callback)
  }, [event, callback])
}

export function useEmit<T extends any[]>(event: string): (...args: T) => void {
  const { emitter } = useContext(EditorContext)

  return (...args: T) => emitter.emit(event, ...args)
}
