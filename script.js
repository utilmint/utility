const state = {
  category: "Length"
};

const units = {
  Length: { m:1, km:1000, cm:0.01, mm:0.001, mi:1609.34 },
  Mass: { kg:1, g:0.001, lb:0.453592 },
  Speed: { mps:1, kph:0.277778, mph:0.44704 },
  Volume: { l:1, ml:0.001, gal:3.78541 },
  Time: { s:1, min:60, hr:3600 },

  Temperature: {} // special handling
};

const el = {
  input: document.getElementById("inputValue"),
  cat: document.getElementById("category"),
  from: document.getElementById("fromUnit"),
  to: document.getElementById("toUnit"),
  out: document.getElementById("output")
};

/* INIT */
function init() {
  Object.keys(units).forEach(c => {
    el.cat.innerHTML += `<option value="${c}">${c}</option>`;
  });

  loadUnits(state.category);
}

/* LOAD UNITS */
function loadUnits(cat) {
  el.from.innerHTML = "";
  el.to.innerHTML = "";

  if (cat === "Temperature") {
    ["C","F","K"].forEach(u => {
      el.from.innerHTML += `<option>${u}</option>`;
      el.to.innerHTML += `<option>${u}</option>`;
    });
  } else {
    Object.keys(units[cat]).forEach(u => {
      el.from.innerHTML += `<option>${u}</option>`;
      el.to.innerHTML += `<option>${u}</option>`;
    });
  }

  convert();
}

/* CONVERSION ENGINE */
function convertTemp(v, from, to) {
  if (from === to) return v;

  let c;

  if (from === "C") c = v;
  if (from === "F") c = (v - 32) * 5/9;
  if (from === "K") c = v - 273.15;

  if (to === "C") return c;
  if (to === "F") return (c * 9/5) + 32;
  if (to === "K") return c + 273.15;
}

function convert() {
  const cat = el.cat.value;
  const val = parseFloat(el.input.value) || 0;

  let result;

  if (cat === "Temperature") {
    result = convertTemp(val, el.from.value, el.to.value);
  } else {
    const base = val * units[cat][el.from.value];
    result = base / units[cat][el.to.value];
  }

  el.out.textContent = result.toFixed(4);
}

/* SWAP */
function swap() {
  [el.from.value, el.to.value] = [el.to.value, el.from.value];
  convert();
}

/* EVENTS */
el.cat.onchange = (e) => loadUnits(e.target.value);
el.input.oninput = convert;
el.from.onchange = convert;
el.to.onchange = convert;

document.getElementById("swap").onclick = swap;

/* COPY */
document.getElementById("copy").onclick = () => {
  navigator.clipboard.writeText(el.out.textContent);
};

/* THEME */
document.getElementById("themeToggle").onclick = () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "light" ? "dark" : "light";
};

/* QUICK CATEGORY */
document.querySelectorAll("[data-cat]").forEach(btn => {
  btn.onclick = () => {
    el.cat.value = btn.dataset.cat;
    loadUnits(btn.dataset.cat);
  };
});

init();
