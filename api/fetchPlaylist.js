// /api/fetchPlaylist.js
import YTDlpWrap from "yt-dlp-wrap";

/**
 * Fetches a YouTube playlist and returns a simplified JSON list
 * of { id, title, thumb } entries.
 */
export default async function handler(req, res) {
  try {
    const playlistId = req.query.id;
    if (!playlistId) {
      return res.status(400).json({ error: "Missing playlist id" });
    }

    const url = `https://www.youtube.com/playlist?list=${playlistId}`;
    const ytDlpWrap = new YTDlpWrap();

    // Run yt-dlp in flat playlist JSON mode
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
    return res.status(200).json(result);
  } catch (err) {
    console.error("yt-dlp-wrap error:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch playlist", details: err.message });
  }
}
