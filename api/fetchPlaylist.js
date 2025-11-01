// /api/fetchPlaylist.js

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const YtDlpWrap = require("yt-dlp-wrap");

/**
 * Fetches a YouTube playlist and returns simplified JSON
 */
export default async function handler(req, res) {
  try {
    // ⬇️ --- CHANGE 1: DEFINE THE PATH --- ⬇️
    // We must use the /tmp directory, as it's the only writable one
    const ytDlpPath = "/tmp/yt-dlp";

    // ⬇️ --- CHANGE 2: DOWNLOAD THE BINARY --- ⬇️
    // Wait for the download to complete before trying to use it
    await YtDlpWrap.default.downloadFromGithub(ytDlpPath);

    const playlistId = req.query.id;
    if (!playlistId) {
      return res.status(400).json({ error: "Missing playlist id" });
    }

    const url = `https://www.youtube.com/playlist?list=${playlistId}`;

    // ⬇️ --- CHANGE 3: TELL THE WRAPPER WHERE THE BINARY IS --- ⬇️
    // Pass the file path to the constructor
    const ytDlpWrap = new YtDlpWrap.default(ytDlpPath);

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