// ========================================
// js/formulas.js - 数式データと配置情報
// ========================================

const MATH_FORMULAS = [
  // 左→右（5個）
  { nth: 1, top: '15%', size: '120px', animation: 'roll-right-1', duration: '35s', delay: '-10.5s', text: 'π', isEquation: false },
  { nth: 2, top: '45%', size: '50px', animation: 'roll-right-2', duration: '42s', delay: '-21s', text: '∑', isEquation: false },
  { nth: 3, top: '70%', size: '90px', animation: 'roll-right-3', duration: '38s', delay: '-15.2s', text: 'E = mc²', isEquation: true },
  { nth: 4, top: '25%', size: '110px', animation: 'roll-right-4', duration: '40s', delay: '-14s', text: '∫', isEquation: false },
  { nth: 5, top: '60%', size: '85px', animation: 'roll-right-5', duration: '36s', delay: '-19.8s', text: 'F = ma', isEquation: true },
  
  // 右→左（5個）
  { nth: 6, top: '20%', size: '55px', animation: 'roll-left-1', duration: '44s', delay: '-24.2s', text: 'θ', isEquation: false },
  { nth: 7, top: '55%', size: '45px', animation: 'roll-left-2', duration: '39s', delay: '-17.6s', text: 'y = mx + b', isEquation: true },
  { nth: 8, top: '80%', size: '100px', animation: 'roll-left-3', duration: '41s', delay: '-26.7s', text: 'Δ', isEquation: false },
  { nth: 9, top: '35%', size: '95px', animation: 'roll-left-4', duration: '37s', delay: '-14.8s', text: 'dy/dx', isEquation: true },
  { nth: 10, top: '65%', size: '80px', animation: 'roll-left-5', duration: '43s', delay: '-25.8s', text: 'α', isEquation: false },
  
  // 上→下（5個）
  { nth: 11, left: '10%', size: '50px', animation: 'roll-down-1', duration: '40s', delay: '-12s', text: '√', isEquation: false },
  { nth: 12, left: '30%', size: '40px', animation: 'roll-down-2', duration: '45s', delay: '-22.5s', text: 'f(x) = x²', isEquation: true },
  { nth: 13, left: '50%', size: '105px', animation: 'roll-down-3', duration: '38s', delay: '-9.5s', text: 'λ', isEquation: false },
  { nth: 14, left: '70%', size: '115px', animation: 'roll-down-4', duration: '42s', delay: '-23.1s', text: 'v = v₀ + at', isEquation: true },
  { nth: 15, left: '90%', size: '90px', animation: 'roll-down-5', duration: '36s', delay: '-12.6s', text: '∂', isEquation: false },
  
  // 下→上（5個）
  { nth: 16, left: '15%', size: '48px', animation: 'roll-up-1', duration: '39s', delay: '-25.4s', text: 'β', isEquation: false },
  { nth: 17, left: '35%', size: '52px', animation: 'roll-up-2', duration: '44s', delay: '-22s', text: 'γ', isEquation: false },
  { nth: 18, left: '55%', size: '100px', animation: 'roll-up-3', duration: '37s', delay: '-25.9s', text: '∞', isEquation: false },
  { nth: 19, left: '75%', size: '95px', animation: 'roll-up-4', duration: '41s', delay: '-18.5s', text: 'a² + b² = c²', isEquation: true },
  { nth: 20, left: '85%', size: '88px', animation: 'roll-up-5', duration: '43s', delay: '-25.8s', text: 'ω', isEquation: false },
  
  // 斜め（7個）
  { nth: 21, top: '20%', left: '15%', size: '50px', animation: 'roll-diagonal-br-1', duration: '50s', delay: '-17.5s', text: 'sin²θ + cos²θ = 1', isEquation: true },
  { nth: 22, top: '30%', left: '75%', size: '110px', animation: 'roll-diagonal-br-2', duration: '48s', delay: '-26.4s', text: 'dx/dt = v(t)', isEquation: true },
  { nth: 23, top: '70%', left: '80%', size: '48px', animation: 'roll-diagonal-bl-1', duration: '52s', delay: '-33.8s', text: 'A = πr²', isEquation: true },
  { nth: 24, top: '80%', left: '25%', size: '42px', animation: 'roll-diagonal-bl-2', duration: '46s', delay: '-13.8s', text: "dy/dx = f'(x)", isEquation: true },
  { nth: 25, top: '50%', left: '50%', size: '38px', animation: 'roll-diagonal-tr-1', duration: '54s', delay: '-27s', text: '∫f(x)dx', isEquation: true },
  { nth: 26, top: '40%', left: '65%', size: '45px', animation: 'roll-diagonal-tr-2', duration: '49s', delay: '-29.4s', text: 'PV = nRT', isEquation: true },
  { nth: 27, top: '65%', left: '35%', size: '52px', animation: 'roll-diagonal-tl', duration: '51s', delay: '-20.4s', text: 'x² + y² = r²', isEquation: true }
];

// ========================================
// 数式を生成する関数
// ========================================
function generateMathSymbols() {
  const container = document.querySelector('.math-symbols');
  
  if (!container) {
    console.error('❌ .math-symbols が見つかりません');
    return;
  }
  
  console.log('🔢 数式生成開始: ' + MATH_FORMULAS.length + '個');
  
  MATH_FORMULAS.forEach((formula, index) => {
    const span = document.createElement('span');
    span.className = formula.isEquation ? 'math-symbol math-equation' : 'math-symbol';
    span.textContent = formula.text;
    
    // スタイルを設定
    span.style.fontSize = formula.size;
    span.style.animation = `${formula.animation} ${formula.duration} linear infinite`;
    span.style.animationDelay = formula.delay;
    
    // 位置を設定
    if (formula.top) span.style.top = formula.top;
    if (formula.left) span.style.left = formula.left;
    
    container.appendChild(span);
  });
  
  console.log('✅ 数式生成完了: ' + container.children.length + '個');
}