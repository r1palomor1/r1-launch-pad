import { Innertube } from 'youtubei.js';

// This function is temporarily UNUSED while we debug
function formatPlaylistResults(data) {
    const results = data.contents?.map(item => {
        if (item.type !== 'Playlist') return null;
        return {
            playlist_id: item.id,
            title: item.title.text,
            thumbnail: item.thumbnails[0]?.url || null,
            video_count: item.video_count?.text || item.video_count || 'N/A'
        };
    }).filter(Boolean);
    return {
        playlist_results: results || [],
        continuation: data.continuation || null
    };
}

export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { id, query, continuation } = req.query;
    const youtube = await Innertube.create();

    // === LOGIC 1: Fetch a specific playlist (Existing "is.gd" & Overlay Logic) ===
    if (id) {
        // ... (This logic remains unchanged and correct)
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
    
    // === LOGIC 2: DEBUGGING - Fetch 3 pages of raw data ===
    } else if (query) {
        
        console.log("--- DEBUG: Fetching Page 1 ---");
        const page1Results = await youtube.search(query, {
            type: 'playlist'
        });
        
        // This array will hold all items from all pages
        const all_contents = [...(page1Results.contents || [])];
        
        let page2Continuation = page1Results.continuation;
        let page2Results = null;
        let page3Continuation = null;
        let page3Results = null;

        if (page2Continuation) {
            console.log("--- DEBUG: Fetching Page 2 ---");
            page2Results = await youtube.getContinuation(page2Continuation);
            all_contents.push(...(page2Results.contents || []));
            page3Continuation = page2Results.continuation;
        }

        if (page3Continuation) {
            console.log("--- DEBUG: Fetching Page 3 ---");
            page3Results = await youtube.getContinuation(page3Continuation);
            all_contents.push(...(page3Results.contents || []));
        }

        console.log(`--- DEBUG: Total items fetched: ${all_contents.length} ---`);

        // Return a big debug object
        return res.status(200).json({
            message: `DEBUG: Returning raw contents from 3 pages. Total items: ${all_contents.length}`,
            page1_continuation: page1Results.continuation,
            page2_continuation: page2Results?.continuation || null,
            page3_continuation: page3Results?.continuation || null,
            total_items_fetched: all_contents.length,
            all_contents: all_contents // This is the full list of items
        });

    // === LOGIC 3: Temporarily inactive ===
    } else if (continuation) {
        return res.status(400).json({ error: 'Continuation logic is disabled during debug.' });
    
    // === LOGIC 4: No valid parameter provided ===
    } else {
      return res.status(400).json({ error: 'A query or id is required' });
    }

  } catch (error) {
    console.error('Vercel API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from YouTube', details: error.message });
  }
}