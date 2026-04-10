import { Inter, Playfair_Display } from 'next/font/google'
// import localFont from 'next/font/local'   ← uncomment when font file is ready
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// ─── FONT SWAP INSTRUCTIONS ────────────────────────────────────────────────
// 1. Drop your OTF file at:  src/app/fonts/LacheyardScript.otf
// 2. Delete the `dancingScript` block below
// 3. Uncomment `localFont` import above
// 4. Uncomment the `lacheyard` block below
// 5. Replace `dancingScript.variable` with `lacheyard.variable` on <html>
//
// const lacheyard = localFont({
//   src: './fonts/LacheyardScript.otf',
//   variable: '--font-lacheyard',
// })
// ──────────────────────────────────────────────────────────────────────────

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-lacheyard',   // same var name → zero other changes needed
})

export const metadata = {
  title: 'happy birthday 🩷',
  description: 'for you',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
