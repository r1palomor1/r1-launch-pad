// /api/fetchPlaylist.js

import ytpl from '@distube/ytpl';

/**
 * Fetches a YouTube playlist and returns simplified JSON
 */
export default async function handler(req, res) {
  try {
    const playlistId = req.query.id;
    if (!playlistId) {
      return res.status(400).json({ error: 'Missing playlist id' });
    }

    // No download, no /tmp, no python. Just call the JS function.
    // { limit: Infinity } ensures we get all videos.
    const playlist = await ytpl(playlistId, { limit: Infinity });

    // Map the results to match the exact format your app expects
    const result = playlist.items.map((v) => ({
      id: v.id,
      title: v.name, // Note: @distube/ytpl uses 'name' not 'title'
      thumb: v.thumbnail,
    }));

    res.setHeader('Cache-Control', 'max-age=3600');
    res.status(200).json(result);
  } catch (err) {
    console.error('@distube/ytpl error:', err);
    res
      .status(500)
      .json({ error: 'Failed to fetch playlist', details: err.message });
  }
}