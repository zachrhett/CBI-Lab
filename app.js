/* Cognitive Burden Index — expanded educational model
   Hypothetical / personal exploration. Not diagnostic. */

const BASE_WEIGHTS = {
  ts: 0.14,
  wm: 0.15,
  tp: 0.12,
  id: 0.11,
  el: 0.10,
  ct: 0.10,
  sl: 0.09,
  ss: 0.07,
  rd: 0.12
};

const BIG5_DEFAULTS = { o: 0.50, c: 0.50, e: 0.50, a: 0.50, n: 0.40 };

const ALPHA = 0.32;
const BETA  = 0.50;
const K     = 0.90;
const DT    = 1.0;

let latentL = 0.42;

const DEMAND_IDS = ['ts', 'wm', 'tp', 'id', 'el', 'ct', 'sl', 'ss', 'ro'];
const BIG5_IDS = ['b5o', 'b5c', 'b5e', 'b5a', 'b5n'];

const labels = {
  ts: 'Task Switch',
  wm: 'Work Memory',
  tp: 'Time Pressure',
  id: 'Interruptions',
  el: 'Emotional',
  ct: 'Low Control',
  sl: 'Sleep Disrupt',
  ss: 'Low Support',
  rd: 'Rec. Deficit'
};

const SCENARIOS = [
  {
    name: 'Focused Deep Work',
    desc: 'Long uninterrupted block, moderate complexity, good recovery.',
    values: { ts: 0.15, wm: 0.55, tp: 0.25, id: 0.10, el: 0.15, ct: 0.20, sl: 0.15, ss: 0.20, ro: 0.70 }
  },
  {
    name: 'High-Interruption Shift',
    desc: 'Retail/support: constant switching, low control, weak recovery.',
    values: { ts: 0.85, wm: 0.45, tp: 0.60, id: 0.90, el: 0.50, ct: 0.70, sl: 0.45, ss: 0.40, ro: 0.25 }
  },
  {
    name: 'Deadline Crunch',
    desc: 'High pressure and memory load, poor sleep, low recovery.',
    values: { ts: 0.50, wm: 0.80, tp: 0.90, id: 0.45, el: 0.55, ct: 0.55, sl: 0.70, ss: 0.35, ro: 0.20 }
  },
  {
    name: 'Recovery Day',
    desc: 'Low demand, high recovery — allostatic decline.',
    values: { ts: 0.10, wm: 0.15, tp: 0.10, id: 0.05, el: 0.10, ct: 0.15, sl: 0.10, ss: 0.15, ro: 0.90 }
  },
  {
    name: 'Emotional Labor Heavy',
    desc: 'Sustained self-regulation, moderate support, limited recovery.',
    values: { ts: 0.40, wm: 0.35, tp: 0.40, id: 0.50, el: 0.85, ct: 0.45, sl: 0.40, ss: 0.30, ro: 0.30 }
  },
  {
    name: 'Isolated Overload',
    desc: 'High demand, high helplessness, low support — exploratory high-burden profile.',
    values: { ts: 0.55, wm: 0.65, tp: 0.70, id: 0.40, el: 0.60, ct: 0.85, sl: 0.55, ss: 0.80, ro: 0.20 }
  },
  {
    name: 'Balanced Operations',
    desc: 'Typical sustainable operational day.',
    values: { ts: 0.35, wm: 0.40, tp: 0.35, id: 0.30, el: 0.25, ct: 0.30, sl: 0.25, ss: 0.25, ro: 0.60 }
  }
];

function $(sel) { return document.querySelector(sel); }

function getDemandInputs() {
  const o = {};
  DEMAND_IDS.forEach(id => {
    const el = $('#' + id);
    o[id] = el ? parseFloat(el.value) : 0.3;
  });
  return o;
}

function getBig5() {
  const o = {};
  const map = { b5o: 'o', b5c: 'c', b5e: 'e', b5a: 'a', b5n: 'n' };
  Object.keys(map).forEach(id => {
    const el = $('#' + id);
    o[map[id]] = el ? parseFloat(el.value) : BIG5_DEFAULTS[map[id]];
  });
  return o;
}

function clampW(x) { return Math.max(0.02, Math.min(0.35, x)); }

function adjustedWeights(big5) {
  const w = Object.assign({}, BASE_WEIGHTS);
  const n = big5.n;
  const e = big5.e;
  const c = big5.c;
  const nBoost = 0.08 * (n - 0.5);
  w.el = clampW(w.el + nBoost * 1.2);
  w.sl = clampW(w.sl + nBoost);
  w.ct = clampW(w.ct + nBoost);
  w.rd = clampW(w.rd + nBoost * 0.8);
  w.id = clampW(w.id - 0.04 * (e - 0.5));
  w.ts = clampW(w.ts - 0.03 * (c - 0.5));
  const sum = Object.values(w).reduce((a, b) => a + b, 0);
  Object.keys(w).forEach(k => { w[k] = w[k] / sum; });
  return w;
}

function computeStatic(inputs, big5) {
  const rd = 1 - inputs.ro;
  const w = adjustedWeights(big5);
  const parts = {
    ts: w.ts * inputs.ts,
    wm: w.wm * inputs.wm,
    tp: w.tp * inputs.tp,
    id: w.id * inputs.id,
    el: w.el * inputs.el,
    ct: w.ct * inputs.ct,
    sl: w.sl * inputs.sl,
    ss: w.ss * inputs.ss,
    rd: w.rd * rd
  };
  const raw = Object.values(parts).reduce((a, b) => a + b, 0);
  return {
    score: Math.max(0, Math.min(100, 100 * raw)),
    weights: w,
    rd,
    parts
  };
}

function computeDynamic(staticCBI, ro) {
  const load = staticCBI / 100;
  latentL = latentL + DT * (ALPHA * load - BETA * ro);
  latentL = Math.max(0.02, Math.min(3.5, latentL));
  return Math.max(0, Math.min(100, 100 * (latentL / (latentL + K))));
}

function zoneInfo(score) {
  if (score <= 25) return { label: 'Low', color: '#3ecf8e', desc: 'Capacity largely available. Sustainable if recovery continues.' };
  if (score <= 50) return { label: 'Moderate', color: '#5b8def', desc: 'Normal operational load. Watch multi-day accumulation.' };
  if (score <= 75) return { label: 'Elevated', color: '#f0b429', desc: 'Significant demand. Fatigue and error risk rise if prolonged.' };
  return { label: 'High', color: '#f07178', desc: 'Heavy burden. Load reduction and recovery become priority.' };
}

function setGauge(score) {
  const gauge = $('#cbi-gauge');
  if (!gauge) return;
  const z = zoneInfo(score);
  gauge.style.setProperty('--score', String(Math.round(score)));
  gauge.style.setProperty('--gauge-color', z.color);
}

function renderFactorBars(parts, staticScore) {
  const container = $('#factor-bars');
  if (!container) return;
  const entries = Object.keys(parts).map(k => ({ key: k, v: parts[k] }));
  const maxC = Math.max(...entries.map(c => c.v), 0.01);
  container.innerHTML = entries.map(c => {
    const pct = Math.round((c.v / (staticScore / 100 || 0.01)) * 100);
    const width = Math.round((c.v / maxC) * 100);
    return '<div class="factor-row"><span>' + labels[c.key] + '</span><div class="bar-track"><div class="bar-fill" style="width:' + width + '%"></div></div><span class="pct">' + pct + '%</span></div>';
  }).join('');
}

function renderWeights(weights) {
  const el = $('#weight-readout');
  if (!el) return;
  el.innerHTML = Object.keys(weights).map(k =>
    '<span><code>' + k + '</code> ' + (weights[k] * 100).toFixed(1) + '%</span>'
  ).join('');
}

function update() {
  if (!$('#ts')) return;
  const inputs = getDemandInputs();
  const big5 = getBig5();
  DEMAND_IDS.forEach(id => {
    const el = $('#val-' + id);
    if (el) el.textContent = inputs[id].toFixed(2);
  });
  BIG5_IDS.forEach(id => {
    const el = $('#val-' + id);
    if (el) el.textContent = parseFloat($('#' + id).value).toFixed(2);
  });
  const result = computeStatic(inputs, big5);
  const useDynamic = $('#use-dynamic') && $('#use-dynamic').checked;
  const score = useDynamic ? computeDynamic(result.score, inputs.ro) : result.score;
  setGauge(score);
  if ($('#cbi-score')) $('#cbi-score').textContent = Math.round(score);
  const z = zoneInfo(score);
  const zoneEl = $('#zone-label');
  if (zoneEl) { zoneEl.textContent = z.label; zoneEl.style.color = z.color; }
  if ($('#zone-desc')) $('#zone-desc').textContent = z.desc;
  renderFactorBars(result.parts, result.score);
  renderWeights(result.weights);
  if ($('#static-readout')) $('#static-readout').textContent = Math.round(result.score);
  if ($('#latent-readout')) $('#latent-readout').textContent = latentL.toFixed(2);
}

function applyQueryParams() {
  const params = new URLSearchParams(location.search);
  let changed = false;
  DEMAND_IDS.forEach(id => {
    if (params.has(id)) {
      const el = $('#' + id);
      if (el) { el.value = parseFloat(params.get(id)); changed = true; }
    }
  });
  if (changed) {
    latentL = 0.35 + (computeStatic(getDemandInputs(), getBig5()).score / 100) * 0.35;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!$('#ts')) return;
  applyQueryParams();
  DEMAND_IDS.concat(BIG5_IDS).forEach(id => {
    const el = $('#' + id);
    if (el) el.addEventListener('input', update);
  });
  const dyn = $('#use-dynamic');
  if (dyn) {
    dyn.addEventListener('change', () => {
      if (dyn.checked) latentL = 0.30 + (computeStatic(getDemandInputs(), getBig5()).score / 100) * 0.5;
      update();
    });
  }
  const resetB5 = $('#reset-big5');
  if (resetB5) {
    resetB5.addEventListener('click', () => {
      const map = { b5o: 0.50, b5c: 0.50, b5e: 0.50, b5a: 0.50, b5n: 0.40 };
      Object.keys(map).forEach(id => { const el = $('#' + id); if (el) el.value = map[id]; });
      update();
    });
  }
  update();
});
