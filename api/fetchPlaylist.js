import { Innertube } in 'youtubei.js';

// This function is temporarily UNUSED
function formatPlaylistResults(data) {
    // ... (content doesn't matter, it's not being called)
}

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
    
    // === LOGIC 2: DEBUGGING - Fetch and return 3 RAW pages ===
    } else if (query) {
        
        console.log("--- DEBUG: Fetching Page 1 ---");
        const page1Results = await youtube.search(query, {
            type: 'playlist'
        });
        
        let page2Results = null;
        let page3Results = null;

        const page2Continuation = page1Results.continuation;
        if (page2Continuation) {
            console.log("--- DEBUG: Fetching Page 2 ---");
            page2Results = await youtube.getContinuation(page2Continuation);
        }

        const page3Continuation = page2Results?.continuation;
        if (page3Continuation) {
            console.log("--- DEBUG: Fetching Page 3 ---");
            page3Results = await youtube.getContinuation(page3Continuation);
        }

        console.log("--- DEBUG: Returning 3 full raw page objects to browser ---");

        // Return a big debug object with all 3 raw page results
        return res.status(200).json({
            message: "DEBUG: Returning raw page objects. Inspect 'page1_raw_results', 'page2_raw_results', etc.",
            page1_raw_results: page1Results,
            page2_raw_results: page2Results,
            page3_raw_results: page3Results
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