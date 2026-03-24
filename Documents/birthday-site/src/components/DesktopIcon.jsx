'use client'

export default function DesktopIcon({ emoji, label, onClick }) {
  return (
    <button className="desktop-icon" onClick={onClick} onDoubleClick={onClick}>
      <span className="desktop-icon-emoji">{emoji}</span>
      <span className="desktop-icon-label">{label}</span>
    </button>
  )
}
