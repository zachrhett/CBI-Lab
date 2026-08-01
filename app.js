/* Cognitive Burden Index — shared model & calculator logic */

const WEIGHTS = {
  ts: 0.20,
  wm: 0.22,
  tp: 0.18,
  id: 0.15,
  el: 0.12,
  rd: 0.13
};

const ALPHA = 0.35;
const BETA  = 0.55;
const K     = 0.85;
const DT    = 1.0;

let latentL = 0.45;

const ids = ['ts', 'wm', 'tp', 'id', 'el', 'ro'];
const labels = {
  ts: 'Task Switch',
  wm: 'Work Memory',
  tp: 'Time Pressure',
  id: 'Interruptions',
  el: 'Emotional',
  rd: 'Rec. Deficit'
};

const SCENARIOS = [
  {
    name: 'Focused Deep Work',
    desc: 'Long uninterrupted block, moderate complexity, good recovery context.',
    values: { ts: 0.15, wm: 0.55, tp: 0.25, id: 0.10, el: 0.15, ro: 0.70 }
  },
  {
    name: 'High-Interruption Shift',
    desc: 'Retail or support environment with constant context switching.',
    values: { ts: 0.85, wm: 0.45, tp: 0.60, id: 0.90, el: 0.40, ro: 0.30 }
  },
  {
    name: 'Deadline Crunch',
    desc: 'High time pressure and working memory load, limited recovery.',
    values: { ts: 0.50, wm: 0.80, tp: 0.90, id: 0.45, el: 0.55, ro: 0.20 }
  },
  {
    name: 'Recovery Day',
    desc: 'Low demand, high recovery opportunity — allostatic decline.',
    values: { ts: 0.10, wm: 0.15, tp: 0.10, id: 0.05, el: 0.10, ro: 0.90 }
  },
  {
    name: 'Emotional Labor Heavy',
    desc: 'Sustained self-regulation and interpersonal demand.',
    values: { ts: 0.40, wm: 0.35, tp: 0.40, id: 0.50, el: 0.85, ro: 0.35 }
  },
  {
    name: 'Balanced Operations',
    desc: 'Typical sustainable operational day.',
    values: { ts: 0.35, wm: 0.40, tp: 0.35, id: 0.30, el: 0.25, ro: 0.60 }
  }
];

function $(sel) { return document.querySelector(sel); }

function getInputs() {
  const o = {};
  ids.forEach(id => {
    const el = $('#' + id);
    o[id] = el ? parseFloat(el.value) : 0.3;
  });
  return o;
}

function computeStatic(inputs) {
  const rd = 1 - inputs.ro;
  const raw =
    WEIGHTS.ts * inputs.ts +
    WEIGHTS.wm * inputs.wm +
    WEIGHTS.tp * inputs.tp +
    WEIGHTS.id * inputs.id +
    WEIGHTS.el * inputs.el +
    WEIGHTS.rd * rd;
  return Math.max(0, Math.min(100, 100 * raw));
}

function computeDynamic(staticCBI, ro) {
  const load = staticCBI / 100;
  latentL = latentL + DT * (ALPHA * load - BETA * ro);
  latentL = Math.max(0.02, Math.min(3.5, latentL));
  const cbi = 100 * (latentL / (latentL + K));
  return Math.max(0, Math.min(100, cbi));
}

function zoneInfo(score) {
  if (score <= 25) return { label: 'Low', color: '#3ecf8e', desc: 'Cognitive resources are largely available. Sustainable for extended periods.' };
  if (score <= 50) return { label: 'Moderate', color: '#5b8def', desc: 'Normal operational load. Monitor recovery across days.' };
  if (score <= 75) return { label: 'Elevated', color: '#f0b429', desc: 'Significant demand. Error rates and fatigue risk rise if prolonged.' };
  return { label: 'High', color: '#f07178', desc: 'Heavy burden. Strongly indicates need for load reduction or recovery.' };
}

function setGauge(score) {
  const gauge = $('#cbi-gauge');
  if (!gauge) return;
  const z = zoneInfo(score);
  gauge.style.setProperty('--score', String(Math.round(score)));
  gauge.style.setProperty('--gauge-color', z.color);
}

function renderFactorBars(inputs, staticCBI) {
  const container = $('#factor-bars');
  if (!container) return;
  const rd = 1 - inputs.ro;
  const contributions = [
    { key: 'ts', v: WEIGHTS.ts * inputs.ts },
    { key: 'wm', v: WEIGHTS.wm * inputs.wm },
    { key: 'tp', v: WEIGHTS.tp * inputs.tp },
    { key: 'id', v: WEIGHTS.id * inputs.id },
    { key: 'el', v: WEIGHTS.el * inputs.el },
    { key: 'rd', v: WEIGHTS.rd * rd }
  ];
  const maxC = Math.max(...contributions.map(c => c.v), 0.01);

  container.innerHTML = contributions.map(c => {
    const pct = Math.round((c.v / (staticCBI / 100 || 0.01)) * 100);
    const width = Math.round((c.v / maxC) * 100);
    return `
      <div class="factor-row">
        <span>${labels[c.key]}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
        <span class="pct">${pct}%</span>
      </div>`;
  }).join('');
}

function update() {
  if (!$('#ts')) return; // not on calculator page

  const inputs = getInputs();
  ids.forEach(id => {
    const el = $('#val-' + id);
    if (el) el.textContent = inputs[id].toFixed(2);
  });

  const staticCBI = computeStatic(inputs);
  const useDynamic = $('#use-dynamic')?.checked;
  const score = useDynamic ? computeDynamic(staticCBI, inputs.ro) : staticCBI;

  setGauge(score);
  if ($('#cbi-score')) $('#cbi-score').textContent = Math.round(score);

  const z = zoneInfo(score);
  const zoneEl = $('#zone-label');
  if (zoneEl) {
    zoneEl.textContent = z.label;
    zoneEl.style.color = z.color;
  }
  if ($('#zone-desc')) $('#zone-desc').textContent = z.desc;

  renderFactorBars(inputs, staticCBI);
}

function applyQueryParams() {
  const params = new URLSearchParams(location.search);
  let changed = false;
  ids.forEach(id => {
    if (params.has(id)) {
      const el = $('#' + id);
      if (el) {
        el.value = parseFloat(params.get(id));
        changed = true;
      }
    }
  });
  if (changed) {
    latentL = 0.40 + (computeStatic(getInputs()) / 100) * 0.3;
  }
}

// Init only when calculator controls exist
document.addEventListener('DOMContentLoaded', () => {
  if (!$('#ts')) return;

  applyQueryParams();

  ids.forEach(id => {
    const el = $('#' + id);
    if (el) el.addEventListener('input', update);
  });

  const dyn = $('#use-dynamic');
  if (dyn) {
    dyn.addEventListener('change', () => {
      if (dyn.checked) {
        latentL = 0.35 + (computeStatic(getInputs()) / 100) * 0.5;
      }
      update();
    });
  }

  update();
});
