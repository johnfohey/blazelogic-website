#!/usr/bin/env python3
"""Fetch the Fairways & Side Bets RSS feed and write episodes.json.

Single source of truth is always the live feed:
https://fairways-side-bets-feed-blaze-logic.vercel.app/feed.xml
This script only mirrors it into a same-origin JSON file so the static
site (GitHub Pages, no server) can render the player without CORS issues.
It also downloads each episode's MP3 into audio/ and points episodes.json
at the local file, so browsers fetch bytes directly from blazelogic.io --
no cross-origin redirects, no signed-URL expiry, no third-party CDN.
Run by .github/workflows/refresh-episodes.yml on a schedule.

Safety rules:
- New episodes are detected by stable <guid> identifiers, not just dates.
- If the feed fetch fails or yields zero usable episodes, the existing
  episodes.json is left untouched (last good list is preserved) and the
  script exits non-zero.
- If the episode list is unchanged, the file is not rewritten, so the
  Action commits only on real changes.
"""
import json
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

FEED_URL = os.environ.get(
    "PODCAST_FEED_URL",
    "https://fairways-side-bets-feed-blaze-logic.vercel.app/feed.xml",
)
OUT_PATH = os.environ.get("EPISODES_JSON_PATH", "episodes.json")
ITUNES_NS = "http://www.itunes.com/dtds/podcast-1.0.dtd"
MAX_EPISODES = 4  # latest in the player + 3 recent selectable
AUDIO_DIR = os.environ.get("EPISODES_AUDIO_DIR", "audio")
MIN_AUDIO_BYTES = 100_000  # sanity floor; real episodes are ~2 MB


def clean_html(text):
    text = re.sub(r"<[^>]+>", " ", text or "")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def fmt_duration(secs):
    try:
        s = int(float(secs))
    except (TypeError, ValueError):
        return ""
    m, sec = divmod(s, 60)
    h, m = divmod(m, 60)
    return f"{h}:{m:02d}:{sec:02d}" if h else f"{m}:{sec:02d}"


def ensure_local_audio(guid, remote_url):
    """Download the episode MP3 into audio/{guid}.mp3; return its repo-relative
    path, or None if the download/validation failed (caller keeps remote URL)."""
    safe = re.sub(r"[^A-Za-z0-9_-]", "_", guid)
    os.makedirs(AUDIO_DIR, exist_ok=True)
    local_rel = f"{AUDIO_DIR}/{safe}.mp3"
    if os.path.exists(local_rel) and os.path.getsize(local_rel) >= MIN_AUDIO_BYTES:
        return local_rel
    try:
        req = urllib.request.Request(remote_url, headers={"User-Agent": "BlazeLogic-episodes-bot/1.0"})
        with urllib.request.urlopen(req, timeout=180) as resp:
            with open(local_rel, "wb") as f:
                while True:
                    chunk = resp.read(65536)
                    if not chunk:
                        break
                    f.write(chunk)
        size = os.path.getsize(local_rel)
        with open(local_rel, "rb") as f:
            head = f.read(4)
        valid_mp3 = head[:3] == b"ID3" or (len(head) == 4 and head[0] == 0xFF and (head[1] & 0xE0) == 0xE0)
        if size < MIN_AUDIO_BYTES or not valid_mp3:
            raise RuntimeError(f"downloaded file failed validation (size={size})")
        print(f"downloaded {local_rel} ({size} bytes)")
        return local_rel
    except Exception as e:
        print(f"audio download failed for {guid}, keeping remote URL: {e}", file=sys.stderr)
        try:
            if os.path.exists(local_rel):
                os.remove(local_rel)
        except OSError:
            pass
        return None


def fetch_episodes():
    req = urllib.request.Request(FEED_URL, headers={"User-Agent": "BlazeLogic-episodes-bot/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        status = getattr(resp, "status", None)
        if status is not None and status != 200:
            raise RuntimeError(f"feed HTTP {status}")
        data = resp.read()
    root = ET.fromstring(data)
    channel = root.find("channel")
    if channel is None:
        raise RuntimeError("no channel element in feed")
    items = []
    for it in channel.findall("item"):
        title = (it.findtext("title") or "").strip()
        guid_el = it.find("guid")
        guid = (guid_el.text or "").strip() if guid_el is not None else ""
        pub = it.findtext("pubDate") or ""
        try:
            dt = parsedate_to_datetime(pub).astimezone(timezone.utc)
        except Exception:
            continue
        enc = it.find("enclosure")
        audio = enc.get("url") if enc is not None else ""
        if not title or not guid or not audio:
            continue
        dur_el = it.find(f"{{{ITUNES_NS}}}duration")
        desc = clean_html(it.findtext("description") or it.findtext(f"{{{ITUNES_NS}}}summary") or "")
        items.append({
            "id": guid,
            "title": title,
            "pubDate": dt.strftime("%Y-%m-%d"),
            "pubDateDisplay": dt.strftime("%B %-d, %Y"),
            "audioUrl": audio,
            "duration": dur_el.text.strip() if dur_el is not None and dur_el.text else "",
            "durationDisplay": fmt_duration(dur_el.text) if dur_el is not None else "",
            "description": desc[:220] + ("…" if len(desc) > 220 else ""),
        })
    items.sort(key=lambda e: e["pubDate"], reverse=True)
    return items[:MAX_EPISODES]


def main():
    try:
        episodes = fetch_episodes()
    except Exception as e:
        print(f"feed fetch failed, keeping existing {OUT_PATH}: {e}", file=sys.stderr)
        return 1
    if not episodes:
        print(f"feed yielded zero episodes, keeping existing {OUT_PATH}", file=sys.stderr)
        return 1

    for e in episodes:
        local = ensure_local_audio(e["id"], e["audioUrl"])
        if local:
            e["audioUrl"] = local

    new_sig = [(e["id"], e["audioUrl"]) for e in episodes]
    if os.path.exists(OUT_PATH):
        try:
            old = json.load(open(OUT_PATH, encoding="utf-8"))
            old_sig = [(x.get("id"), x.get("audioUrl")) for x in old.get("episodes", [])]
            if old_sig == new_sig:
                print("episodes and audio URLs unchanged, not rewriting")
                return 0
        except Exception as e:
            print(f"could not read existing {OUT_PATH}, will rewrite: {e}", file=sys.stderr)

    out = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "feed": FEED_URL,
        "episodes": episodes,
    }
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"wrote {OUT_PATH} with {len(episodes)} episodes")
    return 0


if __name__ == "__main__":
    sys.exit(main())
