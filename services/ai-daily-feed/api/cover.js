// Serves the owner-approved Fairways & Side Bets podcast cover as a stable public JPEG.
const SOURCE =
  'https://raw.githubusercontent.com/johnfohey/blazelogic-website/main/services/ai-daily-feed/assets/Fairways_Side_Bets_FINAL_Approved_1400.jpg';

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

    const image = Buffer.from(await upstream.arrayBuffer());

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', String(image.length));
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    res.status(200).send(image);
  } catch (error) {
    console.error('AI Daily cover error:', error);
    res.status(500).send('Podcast cover error');
  }
};
