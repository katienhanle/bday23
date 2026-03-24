// Colors here are for the pink window variant (dark text on dusty pink background)
const muted = { color: 'var(--win-pink-muted)', fontSize: '11px' }
const divider = { borderTop: '1px solid rgba(0,0,0,0.12)', margin: '10px 0' }

export default function About() {
  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px' }}>
      {/* Avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          border: '2.5px solid rgba(0,0,0,0.2)',
          background: 'rgba(255,255,255,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', flexShrink: 0,
        }}>✨</div>
        <div>
          <div style={{
            fontFamily: 'var(--font-title)',
            fontSize: '1.9rem',
            color: 'var(--win-pink-text)',
            lineHeight: 1,
          }}>
            {/* EDIT: replace with their name */}
            Your Name Here
          </div>
          <div style={{ ...muted, marginTop: 3 }}>🎂 April 9 · version 1.0</div>
        </div>
      </div>

      <div style={divider} />

      {[
        ['Status',    <><span style={{ color: '#2a9d2a' }}>●</span> Online &amp; amazing</>],
        ['Location',  'Your city here 📍'],
        ['Mood',      '✨ Glowing as always'],
        ['Interests', 'Add their interests here'],
        ['Fun fact',  'Write a fun fact about them'],
      ].map(([label, val]) => (
        <div key={label} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
          <span style={{ ...muted, fontWeight: 700, minWidth: 72, paddingTop: 1 }}>{label}</span>
          <span style={{ color: 'var(--win-pink-text)', lineHeight: 1.4 }}>{val}</span>
        </div>
      ))}

      <div style={divider} />

      <div style={{ ...muted, lineHeight: 1.7 }}>
        <div>birthday-site v1.0.0</div>
        <div>April 9, 2026</div>
        <div>memory: infinite love allocated</div>
      </div>
    </div>
  )
}
