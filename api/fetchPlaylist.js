// /api/fetchPlaylist.js

// ⬇️ THIS IS THE CORRECTED IMPORT ⬇️
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const YtDlpWrap = require("yt-dlp-wrap");

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

    // ✅ yt-dlp-wrap is itself the class, so instantiate directly
    const ytDlpWrap = new YtDlpWrap();

    // Run yt-dlp and parse JSON output
    const jsonBuffer = await ytDlpWrap.execPromise([
      url,
      "--flat-playlist",
      "-J",
    ]);

    const data = JSON.parse(jsonBuffer.toString());
    const result = (data.entries || []).map((v) => ({
      id: v.id,
      title: v.title,
      thumb: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
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