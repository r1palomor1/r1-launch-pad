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

    // 2. Fetch the playlist. This returns all videos.
    const playlist = await youtube.getPlaylist(playlistId);

    if (!playlist.videos) {
      return res.status(404).json({ error: 'Playlist not found or is empty' });
    }
    
    // 3. Map the results to match the exact format your app expects
    const result = playlist.videos.map((v) => ({
      id: v.id,
      title: v.title.text,
      // Get the highest resolution thumbnail (usually the last one)
      thumb: v.thumbnails[v.thumbnails.length - 1].url,
    }));

    res.setHeader('Cache-Control', 'max-age=3600');
    res.status(200).json(result);
  } catch (err) {
    console.error('youtubei.js error:', err);
    res
      .status(500)
      .json({ error: 'Failed to fetch playlist', details: err.message });
  }
}