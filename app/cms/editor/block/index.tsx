import React from 'react'
import { useEditorStore } from '../state'
import clsx from "clsx"

interface BlockProps {
  id: number
  children: React.ReactNode
}
export default function Block({ id, children }: BlockProps) {
  const setFocus = useEditorStore(state => state.setFocus);
  const focus = useEditorStore(state => state.focus);
  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault()
    event.stopPropagation()
    setFocus(id)
  }

  function handleFocus(event: React.FocusEvent<HTMLDivElement>) {
    event.preventDefault()
    event.stopPropagation()
    // setFocus(id)
  }

  const className = clsx(
    "_block mb-4",
    focus === id && "is-focused"
  )

  return (
    <div tabIndex={0} onClick={handleClick} onFocus={handleFocus} className={className} role="button">{children}</div>
  )
}
