'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Window from '@/components/Window'
import LeftNav from '@/components/LeftNav'
import SecretMsg from '@/components/apps/SecretMsg'
import Welcome from '@/components/apps/Welcome'
import Playlist from '@/components/apps/Playlist'
import VideoPlayer from '@/components/apps/VideoPlayer'
import Memories from '@/components/apps/Memories'
import Photobooth from '@/components/apps/Photobooth'
import Inbox from '@/components/apps/Inbox'
import InboxPreview from '@/components/apps/InboxPreview'
import Stickers from '@/components/apps/Stickers'
import PhotostripPreview from '@/components/PhotostripPreview'


// ─── Window config ────────────────────────────────────────────────────────
// viewId: the navigation view this window maximizes into (null = no dedicated view)
const WINDOWS = [
  {
    id: 'welcome',
    icon: '✨', label: 'welcome.exe',
    title: 'welcome', url: 'bday.exe/welcome',
    width: 400, defaultPosition: { x: 210, y: 20 },
    variant: 'dark', rotate: -2,
    bodyStyle: { padding: 22 },
    component: Welcome,
    viewId: null,   // no dedicated nav view — lives on home screen only
  },
  {
    id: 'msg',
    icon: '💌', label: 'letter.exe',
    title: 'a letter', url: 'bday.exe/letter',
    width: 400, defaultPosition: { x: 620, y: 30 },
    variant: 'dark', rotate: 3,
    bodyStyle: { padding: 22 },
    component: SecretMsg,
    viewId: 'msg',
  },
  {
    id: 'inbox-preview',
    icon: '💬', label: 'inbox.exe',
    title: 'inbox', url: 'bday.exe/inbox',
    width: 220, defaultPosition: { x: 660, y: 440 },
    variant: 'dark', rotate: -2,
    bodyStyle: { padding: 16 },
    component: InboxPreview,
    viewId: 'inbox',
  },
  {
    id: 'memories',
    icon: '📷', label: 'memories.exe',
    title: 'our year', url: 'bday.exe/memories',
    width: 420, defaultPosition: { x: 190, y: 390 },
    variant: 'dark', rotate: 2,
    bodyStyle: { padding: 14, maxHeight: 400, overflowY: 'auto' },
    component: Memories,
    viewId: 'memories',
  },
  {
    id: 'playlist',
    icon: '🎵', label: 'playlist.exe',
    title: 'your playlist', url: 'music.bday.exe',
    width: 480, defaultPosition: { x: 700, y: 130 },
    variant: 'dark', rotate: -3,
    bodyStyle: { padding: 12 },
    component: Playlist,
    viewId: 'playlist',
  },
  {
    id: 'inbox',
    icon: '💬', label: 'inbox.exe',
    title: 'inbox', url: 'bday.exe/inbox',
    width: 480, defaultPosition: { x: 400, y: 100 },
    variant: 'dark', rotate: 0,
    bodyStyle: { padding: 20, maxHeight: 500, overflowY: 'auto' },
    component: Inbox,
    viewId: 'inbox',
  },
  {
    id: 'video',
    icon: '🎬', label: 'birthday_video.exe',
    title: 'birthday video', url: 'bday.exe/video',
    width: 520, defaultPosition: { x: 960, y: 25 },
    variant: 'dark', rotate: -3,
    bodyStyle: { padding: 0 },
    component: VideoPlayer,
    viewId: 'video',
  },
  {
    id: 'stickers',
    icon: '🎨', label: 'stickers.exe',
    title: 'stickers', url: 'bday.exe/stickers',
    width: 420, defaultPosition: { x: 300, y: 150 },
    variant: 'dark', rotate: 0,
    bodyStyle: { padding: 24 },
    component: Stickers,
    viewId: 'stickers',
  },
]

// Background stars — left side clear for nav
const STARS = [
  { top: '7%',  left: '19%', size: '1.7rem', op: 0.7,  delay: '0s' },
  { top: '14%', left: '73%', size: '1.3rem', op: 0.55, delay: '0.7s' },
  { top: '63%', left: '9%',  size: '1.5rem', op: 0.6,  delay: '1.4s' },
  { top: '78%', left: '87%', size: '1.9rem', op: 0.5,  delay: '0.4s' },
  { top: '47%', left: '95%', size: '1.1rem', op: 0.65, delay: '1.1s' },
  { top: '5%',  left: '51%', size: '1.2rem', op: 0.45, delay: '1.8s' },
  { top: '88%', left: '39%', size: '1.4rem', op: 0.55, delay: '0.6s' },
  { top: '35%', left: '4%',  size: '1rem',   op: 0.5,  delay: '1.3s' },
  { top: '90%', left: '63%', size: '1.6rem', op: 0.4,  delay: '0.2s' },
]

function buildInitialState() {
  const s = {}
  WINDOWS.forEach((w) => {
    // msg starts closed — opened by clicking the envelope
    s[w.id] = { open: w.id !== 'msg' && w.id !== 'video' && w.id !== 'inbox' && w.id !== 'stickers', minimized: false, z: 1 }
  })
  return s
}

// ─── Photobooth full-screen view (bg shows through) ──────────────────────
function PhotoboothView({ onBack }) {
  return (
    <div style={{
      position: 'absolute',
      left: 175,
      top: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
    }}>
      {/* Titlebar */}
      <div style={{
        background: 'var(--win-dark-bar)',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
        fontFamily: 'var(--font-title)',
        fontSize: '16px',
        color: 'white',
        cursor: 'default',
      }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <span className="win-btn win-btn-close" onClick={onBack} title="Back to Home">✕</span>
          <span className="win-btn win-btn-min">−</span>
          <span className="win-btn win-btn-max" style={{ opacity: 0.5, cursor: 'default' }}>+</span>
        </div>
        <div className="window-url">
          📷 bday.exe/photobooth
        </div>
        <span style={{ width: 50, flexShrink: 0 }} />
      </div>

      {/* Scrollable content — semi-transparent so bg.jpg shows through */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'rgba(0, 0, 0, 0.38)',
      }}>
        <Photobooth />
      </div>
    </div>
  )
}

// ─── Full-screen view for a single app ────────────────────────────────────
function FullScreenView({ win, onBack, appProps = {}, originPos = null }) {
  const App = win.component
  const isMedia = win.id === 'video' || win.id === 'inbox' || win.id === 'memories'
  const bodyBg      = win.variant === 'pink' ? 'var(--win-pink-body)'   : 'var(--win-dark-body)'
  const titlebarBg  = win.variant === 'pink' ? 'var(--win-pink-bar)'    : 'var(--win-dark-bar)'
  const textColor   = win.variant === 'pink' ? 'var(--win-pink-text)'   : 'var(--win-dark-text)'

  // Compute transform-origin relative to the FullScreenView container (left: 175)
  const transformOrigin = originPos
    ? `${Math.max(0, originPos.x - 175)}px ${originPos.y}px`
    : 'center center'


  return (
    <div style={{
      position: 'absolute',
      left: 175,
      top: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      transformOrigin,
      animation: 'fsv-expand 0.38s cubic-bezier(0.16, 1, 0.3, 1) backwards',
    }}>
      {/* Titlebar */}
      <div style={{
        background: titlebarBg,
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
        fontFamily: 'var(--font-title)',
        fontSize: '16px',
        color: 'white',
        cursor: 'default',
      }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {/* Red = go back to Home */}
          <span
            className="win-btn win-btn-close"
            onClick={onBack}
            title="Back to Home"
          >✕</span>
          <span className="win-btn win-btn-min" title="—">−</span>
          {/* Green = already maximized, visual indicator */}
          <span
            className="win-btn win-btn-max"
            title="Maximized"
            style={{ opacity: 0.5, cursor: 'default' }}
          >+</span>
        </div>

        <div className="window-url" style={{ borderRadius: 0 }}>
          {win.icon && <span style={{ marginRight: 4 }}>{win.icon}</span>}
          {win.url}
        </div>

        <span style={{ width: 50, flexShrink: 0 }} />
      </div>

      {/* Scrollable content */}
      <div className="fsv-scroll" style={{
        flex: 1,
        overflowY: isMedia ? 'hidden' : 'auto',
        background: bodyBg,
        color: textColor,
      }}>
        <div style={{
          maxWidth: isMedia ? '100%' : 680,
          margin: '0 auto',
          padding: isMedia ? 0 : '36px 32px',
          height: isMedia ? '100%' : undefined,
        }}>
          <App {...appProps} />
        </div>
      </div>
    </div>
  )
}

// ─── Main Desktop ──────────────────────────────────────────────────────────
function NavIcon({ id, size = 22 }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (id === 'home') return (
    <svg {...props}>
      <path d="M3 12L12 4l9 8"/>
      <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
    </svg>
  )
  if (id === 'inbox') return (
    <svg {...props}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  )
  if (id === 'memories') return (
    <svg {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7l-2-3H10L8 7"/>
      <circle cx="12" cy="14" r="3"/>
    </svg>
  )
  if (id === 'photobooth') return (
    <svg {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )
  if (id === 'playlist') return (
    <svg {...props}>
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  )
  if (id === 'video') return (
    <svg {...props}>
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  )
  if (id === 'stickers') return (
    <svg {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
  return null
}

const MOBILE_NAV = [
  { id: 'home',       label: 'Home'     },
  { id: 'inbox',      label: 'Inbox'    },
  { id: 'memories',   label: 'Memories' },
  { id: 'photobooth', label: 'Photos'   },
  { id: 'playlist',   label: 'Music'    },
  { id: 'video',      label: 'Video'    },
  { id: 'stickers',   label: 'Stickers' },
]

export default function Desktop() {
  // 'home' | 'msg' | 'memories' | 'playlist' | 'video'
  const [view, setView]           = useState('home')
  const [wins, setWins]           = useState(buildInitialState)
  const [inboxInitialId, setInboxInitialId] = useState(null)
  const [viewOrigin, setViewOrigin]         = useState(null)
  const [isMobile, setIsMobile]             = useState(false)
  const topZ                      = useRef(10)

  function nextZ() { topZ.current += 1; return topZ.current }

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const navigate = useCallback((id) => {
    if (id === 'home' || id === 'photobooth') {
      setView(id)
    } else {
      // open the corresponding window if it was closed, then switch view
      const win = WINDOWS.find((w) => w.viewId === id)
      if (win) {
        const z = nextZ()
        setWins((w) => ({ ...w, [win.id]: { open: true, minimized: false, z } }))
      }
      setView(id)
    }
  }, [])

  const closeWindow = useCallback((id) => {
    setWins((w) => ({ ...w, [id]: { ...w[id], open: false } }))
  }, [])

  const minimizeWindow = useCallback((id) => {
    setWins((w) => ({ ...w, [id]: { ...w[id], minimized: true } }))
  }, [])

  const focusWindow = useCallback((id) => {
    const z = nextZ()
    setWins((w) => ({ ...w, [id]: { ...w[id], z } }))
  }, [])

  // Draggable envelope
  const [envPos, setEnvPos]     = useState({ x: 560, y: 470 })
  const envDragging              = useRef(false)
  const envOffset                = useRef({ x: 0, y: 0 })
  const envMoved                 = useRef(false)

  function envMouseDown(e) {
    if (e.button !== 0) return
    envDragging.current = true
    envMoved.current = false
    envOffset.current = { x: e.clientX - envPos.x, y: e.clientY - envPos.y }
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    function onMove(e) {
      if (!envDragging.current) return
      envMoved.current = true
      setEnvPos({
        x: Math.max(0, e.clientX - envOffset.current.x),
        y: Math.max(0, e.clientY - envOffset.current.y),
      })
    }
    function onUp() {
      if (envDragging.current) {
        envDragging.current = false
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

  // Draggable video.png
  const [vidPos, setVidPos]     = useState({ x: 920, y: 390 })
  const vidDragging              = useRef(false)
  const vidOffset                = useRef({ x: 0, y: 0 })
  const vidMoved                 = useRef(false)

  function vidMouseDown(e) {
    if (e.button !== 0) return
    vidDragging.current = true
    vidMoved.current = false
    vidOffset.current = { x: e.clientX - vidPos.x, y: e.clientY - vidPos.y }
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    function onMove(e) {
      if (!vidDragging.current) return
      vidMoved.current = true
      setVidPos({
        x: Math.max(0, e.clientX - vidOffset.current.x),
        y: Math.max(0, e.clientY - vidOffset.current.y),
      })
    }
    function onUp() {
      if (vidDragging.current) { vidDragging.current = false; document.body.style.userSelect = '' }
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
  }, [])

  // Draggable tv.gif
  const [tvPos, setTvPos]     = useState({ x: 1050, y: 300 })
  const tvDragging             = useRef(false)
  const tvOffset               = useRef({ x: 0, y: 0 })

  function tvMouseDown(e) {
    if (e.button !== 0) return
    tvDragging.current = true
    tvOffset.current = { x: e.clientX - tvPos.x, y: e.clientY - tvPos.y }
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    function onMove(e) {
      if (!tvDragging.current) return
      setTvPos({
        x: Math.max(0, e.clientX - tvOffset.current.x),
        y: Math.max(0, e.clientY - tvOffset.current.y),
      })
    }
    function onUp() {
      if (tvDragging.current) { tvDragging.current = false; document.body.style.userSelect = '' }
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
  }, [])

  // Draggable sticker1
  const [stickerFlipped, setStickerFlipped] = useState(false)
  const [stickerPos, setStickerPos]         = useState({ x: 420, y: 200 })
  const stickerDragging                  = useRef(false)
  const stickerOffset                    = useRef({ x: 0, y: 0 })
  const stickerMoved                     = useRef(false)

  function stickerMouseDown(e) {
    if (e.button !== 0) return
    stickerDragging.current = true
    stickerMoved.current = false
    stickerOffset.current = { x: e.clientX - stickerPos.x, y: e.clientY - stickerPos.y }
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    function onMove(e) {
      if (!stickerDragging.current) return
      stickerMoved.current = true
      setStickerPos({
        x: Math.max(0, e.clientX - stickerOffset.current.x),
        y: Math.max(0, e.clientY - stickerOffset.current.y),
      })
    }
    function onUp() {
      if (stickerDragging.current) { stickerDragging.current = false; document.body.style.userSelect = '' }
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
  }, [])


  // Randomised photostrips — fetched once on mount
  const [strips, setStrips] = useState([[], []])

  useEffect(() => {
    fetch('/api/photos')
      .then((r) => r.json())
      .then(({ photos }) => {
        const gifs = (photos ?? []).filter((f) => /\.gif$/i.test(f))
        if (gifs.length < 1) return
        // Pick 2 random GIFs (different if possible)
        const i1 = Math.floor(Math.random() * gifs.length)
        let   i2 = Math.floor(Math.random() * gifs.length)
        if (gifs.length > 1) {
          while (i2 === i1) i2 = Math.floor(Math.random() * gifs.length)
        }
        setStrips([[gifs[i1]], [gifs[i2]]])
      })
      .catch(() => {})
  }, [])

  // The window config for the current full-screen view
  const activeWin = view !== 'home' ? WINDOWS.find((w) => w.id === view) : null

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="desktop-bg" style={{
        width: '100vw',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'var(--font-body)',
      }}>

        {/* Content area */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>

          {/* Home */}
          <div style={{
            display: view === 'home' ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '32px 24px',
            gap: 24,
          }}>
            <div style={{
              fontFamily: 'var(--font-title)',
              fontSize: '2.4rem',
              color: 'var(--pink-hot)',
              textShadow: '0 0 20px rgba(255,63,164,0.45)',
              textAlign: 'center',
              lineHeight: 1.15,
            }}>
              ariel's<br />23rd birthday!
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
              tap below to explore ✦
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, width: '100%', maxWidth: 340 }}>
              {MOBILE_NAV.filter(n => n.id !== 'home').map(item => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    padding: '14px 6px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <NavIcon id={item.id} size={24} />
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>


          {/* Inbox */}
          <div style={{ display: view === 'inbox' ? 'block' : 'none', height: '100%', overflow: 'hidden' }}>
            <Inbox isMobile={true} />
          </div>

          {/* Memories */}
          <div style={{ display: view === 'memories' ? 'block' : 'none', height: '100%', overflow: 'hidden' }}>
            <Memories showMonthNav={true} isMobile={true} />
          </div>

          {/* Photobooth */}
          <div style={{ display: view === 'photobooth' ? 'block' : 'none', height: '100%', overflowY: 'auto' }}>
            <Photobooth />
          </div>

          {/* Playlist */}
          <div style={{ display: view === 'playlist' ? 'block' : 'none', height: '100%', overflowY: 'auto' }}>
            <Playlist />
          </div>

          {/* Video */}
          <div style={{ display: view === 'video' ? 'block' : 'none', height: '100%' }}>
            <VideoPlayer />
          </div>

          {/* Stickers */}
          <div style={{ display: view === 'stickers' ? 'block' : 'none', height: '100%', overflowY: 'auto' }}>
            <Stickers />
          </div>
        </div>

        {/* Bottom tab bar */}
        <div style={{
          flexShrink: 0,
          height: 58,
          background: 'var(--win-dark-bar)',
          borderTop: '1px solid var(--win-dark-border)',
          display: 'flex',
          alignItems: 'stretch',
          overflowX: 'auto',
        }}>
          {MOBILE_NAV.map(item => {
            const active = view === item.id
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                style={{
                  flex: '0 0 auto',
                  minWidth: 60,
                  background: 'none',
                  border: 'none',
                  borderTop: active ? '2px solid var(--pink-hot)' : '2px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                  padding: '0 10px',
                }}
              >
                <NavIcon id={item.id} size={20} />
                <span style={{
                  fontSize: '8px',
                  fontFamily: 'var(--font-body)',
                  color: active ? 'var(--pink-hot)' : 'rgba(255,255,255,0.35)',
                  whiteSpace: 'nowrap',
                }}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div
      className="desktop-bg"
      style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      {/* ★ Background stars — only show in home view so they don't peek behind full-screen */}
      {view === 'home' && STARS.map((s, i) => (
        <span key={i} style={{
          position: 'absolute',
          top: s.top, left: s.left,
          fontSize: s.size,
          color: 'var(--star)',
          '--sop': s.op,
          opacity: s.op,
          animation: 'star-pulse 5s ease-in-out infinite',
          animationDelay: s.delay,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          lineHeight: 1,
        }}>★</span>
      ))}

      {/* Home view: draggable windows — always mounted so positions persist across nav */}
      {WINDOWS.map((w) => {
        const state = wins[w.id]
        if (w.id === 'msg')           return null   // letter opens via envelope only
        if (w.id === 'video')         return null   // video opens via video.png only
        if (w.id === 'inbox')         return null   // full inbox hidden — preview shows on home
        if (w.id === 'inbox-preview') return null   // rendered as fixed chat panel below
        if (w.id === 'stickers')      return null   // nav-only view
        if (!state.open || state.minimized) return null
        const App = w.component
        return (
          <div key={w.id} style={{ display: view === 'home' ? undefined : 'none' }}>
            <Window
              title={w.title}
              icon={w.icon}
              url={w.url}
              width={w.width}
              defaultPosition={w.defaultPosition}
              zIndex={state.z}
              variant={w.variant}
              rotate={w.rotate}
              onClose={() => closeWindow(w.id)}
              onMinimize={() => minimizeWindow(w.id)}
              onMaximize={w.viewId ? () => { setViewOrigin(w.defaultPosition); setView(w.viewId) } : undefined}
              onFocus={() => focusWindow(w.id)}
              bodyStyle={w.bodyStyle}
            >
              <App onOpen={w.id === 'inbox-preview'
                ? (id) => { setInboxInitialId(id); navigate('inbox') }
                : w.viewId ? () => navigate(w.viewId) : undefined}
              />
            </Window>
          </div>
        )
      })}

      {/* Photostrip preview — click opens Photobooth tab */}
      {strips[0].length > 0 && (
        <div style={{ display: view === 'home' ? undefined : 'none' }}>
          <PhotostripPreview
            photos={strips[0]}
            defaultPosition={{ x: 1080, y: 50 }}
            zIndex={2}
            rotate={5}
            onClick={() => navigate('photobooth')}
          />
        </div>
      )}

      {/* video.png — draggable, click opens video tab */}
      <img
        src="/video.png"
        alt="birthday video"
        draggable={false}
        className="video-hover"
        onMouseDown={vidMouseDown}
        onClick={() => { if (!vidMoved.current) navigate('video') }}
        style={{
          display: view === 'home' ? undefined : 'none',
          position: 'absolute',
          left: vidPos.x,
          top: vidPos.y,
          width: 270,
          cursor: 'grab',
          zIndex: 5,
          filter: 'drop-shadow(3px 4px 12px rgba(0,0,0,0.6))',
        }}
      />

      {/* Envelope — draggable, click to open inbox */}
      <img
        src="/letter.png"
        alt="open letter"
        draggable={false}
        className="letter-hover"
        onMouseDown={envMouseDown}
        onClick={() => { if (!envMoved.current) navigate('inbox') }}
        style={{
          display: view === 'home' ? undefined : 'none',
          position: 'absolute',
          left: envPos.x,
          top: envPos.y,
          width: 270,
          cursor: 'grab',
          zIndex: 5,
          filter: 'drop-shadow(3px 4px 12px rgba(0,0,0,0.6))',
        }}
      />

      {/* tv.gif — draggable, hover to enlarge, no click action */}
      <img
        src="/tv1.gif"
        alt="tv"
        draggable={false}
        onMouseDown={tvMouseDown}
        className="sticker-hover"
        style={{
          display: view === 'home' ? undefined : 'none',
          position: 'absolute',
          left: tvPos.x,
          top: tvPos.y,
          height: 240,
          width: 'auto',
          cursor: 'grab',
          zIndex: 4,
          filter: 'drop-shadow(2px 3px 8px rgba(0,0,0,0.4))',
        }}
      />

      {/* Sticker 1 — draggable, click to flip, hover to enlarge */}
      <img
        src={stickerFlipped ? '/wispa.jpg' : '/sticker1.PNG'}
        alt="sticker"
        draggable={false}
        onMouseDown={stickerMouseDown}
        onClick={() => { if (!stickerMoved.current) setStickerFlipped(f => !f) }}
        className="sticker-hover"
        style={{
          display: view === 'home' ? undefined : 'none',
          position: 'absolute',
          left: stickerPos.x,
          top: stickerPos.y,
          height: 220,
          width: 'auto',
          cursor: 'grab',
          zIndex: 4,
          filter: 'drop-shadow(2px 3px 8px rgba(0,0,0,0.4))',
        }}
      />


      {/* Photobooth full-screen view */}
      {view === 'photobooth' && (
        <PhotoboothView onBack={() => setView('home')} />
      )}

      {/* Full-screen view for a specific app */}
      {activeWin && (
        <FullScreenView
          key={view}
          win={activeWin}
          onBack={() => setView('home')}
          appProps={
            activeWin.id === 'inbox'    ? { initialSelectedId: inboxInitialId } :
            activeWin.id === 'memories' ? { showMonthNav: true } :
            {}
          }
          originPos={viewOrigin}
        />
      )}

      {/* Inbox chat panel — fixed bottom right, home view only */}
      {view === 'home' && (
        <InboxPreview
          onOpen={(id) => { setInboxInitialId(id); navigate('inbox') }}
        />
      )}

      {/* Left nav — always visible */}
      <LeftNav currentView={view} onNavigate={navigate} />
    </div>
  )
}
