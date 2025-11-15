// This endpoint is no longer used. 
// Video metadata enrichment happens client-side using PluginMessageHandler (Songs mode pattern).
// See script.js enrichPlaylistWithMetadata() for details.

export default function handler(req, res) {
  res.status(410).json({ error: 'This endpoint is deprecated. Metadata enrichment is now client-side.' });
}