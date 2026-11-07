/**
 * Original engineering-style illustrations for the three project cards.
 * These are abstract diagrams drawn for this site — not screenshots and not
 * representations of the projects' actual interfaces.
 */

const svg = (inner) =>
  `<svg class="ill" viewBox="0 0 320 170" role="img" aria-hidden="true" focusable="false">${inner}</svg>`;

const GRID = (() => {
  const out = [];
  for (let x = 20; x < 320; x += 20) out.push(`<line x1="${x}" y1="8" x2="${x}" y2="162" />`);
  for (let y = 10; y < 170; y += 20) out.push(`<line x1="8" y1="${y}" x2="312" y2="${y}" />`);
  return `<g class="ill-grid">${out.join('')}</g>`;
})();

export const PROJECT_ART = {
  vision: svg(`
    ${GRID}
    <g class="ill-line">
      <path d="M160 24c-31 0-52 22-52 52 0 36 24 70 52 70s52-34 52-70c0-30-21-52-52-52Z" />
      <path d="M108 70h104M112 94h96" class="ill-faint" />
      <path d="M160 24v122" class="ill-faint" />
    </g>
    <g class="ill-dot">
      <circle cx="134" cy="66" r="2.2" /><circle cx="186" cy="66" r="2.2" />
      <circle cx="160" cy="82" r="2.2" /><circle cx="144" cy="104" r="2.2" />
      <circle cx="176" cy="104" r="2.2" /><circle cx="160" cy="120" r="2.2" />
      <circle cx="120" cy="88" r="2.2" /><circle cx="200" cy="88" r="2.2" />
    </g>
    <g class="ill-wire">
      <path d="M134 66 160 82 186 66M160 82v38M144 104l16 16 16-16M120 88l24-6M200 88l-24-6" />
    </g>
    <g class="ill-hot">
      <rect x="112" y="46" width="96" height="112" fill="none" stroke-dasharray="6 6" />
      <path d="M112 58V46h12M196 46h12v12M208 146v12h-12M124 158h-12v-12" />
      <circle cx="160" cy="82" r="15" />
      <path d="M160 67v-6M160 103v6M145 82h-6M181 82h6" />
    </g>
    <path class="ill-scan" d="M96 132h128" />
    <g class="ill-faint2">
      <path d="M244 40h40M244 40v-8M284 40v-8" />
      <path d="M36 96h-18M36 96v-8M18 96v-8" />
    </g>
  `),

  lms: svg(`
    ${GRID}
    <g class="ill-line">
      <rect x="44" y="44" width="118" height="82" />
      <rect x="62" y="58" width="118" height="82" />
      <rect x="80" y="72" width="118" height="82" />
    </g>
    <g class="ill-faint">
      <path d="M96 94h84M96 108h84M96 122h58" />
      <path d="M62 70v76M80 84v70" />
    </g>
    <g class="ill-hot">
      <path d="M198 72h56v56h-56z" />
      <path d="M198 72l28 28 28-28M226 100v28" />
    </g>
    <g class="ill-wire">
      <path d="M198 128h-18M180 128v18M180 146H96M96 146V126" />
      <circle cx="96" cy="146" r="3" />
    </g>
    <g class="ill-line">
      <circle cx="252" cy="40" r="14" />
      <circle cx="252" cy="40" r="20" class="ill-faint" />
      <path d="M252 26v14l9 6" />
    </g>
    <g class="ill-dot">
      <circle cx="96" cy="94" r="2" /><circle cx="96" cy="108" r="2" /><circle cx="96" cy="122" r="2" />
    </g>
    <g class="ill-faint2">
      <path d="M44 44V28h16M162 44V28h-16M44 126v14h16M162 126v14h-16" />
    </g>
  `),

  inventory: svg(`
    ${GRID}
    <g class="ill-line">
      <rect x="34" y="38" width="168" height="100" />
      <path d="M34 72h168M34 106h168M90 38v100M146 38v100" />
    </g>
    <g class="ill-faint">
      <rect x="46" y="50" width="32" height="12" /><rect x="102" y="50" width="32" height="12" />
      <rect x="158" y="50" width="32" height="12" /><rect x="46" y="84" width="32" height="12" />
      <rect x="158" y="84" width="32" height="12" /><rect x="46" y="118" width="32" height="12" />
      <rect x="102" y="118" width="32" height="12" />
    </g>
    <g class="ill-hot">
      <rect x="102" y="84" width="32" height="12" />
      <path d="M118 96v18" />
      <path d="M108 108h20" />
    </g>
    <g class="ill-line">
      <rect x="228" y="44" width="58" height="34" />
      <path d="M236 54v14M242 54v14M246 54v14M254 54v14M260 54v14M266 54v14M274 54v14M278 54v14" />
      <path d="M228 90h58v48h-58z" class="ill-faint" />
    </g>
    <g class="ill-wire">
      <path d="M202 88h26M202 88l8-5M202 88l8 5" />
      <path d="M228 112h-26M228 112l-8-5M228 112l-8 5" />
    </g>
    <g class="ill-dot">
      <circle cx="228" cy="78" r="2" /><circle cx="294" cy="78" r="2" />
      <circle cx="228" cy="38" r="2" /><circle cx="294" cy="38" r="2" />
    </g>
    <g class="ill-faint2">
      <path d="M34 138v10h168v-10" />
      <path d="M228 138v10h58v-10" />
    </g>
  `),
};
