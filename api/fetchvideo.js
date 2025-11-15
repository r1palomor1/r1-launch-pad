export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { videoIds } = req.query;
    
    if (!videoIds) {
      return res.status(400).json({ error: 'videoIds parameter required' });
    }

    const ids = Array.isArray(videoIds) ? videoIds : [videoIds];
    const results = [];

    for (const videoId of ids) {
      const baseParams = { 
        engine: "youtube", 
        search_query: videoId, 
        num: 1 
      };

      const serpApiUrl = new URL('https://serpapi.com/search');
      Object.entries(baseParams).forEach(([key, val]) => {
        serpApiUrl.searchParams.append(key, val);
      });
      serpApiUrl.searchParams.append('api_key', process.env.SERPAPI_KEY || '');

      const response = await fetch(serpApiUrl.toString());
      const data = await response.json();

      if (data.video_results && data.video_results.length > 0) {
        const video = data.video_results[0];
        results.push({
          id: videoId,
          title: video.title || null,
          link: video.link || null,
          thumbnail: (video.thumbnail?.static || video.thumbnail) || null,
          artist: (video.channel?.name || null),
          views: video.views || null,
          duration: video.length || null
        });
      } else {
        results.push({
          id: videoId,
          title: null,
          link: null,
          thumbnail: null,
          artist: null,
          views: null,
          duration: null
        });
      }
    }

    return res.status(200).json({ videos: results });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video metadata', details: error.message });
  }
}