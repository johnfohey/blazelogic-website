// Serves the owner-approved AI Daily podcast cover as a stable public JPEG.
const SOURCE =
  'https://raw.githubusercontent.com/johnfohey/blazelogic-website/main/services/ai-daily-feed/assets/AI_Daily_Official_Podcast_Cover_1400.jpg.b64';

module.exports = async (req, res) => {
  try {
    const upstream = await fetch(SOURCE, {
      headers: { 'User-Agent': 'BlazeLogic-Podcast-Cover/1.0' },
      redirect: 'follow',
    });

    if (!upstream.ok) {
      res.status(502).send('Unable to retrieve podcast cover');
      return;
    }

    const b64 = (await upstream.text()).trim();
    const image = Buffer.from(b64, 'base64');

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', String(image.length));
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    res.status(200).send(image);
  } catch (error) {
    console.error('AI Daily cover error:', error);
    res.status(500).send('Podcast cover error');
  }
};
