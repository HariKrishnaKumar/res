/**
 * Light/dark theme controller.
 *
 * The initial theme is applied by a tiny inline script in <head> so the page
 * never flashes the wrong palette. This module wires every toggle, persists
 * explicit choices and follows the system preference until the visitor makes
 * a choice of their own.
 */

const KEY = 'hkk-theme';
const root = document.documentElement;
const media = window.matchMedia('(prefers-color-scheme: dark)');

function saved() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function systemTheme() {
  return media.matches ? 'dark' : 'light';
}

function buttons() {
  return [...document.querySelectorAll('[data-theme-toggle]')];
}

function apply(theme, persist) {
  const next = theme === 'dark' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);

  const isDark = next === 'dark';
  for (const button of buttons()) {
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    button.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  }

  if (persist) {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage can be unavailable in private contexts; the theme still works */
    }
  }

  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
}

export function initTheme() {
  apply(root.getAttribute('data-theme') || saved() || systemTheme(), false);

  for (const button of buttons()) {
    button.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next, true);
    });
  }

  const onSystemChange = (event) => {
    if (!saved()) apply(event.matches ? 'dark' : 'light', false);
  };

  if (media.addEventListener) media.addEventListener('change', onSystemChange);
  else if (media.addListener) media.addListener(onSystemChange);
}
