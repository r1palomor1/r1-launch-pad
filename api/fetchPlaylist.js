// /api/fetchPlaylist.js
import pkg from "yt-dlp-wrap";
const { YtDlpWrap } = pkg;

/**
 * Fetches a YouTube playlist and returns simplified JSON
 */
export default async function handler(req, res) {
  try {
    const playlistId = req.query.id;
    if (!playlistId) {
      return res.status(400).json({ error: "Missing playlist id" });
    }

    const url = `https://www.youtube.com/playlist?list=${playlistId}`;

    // Initialize yt-dlp wrapper
    const ytDlpWrap = new YtDlpWrap();

    // Execute yt-dlp to get JSON playlist data
    const jsonBuffer = await ytDlpWrap.execPromise([
      url,
      "--flat-playlist",
      "-J"
    ]);

    const data = JSON.parse(jsonBuffer.toString());
    const result = (data.entries || []).map(v => ({
      id: v.id,
      title: v.title,
      thumb: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`
    }));

    res.setHeader("Cache-Control", "max-age=3600");
    res.status(200).json(result);
  } catch (err) {
    console.error("yt-dlp-wrap error:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch playlist", details: err.message });
  }
}
