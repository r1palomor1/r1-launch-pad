// /api/fetchPlaylist.js

import ytpl from 'ytpl';

/**
 * Fetches a YouTube playlist and returns simplified JSON
 */
export default async function handler(req, res) {
  try {
    const playlistId = req.query.id;
    if (!playlistId) {
      return res.status(400).json({ error: "Missing playlist id" });
    }

    // No download, no /tmp, no binary. Just call the function.
    // { limit: Infinity } ensures we get all videos, not just the first 100.
    const playlist = await ytpl(playlistId, { limit: Infinity });

    // Map the results to match the exact format your app expects
    const result = playlist.items.map((v) => ({
      id: v.id,
      title: v.title,
      // Use the 'bestThumbnail' URL provided by ytpl
      thumb: v.bestThumbnail.url,
    }));

    res.setHeader("Cache-Control", "max-age=3600");
    res.status(200).json(result);
  } catch (err) {
    console.error("ytpl error:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch playlist", details: err.message });
  }
}