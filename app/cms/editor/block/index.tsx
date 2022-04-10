import React from 'react'
import { useEditorStore } from '../state'

interface BlockProps {
  id: number
  children: React.ReactNode
}
export default function Block({ id, children }: BlockProps) {
  const setFocus = useEditorStore(state => state.setFocus);
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

  return (
    <div tabIndex={0} onClick={handleClick} onFocus={handleFocus} className='block' role="button">{children}</div>
  )
}
