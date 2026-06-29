/* =========================
   UTILMINT CORE ENGINE
========================= */

/* ACTIVE STATE */
let currentType = "";
let history = [];

/* =========================
   OPEN CONVERTER BOX
========================= */

function openBox(type){

  currentType = type;

  const panel = document.getElementById("panel");
  const title = document.getElementById("title");

  panel.style.display = "block";
  title.innerText = type.toUpperCase() + " CONVERTER";

  const from = document.getElementById("from");
  const to = document.getElementById("to");

  from.innerHTML = "";
  to.innerHTML = "";

  const units = CONVERTERS[type];

  for(let u in units){
    from.innerHTML += `<option value="${u}">${u}</option>`;
    to.innerHTML += `<option value="${u}">${u}</option>`;
  }

}

/* =========================
   CONVERSION DATABASE
========================= */

const CONVERTERS = {

length:{ m:1, km:1000, cm:0.01, mm:0.001, mile:1609.34, foot:0.3048, inch:0.0254 },

mass:{ kg:1, g:0.001, mg:0.000001, lb:0.453592, ton:1000 },

time:{ s:1, min:60, hr:3600, day:86400 },

area:{ m2:1, km2:1e6, cm2:0.0001, acre:4046.86 },

volume:{ m3:1, l:0.001, ml:0.000001 },

speed:{ "m/s":1, "km/h":0.277778, mph:0.44704, knot:0.514444 },

acceleration:{ "m/s2":1, "km/h2":7.716e-5 },

force:{ N:1, kN:1000, dyne:1e-5 },

pressure:{ Pa:1, bar:100000, atm:101325 },

energy:{ J:1, kJ:1000, cal:4.184, kcal:4184 },

power:{ W:1, kW:1000, HP:745.7 },

data:{ B:1, KB:1024, MB:1048576, GB:1073741824, TB:1.0995e12 },

frequency:{ Hz:1, kHz:1000, MHz:1e6, GHz:1e9 },

angle:{ deg:1, rad:0.0174533, grad:0.9 },

fuel:{ "km/l":1, "l/100km":1 },

density:{ "kg/m3":1, "g/cm3":1000 },

torque:{ "N·m":1, "lbf·ft":1.35582 },

current:{ A:1, mA:0.001 },

voltage:{ V:1, mV:0.001, kV:1000 },

resistance:{ ohm:1, kohm:1000, Mohm:1e6 },

charge:{ C:1, mC:0.001 },

capacitance:{ F:1, uF:1e-6, nF:1e-9 },

magnetic:{ T:1, G:0.0001 },

light:{ cd:1, mcd:0.001 }

};

/* =========================
   CONVERT FUNCTION
========================= */

function convert(){

  const input = document.getElementById("input").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  if(!input || isNaN(input)) return;

  let value = parseFloat(input);
  let result = 0;

  let unitSet = CONVERTERS[currentType];

  /* BASE CONVERSION */
  result = value * unitSet[from] / unitSet[to];

  /* SPECIAL CASE: TEMPERATURE */
  if(currentType === "temperature"){

    if(from === "C" && to === "F") result = (value * 9/5) + 32;
    if(from === "F" && to === "C") result = (value - 32) * 5/9;
    if(from === "C" && to === "K") result = value + 273.15;
    if(from === "K" && to === "C") result = value - 273.15;

  }

  result = parseFloat(result.toFixed(6));

  document.getElementById("result").innerText =
    "Result: " + result;

  addHistory(value, from, result, to);

}

/* =========================
   HISTORY SYSTEM
========================= */

function addHistory(val, from, res, to){

  history.push(`${val} ${from} → ${res} ${to}`);

  if(history.length > 20){
    history.shift();
  }

  const box = document.getElementById("history");

  if(box){
    box.innerHTML = history.map(h => "• " + h).join("<br>");
  }

}

/* =========================
   THEME TOGGLE
========================= */

document.getElementById("themeToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

/* =========================
   COPY RESULT (optional future use)
========================= */

function copyResult(){
  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text);
}

/* =========================
   SAFE INIT
========================= */

window.onload = () => {
  console.log("Utilmint Engine Loaded Successfully");
};

function swapUnits(){

  const from = document.getElementById("from");
  const to = document.getElementById("to");

  const temp = from.value;
  from.value = to.value;
  to.value = temp;

}
