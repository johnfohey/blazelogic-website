# BlazeLogic Website — Deployment Checklist

## Quick Start (30 minutes to live)

### 1. Test Locally
- [ ] Download all files
- [ ] Start local server: `python3 -m http.server 8000`
- [ ] Open `http://localhost:8000`
- [ ] Test all sections and buttons
- [ ] Test navigation (desktop and mobile)
- [ ] Test contact form
- [ ] Verify responsive design

### 2. Prepare GitHub Repository
- [ ] Create GitHub account (if needed)
- [ ] Create new repository: `blazelogic-website` (public)
- [ ] Clone repository: `git clone <url>`
- [ ] Copy all files into repository folder
- [ ] Create `.git` folder: `git init`

### 3. Push to GitHub
```bash
# Add all files
git add .

# Commit
git commit -m "Initial BlazeLogic website deployment"

# Set branch to main
git branch -M main

# Add remote (replace USERNAME and REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### 4. Enable GitHub Pages
- [ ] Go to repository **Settings**
- [ ] Scroll to **Pages** section
- [ ] Under "Source," select **main** branch
- [ ] Click **Save**
- [ ] Wait 2-3 minutes for build
- [ ] Website live at: `https://USERNAME.github.io/REPO_NAME/`

### 5. Optional: Custom Domain Setup

#### Option A: No Custom Domain
- Skip to "Final Checks"
- Website lives at: `https://USERNAME.github.io/blazelogic-website/`

#### Option B: Use Custom Domain (blazelogic.io)

**A) GitHub Side:**
- [ ] Go to Settings → Pages
- [ ] Under "Custom domain," enter: `blazelogic.io`
- [ ] Click **Save**
- [ ] Wait for verification (usually 1-2 hours)

**B) Registrar Side (e.g., GoDaddy, Namecheap, Route53):**
- [ ] Log into domain registrar
- [ ] Find **DNS Settings** or **Name Servers**
- [ ] Add these A records:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- [ ] (Optional) Add CNAME for www:
  ```
  www → USERNAME.github.io
  ```
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Test: Visit `https://blazelogic.io`

### 6. Final Checks
- [ ] Website loads without errors
- [ ] All navigation works
- [ ] Contact form functions
- [ ] Mobile menu works
- [ ] No console errors (F12 → Console)
- [ ] SEO tags present (inspect page source)
- [ ] 404 page works (visit `/invalid-page`)
- [ ] Contact form submissions appear in localStorage (F12 → Application → localStorage)

---

## After Deployment

### Monitor Performance
- [ ] Use Google PageSpeed Insights
- [ ] Use Lighthouse (Chrome DevTools)
- [ ] Check for broken links (https://validator.w3.org)
- [ ] Test accessibility (https://wave.webaim.org)

### Future Updates
1. Edit files locally
2. Commit changes: `git commit -m "Update description"`
3. Push: `git push origin main`
4. GitHub auto-rebuilds (1-2 minutes)

### Add Email to Contact Form
When ready, integrate with Formspree or EmailJS:
1. Sign up for service
2. Get form ID
3. Update form handler in `script.js`
4. Test form submission

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| GitHub Pages not building | Check Settings → Pages, verify branch is main |
| Custom domain not working | Check DNS records, wait 48 hours, verify CNAME file exists |
| Website shows 404 | Verify correct GitHub Pages URL, check branch is published |
| Styles not loading | Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R) |
| Navigation menu broken | Verify all file names match (case-sensitive on GitHub) |
| Form not working | Check browser console for JavaScript errors |
| Mobile menu stuck | Clear browser cache and cookies |

---

## Quick Reference

### Files Included
- `index.html` — Main website
- `styles.css` — All styling
- `script.js` — Interactivity
- `404.html` — Error page
- `favicon.svg` — Icon
- `robots.txt` — SEO
- `sitemap.xml` — SEO
- `CNAME` — Domain config
- `README.md` — Full documentation
- `IMPLEMENTATION_SUMMARY.md` — Design details
- `DEPLOYMENT_CHECKLIST.md` — This file
- `.gitignore` — Git configuration

### Key URLs (After Deployment)
- **Main site:** `https://blazelogic.io` (or GitHub URL)
- **GitHub repo:** `https://github.com/USERNAME/blazelogic-website`
- **Settings:** `https://github.com/USERNAME/blazelogic-website/settings`
- **Pages config:** `https://github.com/USERNAME/blazelogic-website/settings/pages`

### GitHub Pages Limits
- Free hosting
- Unlimited bandwidth
- 1GB storage per site
- Public repositories only
- Built-in HTTPS
- Custom domain support

---

## Support

**Need help?**
- Read `README.md` for detailed instructions
- Check `IMPLEMENTATION_SUMMARY.md` for design details
- Refer to [GitHub Pages docs](https://docs.github.com/en/pages)
- Email: john@blazelogic.io

---

## Estimated Timeline

| Task | Time |
|------|------|
| Test locally | 5 min |
| Create GitHub repo | 5 min |
| Push code | 5 min |
| Enable GitHub Pages | 5 min |
| Wait for build | 3 min |
| Verify | 5 min |
| **Total** | **~30 min** |

**With custom domain:** Add 24-48 hours for DNS propagation.

---

**Ready to launch?** Follow the checklist above and you'll be live within the hour.

Good luck! 🚀

