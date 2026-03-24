'use client'

import { useState, useEffect } from 'react'

const ROTATIONS  = [-4, 3, -2, 5, -3, 2, -5, 4, -1, 3, -3, 4, -2, 5]
const PHOTO_H    = 600   // px — uniform height, width auto-sizes to avoid cropping
const OVERLAP    = -200    // px of horizontal overlap between photos in a row

function formatDate(filename) {
  const base = filename.replace(/\.[^.]+$/, '').split('_')[0]
  if (base.length !== 8 || !/^\d{8}$/.test(base)) return ''
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const m = parseInt(base.slice(0, 2), 10) - 1
  const d = parseInt(base.slice(2, 4), 10)
  const y = base.slice(4, 8)
  return `${MONTHS[m]} ${d}, ${y}`
}

function sameDay(a, b) {
  if (!a) return false
  return a.split('_')[0].replace(/\.[^.]+$/, '') ===
         b.split('_')[0].replace(/\.[^.]+$/, '')
}

function PhotoItem({ filename, index, prevFilename, zIndex }) {
  const rotate   = ROTATIONS[index % ROTATIONS.length]
  const date     = formatDate(filename)
  const showDate = !sameDay(prevFilename, filename)

  return (
    <div style={{
      flexShrink: 0,
      position: 'relative',
      zIndex,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{ transform: `rotate(${rotate}deg)`, transformOrigin: 'center top' }}>
        <img
          src={`/photos/${filename}`}
          alt={date || filename}
          style={{
            height: PHOTO_H,
            width: 'auto',
            display: 'block',
            boxShadow: '4px 6px 24px rgba(0,0,0,0.6)',
          }}
          loading="eager"
        />
      </div>

      {showDate && date && (
        <div style={{
          marginTop: 8,
          fontSize: '10px',
          fontFamily: 'var(--font-body)',
          color: 'rgba(255,255,255,0.5)',
          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          letterSpacing: '0.04em',
        }}>
          {date}
        </div>
      )}
    </div>
  )
}

export default function Photobooth() {
  const [photos,  setPhotos]  = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/photos')
      .then((r) => r.json())
      .then((data) => { setPhotos(data.photos ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{
        padding: '80px 0',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        color: 'rgba(255,255,255,0.35)',
        fontSize: '13px',
      }}>
        loading photos...
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div style={{
        padding: '80px 40px',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        color: 'rgba(255,255,255,0.35)',
        fontSize: '13px',
        lineHeight: 1.8,
      }}>
        <div style={{ fontSize: '2rem', marginBottom: 12 }}>📷</div>
        Upload your photos to <code style={{ color: 'rgba(255,255,255,0.55)' }}>public/photos/</code><br />
        Name them by date: <code style={{ color: 'rgba(255,255,255,0.55)' }}>MMDDYYYY.jpg</code><br />
        Multiple from same day: <code style={{ color: 'rgba(255,255,255,0.55)' }}>MMDDYYYY_2.jpg</code>
      </div>
    )
  }

  // Pre-build rows alternating 3 → 2 → 3 → 2…
  const rows = []
  let i = 0
  let rowIdx = 0
  while (i < photos.length) {
    const count = rowIdx % 2 === 0 ? 3 : 2
    rows.push(
      photos.slice(i, i + count).map((filename, col) => ({
        filename,
        absIndex: i + col,
      }))
    )
    i += count
    rowIdx++
  }

  return (
    <div style={{ padding: '50px 60px 100px', display: 'flex', flexDirection: 'column', gap: 56 }}>
      {rows.map((row, ri) => (
        <div
          key={ri}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            // Alternate row indent so it looks scattered, not grid-like
            marginLeft: ri % 2 === 0 ? 0 : 90,
          }}
        >
          {row.map(({ filename, absIndex }, col) => (
            <div
              key={filename}
              style={{ marginLeft: col > 0 ? -OVERLAP : 0 }}
            >
              <PhotoItem
                filename={filename}
                index={absIndex}
                prevFilename={absIndex > 0 ? photos[absIndex - 1] : null}
                // Later photo in the row sits on top
                zIndex={col + 1}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
