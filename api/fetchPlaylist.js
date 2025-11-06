import { Innertube } from 'youtubei.js';

// Helper function to format playlist search results for the frontend
function formatPlaylistResults(data) {
    const results = data.contents?.map(item => {
        // === THIS IS THE FIX ===
        // Explicitly check the item's type.
        // The search returns a mix of Videos and Playlists.
        if (item.type !== 'Playlist') return null;
        
        // Now we are certain 'item' is a Playlist object
        return {
            playlist_id: item.id,
            title: item.title.text,
            thumbnail: item.thumbnails[0]?.url || null,
            video_count: item.video_count?.text || item.video_count || 'N/A'
        };
    }).filter(Boolean); // Filter out the nulls (videos)

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
        const playlist = await youtube.getPlaylist(id);

        if (!playlist.videos) {
            return res.status(404).json({ error: 'Playlist not found or is empty' });
        }

        const videos = playlist.videos.map(video => ({
            id: video.id,
            title: video.title.text,
            thumb: video.thumbnails[video.thumbnails.length - 1].url, // Get highest res
        }));
        
        const playlistTitle = playlist.info?.title || playlist.title?.text || 'YouTube Playlist';

        return res.status(200).json({
            title: playlistTitle,
            videos: videos
        });
    
    // === LOGIC 2: Search for playlists (New "Playlists" Mode Logic) ===
    } else if (query) {
        const searchResults = await youtube.search(query, {
            type: 'playlist' // This is the key change
        });
        
        const formattedData = formatPlaylistResults(searchResults);
        return res.status(200).json(formattedData);

    // === LOGIC 3: Get next page of search results (New Pagination Logic) ===
    } else if (continuation) {
        const nextPage = await youtube.getContinuation(continuation);

        const formattedData = formatPlaylistResults(nextPage);
        return res.status(200).json(formattedData);
    
    // === LOGIC 4: No valid parameter provided ===
    } else {
      return res.status(400).json({ error: 'A query, id, or continuation token is required' });
    }

  } catch (error) {
    console.error('Vercel API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from YouTube', details: error.message });
  }
}