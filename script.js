// ===========================
// BlazeLogic Website v3
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // ---------- Mobile nav ----------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar-container') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ---------- Navbar scroll effect ----------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ---------- Contact form (real delivery via Web3Forms) ----------
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('contactSubmit');
    const formNote = document.getElementById('formNote');
    const originalButtonHTML = submitButton.innerHTML;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        formNote.classList.remove('success', 'error');

        if (!name || !email || !message) {
            formNote.textContent = 'Please fill in your name, email, and message.';
            formNote.classList.add('error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formNote.textContent = 'That email address doesn\u2019t look right — mind checking it?';
            formNote.classList.add('error');
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending…</span>';
        formNote.textContent = '';

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: '6ce66a05-5d8b-4fff-9b18-2dd4571f0983',
                name: name,
                email: email,
                message: message,
                subject: 'blazelogic.io contact: ' + name,
                from_name: 'blazelogic.io contact form'
            })
        })
        .then(function(response) {
            if (!response.ok) throw new Error('send failed');
            return response.json();
        })
        .then(function(data) {
            if (!data.success) throw new Error('send failed');
            form.reset();
            formNote.textContent = 'Message sent — thanks! We\u2019ll get back to you soon.';
            formNote.classList.add('success');
            submitButton.innerHTML = '<span>Sent ✓</span>';
            setTimeout(function() {
                submitButton.innerHTML = originalButtonHTML;
                submitButton.disabled = false;
            }, 3000);
        })
        .catch(function() {
            formNote.textContent = 'Something went wrong sending that. Email us directly at john@blazelogic.io and we\u2019ll take it from there.';
            formNote.classList.add('error');
            submitButton.innerHTML = originalButtonHTML;
            submitButton.disabled = false;
        });
    });

    // ---------- Scroll reveal ----------
    var revealTargets = document.querySelectorAll(
        '.app-featured, .roadmap-card, .podcast-grid, .about-content, .contact-form, .section-header'
    );
    revealTargets.forEach(function(el) { el.classList.add('reveal'); });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, index * 60);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        revealTargets.forEach(function(el) { observer.observe(el); });
    } else {
        revealTargets.forEach(function(el) { el.classList.add('visible'); });
    }

    // ---------- Press mode toggles ----------
    var pressDetails = {
        none: {
            tag: 'No Presses',
            title: 'Keep it simple',
            body: 'Play the original Nassau bets with no additional presses. Front, back, overall — and that is the whole story. No extra wagers get created, no matter how far anyone falls behind.'
        },
        auto: {
            tag: 'Auto Press',
            title: 'The comeback engine',
            body: 'When a player falls <strong>2 holes down</strong>, a new press opens automatically on the next hole — all square, same stake — while the original bet keeps running. A press can trigger its own press, but the chain is capped: original → Press #1 → Press #2. <strong>No Press #3.</strong>'
        },
        hardcore: {
            tag: 'Hardcore Press',
            title: 'Double or nothing',
            body: 'When a player falls <strong>2 holes down</strong>, the current bet ends immediately as a loss and a fresh bet starts all square on the next hole — same stake. The replacement chain is capped: original → Press #1 → Press #2, then stop. If Press #2 goes 2 down, it closes with no replacement.'
        }
    };
    var pressFootnote = 'Presses trigger on <strong>holes down</strong>, not strokes — and they are fully automatic: no offers, no declines.';
    var pressButtons = document.querySelectorAll('.press-mode[data-press]');
    var pressDetail = document.getElementById('pressDetail');
    function renderPress(key) {
        var d = pressDetails[key];
        if (!d || !pressDetail) return;
        pressDetail.innerHTML = '<h4><span class="press-tag">' + d.tag + '</span>' + d.title + '</h4><p>' + d.body + '</p><p class="press-note">' + pressFootnote + '</p>';
        pressDetail.classList.remove('press-detail-fade');
        void pressDetail.offsetWidth;
        pressDetail.classList.add('press-detail-fade');
    }
    pressButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            pressButtons.forEach(function(b) {
                b.classList.remove('is-active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('is-active');
            btn.setAttribute('aria-pressed', 'true');
            renderPress(btn.getAttribute('data-press'));
        });
    });
    if (pressButtons.length && pressDetail) renderPress('auto');
});
/* ===========================
   PODCAST PLAYER — Fairways & Side Bets
   Reads episodes.json (mirrored from the live RSS feed by a scheduled
   GitHub Action). Latest episode loads in the player; the 3 most recent
   are selectable below it.
   =========================== */
(function () {
    var card = document.getElementById('playerCard');
    if (!card) return;
    var audio = document.getElementById('podAudio');
    var playBtn = document.getElementById('playBtn');
    var iconPlay = document.getElementById('iconPlay');
    var iconPause = document.getElementById('iconPause');
    var track = document.getElementById('progressTrack');
    var playedBar = document.getElementById('playedBar');
    var bufferedBar = document.getElementById('bufferedBar');
    var timeCur = document.getElementById('timeCur');
    var timeDur = document.getElementById('timeDur');
    var speedBtn = document.getElementById('speedBtn');
    var pill = document.getElementById('playerPill');
    var titleEl = document.getElementById('epTitle');
    var metaEl = document.getElementById('epMeta');
    var descEl = document.getElementById('epDesc');
    var rowsEl = document.getElementById('recentRows');
    var episodes = [], current = -1;
    var speeds = [1, 1.25, 1.5, 2], speedIx = 0;

    function fmt(s) {
        if (!isFinite(s) || s < 0) return '0:00';
        s = Math.floor(s);
        var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
        return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(sec).padStart(2, '0');
    }
    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function setPlayingUI(playing) {
        iconPlay.style.display = playing ? 'none' : 'block';
        iconPause.style.display = playing ? 'block' : 'none';
        playBtn.setAttribute('aria-label', playing ? 'Pause episode' : 'Play episode');
    }
    function loadEpisode(i, autoplay) {
        current = i;
        var ep = episodes[i];
        audio.src = ep.audioUrl;
        audio.playbackRate = speeds[speedIx];
        titleEl.textContent = ep.title;
        metaEl.textContent = ep.pubDateDisplay + (ep.durationDisplay ? ' \u00B7 ' + ep.durationDisplay : '');
        descEl.textContent = ep.description || '';
        pill.textContent = i === 0 ? 'Latest episode' : 'Now playing';
        timeCur.textContent = '0:00';
        timeDur.textContent = ep.durationDisplay || '\u2013:\u2013\u2013';
        playedBar.style.width = '0%';
        bufferedBar.style.width = '0%';
        track.setAttribute('aria-valuenow', '0');
        var rows = rowsEl.children;
        for (var r = 0; r < rows.length; r++) rows[r].classList.toggle('is-active', r === i);
        if (autoplay) { audio.play().catch(function () {}); }
    }
    playBtn.addEventListener('click', function () {
        if (!episodes.length) return;
        if (audio.paused) { audio.play().catch(function () {}); } else { audio.pause(); }
    });
    audio.addEventListener('play', function () { setPlayingUI(true); });
    audio.addEventListener('pause', function () { setPlayingUI(false); });
    audio.addEventListener('ended', function () { setPlayingUI(false); });
    audio.addEventListener('error', function () {
        setPlayingUI(false);
        descEl.innerHTML = 'This episode wouldn\u2019t load in this browser \u2014 you can still listen on ' +
            '<a href="https://open.spotify.com/show/7Cn10TTwwopSbtUK8Dka5X" target="_blank" rel="noopener">Spotify</a> or ' +
            '<a href="https://podcasts.apple.com/us/podcast/fairways-side-bets-by-blazelogic/id6821447754" target="_blank" rel="noopener">Apple Podcasts</a>.';
    });
    audio.addEventListener('timeupdate', function () {
        if (audio.duration) {
            var pct = (audio.currentTime / audio.duration) * 100;
            playedBar.style.width = pct + '%';
            track.setAttribute('aria-valuenow', String(Math.round(pct)));
        }
        timeCur.textContent = fmt(audio.currentTime);
    });
    audio.addEventListener('loadedmetadata', function () {
        timeDur.textContent = fmt(audio.duration);
    });
    audio.addEventListener('progress', function () {
        try {
            if (audio.buffered.length && audio.duration) {
                bufferedBar.style.width = (audio.buffered.end(audio.buffered.length - 1) / audio.duration * 100) + '%';
            }
        } catch (e) {}
    });
    function seekFromEvent(clientX) {
        var rect = track.getBoundingClientRect();
        var ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
        if (audio.duration) audio.currentTime = ratio * audio.duration;
    }
    track.addEventListener('click', function (e) { seekFromEvent(e.clientX); });
    track.addEventListener('keydown', function (e) {
        if (!audio.duration) return;
        if (e.key === 'ArrowRight') { audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); e.preventDefault(); }
        if (e.key === 'ArrowLeft') { audio.currentTime = Math.max(0, audio.currentTime - 5); e.preventDefault(); }
    });
    document.getElementById('back15').addEventListener('click', function () {
        audio.currentTime = Math.max(0, audio.currentTime - 15);
    });
    document.getElementById('fwd15').addEventListener('click', function () {
        if (audio.duration) audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
    });
    speedBtn.addEventListener('click', function () {
        speedIx = (speedIx + 1) % speeds.length;
        audio.playbackRate = speeds[speedIx];
        speedBtn.innerHTML = String(speeds[speedIx]).replace(/\.0$/, '') + '&times;';
    });
    function renderRows() {
        rowsEl.innerHTML = '';
        episodes.slice(0, 3).forEach(function (ep, i) {
            var row = document.createElement('button');
            row.type = 'button';
            row.className = 'recent-row' + (i === 0 ? ' is-active' : '');
            row.setAttribute('aria-label', 'Play ' + ep.title);
            row.innerHTML =
                '<span class="recent-play" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 2l9 6-9 6z" fill="currentColor"/></svg></span>' +
                '<span class="recent-text"><span class="recent-title">' + escapeHtml(ep.title) + '</span>' +
                '<span class="recent-meta">' + escapeHtml(ep.pubDateDisplay) + (ep.durationDisplay ? ' \u00B7 ' + escapeHtml(ep.durationDisplay) : '') + '</span></span>' +
                (i === 0 ? '<span class="recent-tag">Latest</span>' : '');
            row.addEventListener('click', function () { loadEpisode(i, true); });
            rowsEl.appendChild(row);
        });
    }
    function showError() {
        titleEl.textContent = 'Episodes are on the way';
        metaEl.textContent = '';
        descEl.textContent = 'We couldn\u2019t reach the episode list just now \u2014 follow the show on Spotify or Apple Podcasts to listen.';
    }
    function init(data) {
        episodes = (data && data.episodes) || [];
        if (!episodes.length) { showError(); return; }
        renderRows();
        loadEpisode(0, false);
    }
    fetch('episodes.json', { cache: 'no-store' })
        .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
        .then(init)
        .catch(function () {
            if (window.EPISODES && window.EPISODES.length) init({ episodes: window.EPISODES });
            else showError();
        });
})();
