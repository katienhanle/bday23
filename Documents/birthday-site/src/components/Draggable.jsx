'use client'

import { useRef, useState, useEffect } from 'react'

export default function Draggable({ children, defaultPosition = { x: 0, y: 0 }, style, zIndex = 4 }) {
  const [pos, setPos] = useState(defaultPosition)
  const dragging = useRef(false)
  const offset   = useRef({ x: 0, y: 0 })

  function onMouseDown(e) {
    if (e.button !== 0) return
    dragging.current = true
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    function onMove(e) {
      if (!dragging.current) return
      setPos({ x: Math.max(0, e.clientX - offset.current.x), y: Math.max(0, e.clientY - offset.current.y) })
    }
    function onUp() {
      if (dragging.current) { dragging.current = false; document.body.style.userSelect = '' }
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
  }, [])

  return (
    <div
      onMouseDown={onMouseDown}
      style={{ position: 'absolute', left: pos.x, top: pos.y, cursor: 'grab', zIndex, ...style }}
    >
      {children}
    </div>
  )
}
