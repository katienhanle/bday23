'use client'

import { useRef, useState, useEffect } from 'react'

// variant:    'pink' | 'dark'
// rotate:     degrees tilt
// onMaximize: called when green button is clicked (navigate to full-screen view)
export default function Window({
  title,
  icon = '',
  url,
  children,
  onClose,
  onMinimize,
  onMaximize,
  defaultPosition = { x: 100, y: 80 },
  width = 480,
  zIndex = 1,
  onFocus,
  bodyStyle = {},
  variant = 'pink',
  rotate = 0,
}) {
  const [pos, setPos] = useState(defaultPosition)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  function startDrag(e) {
    if (e.button !== 0) return
    dragging.current = true
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    document.body.style.userSelect = 'none'
    onFocus?.()
  }

  useEffect(() => {
    function onMove(e) {
      if (!dragging.current) return
      setPos({
        x: Math.max(0, e.clientX - offset.current.x),
        y: Math.max(0, e.clientY - offset.current.y),
      })
    }
    function onUp() {
      if (dragging.current) {
        dragging.current = false
        document.body.style.userSelect = ''
      }
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <div
      className={`window window-${variant}`}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width,
        zIndex,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        transformOrigin: 'center top',
      }}
      onMouseDown={onFocus}
    >
      {/* Titlebar */}
      <div className="window-titlebar" onMouseDown={startDrag}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0 }}>
          <span
            className="win-btn win-btn-close"
            onClick={(e) => { e.stopPropagation(); onClose?.() }}
            title="Close"
          >✕</span>
          <span
            className="win-btn win-btn-min"
            onClick={(e) => { e.stopPropagation(); onMinimize?.() }}
            title="Minimize"
          >−</span>
          <span
            className="win-btn win-btn-max"
            onClick={(e) => { e.stopPropagation(); onMaximize?.() }}
            title="Full screen"
          >+</span>
        </div>

        <div className="window-url">
          {icon && <span style={{ marginRight: 4 }}>{icon}</span>}
          {url ?? `birthday.exe/${title}`}
        </div>

        <span style={{ width: 50, flexShrink: 0 }} />
      </div>

      {/* Body */}
      <div className="window-body" style={bodyStyle}>
        {children}
      </div>
    </div>
  )
}
