import { readdir } from 'fs/promises'
import { join } from 'path'

// Converts MMDDYYYY → YYYYMMDD so filenames sort chronologically
function toSortKey(filename) {
  const base = filename.replace(/\.[^.]+$/, '').split('_')[0]
  if (base.length !== 8 || !/^\d{8}$/.test(base)) return '99991231_' + filename
  const mm   = base.slice(0, 2)
  const dd   = base.slice(2, 4)
  const yyyy = base.slice(4, 8)
  return `${yyyy}${mm}${dd}`
}

export async function GET() {
  try {
    const dir   = join(process.cwd(), 'public', 'photos')
    const files = await readdir(dir)

    const images = files
      .filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
      .sort((a, b) => {
        const ka = toSortKey(a)
        const kb = toSortKey(b)
        if (ka !== kb) return ka.localeCompare(kb)
        return a.localeCompare(b)   // _2, _3 within same day
      })

    return Response.json({ photos: images })
  } catch {
    // Directory missing or unreadable → return empty list
    return Response.json({ photos: [] })
  }
}
