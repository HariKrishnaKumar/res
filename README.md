# Hari Krishna Kumar — Developer Portfolio

An interactive developer portfolio built on top of the Medusa JF-4 field
simulator. The original three.js jellyfish — geometry, shaders, materials,
lighting, camera choreography and the 25-second assembly timeline — is preserved
intact. The dashboard has been re-labelled as a professional interface, and the
resume content lives in a dossier overlay that opens from any panel.

## Stack

- Vite 8 + TypeScript tooling
- three.js (as declared in `package.json`; the original import map is retained)
- Vanilla ES modules for the portfolio layer — no additional runtime dependencies

## Run locally

```bash
bun install
bun run dev
```

Open the URL Vite prints (defaults to `http://localhost:3000`).

Production build:

```bash
bun run build
bun run preview
```

## Content

Every resume string lives in `src/resume-data.js`:

- name, designation, availability and professional profile
- two roles (CTO at Yajurvedh, Guest Lecturer in Bengaluru)
- nine skill groups and the eight-row stack panel
- education (BCA, CGPA 8.06)
- three project titles
- contact details

No employment dates, proficiency percentages or unverified metrics are
displayed.

## Interaction

- Drag the canvas to orbit; the timeline plays automatically.
- Click a dashboard panel (Technical Expertise, Professional Experience,
  AI & Computer Vision, Profile, Education, Projects, Portfolio
  Navigation) to open the matching dossier section.
- Tentacle labels on the 3D model (3 project + 5 skill anchors) open the
  Projects or Skills dossier section when clicked.
- Project buttons in the Projects panel open the Projects section.
- Use the sun/moon toggle in the header (or the dossier header) to switch
  between the light and dark technical themes. The choice is saved in
  `localStorage`; the system preference is used on a first visit.
- `Download Resume` serves the supplied PDF from `public/`.
- `Esc` closes the dossier; the background remains scroll-locked while it is
  open.

## Profile photograph

Replace `public/profile/profile-photo.jpg` with the final portrait using the
same filename. The dossier uses a 4:5 technical frame with `object-fit: cover`.
If the image is missing, a neutral HKK placeholder is shown instead of a broken
image.

## Assets

- `public/Hari_Krishna_Kumar_Resume.pdf` — supplied resume, served unchanged.
- `public/profile/profile-photo.jpg` — supplied portrait.
- `public/favicon.svg` — HKK jellyfish mark.
