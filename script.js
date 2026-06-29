/* ============================
   UTILMINT — SCRIPT.JS
   Modular conversion engine + UI
   ============================ */

'use strict';

// ===========================
// CONVERSION ENGINE
// ===========================

const UNITS = {
  Length: {
    base: 'Meter',
    units: {
      Meter:       { factor: 1,            symbol: 'm' },
      Kilometer:   { factor: 1000,         symbol: 'km' },
      Centimeter:  { factor: 0.01,         symbol: 'cm' },
      Millimeter:  { factor: 0.001,        symbol: 'mm' },
      Micrometer:  { factor: 1e-6,         symbol: 'μm' },
      Nanometer:   { factor: 1e-9,         symbol: 'nm' },
      Mile:        { factor: 1609.344,     symbol: 'mi' },
      Yard:        { factor: 0.9144,       symbol: 'yd' },
      Foot:        { factor: 0.3048,       symbol: 'ft' },
      Inch:        { factor: 0.0254,       symbol: 'in' },
      'Nautical Mile': { factor: 1852,     symbol: 'nmi' },
      'Light Year': { factor: 9.461e15,   symbol: 'ly' },
    }
  },
  Mass: {
    base: 'Kilogram',
    units: {
      Kilogram:    { factor: 1,            symbol: 'kg' },
      Gram:        { factor: 0.001,        symbol: 'g' },
      Milligram:   { factor: 1e-6,         symbol: 'mg' },
      Microgram:   { factor: 1e-9,         symbol: 'μg' },
      Tonne:       { factor: 1000,         symbol: 't' },
      Pound:       { factor: 0.45359237,   symbol: 'lb' },
      Ounce:       { factor: 0.028349523,  symbol: 'oz' },
      Stone:       { factor: 6.35029318,   symbol: 'st' },
      'US Ton':    { factor: 907.18474,    symbol: 'ston' },
      'UK Ton':    { factor: 1016.047,     symbol: 'ukton' },
    }
  },
  Temperature: {
    base: 'Celsius',
    special: true,
    units: {
      Celsius:    { symbol: '°C' },
      Fahrenheit: { symbol: '°F' },
      Kelvin:     { symbol: 'K' },
      Rankine:    { symbol: '°R' },
    },
    toBase: {
      Celsius:    v => v,
      Fahrenheit: v => (v - 32) * 5/9,
      Kelvin:     v => v - 273.15,
      Rankine:    v => (v - 491.67) * 5/9,
    },
    fromBase: {
      Celsius:    v => v,
      Fahrenheit: v => v * 9/5 + 32,
      Kelvin:     v => v + 273.15,
      Rankine:    v => (v + 273.15) * 9/5,
    }
  },
  Time: {
    base: 'Second',
    units: {
      Second:      { factor: 1,            symbol: 's' },
      Millisecond: { factor: 0.001,        symbol: 'ms' },
      Microsecond: { factor: 1e-6,         symbol: 'μs' },
      Nanosecond:  { factor: 1e-9,         symbol: 'ns' },
      Minute:      { factor: 60,           symbol: 'min' },
      Hour:        { factor: 3600,         symbol: 'hr' },
      Day:         { factor: 86400,        symbol: 'd' },
      Week:        { factor: 604800,       symbol: 'wk' },
      Month:       { factor: 2628000,      symbol: 'mo' },
      Year:        { factor: 31536000,     symbol: 'yr' },
      Decade:      { factor: 315360000,    symbol: 'dec' },
      Century:     { factor: 3153600000,   symbol: 'c' },
    }
  },
  Area: {
    base: 'Square Meter',
    units: {
      'Square Meter':      { factor: 1,          symbol: 'm²' },
      'Square Kilometer':  { factor: 1e6,        symbol: 'km²' },
      'Square Centimeter': { factor: 0.0001,     symbol: 'cm²' },
      'Square Millimeter': { factor: 1e-6,       symbol: 'mm²' },
      'Square Inch':       { factor: 0.00064516, symbol: 'in²' },
      'Square Foot':       { factor: 0.09290304, symbol: 'ft²' },
      'Square Yard':       { factor: 0.83612736, symbol: 'yd²' },
      'Square Mile':       { factor: 2589988.11, symbol: 'mi²' },
      Acre:                { factor: 4046.8564,  symbol: 'ac' },
      Hectare:             { factor: 10000,       symbol: 'ha' },
    }
  },
  Volume: {
    base: 'Liter',
    units: {
      Liter:          { factor: 1,           symbol: 'L' },
      Milliliter:     { factor: 0.001,       symbol: 'mL' },
      'Cubic Meter':  { factor: 1000,        symbol: 'm³' },
      'Cubic Centimeter': { factor: 0.001,   symbol: 'cm³' },
      'Cubic Inch':   { factor: 0.016387064, symbol: 'in³' },
      'Cubic Foot':   { factor: 28.316847,   symbol: 'ft³' },
      'US Gallon':    { factor: 3.785411784, symbol: 'gal' },
      'UK Gallon':    { factor: 4.54609,     symbol: 'ukgal' },
      'US Quart':     { factor: 0.946352946, symbol: 'qt' },
      'US Pint':      { factor: 0.473176473, symbol: 'pt' },
      'US Cup':       { factor: 0.236588237, symbol: 'cup' },
      'US Fluid Ounce': { factor: 0.029573530,symbol: 'fl oz' },
      Tablespoon:     { factor: 0.014786765, symbol: 'tbsp' },
      Teaspoon:       { factor: 0.004928922, symbol: 'tsp' },
    }
  },
  Speed: {
    base: 'Meter per Second',
    units: {
      'Meter per Second':    { factor: 1,          symbol: 'm/s' },
      'Kilometer per Hour':  { factor: 0.277778,   symbol: 'km/h' },
      'Mile per Hour':       { factor: 0.44704,    symbol: 'mph' },
      Knot:                  { factor: 0.514444,   symbol: 'kn' },
      'Foot per Second':     { factor: 0.3048,     symbol: 'ft/s' },
      Mach:                  { factor: 340.29,     symbol: 'Ma' },
      'Speed of Light':      { factor: 299792458,  symbol: 'c' },
    }
  },
  Acceleration: {
    base: 'Meter per Second Squared',
    units: {
      'Meter per Second Squared':  { factor: 1,          symbol: 'm/s²' },
      'Foot per Second Squared':   { factor: 0.3048,     symbol: 'ft/s²' },
      'Standard Gravity (g)':      { factor: 9.80665,    symbol: 'g' },
      'Kilometer per Hour Squared':{ factor: 0.00007716, symbol: 'km/h²' },
      Gal:                         { factor: 0.01,       symbol: 'Gal' },
    }
  },
  Force: {
    base: 'Newton',
    units: {
      Newton:      { factor: 1,          symbol: 'N' },
      Kilonewton:  { factor: 1000,       symbol: 'kN' },
      'Pound-force': { factor: 4.44822, symbol: 'lbf' },
      Dyne:        { factor: 0.00001,    symbol: 'dyn' },
      Kilogram-force: { factor: 9.80665,symbol: 'kgf' },
    }
  },
  Pressure: {
    base: 'Pascal',
    units: {
      Pascal:       { factor: 1,          symbol: 'Pa' },
      Kilopascal:   { factor: 1000,       symbol: 'kPa' },
      Megapascal:   { factor: 1e6,        symbol: 'MPa' },
      Bar:          { factor: 100000,     symbol: 'bar' },
      Millibar:     { factor: 100,        symbol: 'mbar' },
      Atmosphere:   { factor: 101325,     symbol: 'atm' },
      'mm of Mercury': { factor: 133.322,symbol: 'mmHg' },
      Torr:         { factor: 133.322,    symbol: 'Torr' },
      'PSI':        { factor: 6894.757,   symbol: 'psi' },
    }
  },
  Energy: {
    base: 'Joule',
    units: {
      Joule:           { factor: 1,           symbol: 'J' },
      Kilojoule:       { factor: 1000,        symbol: 'kJ' },
      Megajoule:       { factor: 1e6,         symbol: 'MJ' },
      Calorie:         { factor: 4.184,       symbol: 'cal' },
      Kilocalorie:     { factor: 4184,        symbol: 'kcal' },
      'Watt-hour':     { factor: 3600,        symbol: 'Wh' },
      'Kilowatt-hour': { factor: 3600000,     symbol: 'kWh' },
      'Electron Volt': { factor: 1.60218e-19, symbol: 'eV' },
      BTU:             { factor: 1055.06,     symbol: 'BTU' },
      'Foot-pound':    { factor: 1.355818,    symbol: 'ft·lb' },
    }
  },
  Power: {
    base: 'Watt',
    units: {
      Watt:       { factor: 1,         symbol: 'W' },
      Kilowatt:   { factor: 1000,      symbol: 'kW' },
      Megawatt:   { factor: 1e6,       symbol: 'MW' },
      Milliwatt:  { factor: 0.001,     symbol: 'mW' },
      Horsepower: { factor: 745.7,     symbol: 'hp' },
      'BTU/hour': { factor: 0.293071,  symbol: 'BTU/h' },
      Calorie_sec:{ factor: 4.184,     symbol: 'cal/s' },
    }
  },
  'Data Storage': {
    base: 'Byte',
    units: {
      Bit:       { factor: 0.125,    symbol: 'b' },
      Byte:      { factor: 1,        symbol: 'B' },
      Kilobyte:  { factor: 1024,     symbol: 'KB' },
      Megabyte:  { factor: 1048576,  symbol: 'MB' },
      Gigabyte:  { factor: 1073741824, symbol: 'GB' },
      Terabyte:  { factor: 1.0995e12, symbol: 'TB' },
      Petabyte:  { factor: 1.1259e15, symbol: 'PB' },
      Kibibyte:  { factor: 1024,      symbol: 'KiB' },
      Mebibyte:  { factor: 1048576,   symbol: 'MiB' },
      Gibibyte:  { factor: 1073741824,symbol: 'GiB' },
    }
  },
  Frequency: {
    base: 'Hertz',
    units: {
      Hertz:       { factor: 1,      symbol: 'Hz' },
      Kilohertz:   { factor: 1000,   symbol: 'kHz' },
      Megahertz:   { factor: 1e6,    symbol: 'MHz' },
      Gigahertz:   { factor: 1e9,    symbol: 'GHz' },
      RPM:         { factor: 1/60,   symbol: 'rpm' },
    }
  },
  Angle: {
    base: 'Degree',
    units: {
      Degree:     { factor: 1,              symbol: '°' },
      Radian:     { factor: 180/Math.PI,    symbol: 'rad' },
      Gradian:    { factor: 0.9,            symbol: 'grad' },
      Revolution: { factor: 360,            symbol: 'rev' },
      Arcminute:  { factor: 1/60,           symbol: "'" },
      Arcsecond:  { factor: 1/3600,         symbol: '"' },
    }
  },
  'Fuel Economy': {
    base: 'Liter per 100km',
    special: true,
    units: {
      'Liter per 100km': { symbol: 'L/100km' },
      'Km per Liter':    { symbol: 'km/L' },
      'Miles per Gallon (US)': { symbol: 'mpg' },
      'Miles per Gallon (UK)': { symbol: 'mpg (UK)' },
      'Km per Gallon':   { symbol: 'km/gal' },
    },
    toBase: {
      'Liter per 100km':     v => v,
      'Km per Liter':        v => 100 / v,
      'Miles per Gallon (US)': v => 235.215 / v,
      'Miles per Gallon (UK)': v => 282.481 / v,
      'Km per Gallon':       v => 100 / (v / 3.78541),
    },
    fromBase: {
      'Liter per 100km':     v => v,
      'Km per Liter':        v => 100 / v,
      'Miles per Gallon (US)': v => 235.215 / v,
      'Miles per Gallon (UK)': v => 282.481 / v,
      'Km per Gallon':       v => (100 / v) * 3.78541,
    }
  },
  Density: {
    base: 'Kilogram per Cubic Meter',
    units: {
      'Kilogram per Cubic Meter': { factor: 1,      symbol: 'kg/m³' },
      'Gram per Cubic Centimeter':{ factor: 1000,   symbol: 'g/cm³' },
      'Gram per Liter':           { factor: 1,      symbol: 'g/L' },
      'Kilogram per Liter':       { factor: 1000,   symbol: 'kg/L' },
      'Pound per Cubic Inch':     { factor: 27679.9,symbol: 'lb/in³' },
      'Pound per Cubic Foot':     { factor: 16.0185,symbol: 'lb/ft³' },
    }
  },
  Torque: {
    base: 'Newton Meter',
    units: {
      'Newton Meter':      { factor: 1,        symbol: 'N·m' },
      'Kilonewton Meter':  { factor: 1000,     symbol: 'kN·m' },
      'Pound-foot':        { factor: 1.35582,  symbol: 'lb·ft' },
      'Pound-inch':        { factor: 0.112985, symbol: 'lb·in' },
      'Kilogram-force meter': { factor: 9.80665, symbol: 'kgf·m' },
      'Dyne centimeter':   { factor: 1e-7,     symbol: 'dyn·cm' },
    }
  },
  'Electric Current': {
    base: 'Ampere',
    units: {
      Ampere:      { factor: 1,       symbol: 'A' },
      Milliampere: { factor: 0.001,   symbol: 'mA' },
      Microampere: { factor: 1e-6,    symbol: 'μA' },
      Kiloampere:  { factor: 1000,    symbol: 'kA' },
    }
  },
  Voltage: {
    base: 'Volt',
    units: {
      Volt:       { factor: 1,      symbol: 'V' },
      Millivolt:  { factor: 0.001,  symbol: 'mV' },
      Kilovolt:   { factor: 1000,   symbol: 'kV' },
      Megavolt:   { factor: 1e6,    symbol: 'MV' },
      Microvolt:  { factor: 1e-6,   symbol: 'μV' },
    }
  },
  Resistance: {
    base: 'Ohm',
    units: {
      Ohm:       { factor: 1,      symbol: 'Ω' },
      Milliohm:  { factor: 0.001,  symbol: 'mΩ' },
      Kiloohm:   { factor: 1000,   symbol: 'kΩ' },
      Megaohm:   { factor: 1e6,    symbol: 'MΩ' },
    }
  },
  'Electric Charge': {
    base: 'Coulomb',
    units: {
      Coulomb:       { factor: 1,        symbol: 'C' },
      Millicoulomb:  { factor: 0.001,    symbol: 'mC' },
      Microcoulomb:  { factor: 1e-6,     symbol: 'μC' },
      'Ampere-hour': { factor: 3600,     symbol: 'Ah' },
      'Milliampere-hour': { factor: 3.6, symbol: 'mAh' },
    }
  },
  Capacitance: {
    base: 'Farad',
    units: {
      Farad:        { factor: 1,      symbol: 'F' },
      Millifarad:   { factor: 0.001,  symbol: 'mF' },
      Microfarad:   { factor: 1e-6,   symbol: 'μF' },
      Nanofarad:    { factor: 1e-9,   symbol: 'nF' },
      Picofarad:    { factor: 1e-12,  symbol: 'pF' },
    }
  },
  'Magnetic Field': {
    base: 'Tesla',
    units: {
      Tesla:       { factor: 1,      symbol: 'T' },
      Millitesla:  { factor: 0.001,  symbol: 'mT' },
      Microtesla:  { factor: 1e-6,   symbol: 'μT' },
      Gauss:       { factor: 0.0001, symbol: 'G' },
      Nanotesla:   { factor: 1e-9,   symbol: 'nT' },
    }
  },
  'Luminous Intensity': {
    base: 'Candela',
    units: {
      Candela:    { factor: 1,          symbol: 'cd' },
      Millicandela:{ factor: 0.001,     symbol: 'mcd' },
      Lumen:      { factor: 0.079577,   symbol: 'lm' },
      Lux:        { factor: 0.079577,   symbol: 'lx' },
    }
  }
};

const CATEGORY_META = {
  Length:           { icon: '📏', shortName: 'Length' },
  Mass:             { icon: '⚖️', shortName: 'Weight' },
  Temperature:      { icon: '🌡️', shortName: 'Temp' },
  Time:             { icon: '⏱️', shortName: 'Time' },
  Area:             { icon: '📐', shortName: 'Area' },
  Volume:           { icon: '🧪', shortName: 'Volume' },
  Speed:            { icon: '🚗', shortName: 'Speed' },
  Acceleration:     { icon: '🏎️', shortName: 'Accel' },
  Force:            { icon: '💪', shortName: 'Force' },
  Pressure:         { icon: '🔵', shortName: 'Pressure' },
  Energy:           { icon: '⚡', shortName: 'Energy' },
  Power:            { icon: '🔋', shortName: 'Power' },
  'Data Storage':   { icon: '💾', shortName: 'Data' },
  Frequency:        { icon: '📡', shortName: 'Frequency' },
  Angle:            { icon: '📎', shortName: 'Angle' },
  'Fuel Economy':   { icon: '⛽', shortName: 'Fuel' },
  Density:          { icon: '🧲', shortName: 'Density' },
  Torque:           { icon: '🔩', shortName: 'Torque' },
  'Electric Current': { icon: '🔌', shortName: 'Current' },
  Voltage:          { icon: '⚡', shortName: 'Voltage' },
  Resistance:       { icon: '🔷', shortName: 'Resistance' },
  'Electric Charge':{ icon: '🔋', shortName: 'Charge' },
  Capacitance:      { icon: '📟', shortName: 'Capacitance' },
  'Magnetic Field': { icon: '🧲', shortName: 'Magnetic' },
  'Luminous Intensity': { icon: '💡', shortName: 'Light' },
};

// ===========================
// CONVERSION FUNCTIONS
// ===========================

function convert(catName, fromUnit, toUnit, value) {
  const cat = UNITS[catName];
  if (!cat || value === '' || isNaN(parseFloat(value))) return '';
  const v = parseFloat(value);

  if (cat.special) {
    const base = cat.toBase[fromUnit](v);
    return cat.fromBase[toUnit](base);
  }
  // Factor-based
  const fromFactor = cat.units[fromUnit].factor;
  const toFactor   = cat.units[toUnit].factor;
  return v * fromFactor / toFactor;
}

function formatResult(num) {
  if (num === '' || isNaN(num)) return '—';
  const abs = Math.abs(num);
  if (abs === 0) return '0';
  if (abs < 0.0001 || abs >= 1e12) return num.toExponential(6).replace(/\.?0+e/, 'e');
  if (Number.isInteger(num)) return num.toLocaleString('en-US');
  // Smart decimals
  const decimals = abs >= 100 ? 4 : abs >= 1 ? 6 : 8;
  const str = parseFloat(num.toPrecision(decimals)).toString();
  return str;
}

function getSymbol(catName, unitName) {
  const cat = UNITS[catName];
  if (!cat) return '';
  return cat.units[unitName]?.symbol || '';
}

// ===========================
// STATE
// ===========================

let state = {
  category: 'Length',
  fromUnit: 'Meter',
  toUnit: 'Kilometer',
  value: '',
  history: JSON.parse(localStorage.getItem('um_history') || '[]'),
  favorites: JSON.parse(localStorage.getItem('um_favorites') || '[]'),
};

// ===========================
// DOM REFERENCES
// ===========================

const $ = id => document.getElementById(id);
const categorySelect = $('categorySelect');
const fromUnit       = $('fromUnit');
const toUnit         = $('toUnit');
const fromValue      = $('fromValue');
const resultValue    = $('resultValue');
const formulaLabel   = $('formulaLabel');
const swapBtn        = $('swapBtn');
const copyBtn        = $('copyBtn');
const quickCats      = $('quickCats');
const categoryGrid   = $('categoryGrid');
const favoritesList  = $('favoritesList');
const historyList    = $('historyList');
const modalOverlay   = $('modalOverlay');
const toast          = $('toast');

// ===========================
// INIT
// ===========================

function init() {
  buildCategorySelect();
  buildQuickCats();
  buildCategoryGrid();
  loadCategory(state.category);
  renderFavorites();
  setupEventListeners();
  setupNavScroll();
}

function buildCategorySelect() {
  categorySelect.innerHTML = Object.keys(UNITS).map(cat =>
    `<option value="${cat}">${CATEGORY_META[cat].icon} ${cat}</option>`
  ).join('');
  categorySelect.value = state.category;
}

function buildQuickCats() {
  const quick = ['Length','Mass','Temperature','Volume','Speed','Data Storage','Time'];
  quickCats.innerHTML = quick.map(cat =>
    `<button class="quick-cat-btn${cat === state.category ? ' active' : ''}" data-cat="${cat}">${CATEGORY_META[cat].icon} ${CATEGORY_META[cat].shortName}</button>`
  ).join('');
}

function buildCategoryGrid() {
  categoryGrid.innerHTML = Object.keys(UNITS).map(cat =>
    `<div class="cat-card" data-cat="${cat}">
      <span class="cat-icon">${CATEGORY_META[cat].icon}</span>
      <span class="cat-name">${cat}</span>
    </div>`
  ).join('');
}

function buildUnitDropdown(selectEl, catName, selectedUnit) {
  const cat = UNITS[catName];
  const units = Object.keys(cat.units);
  selectEl.innerHTML = units.map(u =>
    `<option value="${u}" ${u === selectedUnit ? 'selected' : ''}>${u} (${cat.units[u].symbol})</option>`
  ).join('');
}

function loadCategory(catName, fromU, toU) {
  state.category = catName;
  const units = Object.keys(UNITS[catName].units);
  state.fromUnit = fromU || units[0];
  state.toUnit   = toU   || (units[1] || units[0]);

  buildUnitDropdown(fromUnit, catName, state.fromUnit);
  buildUnitDropdown(toUnit,   catName, state.toUnit);

  // Sync category select
  categorySelect.value = catName;

  // Sync quick cat buttons
  document.querySelectorAll('.quick-cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === catName);
  });

  doConvert();
}

// ===========================
// CONVERSION
// ===========================

function doConvert() {
  const v = fromValue.value;
  state.fromUnit = fromUnit.value;
  state.toUnit   = toUnit.value;
  state.value    = v;

  if (v === '' || isNaN(parseFloat(v))) {
    resultValue.textContent = '—';
    formulaLabel.textContent = '';
    return;
  }

  const result = convert(state.category, state.fromUnit, state.toUnit, v);
  const formatted = formatResult(result);
  resultValue.textContent = formatted + ' ' + getSymbol(state.category, state.toUnit);

  // Formula label
  const fromSym = getSymbol(state.category, state.fromUnit);
  const toSym   = getSymbol(state.category, state.toUnit);
  formulaLabel.textContent = `${v} ${fromSym} = ${formatted} ${toSym}`;

  // Save to history
  saveToHistory({
    cat: state.category,
    from: state.fromUnit,
    to: state.toUnit,
    val: parseFloat(v),
    result: formatted,
    fromSym, toSym,
    time: Date.now()
  });
}

// ===========================
// HISTORY
// ===========================

function saveToHistory(entry) {
  // Avoid duplicates
  state.history = state.history.filter(h =>
    !(h.cat === entry.cat && h.from === entry.from && h.to === entry.to && h.val === entry.val)
  );
  state.history.unshift(entry);
  if (state.history.length > 20) state.history = state.history.slice(0, 20);
  localStorage.setItem('um_history', JSON.stringify(state.history));
}

function renderHistory() {
  if (!state.history.length) {
    historyList.innerHTML = `<div class="empty-state"><span>📋</span><p>No conversions yet.</p></div>`;
    return;
  }
  historyList.innerHTML = state.history.map((h, i) =>
    `<div class="history-item" data-idx="${i}">
      <span class="hist-cat">${h.cat}</span>
      <span class="hist-conv">${h.val} ${h.fromSym} → ${h.result} ${h.toSym}</span>
    </div>`
  ).join('');
  // Click to reload
  historyList.querySelectorAll('.history-item').forEach(el => {
    el.addEventListener('click', () => {
      const h = state.history[el.dataset.idx];
      loadCategory(h.cat, h.from, h.to);
      fromValue.value = h.val;
      doConvert();
      closeModals();
      scrollToConverter();
    });
  });
}

// ===========================
// FAVORITES
// ===========================

function saveFavorite() {
  if (!state.value || isNaN(parseFloat(state.value))) {
    showToast('Enter a value first');
    return;
  }
  const key = `${state.category}|${state.fromUnit}|${state.toUnit}`;
  const exists = state.favorites.find(f => f.key === key);
  if (exists) { showToast('Already in favorites!'); return; }
  state.favorites.push({ key, cat: state.category, from: state.fromUnit, to: state.toUnit });
  localStorage.setItem('um_favorites', JSON.stringify(state.favorites));
  renderFavorites();
  showToast('⭐ Added to favorites!');
}

function renderFavorites() {
  const favEmpty = $('favEmpty');
  if (!state.favorites.length) {
    favoritesList.innerHTML = '';
    if (favEmpty) favoritesList.appendChild(favEmpty);
    else favoritesList.innerHTML = `<div class="empty-state" id="favEmpty"><span>⭐</span><p>No favorites yet. Press <kbd>Ctrl+S</kbd> while converting to save a pair.</p></div>`;
    return;
  }
  favoritesList.innerHTML = state.favorites.map((f, i) =>
    `<div class="fav-item" data-idx="${i}">
      <div class="fav-info">
        <div class="fav-label">${CATEGORY_META[f.cat].icon} ${f.cat}</div>
        <div class="fav-meta">${f.from} → ${f.to}</div>
      </div>
      <button class="fav-del" data-idx="${i}" title="Remove">✕</button>
    </div>`
  ).join('');

  favoritesList.querySelectorAll('.fav-item').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.classList.contains('fav-del')) return;
      const f = state.favorites[el.dataset.idx];
      loadCategory(f.cat, f.from, f.to);
      scrollToConverter();
    });
  });
  favoritesList.querySelectorAll('.fav-del').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      state.favorites.splice(parseInt(btn.dataset.idx), 1);
      localStorage.setItem('um_favorites', JSON.stringify(state.favorites));
      renderFavorites();
    });
  });
}

// ===========================
// BATCH CONVERTER
// ===========================

function initBatch() {
  const batchCat  = $('batchCat');
  const batchFrom = $('batchFrom');
  const batchTo   = $('batchTo');

  // Populate category
  batchCat.innerHTML = Object.keys(UNITS).map(c => `<option value="${c}">${c}</option>`).join('');
  batchCat.value = state.category;
  updateBatchUnits();

  batchCat.addEventListener('change', updateBatchUnits);

  function updateBatchUnits() {
    const cat = batchCat.value;
    const units = Object.keys(UNITS[cat].units);
    batchFrom.innerHTML = units.map(u => `<option>${u}</option>`).join('');
    batchTo.innerHTML   = units.map((u, i) => `<option ${i===1?'selected':''}>${u}</option>`).join('');
  }

  $('batchConvertBtn').addEventListener('click', () => {
    const lines = $('batchInput').value.trim().split('\n').filter(l => l.trim() !== '');
    const batchResults = $('batchResults');
    if (!lines.length) { batchResults.innerHTML = ''; return; }
    batchResults.innerHTML = lines.map(line => {
      const v = parseFloat(line.trim());
      if (isNaN(v)) return `<div class="batch-row"><span>${line}</span><span class="arrow">→</span><span style="color:var(--text-muted)">invalid</span></div>`;
      const result = convert(batchCat.value, batchFrom.value, batchTo.value, v);
      const from = getSymbol(batchCat.value, batchFrom.value);
      const to   = getSymbol(batchCat.value, batchTo.value);
      return `<div class="batch-row"><span>${v} ${from}</span><span class="arrow">→</span><span>${formatResult(result)} ${to}</span></div>`;
    }).join('');
  });
}

// ===========================
// MODALS
// ===========================

function openModal(id) {
  modalOverlay.classList.add('open');
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  $(id).classList.add('active');
  if (id === 'historyModal') renderHistory();
}

function closeModals() {
  modalOverlay.classList.remove('open');
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

// ===========================
// TOAST
// ===========================

let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ===========================
// DARK MODE
// ===========================

function applyTheme() {
  const isDark = localStorage.getItem('um_theme') !== 'light';
  document.body.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('light-mode', !isDark);
  $('themeToggle').textContent = isDark ? '☀' : '🌙';
}

// ===========================
// HELPERS
// ===========================

function scrollToConverter() {
  $('converter-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function setupNavScroll() {
  const navbar = $('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ===========================
// EVENT LISTENERS
// ===========================

function setupEventListeners() {
  // Category select
  categorySelect.addEventListener('change', () => {
    loadCategory(categorySelect.value);
  });

  // Unit selects
  fromUnit.addEventListener('change', doConvert);
  toUnit.addEventListener('change', doConvert);

  // Input
  fromValue.addEventListener('input', doConvert);
  fromValue.addEventListener('keydown', e => {
    if (e.key === 'Enter') doConvert();
  });

  // Swap
  swapBtn.addEventListener('click', () => {
    const tempUnit = fromUnit.value;
    const tempVal  = fromValue.value;
    fromUnit.value = toUnit.value;
    toUnit.value   = tempUnit;
    // Invert the result
    const res = resultValue.textContent.replace(/[^\d.\-e+]/g, '');
    fromValue.value = res || tempVal;
    doConvert();
  });

  // Copy
  copyBtn.addEventListener('click', () => {
    const text = resultValue.textContent;
    if (text === '—') return;
    navigator.clipboard.writeText(text).then(() => showToast('Copied!')).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Copied!');
    });
  });

  // Quick cat buttons (delegated)
  quickCats.addEventListener('click', e => {
    const btn = e.target.closest('.quick-cat-btn');
    if (btn) loadCategory(btn.dataset.cat);
  });

  // Category grid (delegated)
  categoryGrid.addEventListener('click', e => {
    const card = e.target.closest('.cat-card');
    if (card) {
      loadCategory(card.dataset.cat);
      scrollToConverter();
    }
  });

  // Featured cards
  document.querySelectorAll('.featured-card').forEach(card => {
    const tryBtn = card.querySelector('.feat-try');
    if (tryBtn) {
      tryBtn.addEventListener('click', () => {
        loadCategory(card.dataset.cat, card.dataset.from, card.dataset.to);
        fromValue.value = card.dataset.val;
        doConvert();
        scrollToConverter();
      });
    }
  });

  // Power tool buttons
  $('openHistoryBtn').addEventListener('click', () => openModal('historyModal'));
  $('openFavBtn').addEventListener('click', () => {
    scrollToConverter();
    setTimeout(() => $('favorites-section').scrollIntoView({ behavior: 'smooth' }), 100);
  });
  $('openBatchBtn').addEventListener('click', () => {
    openModal('batchModal');
    initBatch();
  });

  // Modal close
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModals();
  });
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });

  // Clear history
  $('clearHistoryBtn').addEventListener('click', () => {
    state.history = [];
    localStorage.removeItem('um_history');
    renderHistory();
    showToast('History cleared');
  });

  // Theme toggle
  $('themeToggle').addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('um_theme', isDark ? 'light' : 'dark');
    applyTheme();
  });

  // Hamburger
  const hamburger = $('hamburger');
  const navLinks  = $('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });
  navLinks.addEventListener('click', e => {
    if (e.target.tagName === 'A') navLinks.classList.remove('mobile-open');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveFavorite();
    }
    if (e.key === 'Escape') closeModals();
  });
}

// ===========================
// BOOT
// ===========================

applyTheme();
document.addEventListener('DOMContentLoaded', init);
