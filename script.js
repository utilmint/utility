const U = {

Length: { m:1, km:1000, cm:0.01, mm:0.001, mi:1609.34, ft:0.3048 },

Mass: { kg:1, g:0.001, mg:0.000001, lb:0.453592 },

Time: { s:1, min:60, hr:3600, day:86400 },

Area: { m2:1, km2:1e6, acre:4046.86 },

Volume: { l:1, ml:0.001, m3:1000, gal:3.78541 },

Speed: { mps:1, kph:0.277778, mph:0.44704 },

Acceleration: { mps2:1, g:9.81 },

Force: { N:1, kN:1000 },

Pressure: { Pa:1, kPa:1000, atm:101325 },

Energy: { J:1, kJ:1000, kcal:4184, kWh:3600000 },

Power: { W:1, kW:1000, hp:745.7 },

Data: { B:1, KB:1024, MB:1024**2, GB:1024**3, TB:1024**4 },

Frequency: { Hz:1, kHz:1000, MHz:1e6, GHz:1e9 },

Angle: { rad:1, deg:0.0174533 },

Fuel: { kmpl:1, mpg:0.425144 },

Density: { kgm3:1, gcm3:1000 },

Torque: { Nm:1, lbft:1.35582 },

Current: { A:1, mA:0.001 },

Voltage: { V:1, kV:1000 },

Resistance: { ohm:1, kohm:1000 },

Charge: { C:1, mC:0.001 },

Capacitance: { F:1, uF:1e-6 },

Magnetic: { T:1, mT:0.001 },

Light: { cd:1, mcd:0.001 },

Temperature: {}
};

const el = {
  input: document.querySelector("#input"),
  cat: document.querySelector("#category"),
  from: document.querySelector("#from"),
  to: document.querySelector("#to"),
  out: document.querySelector("#output"),
  grid: document.querySelector("#grid")
};

/* INIT */
function init() {
  Object.keys(U).forEach(c => {
    el.cat.innerHTML += `<option value="${c}">${c}</option>`;
    el.grid.innerHTML += `<div>${c}</div>`;
  });

  load("Length");
}

/* LOAD UNITS */
function load(cat) {

  el.from.innerHTML = "";
  el.to.innerHTML = "";

  if (cat === "Temperature") {
    ["C","F","K"].forEach(v => {
      el.from.innerHTML += `<option value="${v}">${v}</option>`;
      el.to.innerHTML += `<option value="${v}">${v}</option>`;
    });
  } else {
    Object.keys(U[cat]).forEach(v => {
      el.from.innerHTML += `<option value="${v}">${v}</option>`;
      el.to.innerHTML += `<option value="${v}">${v}</option>`;
    });
  }

  convert();
}

/* TEMP */
function temp(v,f,t){
  if(f===t) return v;

  let c;

  if(f==="C") c=v;
  if(f==="F") c=(v-32)*5/9;
  if(f==="K") c=v-273.15;

  if(t==="C") return c;
  if(t==="F") return (c*9/5)+32;
  if(t==="K") return c+273.15;
}

/* CONVERT */
function convert(){

  const cat = el.cat.value;
  const val = parseFloat(el.input.value) || 0;

  let result;

  if(cat === "Temperature"){
    result = temp(val, el.from.value, el.to.value);
  } else {
    const base = val * U[cat][el.from.value];
    result = base / U[cat][el.to.value];
  }

  el.out.textContent = result.toFixed(6);
}

/* EVENTS */
el.cat.addEventListener("change", e => load(e.target.value));
el.input.addEventListener("input", convert);
el.from.addEventListener("change", convert);
el.to.addEventListener("change", convert);

/* SWAP */
document.querySelector("#swap").addEventListener("click", () => {
  [el.from.value, el.to.value] = [el.to.value, el.from.value];
  convert();
});

/* COPY */
document.querySelector("#copy").addEventListener("click", () => {
  navigator.clipboard.writeText(el.out.textContent);
});

/* THEME */
document.querySelector("#themeToggle").addEventListener("click", () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "light" ? "dark" : "light";
});

/* START */
init();
