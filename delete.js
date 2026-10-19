// Golf Bets — website Deletion Code submission (issue #70).
// The server (submit_deletion_code) verifies, consumes and acts on the code.
// This page reports success only when the server confirms "deleted".

(function () {
    'use strict';

    var SUPABASE_URL = 'https://sidpospsmyxwpproykwq.supabase.co';
    // Public (publishable/anon) project key, the same one the app ships with.
    // It only grants the anon role; the database decides what that role may do.
    var PUBLISHABLE_KEY = 'sb_publishable_Db5e0dA0kA9KJ6JrD-BJzA_XYJsrZTD';

    var PRIVACY_EMAIL = 'privacy@blazelogic.io';

    function ready(fn) {
        if (document.readyState !== 'loading') { fn(); } else { document.addEventListener('DOMContentLoaded', fn); }
    }

    ready(function () {
        // ---------- Mobile nav (this page doesn't load script.js) ----------
        var navToggle = document.getElementById('navToggle');
        var navMenu = document.getElementById('navMenu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function () {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        var form = document.getElementById('deletionForm');
        var input = document.getElementById('deletionCode');
        var button = document.getElementById('deletionSubmit');
        var note = document.getElementById('deletionNote');
        if (!form || !input || !button || !note) { return; }

        var configured = PUBLISHABLE_KEY.indexOf('REPLACE_WITH') !== 0 && PUBLISHABLE_KEY.length > 20;
        var busy = false;
        var done = false;

        function show(kind, parts) {
            // parts: array of strings and {email:true} / {strong:'text'} items; built with DOM nodes only.
            note.classList.remove('success', 'error');
            if (kind) { note.classList.add(kind); }
            while (note.firstChild) { note.removeChild(note.firstChild); }
            parts.forEach(function (p) {
                if (typeof p === 'string') {
                    note.appendChild(document.createTextNode(p));
                } else if (p.email) {
                    var a = document.createElement('a');
                    a.href = 'mailto:' + PRIVACY_EMAIL;
                    a.className = 'email-link';
                    a.textContent = PRIVACY_EMAIL;
                    note.appendChild(a);
                } else if (p.strong) {
                    var s = document.createElement('strong');
                    s.textContent = p.strong;
                    note.appendChild(s);
                }
            });
        }

        function setBusy(on) {
            busy = on;
            button.disabled = on || done;
            input.disabled = on || done;
            var label = button.querySelector('span');
            if (label) { label.textContent = on ? 'Deleting…' : 'Delete My Data'; }
        }

        if (!configured) {
            button.disabled = true;
            input.disabled = true;
            show('error', ['Online deletion is temporarily unavailable. Please use Delete My Data in the app, or email ', { email: true }, '.']);
            return;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (busy || done) { return; }

            var raw = input.value || '';
            var compact = raw.replace(/[^A-Za-z0-9]/g, '');
            if (compact.length !== 24) {
                show('error', ['A Deletion Code has 24 letters and numbers, like XXXX-XXXX-XXXX-XXXX-XXXX-XXXX. Please check it and try again.']);
                return;
            }

            setBusy(true);
            show(null, ['Checking your code…']);

            var controller = ('AbortController' in window) ? new AbortController() : null;
            var timer = controller ? setTimeout(function () { controller.abort(); }, 20000) : null;

            fetch(SUPABASE_URL + '/rest/v1/rpc/submit_deletion_code', {
                method: 'POST',
                mode: 'cors',
                credentials: 'omit',
                cache: 'no-store',
                referrerPolicy: 'no-referrer',
                headers: {
                    'apikey': PUBLISHABLE_KEY,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ p_code: raw }),
                signal: controller ? controller.signal : undefined
            }).then(function (res) {
                if (!res.ok) { throw new Error('http'); }
                return res.json();
            }).then(function (data) {
                if (timer) { clearTimeout(timer); }
                var status = data && typeof data === 'object' ? data.status : null;

                if (status === 'deleted') {
                    done = true;
                    input.value = '';
                    show('success', ['Your Golf Bets data has been deleted. If Golf Bets is still on your phone, it will start fresh the next time you use it.']);
                } else if (status === 'invalid') {
                    show('error', ['That code didn’t work. It may be mistyped, already used, replaced by a newer code, or expired. Get a new code in Golf Bets (gear icon → Privacy & Data → Get Deletion Code) and try again.']);
                } else if (status === 'manual_review') {
                    done = true;
                    input.value = '';
                    var ref = (data.reference && /^DR-[0-9A-Z]{10}$/.test(data.reference)) ? data.reference : null;
                    var parts = ['We verified your code, but some of your records need a manual review before they can be deleted. Nothing has been removed yet. Email ', { email: true }];
                    if (ref) { parts.push(' with reference ', { strong: ref }); }
                    parts.push(' and we’ll complete verified requests within 30 days.');
                    show(null, parts);
                } else if (status === 'busy') {
                    show('error', ['We couldn’t finish right now. Nothing was removed and your code still works. Please try again in a minute.']);
                } else {
                    show('error', ['Something went wrong, so we can’t confirm a deletion. Please try again in a few minutes, or email ', { email: true }, '.']);
                }
            }).catch(function () {
                if (timer) { clearTimeout(timer); }
                show('error', ['We couldn’t confirm whether your request went through. Please try again. If the code no longer works, your data may already have been deleted — email ', { email: true }, ' and we’ll confirm.']);
            }).then(function () {
                setBusy(false);
            });
        });
    });
})();
