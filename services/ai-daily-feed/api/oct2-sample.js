// Temporary AI Daily voice-sample endpoint for social Reel production.
// Serves the opening ~55 seconds of the Oct. 2, 2026 episode using the
// original podcast audio so Alex and Jordan's established voices are preserved.

const SOURCE =
  'https://muse.ai/podcasts/media/1443332972186099/0e8d610d-7cce-4155-8fd9-68ef71904ae2/ep-d33a6b8d-25e5-4e51-a399-4205a17eb9a4.mp3';

// Approximate byte rate from the published episode is ~8 KB/sec.
// 450,000 bytes keeps the sample under one minute while preserving the
// original MP3 header and opening dialogue.
const END_BYTE = 449999;

module.exports = async (req, res) => {
  try {
    const upstream = await fetch(SOURCE, {
      headers: { Range: 'bytes=0-' + END_BYTE },
      redirect: 'follow',
    });

    if (!(upstream.ok || upstream.status === 206)) {
      res.status(502).send('Unable to retrieve podcast sample');
      return;
    }

    const audio = Buffer.from(await upstream.arrayBuffer());

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', String(audio.length));
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.status(200).send(audio);
  } catch (error) {
    console.error('AI Daily sample proxy error:', error);
    res.status(500).send('Podcast sample proxy error');
  }
};
