const converter = {
  Length: { base: "m", units: { m:1, km:1000, cm:0.01, mm:0.001, mi:1609.34, ft:0.3048, in:0.0254 }},
  Mass: { base: "kg", units: { kg:1, g:0.001, mg:0.000001, lb:0.453592, oz:0.0283495 }},
  Time: { base: "s", units: { s:1, ms:0.001, min:60, hr:3600, day:86400 }},
  Area: { base: "m2", units: { m2:1, km2:1e6, ft2:0.092903, acre:4046.86 }},
  Volume: { base: "l", units: { l:1, ml:0.001, m3:1000, gal:3.78541 }},
  Speed: { base: "mps", units: { mps:1, kph:0.277778, mph:0.44704 }},
  Acceleration: { base: "mps2", units: { mps2:1, g:9.81 }},
  Force: { base: "N", units: { N:1, kN:1000 }},
  Pressure: { base: "Pa", units: { Pa:1, kPa:1000, bar:100000, atm:101325 }},
  Energy: { base: "J", units: { J:1, kJ:1000, kcal:4184, kWh:3600000 }},
  Power: { base: "W", units: { W:1, kW:1000, hp:745.7 }},
  Data: { base: "B", units: { B:1, KB:1000, MB:1e6, GB:1e9, TB:1e12 }},
  Frequency: { base: "Hz", units: { Hz:1, kHz:1000, MHz:1e6, GHz:1e9 }},
  Angle: { base: "rad", units: { rad:1, deg:0.0174533 }},
  FuelEconomy: { base: "kmpl", units: { kmpl:1, mpg:0.425144 }},
  Density: { base: "kgm3", units: { kgm3:1, gcm3:1000 }},
  Torque: { base: "Nm", units: { Nm:1, kNm:1000, lbft:1.35582 }},
  ElectricCurrent: { base: "A", units: { A:1, mA:0.001, kA:1000 }},
  Voltage: { base: "V", units: { V:1, kV:1000 }},
  Resistance: { base: "ohm", units: { ohm:1, kohm:1000, Mohm:1e6 }},
  ElectricCharge: { base: "C", units: { C:1, mC:0.001, uC:0.000001 }},
  Capacitance: { base: "F", units: { F:1, uF:1e-6, nF:1e-9 }},
  MagneticField: { base: "T", units: { T:1, mT:0.001, uT:1e-6 }},
  LuminousIntensity: { base: "cd", units: { cd:1, mcd:0.001 }},
  Temperature: { base: "C", units: {} }
};

const categorySelect = document.getElementById("categorySelect");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const result = document.getElementById("result");

let currentCategory = "Length";

function initCategories() {
  Object.keys(converter).forEach(cat => {
    let opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

function loadUnits(cat) {
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  Object.keys(converter[cat].units).forEach(u => {
    fromUnit.innerHTML += `<option>${u}</option>`;
    toUnit.innerHTML += `<option>${u}</option>`;
  });

  convert();
}

function convert() {
  let cat = categorySelect.value;
  let val = parseFloat(inputValue.value) || 0;

  if (cat === "Temperature") {
    let res = val;
    result.innerText = res.toFixed(2);
    return;
  }

  let base = val * converter[cat].units[fromUnit.value];
  let out = base / converter[cat].units[toUnit.value];

  result.innerText = out.toFixed(4);
}

function swapUnits() {
  let temp = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = temp;
  convert();
}

function setCategory(cat) {
  categorySelect.value = cat;
  loadUnits(cat);
}

categorySelect.onchange = () => loadUnits(categorySelect.value);
fromUnit.onchange = convert;
toUnit.onchange = convert;
inputValue.oninput = convert;

document.getElementById("swapBtn").onclick = swapUnits;

document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

document.getElementById("copyBtn").onclick = () => {
  navigator.clipboard.writeText(result.innerText);
};

initCategories();
loadUnits(currentCategory);
