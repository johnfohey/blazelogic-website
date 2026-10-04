// Serves the owner-approved AI Daily podcast cover as a stable public JPEG.
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const file = path.join(process.cwd(), 'assets', 'AI_Daily_Official_Podcast_Cover_1400.jpg.b64');
    const b64 = fs.readFileSync(file, 'utf8').trim();
    const image = Buffer.from(b64, 'base64');

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', String(image.length));
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, immutable');
    res.status(200).send(image);
  } catch (error) {
    console.error('AI Daily cover error:', error);
    res.status(500).send('Podcast cover error');
  }
};
