# Julian Rosero - Portfolio

Personal portfolio built with React, featuring a dual-mode experience for Game Development and Software Development profiles.

**Live site:** [enb4rr.github.io/portfolio](https://enb4rr.github.io/portfolio)

---

## Features

- Dual-mode portfolio (Game Dev / Software Dev) with distinct visual identities
- Animated backgrounds, typing effects, and interactive UI elements
- Project case studies with filterable skill tags
- Animated skills section with technology icons
- Contact form powered by EmailJS
- Fully responsive design
- Automated deployment via GitHub Actions

## Tech Stack

- React + Vite
- Framer Motion
- EmailJS
- GitHub Actions + GitHub Pages

## Project Structure

```
src/
  components/     # UI components (Navbar, Hero, About, Projects, Skills, Contact)
  context/        # ModeContext for global portfolio mode state
  data/           # All editable content (projects, skills, copy, contact info)
  assets/         # Static assets
  tokens.js       # Design tokens for both modes
```

## Adding or Updating Content

All portfolio content lives in `src/data/`:

- `projects.js` - project cards and case studies
- `skills.js` - skill categories and icons
- `content.js` - hero, about, and section copy
- `contact.js` - contact links and form labels

To add a new project, add an entry to the relevant array in `projects.js`. No component changes needed.

## Local Development

```bash
npm install
npm run dev
```

Create a `.env` file in the root with your EmailJS credentials:

```
VITE_EMAILJS_SERVICE=your_service_id
VITE_EMAILJS_TEMPLATE=your_template_id
VITE_EMAILJS_KEY=your_public_key
```

## Deployment

Pushing to `main` triggers an automated build and deploy via GitHub Actions. Environment variables are managed through GitHub Secrets.

---

Built by Julian Rosero · Vancouver, BC · 2026
