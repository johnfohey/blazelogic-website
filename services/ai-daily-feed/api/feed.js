// Stable Apple/Spotify wrapper for AI Daily by BlazeLogic LLC.
// Keeps the public wrapper URL unchanged while sourcing episodes from Muse.
// The owner-approved happy-Blaze artwork is enforced at both show and episode level.

const ORIGIN_FEED =
  'https://muse.ai/podcasts/feed/1443332972186099/0e8d610d-7cce-4155-8fd9-68ef71904ae2';

const SELF_URL =
  'https://ai-daily-feed-blaze-logic.vercel.app/feed.xml';

// Keep a version token in the artwork URL so podcast directories do not keep
// serving an older cached cover after an owner-approved artwork replacement.
const COVER_VERSION = 'happy-blaze-20261004';
const COVER_URL =
  'https://ai-daily-feed-blaze-logic.vercel.app/api/cover?v=' + COVER_VERSION;

const ITUNES_TAGS =
  '<itunes:author>BlazeLogic LLC</itunes:author>' +
  '<itunes:owner><itunes:name>BlazeLogic LLC</itunes:name>' +
  '<itunes:email>john@blazelogic.io</itunes:email></itunes:owner>' +
  '<itunes:type>episodic</itunes:type>' +
  '<itunes:category text="Technology" />' +
  '<itunes:image href="' + COVER_URL + '" />';

function enforceApprovedEpisodeArtwork(xml) {
  return xml.replace(/<item\b[^>]*>[\s\S]*?<\/item>/gi, (item) => {
    let cleaned = item
      // Remove upstream episode artwork so old artwork cannot override the
      // owner-approved happy-Blaze image in Apple Podcasts or Spotify.
      .replace(/<itunes:image\b[^>]*\/>/gi, '')
      .replace(/<itunes:image\b[^>]*>[\s\S]*?<\/itunes:image>/gi, '')
      // Remove common image-only media thumbnails that may otherwise be used
      // as episode artwork by consuming apps. Audio/video media remains intact.
      .replace(/<media:thumbnail\b[^>]*\/?\s*>/gi, '');

    cleaned = cleaned.replace(
      /(<item\b[^>]*>)/i,
      '$1<itunes:image href="' + COVER_URL + '" />'
    );

    return cleaned;
  });
}

module.exports = async (req, res) => {
  try {
    const upstream = await fetch(ORIGIN_FEED, {
      headers: {
        'User-Agent': 'BlazeLogic-Feed-Proxy/3.0 (+https://blazelogic.io)',
      },
      redirect: 'follow',
    });

    if (!upstream.ok) {
      res.status(502).send('Upstream podcast feed returned ' + upstream.status);
      return;
    }

    let xml = await upstream.text();

    // Ensure namespaces required by podcast directories are present.
    xml = xml.replace(
      /<rss\b([^>]*)>/i,
      (match, attrs) => {
        let updated = attrs;
        if (!/xmlns:itunes=/i.test(updated)) {
          updated += ' xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"';
        }
        if (!/xmlns:atom=/i.test(updated)) {
          updated += ' xmlns:atom="http://www.w3.org/2005/Atom"';
        }
        return '<rss' + updated + '>';
      }
    );

    const firstItem = xml.search(/<item\b/i);
    if (firstItem === -1) {
      res.status(502).send('Upstream podcast feed has no episode items');
      return;
    }

    let head = xml.slice(0, firstItem);
    let tail = xml.slice(firstItem);

    // Remove channel-level copies before injecting one authoritative set.
    head = head
      .replace(/<itunes:author\b[^>]*>[\s\S]*?<\/itunes:author>/ig, '')
      .replace(/<itunes:owner\b[^>]*>[\s\S]*?<\/itunes:owner>/ig, '')
      .replace(/<itunes:type\b[^>]*>[\s\S]*?<\/itunes:type>/ig, '')
      .replace(/<itunes:category\b[^>]*\/>/ig, '')
      .replace(/<itunes:image\b[^>]*\/>/ig, '')
      .replace(/<image\b[^>]*>[\s\S]*?<\/image>/ig, '')
      .replace(/<lastBuildDate\b[^>]*>[\s\S]*?<\/lastBuildDate>/ig, '')
      .replace(/<atom:link\b(?=[^>]*\brel=["']self["'])[^>]*\/?\s*>/ig, '');

    // Enforce the approved artwork on every existing and future episode.
    tail = enforceApprovedEpisodeArtwork(tail);

    const injected =
      '<atom:link href="' + SELF_URL + '" rel="self" type="application/rss+xml" />' +
      '<image><url>' + COVER_URL + '</url><title>AI Daily by BlazeLogic LLC</title><link>https://blazelogic.io</link></image>' +
      ITUNES_TAGS +
      '<lastBuildDate>' + new Date().toUTCString() + '</lastBuildDate>';

    xml = head + injected + tail;

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader(
      'Cache-Control',
      'public, max-age=0, s-maxage=300, stale-while-revalidate=60'
    );
    res.status(200).send(xml);
  } catch (error) {
    console.error('AI Daily feed proxy error:', error);
    res.status(500).send('Podcast feed proxy error');
  }
};
