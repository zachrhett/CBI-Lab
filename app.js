/* Cognitive Burden Index — expanded educational model
   Hypothetical / personal exploration. Not diagnostic. */

const BASE_WEIGHTS = {
  // Cognitive / work demand
  ts: 0.10,
  wm: 0.11,
  tp: 0.09,
  id: 0.08,
  el: 0.08,
  ct: 0.07,
  // Recovery & physiological
  sl: 0.07,
  ss: 0.05,
  rd: 0.08,
  // Substances & body
  al: 0.05,  // alcohol load
  su: 0.04,  // other substance load
  di: 0.03,  // diet strain
  mw: 0.03,  // metabolic / weight strain
  // Life context
  ag: 0.03,  // age-related recovery constraint
  env: 0.04, // environmental load
  geo: 0.02, // geological / climate / disaster context
  // Structural / social process (not identity)
  ms: 0.05,  // minority stress / discrimination exposure
  ed: 0.03   // low educational / resource access
};

const BIG5_DEFAULTS = { o: 0.50, c: 0.50, e: 0.50, a: 0.50, n: 0.40 };

const ALPHA = 0.32;
const BETA  = 0.50;
const K     = 0.90;
const DT    = 1.0;

let latentL = 0.42;

const DEMAND_IDS = ['ts','wm','tp','id','el','ct','sl','ss','ro','al','su','di','mw','ag','env','geo','ms','ed'];
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
  rd: 'Rec. Deficit',
  al: 'Alcohol',
  su: 'Substances',
  di: 'Diet Strain',
  mw: 'Metabolic',
  ag: 'Age Constraint',
  env: 'Environment',
  geo: 'Geo/Climate',
  ms: 'Min. Stress',
  ed: 'Low Resources'
};


const WORKPLACE_TEMPLATES = [
  {
    id: 'retail-floor',
    name: 'Retail floor / frontline',
    desc: 'High switching, interruptions, customer load, moderate control.',
    values: { ts: 0.80, wm: 0.40, tp: 0.55, id: 0.85, el: 0.55, ct: 0.60, sl: 0.35, ss: 0.35, ro: 0.30 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    id: 'call-support',
    name: 'Call center / support queue',
    desc: 'Queue pressure, emotional labor, surveillance, low recovery between contacts.',
    values: { ts: 0.70, wm: 0.50, tp: 0.70, id: 0.75, el: 0.70, ct: 0.65, sl: 0.40, ss: 0.40, ro: 0.25 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    id: 'care-shift',
    name: 'Healthcare / care shift',
    desc: 'Emotional load, staffing strain, interruptions, sleep risk on rotations.',
    values: { ts: 0.65, wm: 0.60, tp: 0.65, id: 0.70, el: 0.80, ct: 0.55, sl: 0.55, ss: 0.35, ro: 0.25 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    id: 'knowledge-deep',
    name: 'Knowledge work — deep focus day',
    desc: 'High WM, low interruption if protected; recovery available.',
    values: { ts: 0.20, wm: 0.75, tp: 0.35, id: 0.15, el: 0.25, ct: 0.25, sl: 0.20, ss: 0.25, ro: 0.65 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    id: 'knowledge-meeting',
    name: 'Knowledge work — meeting-heavy day',
    desc: 'Fragmented attention, high switching, unfinished-task carryover.',
    values: { ts: 0.75, wm: 0.55, tp: 0.50, id: 0.70, el: 0.40, ct: 0.40, sl: 0.30, ss: 0.30, ro: 0.35 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    id: 'management',
    name: 'People management day',
    desc: 'Role conflict, emotional load, after-hours bleed, moderate WM.',
    values: { ts: 0.60, wm: 0.50, tp: 0.55, id: 0.65, el: 0.65, ct: 0.45, sl: 0.40, ss: 0.30, ro: 0.30 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    id: 'night-ops',
    name: 'Night / rotating ops',
    desc: 'Circadian disruption dominant; moderate demand, poor recovery quality.',
    values: { ts: 0.45, wm: 0.45, tp: 0.40, id: 0.35, el: 0.35, ct: 0.40, sl: 0.85, ss: 0.45, ro: 0.20 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    id: 'isolated-remote',
    name: 'Isolated remote overload',
    desc: 'High demand, low support, blurred recovery boundaries.',
    values: { ts: 0.40, wm: 0.70, tp: 0.65, id: 0.35, el: 0.45, ct: 0.50, sl: 0.50, ss: 0.75, ro: 0.25 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  }
];

const SCENARIOS = [
  {
    name: 'Focused Deep Work',
    desc: 'Long uninterrupted block, moderate complexity, good recovery.',
    values: { ts: 0.15, wm: 0.55, tp: 0.25, id: 0.10, el: 0.15, ct: 0.20, sl: 0.15, ss: 0.20, ro: 0.70 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    name: 'High-Interruption Shift',
    desc: 'Retail/support: constant switching, low control, weak recovery.',
    values: { ts: 0.85, wm: 0.45, tp: 0.60, id: 0.90, el: 0.50, ct: 0.70, sl: 0.45, ss: 0.40, ro: 0.25 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    name: 'Deadline Crunch',
    desc: 'High pressure and memory load, poor sleep, low recovery.',
    values: { ts: 0.50, wm: 0.80, tp: 0.90, id: 0.45, el: 0.55, ct: 0.55, sl: 0.70, ss: 0.35, ro: 0.20 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    name: 'Recovery Day',
    desc: 'Low demand, high recovery — allostatic decline.',
    values: { ts: 0.10, wm: 0.15, tp: 0.10, id: 0.05, el: 0.10, ct: 0.15, sl: 0.10, ss: 0.15, ro: 0.90 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    name: 'Emotional Labor Heavy',
    desc: 'Sustained self-regulation, moderate support, limited recovery.',
    values: { ts: 0.40, wm: 0.35, tp: 0.40, id: 0.50, el: 0.85, ct: 0.45, sl: 0.40, ss: 0.30, ro: 0.30 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    name: 'Isolated Overload',
    desc: 'High demand, high helplessness, low support — exploratory high-burden profile.',
    values: { ts: 0.55, wm: 0.65, tp: 0.70, id: 0.40, el: 0.60, ct: 0.85, sl: 0.55, ss: 0.80, ro: 0.20 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
  },
  {
    name: 'Balanced Operations',
    desc: 'Typical sustainable operational day.',
    values: { ts: 0.35, wm: 0.40, tp: 0.35, id: 0.30, el: 0.25, ct: 0.30, sl: 0.25, ss: 0.25, ro: 0.60 , al: 0.20, su: 0.10, di: 0.25, mw: 0.25, ag: 0.30, env: 0.30, geo: 0.10, ms: 0.20, ed: 0.25 }
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
  const nBoost = 0.06 * (n - 0.5);
  w.el = clampW(w.el + nBoost * 1.2);
  w.sl = clampW(w.sl + nBoost);
  w.ct = clampW(w.ct + nBoost);
  w.rd = clampW(w.rd + nBoost * 0.8);
  w.ms = clampW(w.ms + nBoost * 0.5);
  w.al = clampW(w.al + nBoost * 0.3);
  w.id = clampW(w.id - 0.03 * (e - 0.5));
  w.ts = clampW(w.ts - 0.025 * (c - 0.5));
  const sum = Object.values(w).reduce((a, b) => a + b, 0);
  Object.keys(w).forEach(k => { w[k] = w[k] / sum; });
  return w;
}

function computeStatic(inputs, big5) {
  const rd = 1 - inputs.ro;
  const w = adjustedWeights(big5);
  const keys = Object.keys(w);
  const parts = {};
  let raw = 0;
  keys.forEach(k => {
    const x = (k === 'rd') ? rd : (inputs[k] != null ? inputs[k] : 0);
    parts[k] = w[k] * x;
    raw += parts[k];
  });
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
  if (score <= 25) return {
    label: 'Adaptive / light',
    color: '#3ecf8e',
    desc: 'Demand is present but capacity and recovery can absorb it. Growth-compatible stress when meaning and recovery hold.'
  };
  if (score <= 50) return {
    label: 'Adaptive / working',
    color: '#5b8def',
    desc: 'Operational stress. Still potentially constructive if recovery, agency, and support keep pace across days.'
  };
  if (score <= 75) return {
    label: 'Erosive risk',
    color: '#f0b429',
    desc: 'Prolonged exposure without adequate recovery tips stress toward erosion. Early intervention window.'
  };
  return {
    label: 'Toxic load',
    color: '#f07178',
    desc: 'Unchecked demand likely eroding capacity. Priority: reduce load, restore recovery, restore controllability.'
  };
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


function simulateTimeline(days, inputs, big5) {
  const result0 = computeStatic(inputs, big5);
  let L = 0.35 + (result0.score / 100) * 0.25;
  const points = [];
  for (let d = 1; d <= days; d++) {
    const staticScore = computeStatic(inputs, big5).score;
    const load = staticScore / 100;
    L = L + DT * (ALPHA * load - BETA * inputs.ro);
    L = Math.max(0.02, Math.min(3.5, L));
    const cbi = Math.max(0, Math.min(100, 100 * (L / (L + K))));
    points.push({ day: d, L: L, cbi: cbi, static: staticScore });
  }
  return points;
}

function renderTimeline() {
  const canvas = $('#timeline-canvas');
  const summary = $('#timeline-summary');
  if (!canvas) return;
  const days = parseInt(($('#timeline-days') && $('#timeline-days').value) || '14', 10);
  const inputs = getDemandInputs();
  const big5 = getBig5();
  const points = simulateTimeline(days, inputs, big5);
  const w = canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1);
  const h = canvas.height = 160 * (window.devicePixelRatio || 1);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  const pad = 20 * (window.devicePixelRatio || 1);
  const plotW = w - pad * 2;
  const plotH = h - pad * 2;

  // grid
  ctx.strokeStyle = '#243049';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad + (plotH * i) / 4;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(w - pad, y);
    ctx.stroke();
  }

  // zone bands (approx on 0-100 CBI scale mapped to height)
  function yFor(cbi) { return pad + plotH * (1 - cbi / 100); }

  // CBI line
  ctx.beginPath();
  ctx.strokeStyle = '#5b8def';
  ctx.lineWidth = 2.5 * (window.devicePixelRatio || 1);
  points.forEach((p, i) => {
    const x = pad + (plotW * i) / Math.max(points.length - 1, 1);
    const y = yFor(p.cbi);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // points
  points.forEach((p, i) => {
    const x = pad + (plotW * i) / Math.max(points.length - 1, 1);
    const y = yFor(p.cbi);
    ctx.fillStyle = zoneInfo(p.cbi).color;
    ctx.beginPath();
    ctx.arc(x, y, 3.2 * (window.devicePixelRatio || 1), 0, Math.PI * 2);
    ctx.fill();
  });

  if (summary) {
    const last = points[points.length - 1];
    const first = points[0];
    const delta = last.cbi - first.cbi;
    const trend = delta > 5 ? 'accumulating' : delta < -5 ? 'recovering' : 'roughly stable';
    summary.innerHTML = 'Day 1 CBI ≈ <strong>' + Math.round(first.cbi) + '</strong> → Day ' + days +
      ' ≈ <strong>' + Math.round(last.cbi) + '</strong> (' + trend + '). Latent L ends at <strong>' + last.L.toFixed(2) + '</strong>.';
  }
}

function applyTemplate(values) {
  Object.keys(values).forEach(id => {
    const el = $('#' + id);
    if (el) el.value = values[id];
  });
  latentL = 0.35 + (computeStatic(getDemandInputs(), getBig5()).score / 100) * 0.3;
  update();
}

function renderTemplates() {
  const el = $('#template-grid');
  if (!el || typeof WORKPLACE_TEMPLATES === 'undefined') return;
  el.innerHTML = WORKPLACE_TEMPLATES.map(t => {
    return '<button type="button" class="template-card" data-id="' + t.id + '"><strong>' + t.name +
      '</strong><span>' + t.desc + '</span></button>';
  }).join('');
  el.querySelectorAll('.template-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = WORKPLACE_TEMPLATES.find(x => x.id === btn.getAttribute('data-id'));
      if (t) applyTemplate(t.values);
    });
  });
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
  renderTimeline();
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


const PROFILE_KEY = 'cbi_individual_profiles_v1';

function getContextNotes() {
  return {
    sex: ($('#ctx-sex') && $('#ctx-sex').value) || '',
    race: ($('#ctx-race') && $('#ctx-race').value) || '',
    religion: ($('#ctx-religion') && $('#ctx-religion').value) || '',
    orientation: ($('#ctx-orientation') && $('#ctx-orientation').value) || '',
    socio: ($('#ctx-socio') && $('#ctx-socio').value) || ''
  };
}

function setContextNotes(ctx) {
  if (!ctx) return;
  const map = {
    sex: 'ctx-sex', race: 'ctx-race', religion: 'ctx-religion',
    orientation: 'ctx-orientation', socio: 'ctx-socio'
  };
  Object.keys(map).forEach(k => {
    const el = $('#' + map[k]);
    if (el) el.value = ctx[k] || '';
  });
}

function collectFactorVector() {
  const demand = getDemandInputs();
  const big5 = getBig5();
  const ctx = getContextNotes();
  const staticResult = computeStatic(demand, big5);
  return {
    demand: demand,
    big5: big5,
    context: ctx,
    snapshot: {
      staticCBI: Math.round(staticResult.score),
      latentL: Number(latentL.toFixed(3)),
      weights: staticResult.weights
    },
    savedAt: new Date().toISOString()
  };
}

function applyFactorVector(vec) {
  if (!vec) return;
  if (vec.demand) {
    Object.keys(vec.demand).forEach(id => {
      const el = $('#' + id);
      if (el) el.value = vec.demand[id];
    });
  }
  if (vec.big5) {
    const map = { o: 'b5o', c: 'b5c', e: 'b5e', a: 'b5a', n: 'b5n' };
    Object.keys(map).forEach(k => {
      const el = $('#' + map[k]);
      if (el && vec.big5[k] != null) el.value = vec.big5[k];
    });
  }
  if (vec.context) setContextNotes(vec.context);
  if (vec.snapshot && vec.snapshot.latentL != null) latentL = vec.snapshot.latentL;
  else latentL = 0.35 + (computeStatic(getDemandInputs(), getBig5()).score / 100) * 0.3;
  update();
}

function loadProfiles() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}'); }
  catch (e) { return {}; }
}

function saveProfiles(obj) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(obj));
}

function renderProfileList() {
  const el = $('#profile-list');
  if (!el) return;
  const all = loadProfiles();
  const names = Object.keys(all).sort();
  if (!names.length) {
    el.innerHTML = '<p class="profile-empty">No saved profiles yet. Name a full factor vector and save it.</p>';
    return;
  }
  el.innerHTML = names.map(name => {
    const p = all[name];
    const cbi = p.snapshot ? p.snapshot.staticCBI : '—';
    const note = (p.context && (p.context.socio || p.context.race || p.context.sex)) || '';
    return '<div class="profile-row">' +
      '<div class="profile-meta"><strong>' + escapeHtml(name) + '</strong>' +
      '<span>Static CBI ≈ ' + cbi + (note ? ' · ' + escapeHtml(String(note).slice(0, 60)) : '') + '</span></div>' +
      '<div class="profile-actions">' +
      '<button type="button" class="btn ghost small" data-load="' + encodeURIComponent(name) + '">Load</button>' +
      '<button type="button" class="btn ghost small" data-del="' + encodeURIComponent(name) + '">Delete</button>' +
      '</div></div>';
  }).join('');
  el.querySelectorAll('[data-load]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = decodeURIComponent(btn.getAttribute('data-load'));
      const all = loadProfiles();
      if (all[name]) applyFactorVector(all[name]);
    });
  });
  el.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = decodeURIComponent(btn.getAttribute('data-del'));
      const all = loadProfiles();
      delete all[name];
      saveProfiles(all);
      renderProfileList();
    });
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function exportProfiles() {
  const blob = new Blob([JSON.stringify(loadProfiles(), null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cbi-factor-vectors.json';
  a.click();
  URL.revokeObjectURL(a.href);
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
  const daysEl = $('#timeline-days');
  if (daysEl) daysEl.addEventListener('input', () => { renderTimeline(); });
  window.addEventListener('resize', () => { renderTimeline(); });

  const saveBtn = $('#save-profile');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const nameEl = $('#profile-name');
      const name = (nameEl && nameEl.value || '').trim();
      if (!name) { alert('Enter a profile name for this factor vector.'); return; }
      const all = loadProfiles();
      all[name] = collectFactorVector();
      saveProfiles(all);
      renderProfileList();
      if (nameEl) nameEl.value = '';
    });
  }
  const exportBtn = $('#export-profiles');
  if (exportBtn) exportBtn.addEventListener('click', exportProfiles);
  const compareBtn = $('#compare-timeline');
  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      // force dynamic view and timeline refresh
      const dyn = $('#use-dynamic');
      if (dyn) dyn.checked = true;
      update();
    });
  }
  renderProfileList();

  renderTemplates();
  update();
});
