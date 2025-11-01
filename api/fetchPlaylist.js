// /api/fetchPlaylist.js

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const YtDlpWrap = require("yt-dlp-wrap");

/**
 * Fetches a YouTube playlist and returns simplified JSON
 */
export default async function handler(req, res) {
  try {
    // 1. Define the only writable path in Vercel
    const ytDlpPath = "/tmp/yt-dlp";

    // 2. Download the binary to that path
    // This only runs on a "cold start" of the function
    await YtDlpWrap.default.downloadFromGithub(ytDlpPath);

    const playlistId = req.query.id;
    if (!playlistId) {
      return res.status(400).json({ error: "Missing playlist id" });
    }

    const url = `https://www.youtube.com/playlist?list=${playlistId}`;

    // 3. Instantiate the wrapper, telling it where the binary is
    const ytDlpWrap = new YtDlpWrap.default(ytDlpPath);

    // 4. Run the command
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