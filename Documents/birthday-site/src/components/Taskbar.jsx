'use client'

import { useState, useEffect } from 'react'

export default function Taskbar({ minimized, onRestore }) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    function tick() {
      const now = new Date()
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      setDate(now.toLocaleDateString([], { month: 'short', day: 'numeric' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 46,
      background: 'var(--white)',
      borderTop: '2px solid var(--pink-border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 14px',
      gap: 8,
      zIndex: 10000,
      boxShadow: '0 -2px 12px rgba(255, 63, 164, 0.1)',
    }}>
      {/* Logo */}
      <span style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.25rem',
        color: 'var(--pink-hot)',
        paddingRight: 12,
        borderRight: '2px solid var(--pink-light)',
        marginRight: 4,
        whiteSpace: 'nowrap',
      }}>
        ✦ birthday.exe
      </span>

      {/* Minimized window restore buttons */}
      {minimized.map((w) => (
        <button
          key={w.id}
          onClick={() => onRestore(w.id)}
          style={{
            background: 'var(--pink-pale)',
            border: '1.5px solid var(--pink-border)',
            borderRadius: 20,
            color: 'var(--pink-hot)',
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 600,
            padding: '4px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            whiteSpace: 'nowrap',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--pink-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--pink-pale)')}
        >
          <span>{w.icon}</span>
          <span>{w.label}</span>
        </button>
      ))}

      {/* Clock */}
      <div style={{
        marginLeft: 'auto',
        paddingLeft: 12,
        borderLeft: '2px solid var(--pink-light)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        lineHeight: 1.25,
      }}>
        <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text)' }}>{time}</span>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{date}</span>
      </div>
    </div>
  )
}
