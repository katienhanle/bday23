'use client'

import { useState, useEffect } from 'react'

// EDIT: your letter goes here
const FULL_TEXT = ``

export default function SecretMsg() {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(FULL_TEXT.slice(0, i))
      if (i >= FULL_TEXT.length) clearInterval(id)
    }, 40)
    return () => clearInterval(id)
  }, [])

  return (
    <p style={{
      fontFamily: 'var(--font-title)',
      fontSize: '1rem',
      lineHeight: 2,
      color: 'rgba(255,255,255,0.85)',
      whiteSpace: 'pre-wrap',
      minHeight: 110,
    }}>
      {displayed}
      <span style={{ opacity: displayed.length < FULL_TEXT.length ? 1 : 0 }}>▌</span>
    </p>
  )
}
