# BlazeLogic Official Website

Premium software company website built with semantic HTML, CSS3, and vanilla JavaScript.

## Overview

This is the official website for **BlazeLogic LLC**, a software company specializing in thoughtful, dependable product development.

- **Dark premium aesthetic** with technology blue and accent orange
- **Fully responsive** design (mobile-first)
- **Zero dependencies** (no frameworks required)
- **Fast loading** and SEO-optimized
- **Accessible** with semantic HTML and WCAG compliance
- **Deployable to GitHub Pages** with custom domain support

## Technology Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, modern layout, subtle animations
- **JavaScript (Vanilla)** — No frameworks, pure vanilla JS
- **GitHub Pages** — Free deployment

## Project Structure

```
blazelogic-website/
├── index.html           # Main website (single page)
├── styles.css           # All styling (dark theme, responsive)
├── script.js            # JavaScript interactivity
├── 404.html             # GitHub Pages 404 page
├── favicon.svg          # Brand icon
├── robots.txt           # SEO crawling directives
├── sitemap.xml          # SEO sitemap
├── CNAME                # Custom domain (blazelogic.io)
├── README.md            # This file
└── .gitignore           # Git ignore rules
```

## Sections

### 1. Navigation
- Fixed/sticky navbar with logo and navigation links
- Mobile hamburger menu
- Smooth scroll to sections
- Auto-closes on link click

### 2. Hero
- Large BlazeLogic logo with animated blue pulse
- Tagline and supporting statement
- Primary CTA: "Our Products"
- Secondary CTA: "Contact BlazeLogic"
- Subtle animated background

### 3. About
- Company mission and focus
- Value proposition
- 2-paragraph description

### 4. Products
- Golf Bets card (in development)
- Placeholder cards for future products
- Status badges and category tags

### 5. Our Approach
- Four principle cards
- Icons for each principle
- Think Deeply, Build Deliberately, Test Thoroughly, Improve Continuously

### 6. Contact
- Company info with email link
- Contact form (frontend only, no backend required)
- Form submissions stored in localStorage

### 7. Footer
- Copyright notice
- Privacy and Terms links (placeholders)

## Brand Colors

```css
--bg-primary:      #0D1117    (Dark background)
--blue:            #2563EB    (Technology blue)
--orange:          #FF6A00    (Accent orange)
--text-primary:    #E5E7EB    (Light text)
--text-secondary:  #64748B    (Gray text)
```

## Local Development

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor or IDE
- Git (optional, for version control)

### Quick Start

1. **Clone or download the project:**
   ```bash
   git clone <repository-url>
   cd blazelogic-website
   ```

2. **Start a local server:**
   
   **Using Python 3:**
   ```bash
   python3 -m http.server 8000
   ```
   
   **Using Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```
   
   **Using Node.js (http-server):**
   ```bash
   npm install -g http-server
   http-server
   ```
   
   **Using VS Code Live Server:**
   - Install the "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

4. **Edit files:**
   - HTML: `index.html`
   - Styles: `styles.css`
   - Scripts: `script.js`

## Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click **New** → Create a new repository
3. Name it: `blazelogic-website` (or any name)
4. Make it **Public**
5. Click **Create repository**

### Step 2: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial BlazeLogic website"

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/blazelogic-website.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repository **Settings**
2. Scroll to **Pages** section
3. Under "Source," select **main** branch
4. Click **Save**

Your site will be available at: `https://YOUR_USERNAME.github.io/blazelogic-website/`

### Step 4: Set Up Custom Domain (blazelogic.io)

1. In **Settings** → **Pages**
2. Enter your domain: `blazelogic.io`
3. Click **Save**

This file (`CNAME`) is already configured in the repo.

**Important:** Configure DNS records with your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR_USERNAME.github.io |

(Refer to [GitHub's domain configuration guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for your registrar)

## Features

### Animations
- **Fade in/up** on page load and scroll
- **Blue pulse** under logo
- **Hover glow** on cards and buttons
- **Smooth scrolling** between sections
- **Subtle background shift**

All animations respect `prefers-reduced-motion` for accessibility.

### Responsive Design
- **Mobile** (< 480px)
- **Tablet** (480px - 768px)
- **Desktop** (> 768px)

Tested and optimized for:
- iPhone 12/13/14/15
- iPad and iPad Pro
- MacBook, Windows laptops
- Android devices

### Accessibility
- Semantic HTML5
- WCAG 2.1 AA contrast ratios
- Keyboard navigation support
- ARIA labels where needed
- Form validation feedback
- Reduced motion support

### SEO
- Meta tags (title, description, keywords)
- Open Graph tags (social sharing)
- Twitter Card tags
- Structured data ready
- robots.txt
- sitemap.xml
- Fast page load

### Performance
- No external frameworks
- Minimal JavaScript
- Optimized CSS
- No blocking resources
- Favicon included
- Accessible color palette

## Contact Form

The contact form stores submissions in browser localStorage for now. It does not require a backend.

To add email functionality, integrate with:
- **Formspree** (free tier)
- **EmailJS** (free tier)
- **Mailgun** (API)
- **SendGrid** (API)

Example integration with Formspree:
```javascript
// Replace form submission handler in script.js
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
})
```

## Customization

### Colors
Edit `:root` variables in `styles.css`:
```css
:root {
    --bg-primary: #0D1117;
    --blue: #2563EB;
    --orange: #FF6A00;
    /* etc. */
}
```

### Typography
Modify font sizes and weights in `styles.css`:
```css
h1 { font-size: clamp(2.5rem, 6vw, 4rem); }
```

### Sections
Add new sections to `index.html`, then style in `styles.css`.

### Logo Animation
Edit `.logo-pulse` animation in `styles.css`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari 14+
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Main website markup, semantic structure |
| `styles.css` | All styling, responsive design, animations |
| `script.js` | Navigation, form, scroll interactions |
| `404.html` | GitHub Pages 404 error page |
| `favicon.svg` | Brand icon (16x16 to 512x512) |
| `robots.txt` | Search engine crawling directives |
| `sitemap.xml` | XML sitemap for SEO |
| `CNAME` | Custom domain configuration |
| `README.md` | This documentation |

## Performance Tips

1. **Minify on production** (optional)
   ```bash
   # CSS minification
   cssnano styles.css > styles.min.css
   
   # JS minification
   terser script.js > script.min.js
   ```

2. **Use a CDN** (optional)
   - GitHub Pages uses global CDN automatically

3. **Monitor Core Web Vitals**
   - Use PageSpeed Insights
   - Use Lighthouse (Chrome DevTools)

4. **Enable Gzip compression**
   - GitHub Pages automatically enables it

## Troubleshooting

### Website not showing on GitHub Pages
- Verify Settings → Pages has the correct branch selected
- Check that files are in the right location
- Wait 2-3 minutes for GitHub to rebuild

### Custom domain not working
- Verify DNS records are configured correctly
- Clear browser cache
- Wait up to 48 hours for DNS propagation
- Check CNAME file exists in repository

### Form not working
- Check browser console for JavaScript errors
- Verify localStorage is enabled
- For email integration, verify API credentials

### Responsive design issues
- Clear browser cache
- Test in Chrome DevTools mobile emulation
- Verify viewport meta tag in HTML

## Contributing

To maintain code quality:

1. Keep semantic HTML structure
2. Follow CSS variable naming conventions
3. Use vanilla JavaScript only
4. Test on mobile and desktop
5. Validate HTML with W3C validator
6. Test accessibility with axe DevTools

## License

© 2024 BlazeLogic LLC. All rights reserved.

---

## Support

For issues or questions:
- Email: john@blazelogic.io
- GitHub Issues: [Project Repository]

## Future Enhancements

Potential additions (not required for MVP):

- [ ] Blog section
- [ ] Team page
- [ ] Case studies
- [ ] API documentation
- [ ] Email backend integration
- [ ] Analytics tracking
- [ ] Multi-language support
- [ ] Dark mode toggle

---

**Last Updated:** January 2024

**Website Version:** 1.0

**Status:** Production Ready
