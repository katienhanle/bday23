'use client'

import { useRef, useState, useEffect } from 'react'

const STRIP_W = 350  // px — photobooth preview width

export default function PhotostripPreview({
  photos,
  defaultPosition = { x: 100, y: 100 },
  zIndex = 3,
  rotate = 0,
  onClick,
}) {
  const [pos, setPos] = useState(defaultPosition)
  const dragging = useRef(false)
  const moved    = useRef(false)
  const offset   = useRef({ x: 0, y: 0 })

  function startDrag(e) {
    if (e.button !== 0) return
    dragging.current = true
    moved.current = false
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    function onMove(e) {
      if (!dragging.current) return
      moved.current = true
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

  if (!photos || photos.length === 0) return null

  return (
    <div
      onMouseDown={startDrag}
      onClick={() => { if (!moved.current && onClick) onClick() }}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        zIndex,
        cursor: 'grab',
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        transformOrigin: 'center top',
        display: 'flex',
        flexDirection: 'column',
        width: STRIP_W,
        boxShadow: '8px 10px 36px rgba(0,0,0,0.75)',
      }}
    >
      {photos.map((filename) => (
        <img
          key={filename}
          src={`/photos/${filename}`}
          alt={filename}
          draggable={false}
          loading="eager"
          style={{ width: STRIP_W, display: 'block' }}
        />
      ))}
    </div>
  )
}
