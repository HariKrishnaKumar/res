/**
 * Dossier navigation: renders the resume sections from RESUME, opens the
 * overlay from dashboard panels, smooth-scrolls, and keeps the active section
 * highlighted. Uses one delegated click listener for the whole page.
 */

import { RESUME } from './resume-data.js';
import { PROJECT_ART } from './projects-art.js';

const SECTIONS = [
  { id: 'about', label: 'About', no: '01', title: 'Professional Profile' },
  { id: 'skills', label: 'Skills', no: '02', title: 'Technical Expertise' },
  { id: 'experience', label: 'Experience', no: '03', title: 'Professional Experience' },
  { id: 'education', label: 'Education', no: '04', title: 'Education' },
  { id: 'projects', label: 'Projects', no: '05', title: 'Projects' },
  { id: 'contact', label: 'Contact', no: '06', title: 'Contact' },
];

let dossier = null;
let scroller = null;
let closeBtn = null;
let lastFocus = null;
let spyFrame = 0;
let spyHold = 0;
let off = false;

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const head = (s) => `
  <div class="dsec-head">
    <span class="dsec-no">${s.no}</span>
    <h2 id="h-${s.id}">${esc(s.title)}</h2>
    <span class="dsec-tag">${s.id.toUpperCase()}</span>
  </div>`;

function navMarkup() {
  return SECTIONS.map(
    (s) =>
      `<button type="button" class="dnav" data-section="${s.id}" aria-controls="sec-${s.id}">${esc(
        s.label
      )}</button>`
  ).join('');
}

function about() {
  const r = RESUME;
  return `
    <section class="dsec" id="sec-about" aria-labelledby="h-about">
      ${head(SECTIONS[0])}
      <div class="dsec-body about-grid">
        <div class="about-main">
          <div class="about-eyebrow"><span class="dot"></span>${esc(r.availability)}</div>
          <div class="about-name">${esc(r.name)}</div>
          <div class="about-role">${esc(r.designation)}</div>
          <p class="about-copy">${esc(r.about)}</p>
          <div class="about-actions">
            <a class="btn-solid" href="public/Hari_Krishna_Kumar_Resume.pdf" download="Hari_Krishna_Kumar_Resume.pdf">DOWNLOAD RESUME</a>
            <button type="button" class="btn-line" data-section="contact">GET IN TOUCH</button>
          </div>
          <dl class="about-facts">
            <div><dt>ORGANISATION</dt><dd>${esc(r.organisation)}</dd></div>
            <div><dt>AVAILABILITY</dt><dd><span class="dot"></span>${esc(r.availability)}</dd></div>
            <div><dt>EDUCATION</dt><dd>${esc(r.education.short)} · CGPA ${esc(r.education.cgpa)}</dd></div>
            <div><dt>CLASSIFICATION</dt><dd>${esc(r.classification)}</dd></div>
          </dl>
        </div>
        <figure class="profile-card" data-profile>
          <div class="profile-frame">
            <div class="profile-placeholder" aria-hidden="true">
              <span class="profile-mark">HKK</span>
              <span class="profile-ph-label">PROFILE PHOTO</span>
              <small>ADD PUBLIC/PROFILE/PROFILE-PHOTO.JPG</small>
            </div>
            <img
              class="profile-photo"
              src="public/profile/profile-photo.jpg"
              alt="Hari Krishna Kumar"
              width="698"
              height="915"
              loading="eager"
              decoding="async"
            />
            <span class="profile-scan" aria-hidden="true"></span>
          </div>
          <figcaption class="profile-caption">
            <span>OPERATOR / HARI KRISHNA KUMAR</span>
            <span>PROFILE 01</span>
          </figcaption>
        </figure>
      </div>
    </section>`;
}

function skills() {
  return `
    <section class="dsec" id="sec-skills" aria-labelledby="h-skills">
      ${head(SECTIONS[1])}
      <div class="dsec-body skill-grid">
        ${RESUME.skillGroups
          .map(
            (g, i) => `
          <article class="skill-card">
            <div class="skill-top"><span class="skill-no">${String(i + 1).padStart(2, '0')}</span><h3>${esc(
              g.name
            )}</h3><span class="skill-code">${esc(g.code)}</span></div>
            <div class="chip-row">${g.items.map((it) => `<span class="chip">${esc(it)}</span>`).join('')}</div>
          </article>`
          )
          .join('')}
      </div>
      <div class="dsec-foot">${RESUME.skillGroups.length} MODULES · ${new Set(
        RESUME.skillGroups.flatMap((g) => g.items.map((i) => i.toLowerCase()))
      ).size} TECHNOLOGIES · NO PROFICIENCY SCORES</div>
    </section>`;
}

function experience() {
  return `
    <section class="dsec" id="sec-experience" aria-labelledby="h-experience">
      ${head(SECTIONS[2])}
      <div class="dsec-body role-list">
        ${RESUME.experience
          .map(
            (r, i) => `
          <article class="role">
            <div class="role-side">
              <span class="role-no">0${i + 1}</span>
              <span class="role-code">${esc(r.code)}</span>
            </div>
            <div class="role-main">
              <h3>${esc(r.role)}</h3>
              <div class="role-org">${esc(r.org)}</div>
              <ul>${r.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
            </div>
          </article>`
          )
          .join('')}
      </div>
      <div class="dsec-foot">NO EMPLOYMENT DATES DISPLAYED</div>
    </section>`;
}

function education() {
  const e = RESUME.education;
  return `
    <section class="dsec" id="sec-education" aria-labelledby="h-education">
      ${head(SECTIONS[3])}
      <div class="dsec-body edu-grid">
        <div class="edu-main">
          <div class="edu-label">DEGREE</div>
          <h3>${esc(e.degree)}</h3>
          <div class="edu-status"><span class="dot"></span>${esc(e.status)}</div>
        </div>
        <div class="edu-gpa">
          <div class="edu-label">CGPA</div>
          <div class="edu-num">${esc(e.cgpa)}<small>/ ${esc(e.scale)}</small></div>
        </div>
      </div>
      <div class="dsec-foot">ACADEMIC RECORD AS PROVIDED</div>
    </section>`;
}

function projects() {
  return `
    <section class="dsec" id="sec-projects" aria-labelledby="h-projects">
      ${head(SECTIONS[4])}
      <div class="dsec-body project-grid">
        ${RESUME.projects
          .map(
            (p) => `
          <article class="project" id="project-${p.id}">
            <div class="project-art">${PROJECT_ART[p.id] || ''}</div>
            <div class="project-meta"><span>${esc(p.code)}</span><span>SYSTEM</span></div>
            <h3>${esc(p.title)}</h3>
          </article>`
          )
          .join('')}
      </div>
      <div class="dsec-foot">PROJECT TITLES ONLY · NO UNVERIFIED DETAILS</div>
    </section>`;
}

function contact() {
  const c = RESUME.contact;
  return `
    <section class="dsec" id="sec-contact" aria-labelledby="h-contact">
      ${head(SECTIONS[5])}
      <div class="dsec-body contact-grid">
        <a class="contact-card" href="mailto:${esc(c.email)}">
          <span class="contact-k">EMAIL</span>
          <span class="contact-v">${esc(c.email)}</span>
          <span class="contact-l">${esc(c.emailLabel)} ↗</span>
        </a>
        <a class="contact-card" href="tel:${esc(c.phoneHref)}">
          <span class="contact-k">PHONE</span>
          <span class="contact-v">${esc(c.phone)}</span>
          <span class="contact-l">${esc(c.phoneLabel)} ↗</span>
        </a>
        <a class="contact-card" href="${esc(c.github)}" target="_blank" rel="noopener noreferrer">
          <span class="contact-k">GITHUB</span>
          <span class="contact-v">HariKrishnaKumar</span>
          <span class="contact-l">${esc(c.githubLabel)} ↗</span>
        </a>
        <a class="contact-card" href="${esc(c.linkedin)}" target="_blank" rel="noopener noreferrer">
          <span class="contact-k">LINKEDIN</span>
          <span class="contact-v">Hari Krishna Kumar</span>
          <span class="contact-l">${esc(c.linkedinLabel)} ↗</span>
        </a>
      </div>
      <div class="dsec-foot">OPEN TO OPPORTUNITIES</div>
    </section>`;
}

function wireProfileImage() {
  const img = scroller.querySelector('.profile-photo');
  if (!img) return;
  const frame = img.closest('.profile-frame');
  const missing = () => frame && frame.classList.add('is-missing');
  img.addEventListener('error', missing, { once: true });
  if (img.complete && img.naturalWidth === 0) missing();
}

function render() {
  scroller.innerHTML = [about(), skills(), experience(), education(), projects(), contact()].join('');
  document.querySelectorAll('#dossierNav, #nav, #sectnav').forEach((host) => {
    host.innerHTML = navMarkup();
  });
  wireProfileImage();
}

function sectionEl(id) {
  return document.getElementById('sec-' + id);
}

function smooth() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

function scrollToSection(id, projectId) {
  const target = projectId ? document.getElementById('project-' + projectId) : sectionEl(id);
  if (!target || !scroller) return;
  const top = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 16;
  // Keep the clicked section highlighted while the smooth scroll travels past
  // the sections in between; the scroll-spy takes over again once it settles.
  spyHold = Date.now() + 1200;
  setActive(id);
  scroller.scrollTo({ top: Math.max(0, top), behavior: smooth() });
}

function setActive(id) {
  document.querySelectorAll('.dnav').forEach((el) => {
    const on = el.getAttribute('data-section') === id;
    el.classList.toggle('is-active', on);
    if (on) el.setAttribute('aria-current', 'page');
    else el.removeAttribute('aria-current');
  });
}

function spy() {
  if (!off || Date.now() < spyHold) return;
  const ref = scroller.getBoundingClientRect().top + 120;
  let current = SECTIONS[0].id;
  for (const s of SECTIONS) {
    const el = sectionEl(s.id);
    if (el && el.getBoundingClientRect().top <= ref) current = s.id;
  }
  setActive(current);
}

function onScroll() {
  if (!off || spyFrame) return;
  spyFrame = requestAnimationFrame(() => {
    spyFrame = 0;
    spy();
  });
}

export function openDossier(id = 'about', projectId) {
  if (!dossier) return;
  const first = !dossier.classList.contains('is-open');
  if (first) {
    dossier.classList.add('is-open');
    dossier.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('dossier-open');
    document.body.classList.add('dossier-open');
    lastFocus = document.activeElement;
    off = true;
    setActive(id);
    if (history.replaceState) history.replaceState(null, '', '#' + id);
    requestAnimationFrame(() => {
      closeBtn && closeBtn.focus();
      scrollToSection(id, projectId);
    });
  } else {
    if (history.replaceState) history.replaceState(null, '', '#' + id);
    scrollToSection(id, projectId);
    setActive(id);
  }
}

export function closeDossier() {
  if (!dossier || !dossier.classList.contains('is-open')) return;
  dossier.classList.remove('is-open');
  dossier.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('dossier-open');
  document.body.classList.remove('dossier-open');
  off = false;
  spyHold = 0;
  if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
}

export function initNavigation() {
  dossier = document.getElementById('dossier');
  scroller = document.getElementById('dossierScroll');
  closeBtn = dossier && dossier.querySelector('.dossier-close');
  if (!dossier || !scroller) return;

  render();
  scroller.addEventListener('scroll', onScroll, { passive: true });

  dossier.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) {
      e.preventDefault();
      closeDossier();
    }
  });

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-section]');
    if (!t) return;
    const interactive = e.target.closest('button, a, input, select, textarea, [role="slider"]');
    if (interactive && interactive !== t && !interactive.hasAttribute('data-section')) return;
    e.preventDefault();
    openDossier(t.getAttribute('data-section'), t.getAttribute('data-project') || undefined);
  });

  window.addEventListener('keydown', (e) => {
    if (!dossier.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDossier();
      return;
    }
    if (e.key === 'Tab') {
      const focusables = dossier.querySelectorAll(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  const hash = (location.hash || '').replace('#', '');
  if (SECTIONS.some((s) => s.id === hash)) {
    requestAnimationFrame(() => openDossier(hash));
  }
}
