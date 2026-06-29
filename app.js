/**
 * 📊 FormulaHub Embedded Database Core Matrix
 */
const formulaDatabase = [
    {
        id: "quadratic-formula",
        title: "Quadratic Formula",
        category: "Mathematics",
        equation: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        description: "Calculates real roots of any quadratic equations formatted as ax² + bx + c = 0.",
        variables: [
            { symbol: "a", name: "Coefficient a", default: 1 },
            { symbol: "b", name: "Coefficient b", default: 5 },
            { symbol: "c", name: "Constant term c", default: 6 }
        ],
        applications: ["Trajectory metrics tracking", "Parabolic structural paths", "Optimization vectors"],
        calculate: (inputs) => {
            const { a, b, c } = inputs;
            const discriminant = (b * b) - (4 * a * c);
            if (discriminant < 0) return "Complex Roots (No real numbers solution)";
            const r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            return `x₁ = ${r1.toFixed(4)}, x₂ = ${r2.toFixed(4)}`;
        }
    },
    {
        id: "kinetic-energy",
        title: "Kinetic Energy Formula",
        category: "Physics",
        equation: "E_k = \\frac{1}{2}mv^2",
        description: "Computes structural kinetic energy storage values using mass metrics and linear velocities.",
        variables: [
            { symbol: "m", name: "Object Mass (kg)", default: 10 },
            { symbol: "v", name: "Velocity (m/s)", default: 5 }
        ],
        applications: ["Impact deceleration models", "Automotive structural analysis", "Aerospace calculations"],
        calculate: (inputs) => {
            const { m, v } = inputs;
            return `${(0.5 * m * v * v).toFixed(2)} Joules (J)`;
        }
    }
];

/**
 * 🧭 SPA Route Layer Manager Engine
 */
const router = {
    navigate: (viewId) => {
        document.querySelectorAll('.view-panel').forEach(view => view.classList.remove('active'));
        const targetView = document.getElementById(`${viewId}-view`);
        if (targetView) targetView.classList.add('active');
        window.scrollTo(0,0);
    }
};

/**
 * 🛠️ DOM Generator and Builder Engine
 */
function renderFormulaGrid(dataset) {
    const container = document.getElementById('formula-grid');
    container.innerHTML = '';
    
    dataset.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.style.cursor = 'pointer';
        card.onclick = () => launchCalculatorWorkspace(item.id);
        
        card.innerHTML = `
            <span style="font-size:0.75rem; font-weight:800; text-transform:uppercase; color:#6366f1;">${item.category}</span>
            <h3 style="margin: 0.5rem 0 0.75rem 0;">${item.title}</h3>
            <p style="color: var(--text-muted); font-size:0.9rem; line-height:1.4;">${item.description}</p>
        `;
        container.appendChild(card);
    });
}

function launchCalculatorWorkspace(formulaId) {
    const formula = formulaDatabase.find(f => f.id === formulaId);
    if (!formula) return;

    document.getElementById('calc-title').innerText = formula.title;
    document.getElementById('calc-desc').innerText = formula.description;
    
    // Safely transform equation structures via CDN KaTeX
    const targetMathElement = document.getElementById('math-expression-target');
    try {
        katex.render(formula.equation, targetMathElement, { displayMode: true, throwOnError: false });
    } catch (e) {
        targetMathElement.innerText = formula.equation;
    }

    // Generate isolated functional variable fields dynamically
    const dynamicContainer = document.getElementById('dynamic-inputs-container');
    dynamicContainer.innerHTML = '';
    formula.variables.forEach(v => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.flexDirection = 'column';
        row.style.gap = '0.4rem';
        row.innerHTML = `
            <label style="font-size:0.9rem; font-weight:600;">${v.name} (${v.symbol})</label>
            <input type="number" data-symbol="${v.symbol}" value="${v.default}" class="input-field var-input">
        `;
        dynamicContainer.appendChild(row);
    });

    // Reset results dashboard view
    document.getElementById('calc-result-box').style.display = 'none';

    // Bind action to compute variables
    document.getElementById('execute-calc-btn').onclick = () => {
        const argMap = {};
        dynamicContainer.querySelectorAll('.var-input').forEach(input => {
            argMap[input.getAttribute('data-symbol')] = parseFloat(input.value) || 0;
        });
        const finalOutput = formula.calculate(argMap);
        document.getElementById('calc-result-output').innerText = finalOutput;
        document.getElementById('calc-result-box').style.display = 'block';
    };

    // Update operational metadata tags
    const appsList = document.getElementById('calc-apps');
    appsList.innerHTML = '';
    formula.applications.forEach(app => {
        const li = document.createElement('li');
        li.innerText = app;
        appsList.appendChild(li);
    });

    router.navigate('calculator');
}

/**
 * 🔄 Integrated Converter Engine
 */
function initConverterModule() {
    const inputVal = document.getElementById('converter-input');
    const fromUnit = document.getElementById('converter-from');
    const toUnit = document.getElementById('converter-to');
    const resultBox = document.getElementById('converter-result');

    const updateConversion = () => {
        const sourceValue = parseFloat(inputVal.value) || 0;
        const fromFactor = parseFloat(fromUnit.value);
        const toFactor = parseFloat(toUnit.value);
        
        // Normalize calculation base values
        const valueInMeters = sourceValue * fromFactor;
        const calculatedResult = valueInMeters / toFactor;
        
        const selectedText = toUnit.options[toUnit.selectedIndex].text.split(' ')[0];
        resultBox.innerText = `${calculatedResult.toLocaleString(undefined, {maximumFractionDigits: 6})} ${selectedText}`;
    };

    inputVal.addEventListener('input', updateConversion);
    fromUnit.addEventListener('change', updateConversion);
    toUnit.addEventListener('change', updateConversion);
}

/**
 * ⚡ Initialize Event Frameworks & Systems
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render initial dashboard items
    renderFormulaGrid(formulaDatabase);
    
    // 2. Setup searching listeners
    document.getElementById('globalSearch').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = formulaDatabase.filter(f => 
            f.title.toLowerCase().includes(query) || 
            f.category.toLowerCase().includes(query) ||
            f.description.toLowerCase().includes(query)
        );
        renderFormulaGrid(filtered);
    });

    // 3. Mount theme handling systems
    const themeButton = document.getElementById('themeToggle');
    themeButton.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
    });

    // 4. Fire converter components
    initConverterModule();
});
