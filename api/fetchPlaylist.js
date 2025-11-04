// /api/fetchPlaylist.js

import { Innertube } from 'youtubei.js';

/**
 * Fetches a YouTube playlist and returns simplified JSON
 */
export default async function handler(req, res) {
  try {
    const playlistId = req.query.id;
    if (!playlistId) {
      return res.status(400).json({ error: 'Missing playlist id' });
    }

    // 1. Create a new Innertube session
    const youtube = await Innertube.create();

    // 2. Fetch the initial playlist data
    const playlist = await youtube.getPlaylist(playlistId);

    if (!playlist.videos) {
      return res.status(404).json({ error: 'Playlist not found or is empty' });
    }

    // ⬇️ *** THIS LINE HAS BEEN REMOVED *** ⬇️
    // await playlist.videos.next(0); 
    // ⬆️ *** IT WAS CAUSING THE CRASH *** ⬆️

    // 3. Map the results (which now contain all videos)
    const result = playlist.videos.map((v) => ({
      id: v.id,
      title: v.title.text,
      // Get the highest resolution thumbnail (usually the last one)
      thumb: v.thumbnails[v.thumbnails.length - 1].url,
    }));

    // Get the playlist's main title
    console.log('DEBUG: playlist object keys:', Object.keys(playlist));
    console.log('DEBUG: playlist.title:', playlist.title);
    console.log('DEBUG: playlist.info:', playlist.info);
    console.log('DEBUG: playlist.header:', playlist.header);
    const playlistTitle = playlist.title?.text || playlist.title || 'YouTube Playlist';

    // Wrap the results in an object
    const responseData = {
      title: playlistTitle,
      videos: result
    };

    // Add CORS Headers to allow any domain to request this
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Prevent caching of stale titles while allowing reasonable performance
    res.setHeader('Cache-Control', 'no-cache, max-age=300'); // 5 minute cache
    res.setHeader('ETag', `"${Date.now()}-${playlistId}"`); // Unique ETag per request
    res.status(200).json(responseData); 
  } catch (err) {
    console.error('youtubei.js error:', err);
    res
      .status(500)
      .json({ error: 'Failed to fetch playlist', details: err.message });
  }
}