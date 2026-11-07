/**
 * Mascot cursor + contextual guide.
 *
 * - Desktop (fine pointer): replaces the native cursor, follows the pointer.
 * - Touch: acts as a tap assistant near the tapped element, never blocks input.
 * - Uses one delegated listener, no per-element handlers, no extra rAF loop.
 */

import { RESUME } from './resume-data.js';

const ASSETS = {
  cursor: '/mascot/cursor-purple.png',
  neutral: '/mascot/expression-neutral.png',
  surprised: '/mascot/expression-surprised.png',
  confused: '/mascot/expression-confused.png',
  pause: '/mascot/expression-pause.png',
};

const MESSAGES = RESUME.messages;

const INTERACTIVE =
  'a,button,input,select,textarea,[role="slider"],[role="button"],[data-assistant]';

let root = null;
let img = null;
let bubble = null;
let bubbleBody = null;

let px = 0;
let py = 0;
let mx = 0;
let my = 0;
let shown = false;
let hovering = false;
let pressed = false;
let locked = false; // touch mode: mascot stays at the tap point
let sayTimer = 0;
let modeTimer = 0;
let idleTimer = 0;
let lastNow = 0;

let finePointer = true;
let reduceMotion = false;

function setMode(name) {
  const src = ASSETS[name] || ASSETS.cursor;
  if (img.getAttribute('src') !== src) img.setAttribute('src', src);
  root.dataset.face = name;
}

function show() {
  if (shown) return;
  shown = true;
  root.classList.add('is-on');
}

function hide() {
  if (!shown) return;
  shown = false;
  root.classList.remove('is-on');
  hideBubble();
}

function place() {
  if (!root) return;
  const w = root.offsetWidth || 38;
  const x = Math.round(mx - w / 2);
  const y = Math.round(my + 6);
  root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function hideBubble() {
  if (!bubble) return;
  bubble.classList.remove('is-open');
  bubble.setAttribute('aria-hidden', 'true');
  clearTimeout(sayTimer);
  clearTimeout(modeTimer);
  sayTimer = 0;
  modeTimer = 0;
}

function dismissBubble() {
  if (!bubble || !bubble.classList.contains('is-open')) return;
  setMode('confused');
  hideBubble();
  clearTimeout(modeTimer);
  modeTimer = window.setTimeout(() => {
    if (!finePointer) { locked = false; hide(); return; }
    if (pressed) setMode('pause');
    else setMode(hovering ? 'neutral' : 'cursor');
  }, 520);
}

function say(text, x, y) {
  if (!text) return;
  bubbleBody.textContent = text;
  bubble.classList.add('is-open');
  bubble.setAttribute('aria-hidden', 'false');

  const bw = bubble.offsetWidth || 260;
  const bh = bubble.offsetHeight || 90;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const gap = 26;

  let bx = x + gap;
  let by = y - bh - 14;
  if (bx + bw > vw - 12) bx = x - bw - gap;
  if (bx < 12) bx = 12;

  // A bubble triggered outside an open dossier should not cover its content.
  const shell = document.querySelector('.dossier-shell');
  if (shell && document.documentElement.classList.contains('dossier-open')) {
    const sr = shell.getBoundingClientRect();
    if (x < sr.left && bx + bw > sr.left - 12) bx = sr.left - bw - 12;
    if (bx < 12) bx = 12;
  }

  if (by < 12) by = y + 26;
  if (by + bh > vh - 12) by = vh - bh - 12;

  bubble.style.transform = `translate3d(${Math.round(bx)}px, ${Math.round(by)}px, 0)`;

  setMode('surprised');
  root.classList.add('is-pop');
  clearTimeout(modeTimer);
  modeTimer = window.setTimeout(() => root.classList.remove('is-pop'), 460);

  clearTimeout(sayTimer);
  sayTimer = window.setTimeout(dismissBubble, 5600);
}

function resolveKey(target) {
  const holder = target.closest('[data-assistant]');
  if (holder) return holder.getAttribute('data-assistant');
  return null;
}

function onMove(e) {
  if (!finePointer) return;
  px = e.clientX;
  py = e.clientY;
  if (!shown) {
    mx = px;
    my = py;
    place();
    show();
  }
  const nextHover = !!e.target.closest(INTERACTIVE);
  if (nextHover !== hovering) {
    hovering = nextHover;
    if (!pressed && !bubble.classList.contains('is-open')) {
      setMode(hovering ? 'neutral' : 'cursor');
    }
  }
  clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    if (!hovering && !bubble.classList.contains('is-open') && !pressed) setMode('cursor');
  }, 2400);
}

function onDown(e) {
  if (finePointer) {
    pressed = true;
    if (!bubble.classList.contains('is-open')) setMode('pause');
    return;
  }
  px = e.clientX;
  py = e.clientY;
}

function onUp() {
  if (!finePointer) return;
  pressed = false;
  if (!bubble.classList.contains('is-open')) setMode(hovering ? 'neutral' : 'cursor');
}

function onClick(e) {
  const key = resolveKey(e.target);
  const interactive = e.target.closest('a,button,input,select,textarea,[role="slider"]');

  if (!finePointer) {
    // Touch: only speak for mapped content, never for drags/controls noise.
    if (!key) return;
    locked = true;
    mx = e.clientX;
    my = e.clientY;
    place();
    show();
    say(MESSAGES[key] || MESSAGES.generic, e.clientX, e.clientY);
    return;
  }

  if (key) {
    say(MESSAGES[key] || MESSAGES.generic, e.clientX, e.clientY);
  } else if (!interactive) {
    say(MESSAGES.generic, e.clientX, e.clientY);
  }
}

function onKey(e) {
  if (e.key === 'Escape') dismissBubble();
}

function onScroll(e) {
  if (finePointer) return;
  if (!locked) return;
  hide();
  locked = false;
}

function onResize() {
  px = Math.min(px, window.innerWidth - 1);
  py = Math.min(py, window.innerHeight - 1);
  if (!finePointer) return;
  mx = Math.min(Math.max(mx, 12), window.innerWidth - 12);
  my = Math.min(Math.max(my, 12), window.innerHeight - 12);
  place();
}

export function initMascot() {
  root = document.getElementById('mascot');
  if (!root) return;
  img = root.querySelector('img');
  bubble = document.getElementById('mascotBubble');
  if (!bubble) return;
  bubbleBody = bubble.querySelector('p');

  finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (finePointer) {
    document.documentElement.classList.add('mascot-on');
    root.classList.add('is-cursor');
  } else {
    root.classList.add('is-touch');
  }

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });
  document.addEventListener('click', onClick);
  window.addEventListener('keydown', onKey);
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('resize', onResize);

  const mqFine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sync = () => {
    finePointer = mqFine.matches;
    reduceMotion = mqReduce.matches;
    document.documentElement.classList.toggle('mascot-on', finePointer);
    root.classList.toggle('is-cursor', finePointer);
    root.classList.toggle('is-touch', !finePointer);
    if (!finePointer) hide();
  };
  mqFine.addEventListener?.('change', sync);
  mqReduce.addEventListener?.('change', sync);

  place();
}

/** Called from the page's single animation loop. */
export function tickMascot(now) {
  if (!root || !finePointer || !shown || locked) return;
  const dt = lastNow ? Math.min(0.05, (now - lastNow) / 1000) : 0.016;
  lastNow = now;
  const k = reduceMotion ? 1 : 1 - Math.exp(-20 * dt);
  mx += (px - mx) * k;
  my += (py - my) * k;
  if (Math.abs(px - mx) < 0.1) mx = px;
  if (Math.abs(py - my) < 0.1) my = py;
  place();
}
