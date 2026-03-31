'use client'

const FILE_ID = '1DXOuoB_3t-IICnkojlp4Zm6L7BuiI9M6'

export default function VideoPlayer() {
  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Top bar */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid var(--win-dark-border)',
        padding: '7px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span>📼</span>
        <span style={{
          fontFamily: 'var(--font-title)',
          fontSize: '1rem',
          color: 'var(--win-dark-muted)',
          flex: 1,
        }}>
          birthday_video.mp4
        </span>
        <span style={{ fontSize: '10px', color: 'var(--win-dark-muted)', whiteSpace: 'nowrap' }}>
          ✦ with love
        </span>
      </div>

      {/* Video */}
      <iframe
        src={`https://drive.google.com/file/d/${FILE_ID}/preview`}
        width="100%"
        height="480"
        allow="autoplay"
        allowFullScreen
        style={{ display: 'block', border: 'none' }}
      />
    </div>
  )
}
