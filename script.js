function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
}

const main = document.getElementById("mainContent");

/* CATEGORY DATA (RIGHT SIDE CONTENT) */
const data = {
  home: `
    <h2>Welcome to All-in-One Utility Hub</h2>
    <p class="desc">Select a category to explore tools.</p>
    <div class="info-grid">
      <div class="info-card">📄 PDF Tools</div>
      <div class="info-card">🖼 Image Tools</div>
      <div class="info-card">🧮 Calculators</div>
      <div class="info-card">🔁 Converters</div>
      <div class="info-card">⚡ Productivity</div>
      <div class="info-card">🔐 Security</div>
    </div>
  `,

  pdf: `
    <h2>PDF Tools</h2>
    <div class="tool-grid">
      <div class="tool-card">Merge PDF</div>
      <div class="tool-card">Split PDF</div>
      <div class="tool-card">Compress PDF</div>
      <div class="tool-card">PDF to Word</div>
      <div class="tool-card">Word to PDF</div>
      <div class="tool-card">Protect PDF</div>
    </div>
  `,

  image: `
    <h2>Image Tools</h2>
    <div class="tool-grid">
      <div class="tool-card">Resize Image</div>
      <div class="tool-card">Compress Image</div>
      <div class="tool-card">Convert Format</div>
      <div class="tool-card">Remove Background</div>
      <div class="tool-card">Crop Image</div>
    </div>
  `,

  calc: `
    <h2>Calculators</h2>
    <div class="tool-grid">
      <div class="tool-card">Basic Calculator</div>
      <div class="tool-card">Age Calculator</div>
      <div class="tool-card">BMI Calculator</div>
      <div class="tool-card">GST Calculator</div>
    </div>
  `,

  convert: `
    <h2>Converters</h2>
    <div class="tool-grid">
      <div class="tool-card">Currency Converter</div>
      <div class="tool-card">Unit Converter</div>
      <div class="tool-card">Length Converter</div>
      <div class="tool-card">Weight Converter</div>
    </div>
  `,

  text: `
    <h2>Text Tools</h2>
    <div class="tool-grid">
      <div class="tool-card">Word Counter</div>
      <div class="tool-card">Case Converter</div>
      <div class="tool-card">Remove Spaces</div>
      <div class="tool-card">Text Formatter</div>
    </div>
  `,

  productivity: `
    <h2>Productivity Tools</h2>
    <div class="tool-grid">
      <div class="tool-card">To-Do List</div>
      <div class="tool-card">Notes App</div>
      <div class="tool-card">Password Generator</div>
      <div class="tool-card">Timer</div>
    </div>
  `,

  file: `
    <h2>File Tools</h2>
    <div class="tool-grid">
      <div class="tool-card">File Compressor</div>
      <div class="tool-card">File Converter</div>
      <div class="tool-card">File Splitter</div>
    </div>
  `,

  finance: `
    <h2>Finance Tools</h2>
    <div class="tool-grid">
      <div class="tool-card">Loan Calculator</div>
      <div class="tool-card">Interest Calculator</div>
      <div class="tool-card">Budget Planner</div>
    </div>
  `,

  datetime: `
    <h2>Date & Time Tools</h2>
    <div class="tool-grid">
      <div class="tool-card">Current Time</div>
      <div class="tool-card">Countdown Timer</div>
      <div class="tool-card">Date Difference</div>
    </div>
  `,

  dev: `
    <h2>Developer Tools</h2>
    <div class="tool-grid">
      <div class="tool-card">JSON Formatter</div>
      <div class="tool-card">Code Minifier</div>
      <div class="tool-card">Base64 Encoder</div>
    </div>
  `,

  seo: `
    <h2>SEO Tools</h2>
    <div class="tool-grid">
      <div class="tool-card">Meta Tag Checker</div>
      <div class="tool-card">Keyword Generator</div>
      <div class="tool-card">Backlink Checker</div>
    </div>
  `,

  security: `
    <h2>Security Tools</h2>
    <div class="tool-grid">
      <div class="tool-card">Password Strength</div>
      <div class="tool-card">Hash Generator</div>
      <div class="tool-card">Encrypt/Decrypt</div>
    </div>
  `,

  misc: `
    <h2>Miscellaneous Tools</h2>
    <div class="tool-grid">
      <div class="tool-card">QR Generator</div>
      <div class="tool-card">Barcode Generator</div>
      <div class="tool-card">Unit Tester</div>
    </div>
  `
};

/* LOAD CATEGORY INTO RIGHT PANEL */
function loadCategory(key) {
  main.innerHTML = data[key] || "<h2>Not Found</h2>";
}
