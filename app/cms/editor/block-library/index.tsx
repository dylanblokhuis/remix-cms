import { useRef } from 'react'
import { useOverlayTriggerState } from '@react-stately/overlays'
import { OverlayContainer, useOverlayPosition, useOverlayTrigger } from '@react-aria/overlays'

import BlockLibraryPopover from './Popover'

interface BlockLibraryProps {
  children: React.ReactNode
  className?: string
}

const BlockLibrary = function ({ children, className }: BlockLibraryProps) {
  const state = useOverlayTriggerState({})
  const triggerRef = useRef(null)
  const overlayRef = useRef(null)

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the popover positioning).
  const { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state, triggerRef)

  // Get popover positioning props relative to the trigger
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: 'bottom',
    offset: 25,
    isOpen: state.isOpen
  })

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // popover closes.

  return (
    <>
      <button className={className} onClick={() => state.open()} ref={triggerRef} {...triggerProps}>
        {children}
      </button>

      {state.isOpen && (
        <OverlayContainer>
          <BlockLibraryPopover
            {...overlayProps}
            {...positionProps}
            ref={overlayRef}
            isOpen={state.isOpen}
            onClose={state.close}
          />
        </OverlayContainer>
      )}
    </>
  )
}

BlockLibrary.defaultProps = {
  blockId: undefined,
  className: undefined
}

export default BlockLibrary
