import { Innertube } from 'youtubei.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { id, query, continuation } = req.query;
    const youtube = await Innertube.create();

    // === LOGIC 1: Fetch a specific playlist (Unchanged) ===
    if (id) {
        const playlist = await youtube.getPlaylist(id);
        if (!playlist.videos) {
            return res.status(404).json({ error: 'Playlist not found or is empty' });
        }
        const videos = playlist.videos.map(video => ({
            id: video.id,
            title: video.title.text,
            thumb: video.thumbnails[video.thumbnails.length - 1].url,
        }));
        const playlistTitle = playlist.info?.title || playlist.title?.text || 'YouTube Playlist';
        return res.status(200).json({ title: playlistTitle, videos: videos });
    
    // === LOGIC 2: DEBUGGING - Return the ENTIRE Page 1 Object ===
    } else if (query) {
        
        console.log("--- DEBUG: Fetching Page 1 ---");
        const page1Results = await youtube.search(query, {
            type: 'playlist'
        });
        
        console.log("--- DEBUG: Returning RAW Page 1 object to browser ---");

        // This is the key change. We are sending the WHOLE object.
        return res.status(200).json({
            message: "DEBUG: This is the ENTIRE raw object from youtube.search()",
            raw_search_results: page1Results 
        });

    // === LOGIC 3 & 4 (Unchanged) ===
    } else if (continuation) {
        return res.status(400).json({ error: 'Continuation logic is disabled during debug.' });
    } else {
      return res.status(400).json({ error: 'A query or id is required' });
    }

  } catch (error) {
    console.error('Vercel API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from YouTube', details: error.message });
  }
}