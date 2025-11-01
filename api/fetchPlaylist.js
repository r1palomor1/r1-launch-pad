// /api/fetchPlaylist.js
import youtubedl from "yt-dlp-exec";

export default async function handler(req, res) {
  try {
    const playlistId = req.query.id;
    if (!playlistId) {
      return res.status(400).json({ error: "Missing playlist id" });
    }

    const url = `https://www.youtube.com/playlist?list=${playlistId}`;
    const data = await youtubedl(url, {
      dumpSingleJson: true,
      flatPlaylist: true
    });

    const result = (data.entries || []).map(v => ({
      id: v.id,
      title: v.title,
      thumb: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`
    }));

    res.setHeader("Cache-Control", "max-age=3600");
    res.status(200).json(result);
  } catch (err) {
    console.error("yt-dlp error:", err);
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
}
