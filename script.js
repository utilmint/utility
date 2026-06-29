/* =========================
   25 CATEGORY ENGINE
========================= */

const CONVERTER = {

Length: {
  m:1, km:1000, cm:0.01, mm:0.001, mi:1609.34, ft:0.3048, in:0.0254
},

Mass: {
  kg:1, g:0.001, mg:0.000001, lb:0.453592, oz:0.0283495
},

Time: {
  s:1, min:60, hr:3600, day:86400
},

Temperature: {},

Area: {
  m2:1, km2:1e6, cm2:0.0001, acre:4046.86
},

Volume: {
  l:1, ml:0.001, m3:1000, gal:3.78541
},

Speed: {
  mps:1, kph:0.277778, mph:0.44704
},

Acceleration: {
  mps2:1, g:9.81
},

Force: {
  N:1, kN:1000
},

Pressure: {
  Pa:1, kPa:1000, bar:100000, atm:101325
},

Energy: {
  J:1, kJ:1000, kcal:4184, kWh:3600000
},

Power: {
  W:1, kW:1000, hp:745.7
},

DataStorage: {
  B:1, KB:1024, MB:1024**2, GB:1024**3, TB:1024**4
},

Frequency: {
  Hz:1, kHz:1000, MHz:1e6, GHz:1e9
},

Angle: {
  rad:1, deg:0.0174533
},

FuelEconomy: {
  kmpl:1, mpg:0.425144
},

Density: {
  kgm3:1, gcm3:1000
},

Torque: {
  Nm:1, lbft:1.35582
},

ElectricCurrent: {
  A:1, mA:0.001
},

Voltage: {
  V:1, kV:1000
},

Resistance: {
  ohm:1, kohm:1000, Mohm:1e6
},

ElectricCharge: {
  C:1, mC:0.001
},

Capacitance: {
  F:1, uF:1e-6
},

MagneticField: {
  T:1, mT:0.001
},

LuminousIntensity: {
  cd:1, mcd:0.001
}

};

/* =========================
   ELEMENTS
========================= */

const el = {
  value: document.getElementById("value"),
  cat: document.getElementById("category"),
  from: document.getElementById("from"),
  to: document.getElementById("to"),
  result: document.getElementById("result")
};

/* =========================
   INIT
========================= */

function init() {
  Object.keys(CONVERTER).forEach(c => {
    el.cat.innerHTML += `<option>${c}</option>`;
  });

  loadUnits("Length");
}

/* =========================
   LOAD UNITS
========================= */

function loadUnits(cat) {

  el.from.innerHTML = "";
  el.to.innerHTML = "";

  const units = CONVERTER[cat];

  Object.keys(units).forEach(u => {
    el.from.innerHTML += `<option>${u}</option>`;
    el.to.innerHTML += `<option>${u}</option>`;
  });

  convert();
}

/* =========================
   TEMPERATURE
========================= */

function temp(v, f, t) {
  if (f === t) return v;

  let c;

  if (f === "C") c = v;
  if (f === "F") c = (v - 32) * 5/9;
  if (f === "K") c = v - 273.15;

  if (t === "C") return c;
  if (t === "F") return (c * 9/5) + 32;
  if (t === "K") return c + 273.15;
}

/* =========================
   CONVERT ENGINE
========================= */

function convert() {

  const cat = el.cat.value;
  const val = parseFloat(el.value.value) || 0;

  let out;

  if (cat === "Temperature") {
    out = temp(val, el.from.value, el.to.value);
  } else {
    const base = val * CONVERTER[cat][el.from.value];
    out = base / CONVERTER[cat][el.to.value];
  }

  el.result.innerText = out.toFixed(6);
}

/* =========================
   EVENTS
========================= */

el.cat.onchange = (e) => loadUnits(e.target.value);
el.value.oninput = convert;
el.from.onchange = convert;
el.to.onchange = convert;

/* SWAP */
document.getElementById("swap").onclick = () => {
  [el.from.value, el.to.value] = [el.to.value, el.from.value];
  convert();
};

/* COPY */
document.getElementById("copy").onclick = () => {
  navigator.clipboard.writeText(el.result.innerText);
};

/* THEME */
document.getElementById("themeBtn").onclick = () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "light" ? "dark" : "light";
};

/* INIT */
init();
