const PLAYLIST_ID = 'PLxI3-frbvbrDsxY2ozPgufOCApbe3rJa3'

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey || apiKey === 'your_api_key_here') {
    return Response.json({ tracks: [], error: 'No API key configured' })
  }

  try {
    const tracks = []
    let pageToken = ''

    do {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${apiKey}${pageToken ? `&pageToken=${pageToken}` : ''}`
      const res  = await fetch(url)
      const data = await res.json()

      if (!res.ok) {
        return Response.json({ tracks: [], error: data.error?.message ?? 'API error' })
      }

      for (const item of data.items ?? []) {
        const s = item.snippet
        if (s.title === 'Private video' || s.title === 'Deleted video') continue
        tracks.push({
          id:        s.resourceId.videoId,
          title:     s.title,
          artist:    s.videoOwnerChannelTitle ?? '',
          thumbnail: s.thumbnails?.default?.url ?? null,
        })
      }

      pageToken = data.nextPageToken ?? ''
    } while (pageToken)

    return Response.json({ tracks })
  } catch (e) {
    return Response.json({ tracks: [], error: e.message })
  }
}
