const BREAKER_LIMIT = 1500;
const TARIFA_COP = 900;

const FALLBACK_APPLIANCES = [
  { id: 'bombillo',   name: 'Bombillo LED',       watts: 10,   svg: 'bombillo.svg'   },
  { id: 'ventilador', name: 'Ventilador',          watts: 75,   svg: 'ventilador.svg' },
  { id: 'televisor',  name: 'Televisor',           watts: 100,  svg: 'televisor.svg'  },
  { id: 'computador', name: 'Computador',          watts: 65,   svg: 'computador.svg' },
  { id: 'cargador',   name: 'Cargador Celular',    watts: 10,   svg: 'cargador.svg'   },
  { id: 'nevera',     name: 'Nevera',              watts: 400,  svg: 'nevera.svg'     },
  { id: 'microondas', name: 'Microondas',          watts: 1200, svg: 'microondas.svg' },
  { id: 'lavadora',   name: 'Lavadora',            watts: 500,  svg: 'lavadora.svg'   },
  { id: 'plancha',    name: 'Plancha de Ropa',     watts: 1000, svg: 'plancha.svg'    },
  { id: 'aire',       name: 'Aire Acondicionado',  watts: 1500, svg: 'aire.svg'       },
  { id: 'ducha',      name: 'Ducha Eléctrica',     watts: 3500, svg: 'ducha.svg'      },
  { id: 'licuadora',  name: 'Licuadora',           watts: 300,  svg: 'licuadora.svg'  }
];

const state = {
  appliances: [],
  breakerTripped: false
};

const dom = {};

function init() {
  dom.grid      = document.getElementById('appliances-grid');
  dom.loading   = document.getElementById('loading');
  dom.overlay   = document.getElementById('breaker-overlay');
  dom.powerVal  = document.getElementById('power-value');
  dom.kwhVal    = document.getElementById('kwh-value');
  dom.copVal    = document.getElementById('cop-value');
  dom.powerFill = document.getElementById('power-fill');
  dom.powerPct  = document.getElementById('power-pct');
  dom.breakerPowerVal = document.getElementById('breaker-power-val');

  dom.grid.addEventListener('click', onGridClick);
  dom.grid.addEventListener('input', onGridInput);
  document.getElementById('reset-btn').addEventListener('click', resetBreaker);

  state.appliances = FALLBACK_APPLIANCES.map(c => ({ ...c, on: false, qty: 1, hours: 4 }));
  dom.loading.style.display = 'none';
  renderAll();
}

/* ── Render ─────────────────────────────────────────── */

function renderAll() {
  dom.grid.innerHTML = '';
  state.appliances.forEach((a, i) => dom.grid.appendChild(buildCard(a, i)));
  updateMetrics();
}

function buildCard(a, i) {
  const card = document.createElement('div');
  card.className = 'appliance-card' + (a.on ? ' active' : '');
  card.dataset.index = i;

  card.innerHTML = `
    <div class="appliance-icon-wrap">
      <img src="./svg/${esc(a.svg)}" alt="${esc(a.name)}" class="appliance-img" width="64" height="64">
    </div>
    <h3 class="appliance-name">${esc(a.name)}</h3>
    <span class="appliance-watts">${a.watts} W</span>
    <label class="toggle-switch">
      <input type="checkbox" class="js-toggle" ${a.on ? 'checked' : ''}>
      <span class="toggle-track"><span class="toggle-thumb"></span></span>
      <span class="toggle-label">${a.on ? 'Encendido' : 'Apagado'}</span>
    </label>
    ${a.on ? buildControls(a, i) : ''}
  `;

  return card;
}

function buildControls(a) {
  const kwh = (a.watts * a.qty * a.hours * 30 / 1000).toFixed(1);
  return `
    <div class="controls">
      <div class="control-row">
        <span class="control-label">Cantidad</span>
        <div class="qty-control">
          <button class="qty-btn js-qty-dec" ${a.qty <= 1 ? 'disabled' : ''}>−</button>
          <span class="qty-value">${a.qty}</span>
          <button class="qty-btn js-qty-inc" ${a.qty >= 10 ? 'disabled' : ''}>+</button>
        </div>
      </div>
      <div class="control-row">
        <span class="control-label">Horas/día: <strong>${a.hours}h</strong></span>
        <input type="range" class="hours-slider js-hours" min="0.5" max="24" step="0.5" value="${a.hours}">
      </div>
      <div class="appliance-stats">${kwh} kWh/mes</div>
    </div>
  `;
}

function refreshCard(i) {
  const old = dom.grid.querySelector(`.appliance-card[data-index="${i}"]`);
  if (old) old.replaceWith(buildCard(state.appliances[i], i));
}

/* ── Events ─────────────────────────────────────────── */

function onGridClick(e) {
  const card = e.target.closest('.appliance-card');
  if (!card) return;
  const i = +card.dataset.index;

  if (e.target.classList.contains('js-toggle')) {
    state.appliances[i].on = e.target.checked;
    refreshCard(i);
    updateMetrics();
    checkBreaker();
    return;
  }
  if (e.target.classList.contains('js-qty-dec')) {
    changeQty(i, -1);
    return;
  }
  if (e.target.classList.contains('js-qty-inc')) {
    changeQty(i, 1);
  }
}

function onGridInput(e) {
  const card = e.target.closest('.appliance-card');
  if (!card || !e.target.classList.contains('js-hours')) return;
  const i = +card.dataset.index;
  state.appliances[i].hours = parseFloat(e.target.value);

  const strong = card.querySelector('.control-label strong');
  if (strong) strong.textContent = state.appliances[i].hours + 'h';

  const a = state.appliances[i];
  const stats = card.querySelector('.appliance-stats');
  if (stats) stats.textContent = (a.watts * a.qty * a.hours * 30 / 1000).toFixed(1) + ' kWh/mes';

  updateMetrics();
}

function changeQty(i, delta) {
  const a = state.appliances[i];
  const newQty = Math.max(1, Math.min(10, a.qty + delta));
  if (newQty === a.qty) return;
  state.appliances[i].qty = newQty;
  refreshCard(i);
  updateMetrics();
  if (a.on) checkBreaker();
}

/* ── Calculations ───────────────────────────────────── */

function computePower() {
  return state.appliances.filter(a => a.on).reduce((s, a) => s + a.watts * a.qty, 0);
}

function computeKwh() {
  return state.appliances.filter(a => a.on).reduce((s, a) => s + a.watts * a.qty * a.hours * 30 / 1000, 0);
}

function updateMetrics() {
  const power = computePower();
  const kwh   = computeKwh();
  const cop   = kwh * TARIFA_COP;
  const pct   = Math.min(power / BREAKER_LIMIT * 100, 100);
  const status = pct < 60 ? 'safe' : pct < 85 ? 'warning' : 'danger';

  dom.powerVal.textContent = power.toLocaleString('es-CO');
  dom.kwhVal.textContent   = kwh.toFixed(1);
  dom.copVal.textContent   = Math.round(cop).toLocaleString('es-CO');
  dom.powerFill.style.width = pct + '%';
  dom.powerFill.className   = 'power-fill ' + status;
  dom.powerPct.textContent  = Math.round(pct) + '%';
  dom.powerPct.className    = 'power-pct ' + status;
}

/* ── Breaker ─────────────────────────────────────────── */

function checkBreaker() {
  if (!state.breakerTripped && computePower() > BREAKER_LIMIT) {
    state.breakerTripped = true;
    dom.breakerPowerVal.textContent = computePower().toLocaleString('es-CO') + ' W';
    dom.overlay.classList.remove('hidden');
  }
}

function resetBreaker() {
  state.appliances.forEach(a => { a.on = false; });
  state.breakerTripped = false;
  dom.overlay.classList.add('hidden');
  renderAll();
}

/* ── Utils ───────────────────────────────────────────── */

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', init);
