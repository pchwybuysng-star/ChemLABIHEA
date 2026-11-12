// ============================================================================
// CHULA CHEM LAB 10 SIMULATOR - UI & INTERACTION CONTROLLER
// ============================================================================

const AppState = {
  activeTab: "lab", // 'lab' | 'solid' | 'control' | 'flowchart' | 'quiz'
  labMode: "exam_2mix", // 'exam_2mix' | 'full_2mix' | 'exam_unknown' | 'full_unknown' | 'known_single' | 'custom_mix'
  pairCategory: "any", // 'any' | 'both_g1' | 'g1_g2' | 'both_g2'
  selectedKnownIon: "Ag+",
  customMixIons: new Set(["Ag+", "Fe3+"]),
  secretUnknownIons: [],
  unknownCode: "MIX-201",
  unknownRevealed: false,
  unknownGuess: "",
  unknownGuesses2: new Set(), // For 2-cation unknown mode
  eliminatedIons: new Set(), // Scratchpad for students to cross out negative ions
  unknownFeedback: null,
  xrayMode: false,
  guidedHints: true,

  // Rack of VirtualTubes
  tubes: [],
  selectedTubeIndex: 0,
  animatingDrop: null, // { color }
  animatingSpin: false,
  animatingHeat: false,

  // Tab 2: Solid Solubility state
  selectedSolidIdx: 0,
  solidRandomMode: false,
  solidTestedSteps: [], // array of { key, label, dissolved, obs, color, ppt }
  solidCurrentState: { color: "rgba(226, 232, 240, 0.08)", ppt: "#f8fafc", dissolved: false, label: "ของแข็ง ~10 mg (ขนาดเมล็ดถั่วเขียว)" },

  // Tab 3: Control Test filter
  controlFilter: "exam5", // 'exam5' | 'all9'
  selectedControlCation: "Ag+",
  selectedControlStepIdx: 0,

  // Tab 4: Flowchart sub-view
  flowchartPart: "overview_exam", // 'overview_exam' | 'part1' | 'part2' | 'part3' | 'part4' | 'blank_sheet'
  blankSheetRevealed: {},

  // Tab 5: Quiz state
  quizAnswers: {},
  quizSubmitted: false
};

// ============================================================================
// SVG TEST TUBE RENDERER
// ============================================================================
function renderTestTubeSVG(config = {}) {
  const {
    liquidColor = "rgba(226, 232, 240, 0.18)",
    ppts = [],
    centrifuged = true,
    bubbles = false,
    hot = false,
    volume = 1.2,
    size = "normal", // 'small' | 'normal' | 'large'
    dropColor = null,
    spinning = false
  } = config;

  const dims = size === "small"
    ? { w: 74, h: 175 }
    : size === "large"
      ? { w: 120, h: 265 }
      : { w: 96, h: 220 };

  // Compute liquid level in SVG coordinates (viewBox 0 0 100 230)
  // Tube bottom is at y=205, top is at y=25
  const clampedVol = Math.min(3.5, Math.max(0.4, volume));
  const fillHeight = 45 + (clampedVol / 3.5) * 95; // between 55 and 140
  const liquidTopY = 205 - fillHeight;

  const uid = "tt-" + Math.random().toString(36).slice(2, 8);
  const primaryPpt = ppts && ppts.length > 0 ? ppts[ppts.length - 1] : null;
  const secondaryPpt = ppts && ppts.length > 1 ? ppts[0] : null;

  let pptMarkup = "";
  if (primaryPpt) {
    if (centrifuged) {
      // Compact settled pellet at the bottom of the test tube (supports dual-layer if 2 precipitates!)
      pptMarkup = `
        ${secondaryPpt ? `
          <path d="M 27 174 Q 50 178 73 174 L 73 185 A 23 20 0 0 1 27 185 Z"
                fill="${secondaryPpt.color}" stroke="${secondaryPpt.border || secondaryPpt.color}" stroke-width="0.8" opacity="0.92"/>
        ` : ""}
        <path d="M 27 182 Q 50 186 73 182 L 73 185 A 23 20 0 0 1 27 185 Z"
              fill="${primaryPpt.color}" stroke="${primaryPpt.border || primaryPpt.color}" stroke-width="1" opacity="0.96"/>
        <ellipse cx="50" cy="${secondaryPpt ? 174 : 182}" rx="22.5" ry="4" fill="${secondaryPpt ? secondaryPpt.color : primaryPpt.color}" opacity="0.98"/>
      `;
    } else {
      // Suspended cloudy precipitate + settling bottom layer
      pptMarkup = `
        <rect x="27" y="${liquidTopY + 4}" width="46" height="${200 - liquidTopY}" rx="20"
              fill="${primaryPpt.color}" opacity="0.52" />
        <path d="M 27 176 Q 50 181 73 176 L 73 185 A 23 20 0 0 1 27 185 Z"
              fill="${primaryPpt.color}" opacity="0.92"/>
        <circle cx="38" cy="${liquidTopY + 25}" r="3.5" fill="${secondaryPpt ? secondaryPpt.color : primaryPpt.color}" opacity="0.75"/>
        <circle cx="58" cy="${liquidTopY + 38}" r="4.2" fill="${primaryPpt.color}" opacity="0.7"/>
        <circle cx="45" cy="${liquidTopY + 52}" r="3.8" fill="${secondaryPpt ? secondaryPpt.color : primaryPpt.color}" opacity="0.8"/>
        <circle cx="61" cy="${liquidTopY + 18}" r="2.8" fill="${primaryPpt.color}" opacity="0.65"/>
      `;
    }
  }

  let bubbleMarkup = "";
  if (bubbles) {
    bubbleMarkup = `
      <g class="gas-bubble">
        <circle cx="40" cy="175" r="2.5" fill="rgba(255,255,255,0.75)" />
        <circle cx="55" cy="162" r="3.2" fill="rgba(255,255,255,0.65)" />
        <circle cx="47" cy="148" r="2.0" fill="rgba(255,255,255,0.75)" />
        <circle cx="60" cy="180" r="2.2" fill="rgba(255,255,255,0.70)" />
      </g>
    `;
  }

  let dropMarkup = "";
  if (dropColor) {
    dropMarkup = `
      <g class="reagent-drop">
        <path d="M 50 18 C 46 25, 44 29, 50 33 C 56 29, 54 25, 50 18 Z" fill="${dropColor}" stroke="rgba(255,255,255,0.6)" stroke-width="0.8"/>
      </g>
    `;
  }

  const extraClass = `${spinning ? "spinning-tube" : ""} ${hot ? "heating-tube" : ""}`.trim();

  return `
    <svg width="${dims.w}" height="${dims.h}" viewBox="0 0 100 230" class="mx-auto select-none ${extraClass}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="${uid}-clip">
          <path d="M 26 25 L 74 25 L 74 182 A 24 23 0 0 1 26 182 Z" />
        </clipPath>
        <linearGradient id="${uid}-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(255,255,255,0.32)" />
          <stop offset="22%" stop-color="rgba(255,255,255,0.08)" />
          <stop offset="78%" stop-color="rgba(255,255,255,0.03)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.26)" />
        </linearGradient>
      </defs>

      ${dropMarkup}

      <!-- Tube Inner Contents Clipped -->
      <g clip-path="url(#${uid}-clip)">
        <!-- Back glass tint -->
        <rect x="24" y="20" width="52" height="190" fill="rgba(15, 23, 42, 0.35)" />

        <!-- Liquid Column -->
        <rect x="25" y="${liquidTopY}" width="50" height="${210 - liquidTopY}" fill="${liquidColor}" />

        <!-- Meniscus Curve -->
        <ellipse cx="50" cy="${liquidTopY}" rx="24" ry="4.2" fill="${liquidColor}" stroke="rgba(255,255,255,0.38)" stroke-width="0.9" />

        <!-- Precipitate Layer -->
        ${pptMarkup}

        <!-- Rising Gas Bubbles -->
        ${bubbleMarkup}
      </g>

      <!-- Graduation Marks -->
      <line x1="62" y1="165" x2="70" y2="165" stroke="rgba(255,255,255,0.28)" stroke-width="1" />
      <line x1="65" y1="145" x2="70" y2="145" stroke="rgba(255,255,255,0.22)" stroke-width="1" />
      <line x1="62" y1="125" x2="70" y2="125" stroke="rgba(255,255,255,0.28)" stroke-width="1" />
      <line x1="65" y1="105" x2="70" y2="105" stroke="rgba(255,255,255,0.22)" stroke-width="1" />
      <line x1="62" y1="85"  x2="70" y2="85"  stroke="rgba(255,255,255,0.28)" stroke-width="1" />

      <!-- Glass specular reflection overlay -->
      <path d="M 26 25 L 74 25 L 74 182 A 24 23 0 0 1 26 182 Z"
            fill="url(#${uid}-glass)"
            stroke="rgba(226, 232, 240, 0.65)"
            stroke-width="2" />

      <!-- Left vertical shine highlight -->
      <path d="M 32 32 L 32 176" stroke="rgba(255,255,255,0.42)" stroke-width="2.5" stroke-linecap="round" />

      <!-- Flared Glass Rim at Top -->
      <rect x="21" y="20" width="58" height="6" rx="3"
            fill="rgba(226, 232, 240, 0.25)"
            stroke="rgba(226, 232, 240, 0.78)"
            stroke-width="1.6" />
    </svg>
  `;
}

// ============================================================================
// INITIALIZE / RESET VIRTUAL LAB BENCH
// ============================================================================
function pickTwoCations(pool, category = "any") {
  const g1 = pool.filter(id => window.CATION_DB[id].group === 1);
  const g2 = pool.filter(id => window.CATION_DB[id].group === 2);

  if (category === "both_g1" && g1.length >= 2) {
    const shuffled = [...g1].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
  }
  if (category === "g1_g2" && g1.length >= 1 && g2.length >= 1) {
    const p1 = g1[Math.floor(Math.random() * g1.length)];
    const p2 = g2[Math.floor(Math.random() * g2.length)];
    return [p1, p2];
  }
  if (category === "both_g2" && g2.length >= 2) {
    const shuffled = [...g2].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

function initLabSample(mode = AppState.labMode) {
  AppState.labMode = mode;
  AppState.unknownRevealed = false;
  AppState.unknownGuess = "";
  AppState.unknownGuesses2 = new Set();
  AppState.eliminatedIons = new Set();
  AppState.unknownFeedback = null;

  let initialIons = [];
  let tubeTitle = "หลอดที่ 1 (สารตัวอย่าง)";
  let tubeSub = "ปริมาตร 1.0 mL";

  if (mode === "exam_2mix") {
    const examPool = ["Ag+", "Pb2+", "Ni2+", "Fe3+", "Mn2+"];
    initialIons = pickTwoCations(examPool, AppState.pairCategory);
    AppState.secretUnknownIons = [...initialIons];
    AppState.unknownCode = "EXAM-2X-" + Math.floor(100 + Math.random() * 900);
    tubeTitle = `สารตัวอย่าง ${AppState.unknownCode}`;
    tubeSub = "Unknown สารผสม 2 ชนิด (จาก 5 ไอออนสอบ)";
  } else if (mode === "full_2mix") {
    const allPool = Object.keys(window.CATION_DB);
    initialIons = pickTwoCations(allPool, "any");
    AppState.secretUnknownIons = [...initialIons];
    AppState.unknownCode = "MIX-9X-" + Math.floor(100 + Math.random() * 900);
    tubeTitle = `สารตัวอย่าง ${AppState.unknownCode}`;
    tubeSub = "Unknown สารผสม 2 ชนิด (จาก 9 ไอออนคู่มือ)";
  } else if (mode === "exam_unknown") {
    const examPool = ["Ag+", "Pb2+", "Ni2+", "Fe3+", "Mn2+"];
    const picked = examPool[Math.floor(Math.random() * examPool.length)];
    initialIons = [picked];
    AppState.secretUnknownIons = [picked];
    AppState.unknownCode = "EXAM-1X-" + Math.floor(100 + Math.random() * 900);
    tubeTitle = `สารตัวอย่าง ${AppState.unknownCode}`;
    tubeSub = "Unknown 1 ใน 5 ไอออนสอบแล็บ";
  } else if (mode === "full_unknown") {
    const allPool = Object.keys(window.CATION_DB);
    const picked = allPool[Math.floor(Math.random() * allPool.length)];
    initialIons = [picked];
    AppState.secretUnknownIons = [picked];
    AppState.unknownCode = "UNK-" + Math.floor(100 + Math.random() * 900);
    tubeTitle = `สารตัวอย่าง ${AppState.unknownCode}`;
    tubeSub = "Unknown 1 ใน 9 ไอออนตามคู่มือ";
  } else if (mode === "known_single") {
    initialIons = [AppState.selectedKnownIon];
    AppState.secretUnknownIons = [AppState.selectedKnownIon];
    const info = window.CATION_DB[AppState.selectedKnownIon];
    tubeTitle = `0.1 M ${info.symbol}`;
    tubeSub = info.thaiName;
  } else if (mode === "custom_mix") {
    initialIons = Array.from(AppState.customMixIons);
    if (initialIons.length === 0) {
      initialIons = ["Ag+", "Fe3+"];
      AppState.customMixIons = new Set(initialIons);
    }
    AppState.secretUnknownIons = [...initialIons];
    tubeTitle = `สารละลายผสม (${initialIons.length} ไอออน)`;
    tubeSub = initialIons.map(i => window.CATION_DB[i].symbol).join(", ");
  }

  const starterTube = new window.VirtualTube({
    name: tubeTitle,
    subtitle: tubeSub,
    aq: initialIons,
    ppts: [],
    pH: "neutral",
    volume: 1.0,
    lastObservation: "สารละลายตัวอย่างเริ่มต้น 1.0 mL (20 หยด) พร้อมทำการทดลองแยกไอออนตามแผนผังตอนที่ 1"
  });

  AppState.tubes = [starterTube];
  AppState.selectedTubeIndex = 0;
  renderApp();
}

// ============================================================================
// ACTIONS IN THE VIRTUAL LAB BENCH
// ============================================================================
function handleAddReagent(reagentId) {
  const tube = AppState.tubes[AppState.selectedTubeIndex];
  if (!tube) return;

  const reagent = window.REAGENT_CATALOG.find(r => r.id === reagentId);
  AppState.animatingDrop = { color: reagent ? reagent.dropColor : "#e2e8f0" };
  renderApp();

  setTimeout(() => {
    tube.applyReagent(reagentId);
    AppState.animatingDrop = null;
    renderApp();
  }, 420);
}

function handleEquipment(action) {
  const tube = AppState.tubes[AppState.selectedTubeIndex];
  if (!tube) return;

  if (action === "centrifuge") {
    AppState.animatingSpin = true;
    renderApp();
    setTimeout(() => {
      tube.centrifuge();
      AppState.animatingSpin = false;
      renderApp();
    }, 550);
  } else if (action === "heat") {
    AppState.animatingHeat = true;
    tube.heatTube();
    renderApp();
    setTimeout(() => {
      AppState.animatingHeat = false;
      renderApp();
    }, 900);
  } else if (action === "hot_water") {
    AppState.animatingHeat = true;
    tube.addHotWater();
    renderApp();
    setTimeout(() => {
      AppState.animatingHeat = false;
      renderApp();
    }, 900);
  } else if (action === "wash") {
    tube.washPrecipitate();
    renderApp();
  } else if (action === "decant") {
    if (tube.ppts.length === 0) {
      alert("หลอดนี้ไม่มีตะกอนให้แยก! หากต้องการแบ่งสารละลายออกเป็นหลายหลอด ให้กดปุ่ม 'แบ่งสารละลาย'");
      return;
    }
    if (!tube.centrifuged) {
      tube.centrifuge();
    }
    // Create a new tube containing ONLY the aqueous supernatant
    const supernatantTube = new window.VirtualTube({
      name: `หลอดที่ ${AppState.tubes.length + 1} (สารละลายใส)`,
      subtitle: `รินแยกจาก ${tube.name}`,
      aq: Array.from(tube.aq),
      ppts: [],
      pH: tube.pH,
      acidType: tube.acidType,
      hasCl: tube.hasCl,
      hasH2O2: tube.hasH2O2,
      hasCrO4Reagent: tube.hasCrO4Reagent,
      temperature: tube.temperature,
      centrifuged: false,
      volume: Math.max(0.8, +(tube.volume * 0.7).toFixed(1)),
      lastObservation: `สารละลายใสเหนือตะกอนที่รินแยกมาจาก ${tube.name}`
    });
    supernatantTube.logs.unshift({
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      action: "🫗 รินแยกสารละลายใส (Decant)",
      obs: `ได้สารละลายใสแยกออกจากตะกอนใน ${tube.name}`,
      eq: ""
    });

    // Keep ONLY the precipitate in the current tube
    tube.aq.clear();
    tube.hasCrO4Reagent = false;
    tube.subtitle = `ตะกอนจาก ${tube.name}`;
    tube.volume = 0.5;
    tube.lastObservation = `เหลือเฉพาะตะกอน (${tube.ppts.map(p => p.formula).join(", ")}) ในหลอดนี้ ส่วนสารละลายใสถูกแยกไปที่ ${supernatantTube.name}`;
    tube.logs.unshift({
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      action: "🫗 แยกสารละลายใสออก เหลือเฉพาะตะกอน",
      obs: tube.lastObservation,
      eq: ""
    });

    AppState.tubes.push(supernatantTube);
    renderApp();
  } else if (action === "split") {
    const newTube = tube.clone(
      `หลอดที่ ${AppState.tubes.length + 1} (แบ่งส่วน)`,
      `แบ่งมาจาก ${tube.name}`
    );
    newTube.logs.unshift({
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      action: "➗ แบ่งสารละลายออกเป็นหลอดย่อย",
      obs: `แบ่งสารละลายมาจาก ${tube.name} สำหรับแยกทดสอบเฉพาะ`,
      eq: ""
    });
    AppState.tubes.push(newTube);
    AppState.selectedTubeIndex = AppState.tubes.length - 1;
    renderApp();
  } else if (action === "split3") {
    const t1 = tube.clone(`หลอดย่อยที่ 1 (ตรวจ Fe³⁺ ด้วย KSCN)`, `แบ่งจาก ${tube.name}`);
    const t2 = tube.clone(`หลอดย่อยที่ 2 (ตรวจ Fe³⁺ ด้วย K₄[Fe(CN)₆])`, `แบ่งจาก ${tube.name}`);
    const t3 = tube.clone(`หลอดย่อยที่ 3 (ตรวจ Mn²⁺ ด้วย NaBiO₃)`, `แบ่งจาก ${tube.name}`);
    [t1, t2, t3].forEach((subTube, i) => {
      subTube.logs.unshift({
        time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        action: `➗ แบ่งเป็น 3 หลอดทดลอง (หลอดย่อยที่ ${i + 1})`,
        obs: i === 0 ? "พร้อมหยด 1 M KSCN 4–5 หยด เพื่อทดสอบ Fe³⁺"
           : i === 1 ? "พร้อมหยด 0.1 M K₄[Fe(CN)₆] 2–3 หยด เพื่อทดสอบ Fe³⁺"
           : "พร้อมหยด 6 M HNO₃ 2 หยด (อุ่น) แล้วเติม NaBiO₃ 1 ช้อนเล็ก เพื่อทดสอบ Mn²⁺",
        eq: ""
      });
    });
    AppState.tubes.push(t1, t2, t3);
    AppState.selectedTubeIndex = AppState.tubes.length - 3;
    renderApp();
  }
}

// ============================================================================
// SOLID SOLUBILITY LAB ACTIONS (ส่วนที่ 2)
// ============================================================================
function selectSolidSample(idx) {
  AppState.selectedSolidIdx = idx;
  AppState.solidTestedSteps = [];
  AppState.solidCurrentState = {
    color: "rgba(226, 232, 240, 0.08)",
    ppt: "#f8fafc",
    dissolved: false,
    label: "ของแข็งตัวอย่าง ~10 mg (ขนาดเมล็ดถั่วเขียว)"
  };
  renderApp();
}

function testSolidSolvent(stepKey, stepLabel, isHot) {
  const sample = window.SOLID_UNKNOWNS[AppState.selectedSolidIdx];
  const res = sample.solubilityNotes[stepKey];
  if (!res) return;

  AppState.solidCurrentState = {
    color: res.color,
    ppt: res.ppt,
    dissolved: res.dissolved,
    hot: isHot,
    label: stepLabel
  };

  if (!AppState.solidTestedSteps.some(s => s.key === stepKey)) {
    AppState.solidTestedSteps.push({
      key: stepKey,
      label: stepLabel,
      dissolved: res.dissolved,
      obs: res.obs
    });
  }
  renderApp();
}

function sendSolidToVirtualLab() {
  const sample = window.SOLID_UNKNOWNS[AppState.selectedSolidIdx];
  AppState.labMode = "exam_unknown";
  AppState.secretUnknownIons = [sample.cation];
  AppState.unknownCode = sample.code;
  AppState.unknownRevealed = false;
  AppState.unknownGuess = "";
  AppState.unknownFeedback = null;

  const starterTube = new window.VirtualTube({
    name: `สารละลาย ${sample.code}`,
    subtitle: `ละลายจากของแข็งตัวอย่างแล้ว (1 mL)`,
    aq: [sample.cation],
    ppts: [],
    pH: "neutral",
    volume: 1.0,
    lastObservation: `ได้สารละลายใสจากการละลายของแข็ง ${sample.code} พร้อมดำเนินการวิเคราะห์ตอนที่ 1–3 ต่อทันที!`
  });

  AppState.tubes = [starterTube];
  AppState.selectedTubeIndex = 0;
  AppState.activeTab = "lab";
  renderApp();
}

// ============================================================================
// RENDER FUNCTIONS FOR EACH TAB
// ============================================================================
function renderLitmusBadge(pH) {
  if (pH === "acidic") {
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/20 text-rose-300 border border-rose-500/30">
      <span class="w-2 h-2 rounded-full bg-rose-500"></span> กรด (ลิตมัสเปลี่ยนเป็นสีแดง)
    </span>`;
  }
  if (pH === "weak_acidic") {
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
      <span class="w-2 h-2 rounded-full bg-amber-400"></span> กรดอ่อน (CH₃COOH)
    </span>`;
  }
  if (pH === "basic" || pH === "ammoniacal") {
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
      <span class="w-2 h-2 rounded-full bg-blue-400"></span> เบส (${pH === "ammoniacal" ? "NH₃" : "NaOH"} • ลิตมัสเปลี่ยนเป็นสีน้ำเงิน)
    </span>`;
  }
  return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700/60 text-slate-300 border border-slate-600">
    <span class="w-2 h-2 rounded-full bg-emerald-400"></span> กลาง / เริ่มต้น
  </span>`;
}

// ----------------------------------------------------------------------------
// TAB 1: VIRTUAL LAB BENCH
// ----------------------------------------------------------------------------
function renderVirtualLabTab() {
  const activeTube = AppState.tubes[AppState.selectedTubeIndex] || AppState.tubes[0];
  const smartRecs = AppState.guidedHints ? window.getSmartRecommendations(activeTube) : [];
  const isTwoMixMode = AppState.labMode === "exam_2mix" || AppState.labMode === "full_2mix";
  const isSingleUnknownMode = AppState.labMode === "exam_unknown" || AppState.labMode === "full_unknown";
  const isUnknownMode = isTwoMixMode || isSingleUnknownMode;

  const candidatePool = Object.values(window.CATION_DB).filter(c =>
    (AppState.labMode === "exam_2mix" || AppState.labMode === "exam_unknown") ? c.inExam5 : true
  );

  return `
    <div class="space-y-6">
      <!-- Top Mode & Sample Configuration Bar -->
      <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <!-- Mode Buttons -->
          <div>
            <div class="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2 flex items-center gap-2">
              <span>โหมดการทดลอง (Select Lab Mode)</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <button onclick="initLabSample('exam_2mix')"
                class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${AppState.labMode === "exam_2mix" ? "bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 text-white shadow-lg shadow-pink-600/30 ring-1 ring-white/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}">
                <span>🔥 สอบจริง: สุ่มสารผสม 2 ชนิด (5 ไอออน)</span>
              </button>
              <button onclick="initLabSample('full_2mix')"
                class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${AppState.labMode === "full_2mix" ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/25" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}">
                <span>🎲 สุ่มสารผสม 2 ชนิด (ครบ 9 ไอออน)</span>
              </button>
              <button onclick="initLabSample('exam_unknown')"
                class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${AppState.labMode === "exam_unknown" ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}">
                <span>🎯 สุ่มสารเดี่ยว (1 ใน 5)</span>
              </button>
              <button onclick="initLabSample('known_single')"
                class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${AppState.labMode === "known_single" ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}">
                <span>🧪 ทดสอบสารจริง (Control Test)</span>
              </button>
              <button onclick="initLabSample('custom_mix')"
                class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${AppState.labMode === "custom_mix" ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}">
                <span>⚗️ เลือกผสมไอออนเอง</span>
              </button>
            </div>
          </div>

          <!-- Helper Toggles -->
          <div class="flex flex-wrap items-center gap-2.5">
            <button onclick="AppState.guidedHints = !AppState.guidedHints; renderApp();"
              class="px-3 py-2 rounded-xl text-xs font-medium border transition ${AppState.guidedHints ? "bg-amber-500/15 border-amber-500/40 text-amber-300" : "bg-slate-800/80 border-slate-700 text-slate-400"}">
              💡 คำแนะนำขั้นตอน: ${AppState.guidedHints ? "เปิด" : "ปิด"}
            </button>
            <button onclick="AppState.xrayMode = !AppState.xrayMode; renderApp();"
              class="px-3 py-2 rounded-xl text-xs font-medium border transition ${AppState.xrayMode ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300" : "bg-slate-800/80 border-slate-700 text-slate-400"}">
              🔍 X-Ray ดูไอออนในหลอด: ${AppState.xrayMode ? "เปิด" : "ปิด"}
            </button>
            <button onclick="initLabSample(AppState.labMode)"
              class="px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700 transition">
              🔄 เริ่มหลอดใหม่
            </button>
          </div>
        </div>

        <!-- Secondary Selector for Known Single or Custom Mixture -->
        ${AppState.labMode === "known_single" ? `
          <div class="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span class="text-xs text-slate-400 mr-1">เลือกแคทไอออนที่ต้องการทดสอบ:</span>
            ${Object.values(window.CATION_DB).map(ion => `
              <button onclick="AppState.selectedKnownIon = '${ion.id}'; initLabSample('known_single');"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${AppState.selectedKnownIon === ion.id ? "bg-sky-500 text-slate-950 border-sky-400 shadow" : "bg-slate-800/90 text-slate-300 border-slate-700 hover:border-slate-500"}">
                ${ion.symbol} ${ion.inExam5 ? "⭐" : ""}
              </button>
            `).join("")}
            <span class="text-xs text-amber-300/80 ml-auto">⭐ = 5 ไอออนที่ใช้สอบปฏิบัติการ</span>
          </div>
        ` : ""}

        ${AppState.labMode === "custom_mix" ? `
          <div class="mt-4 pt-4 border-t border-slate-800">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs text-slate-400 mr-1">เลือกแคทไอออนผสมในหลอดเริ่มต้น:</span>
              ${Object.values(window.CATION_DB).map(ion => {
                const active = AppState.customMixIons.has(ion.id);
                return `
                  <button onclick="toggleCustomMixIon('${ion.id}')"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${active ? "bg-emerald-500/25 text-emerald-200 border-emerald-400" : "bg-slate-800/60 text-slate-400 border-slate-700"}">
                    ${active ? "✓ " : ""}${ion.symbol}
                  </button>
                `;
              }).join("")}
              <button onclick="setPresetMix('exam5')" class="ml-auto px-2.5 py-1 rounded-lg text-xs bg-pink-500/20 text-pink-300 border border-pink-500/30 hover:bg-pink-500/30">
                เซ็ตสอบ 5 ไอออน
              </button>
              <button onclick="setPresetMix('all9')" class="px-2.5 py-1 rounded-lg text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30">
                ครบทั้ง 9 ไอออน
              </button>
            </div>
          </div>
        ` : ""}

        <!-- 2-Cation Mixture Unknown Identification Panel -->
        ${isTwoMixMode ? `
          <div class="mt-4 pt-4 border-t border-slate-800 space-y-3">
            <!-- Filter by Pair Type -->
            ${AppState.labMode === "exam_2mix" ? `
              <div class="flex flex-wrap items-center gap-2 text-xs">
                <span class="text-slate-400 font-medium">รูปแบบการสุ่มคู่ผสม 2 ชนิด:</span>
                ${[
                  { id: "any", label: "🎲 สุ่มทุกแบบ (10 คู่ผสม)" },
                  { id: "both_g1", label: "⚪ กลุ่ม 1 ผสมกัน (Ag⁺ + Pb²⁺)" },
                  { id: "g1_g2", label: "🔀 กลุ่ม 1 + กลุ่ม 2 (คนละกลุ่ม)" },
                  { id: "both_g2", label: "🎨 กลุ่ม 2 ผสมกัน (Ni²⁺, Fe³⁺, Mn²⁺)" }
                ].map(cat => `
                  <button onclick="AppState.pairCategory = '${cat.id}'; initLabSample('exam_2mix');"
                    class="px-2.5 py-1 rounded-lg font-medium border transition ${AppState.pairCategory === cat.id ? "bg-amber-500/20 border-amber-400 text-amber-200" : "bg-slate-800/70 border-slate-700 text-slate-400 hover:text-slate-200"}">
                    ${cat.label}
                  </button>
                `).join("")}
              </div>
            ` : ""}

            <div class="bg-slate-950/75 rounded-2xl p-4 border border-pink-500/30 space-y-3">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-0.5 rounded-md bg-pink-500/25 text-pink-300 font-mono text-xs font-bold border border-pink-500/40">${AppState.unknownCode}</span>
                    <span class="text-sm sm:text-base font-bold text-white">โจทย์สอบปฏิบัติการ: มีแคทไอออน 2 ชนิดผสมกันอยู่ในหลอดตัวอย่าง!</span>
                  </div>
                  <p class="text-xs text-slate-400 mt-0.5">
                    ทำการทดลองแยกกลุ่มและยืนยันผล แล้วคลิกเลือก <strong class="text-pink-300">แคทไอออน 2 ชนิดที่พบ</strong> ด้านล่าง (เลือกแล้ว ${AppState.unknownGuesses2.size}/2 ชนิด • กดปุ่ม ✕ เพื่อขีดฆ่าตัวที่ทดสอบแล้วไม่พบ)
                  </p>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  <button onclick="checkUnknownAnswer()"
                    class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:opacity-95 shadow-lg shadow-pink-600/25">
                    ✅ ส่งคำตอบ (${AppState.unknownGuesses2.size}/2)
                  </button>
                  <button onclick="revealUnknownSolution()"
                    class="px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30">
                    👁️ เฉลย & วิธีแยกคู่นี้
                  </button>
                  <button onclick="initLabSample('${AppState.labMode}')"
                    class="px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700">
                    🎲 สุ่มคู่ใหม่
                  </button>
                </div>
              </div>

              <!-- Interactive Cation Selection Pills + Scratchpad Elimination -->
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-1">
                ${candidatePool.map(c => {
                  const isPicked = AppState.unknownGuesses2.has(c.id);
                  const isEliminated = AppState.eliminatedIons.has(c.id);
                  return `
                    <div class="flex items-stretch rounded-xl border overflow-hidden transition ${
                      isPicked
                        ? "bg-pink-600/25 border-pink-400 ring-1 ring-pink-400/50"
                        : isEliminated
                          ? "bg-slate-900/40 border-slate-800 opacity-45"
                          : "bg-slate-900/90 border-slate-700 hover:border-slate-500"
                    }">
                      <button onclick="toggleGuess2Ion('${c.id}')"
                        class="flex-1 px-3 py-2 text-left flex items-center justify-between">
                        <div>
                          <div class="font-bold text-xs sm:text-sm ${isPicked ? "text-pink-200" : isEliminated ? "line-through text-slate-500" : "text-white"}">
                            ${isPicked ? "✅ " : ""}${c.symbol}
                          </div>
                          <div class="text-xs text-slate-400 truncate">${c.name.split(" ")[0]} (กลุ่ม ${c.group})</div>
                        </div>
                      </button>
                      <button onclick="toggleEliminateIon('${c.id}')"
                        title="ขีดฆ่าว่าไม่พบไอออนนี้"
                        class="px-2.5 border-l border-slate-800 text-xs font-bold transition ${isEliminated ? "bg-rose-950/80 text-rose-300" : "text-slate-500 hover:bg-slate-800 hover:text-rose-300"}">
                        ✕
                      </button>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>

            ${AppState.unknownFeedback ? `
              <div class="p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${AppState.unknownFeedback.correct ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-100" : "bg-rose-950/60 border-rose-500/50 text-rose-100"}">
                ${AppState.unknownFeedback.message}
              </div>
            ` : ""}
          </div>
        ` : ""}

        <!-- Single Unknown Identification Bar -->
        ${isSingleUnknownMode ? `
          <div class="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60 rounded-xl p-3.5 border border-pink-500/20">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-md bg-pink-500/20 text-pink-300 font-mono text-xs font-bold border border-pink-500/30">${AppState.unknownCode}</span>
                <span class="text-sm font-semibold text-white">ระบุชนิดแคทไอออนในสารตัวอย่าง (1 ชนิด):</span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">ทำการทดลองตามแผนผังตอนที่ 1–3 แล้วเลือกคำตอบเพื่อตรวจผล</p>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <select onchange="AppState.unknownGuess = this.value; renderApp();"
                class="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-pink-500">
                <option value="">-- เลือกแคทไอออนที่วิเคราะห์ได้ --</option>
                ${candidatePool
                  .map(c => `<option value="${c.id}" ${AppState.unknownGuess === c.id ? "selected" : ""}>${c.symbol} (${c.thaiName})</option>`)
                  .join("")}
              </select>
              <button onclick="checkUnknownAnswer()"
                class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:opacity-95 shadow">
                ✅ ส่งคำตอบ
              </button>
              <button onclick="initLabSample('${AppState.labMode}')"
                class="px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700">
                🎲 สุ่มโจทย์ใหม่
              </button>
            </div>
          </div>
          ${AppState.unknownFeedback ? `
            <div class="mt-3 p-3.5 rounded-xl border text-xs sm:text-sm font-medium ${AppState.unknownFeedback.correct ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-200" : "bg-rose-950/60 border-rose-500/50 text-rose-200"}">
              ${AppState.unknownFeedback.message}
            </div>
          ` : ""}
        ` : ""}
      </div>

      <!-- Main Lab Workspace Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left & Center (7 cols): Test Tube Rack + Active Tube Inspector + Equipment -->
        <div class="lg:col-span-7 space-y-5">
          
          <!-- Test Tube Rack Card -->
          <div class="lab-bench-bg border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h2 class="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>🧪 ชั้นวางหลอดทดลอง (Test Tube Rack)</span>
                  <span class="text-xs font-normal text-slate-400">(${AppState.tubes.length} หลอด)</span>
                </h2>
                <p class="text-xs text-slate-400">คลิกเลือกหลอดที่ต้องการหยดสารเคมีหรือเข้าเครื่องมือ</p>
              </div>
              ${renderLitmusBadge(activeTube.pH)}
            </div>

            <!-- Horizontal Scrollable Rack of Tubes -->
            <div class="flex items-end gap-5 overflow-x-auto pb-4 pt-3 px-2 min-h-[290px]">
              ${AppState.tubes.map((t, idx) => {
                const isSelected = idx === AppState.selectedTubeIndex;
                const svg = renderTestTubeSVG({
                  liquidColor: t.getLiquidColor(),
                  ppts: t.ppts,
                  centrifuged: t.centrifuged,
                  bubbles: t.bubbles,
                  hot: t.temperature === "hot" || (isSelected && AppState.animatingHeat),
                  volume: t.volume,
                  size: "normal",
                  dropColor: isSelected && AppState.animatingDrop ? AppState.animatingDrop.color : null,
                  spinning: isSelected && AppState.animatingSpin
                });

                return `
                  <div onclick="AppState.selectedTubeIndex = ${idx}; renderApp();"
                    class="tube-wrapper cursor-pointer flex-shrink-0 w-36 rounded-2xl p-3 border transition ${isSelected ? "selected-tube bg-slate-900/90 border-sky-400" : "bg-slate-900/50 border-slate-800 hover:border-slate-700"}">
                    <div class="flex items-center justify-between text-xs mb-1">
                      <span class="font-bold truncate ${isSelected ? "text-sky-300" : "text-slate-300"}">${t.name}</span>
                      ${t.temperature === "hot" ? `<span title="อุ่นร้อน" class="text-orange-400">🔥</span>` : ""}
                    </div>
                    ${svg}
                    <div class="mt-2 text-center">
                      <div class="text-xs font-medium text-slate-300 truncate">${t.ppts.length > 0 ? t.ppts.map(p => p.label).join(", ") : "ไม่มีตะกอน"}</div>
                      <div class="text-xs text-slate-500 mt-0.5">${t.centrifuged && t.ppts.length > 0 ? "✓ เซนตริฟิวจ์แล้ว" : `ปริมาตร ~${t.volume} mL`}</div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>

            <!-- Equipment Action Toolbar -->
            <div class="mt-4 pt-4 border-t border-slate-800/90">
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                ⚙️ อุปกรณ์และเทคนิคปฏิบัติการ (ทำกับหลอดที่เลือก: <span class="text-sky-300">${activeTube.name}</span>)
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button onclick="handleEquipment('centrifuge')"
                  class="reagent-btn flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white">
                  <span class="text-base">🌀</span>
                  <div class="text-left">
                    <div>เซนตริฟิวจ์</div>
                    <div class="text-xs font-normal text-slate-400">ปั่นตะกอนลงก้นหลอด</div>
                  </div>
                </button>

                <button onclick="handleEquipment('decant')"
                  class="reagent-btn flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white">
                  <span class="text-base">🫗</span>
                  <div class="text-left">
                    <div>แยกตะกอน/สารละลาย</div>
                    <div class="text-xs font-normal text-slate-400">รินสารละลายใสไปหลอดใหม่</div>
                  </div>
                </button>

                <button onclick="handleEquipment('hot_water')"
                  class="reagent-btn flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white">
                  <span class="text-base">💧🔥</span>
                  <div class="text-left">
                    <div>เติมน้ำกลั่น 1 mL + อุ่น</div>
                    <div class="text-xs font-normal text-slate-400">ละลาย PbCl₂ ด้วยน้ำร้อน</div>
                  </div>
                </button>

                <button onclick="handleEquipment('heat')"
                  class="reagent-btn flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white">
                  <span class="text-base">🔥</span>
                  <div class="text-left">
                    <div>อุ่นอ่างน้ำร้อน/Hot Plate</div>
                    <div class="text-xs font-normal text-slate-400">เร่งปฏิกิริยา / ไล่ H₂O₂</div>
                  </div>
                </button>

                <button onclick="handleEquipment('wash')"
                  class="reagent-btn flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white">
                  <span class="text-base">🚿</span>
                  <div class="text-left">
                    <div>ล้างตะกอนด้วยน้ำกลั่น</div>
                    <div class="text-xs font-normal text-slate-400">ชะไอออนปนเปื้อนออก</div>
                  </div>
                </button>

                <button onclick="handleEquipment('split')"
                  class="reagent-btn flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white">
                  <span class="text-base">➗</span>
                  <div class="text-left">
                    <div>แบ่งครึ่งหลอด</div>
                    <div class="text-xs font-normal text-slate-400">แยกสารละลายไปอีกหลอด</div>
                  </div>
                </button>

                <button onclick="handleEquipment('split3')"
                  class="reagent-btn col-span-2 sm:col-span-3 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-500/40 text-xs font-semibold text-indigo-200">
                  <span class="text-base">🧪🧪🧪</span>
                  <span>แบ่งเป็น 3 หลอดย่อยทันที (สำหรับตอนที่ 3: หลอด 1 ตรวจ Fe³⁺ ด้วย KSCN • หลอด 2 ตรวจ Fe³⁺ ด้วย K₄[Fe(CN)₆] • หลอด 3 ตรวจ Mn²⁺ ด้วย NaBiO₃)</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Live Observation & Equation Box -->
          <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-sky-400 uppercase tracking-wider">📌 ผลการสังเกตล่าสุด (${activeTube.name})</h3>
              ${AppState.tubes.length > 1 ? `
                <button onclick="deleteSelectedTube()" class="text-xs text-rose-400 hover:underline">ลบหลอดนี้</button>
              ` : ""}
            </div>
            <div class="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-slate-100 leading-relaxed">
              ${activeTube.lastObservation}
            </div>
            ${activeTube.lastEquation ? `
              <div class="p-3 rounded-xl bg-sky-950/30 border border-sky-500/30 font-mono text-xs sm:text-sm text-sky-200">
                <span class="text-sky-400 font-bold">สมการเคมี:</span> ${activeTube.lastEquation}
              </div>
            ` : ""}

            <!-- X-Ray Inspector (Optional or when revealed) -->
            ${(AppState.xrayMode || !isUnknownMode || AppState.unknownRevealed) ? `
              <div class="pt-2 flex flex-wrap gap-2 items-center text-xs">
                <span class="text-slate-400 font-semibold">🔬 สถานะเคมีในหลอด:</span>
                <span class="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 border border-slate-700">
                  ไอออนในสารละลาย: ${activeTube.aq.size > 0 ? Array.from(activeTube.aq).join(", ") : "ไม่มี"}
                </span>
                <span class="px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 border border-slate-700">
                  ตะกอน: ${activeTube.ppts.length > 0 ? activeTube.ppts.map(p => p.formula).join(", ") : "ไม่มี"}
                </span>
              </div>
            ` : `
              <div class="text-xs text-slate-400 italic">
                🔒 โหมดสอบ Unknown: ซ่อนรายชื่อไอออนในหลอด (สามารถกดปุ่ม "🔍 X-Ray ดูไอออนในหลอด" ด้านบนหากต้องการดูเฉลยระหว่างฝึก)
              </div>
            `}
          </div>

          <!-- Smart Guided Next-Step Assistant -->
          ${AppState.guidedHints && smartRecs.length > 0 ? `
            <div class="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4">
              <div class="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2.5 flex items-center gap-1.5">
                <span>💡 ขั้นตอนแนะนำตามคู่มือปฏิบัติการสำหรับหลอดนี้:</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                ${smartRecs.map(r => `
                  <button onclick="${r.actionType === 'reagent' ? `handleAddReagent('${r.actionId}')` : `handleEquipment('${r.actionId}')`}"
                    class="text-left p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 transition group">
                    <div class="text-xs font-bold text-amber-200 group-hover:text-amber-100 flex items-center justify-between">
                      <span>${r.title}</span>
                      <span class="text-amber-400">คลิกทำทันที →</span>
                    </div>
                    <p class="text-xs text-slate-400 mt-1">${r.detail}</p>
                  </button>
                `).join("")}
              </div>
            </div>
          ` : ""}
        </div>

        <!-- Right (5 cols): Reagent Dropper Bottles & Reaction Log -->
        <div class="lg:col-span-5 space-y-5">
          <!-- Reagent Shelf -->
          <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h2 class="text-base font-bold text-white mb-1">🧴 ชั้นวางสารเคมีและรีเอเจนต์ (Reagent Shelf)</h2>
            <p class="text-xs text-slate-400 mb-4">คลิกที่ขวดสารเคมีเพื่อหยดลงใน <span class="text-sky-300 font-semibold">${activeTube.name}</span></p>

            <!-- Category 1: Acids, Bases & Oxidizing Agent -->
            <div class="mb-4">
              <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">1. กรด-เบส และตัวออกซิไดส์หลัก (แยกกลุ่มตอนที่ 1–4)</div>
              <div class="grid grid-cols-2 gap-2">
                ${window.REAGENT_CATALOG.filter(r => r.category !== "specific").map(r => `
                  <button onclick="handleAddReagent('${r.id}')"
                    title="${r.desc}"
                    class="reagent-btn text-left p-2.5 rounded-xl border ${r.bottleColor} hover:brightness-110">
                    <div class="font-bold text-xs sm:text-sm flex items-center justify-between">
                      <span>💧 ${r.name}</span>
                    </div>
                    <div class="text-xs opacity-80 truncate">${r.sub}</div>
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Category 2: Specific Confirmation Reagents -->
            <div>
              <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">2. รีเอเจนต์สำหรับการทดสอบเฉพาะ (Confirming Reagents)</div>
              <div class="grid grid-cols-2 gap-2">
                ${window.REAGENT_CATALOG.filter(r => r.category === "specific").map(r => `
                  <button onclick="handleAddReagent('${r.id}')"
                    title="${r.desc}"
                    class="reagent-btn text-left p-2.5 rounded-xl border ${r.bottleColor} hover:brightness-110">
                    <div class="font-bold text-xs sm:text-sm flex items-center justify-between">
                      <span>🧪 ${r.name}</span>
                    </div>
                    <div class="text-xs opacity-80 truncate">${r.sub}</div>
                  </button>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- Step History Log for Active Tube -->
          <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-bold text-white">📜 บันทึกการทดลองของ ${activeTube.name}</h3>
              <span class="text-xs text-slate-400">${activeTube.logs.length} ขั้นตอน</span>
            </div>
            <div class="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              ${activeTube.logs.length === 0 ? `
                <div class="text-xs text-slate-500 py-6 text-center">ยังไม่มีการเติมสารเคมีในหลอดนี้ เริ่มต้นโดยหยด 6 M HCl หรือเลือกตามคำแนะนำ</div>
              ` : activeTube.logs.map(item => `
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-sky-300">${item.action}</span>
                    <span class="text-slate-500 font-mono">${item.time}</span>
                  </div>
                  <div class="text-slate-300">${item.obs}</div>
                  ${item.eq ? `<div class="text-amber-300/90 font-mono pt-0.5">${item.eq}</div>` : ""}
                </div>
              `).join("")}
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// TAB 2: SOLID UNKNOWN SOLUBILITY TEST (ส่วนที่ 2 หน้า 103 & สไลด์ 34)
// ----------------------------------------------------------------------------
function renderSolidSolubilityTab() {
  const sample = window.SOLID_UNKNOWNS[AppState.selectedSolidIdx];
  const state = AppState.solidCurrentState;

  const tubeSVG = renderTestTubeSVG({
    liquidColor: state.color,
    ppts: state.ppt ? [{ color: state.ppt, border: state.ppt, label: "ของแข็งยังไม่ละลาย", style: "dense" }] : [],
    centrifuged: true,
    hot: Boolean(state.hot),
    volume: 1.2,
    size: "large"
  });

  return `
    <div class="space-y-6">
      <!-- Rules Banner from Page 103 & Slide 34 -->
      <div class="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              ส่วนที่ 2: การวิเคราะห์สารตัวอย่างในสภาพของแข็ง (หน้า 103 & สไลด์ 34)
            </span>
            <h2 class="text-lg sm:text-xl font-bold text-white mt-2">การทดสอบหาตัวทำละลายของสารตัวอย่างของแข็ง (1 ใน 5 ไอออน ไม่มี Hg₂²⁺)</h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-1">
              ตักสารตัวอย่างของแข็งประมาณ <strong class="text-amber-300">10 mg (~ขนาดเมล็ดถั่วเขียว)</strong> ใส่หลอดทดลอง เติมตัวทำละลาย 1 mL ตามลำดับ:
              <strong class="text-sky-300">1. น้ำกลั่น → 2. 2.0 M HCl → 3. 2.0 M HNO₃</strong>
            </p>
          </div>
          <div class="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-amber-200 space-y-1 flex-shrink-0">
            <div>⚠️ <strong>กฎเหล็กในการสอบ:</strong></div>
            <div>• หากไม่ละลายที่อุณหภูมิห้อง ให้อุ่นในถ้วยน้ำเดือด 2–3 นาที</div>
            <div>• <strong>หากละลายในน้ำหรือน้ำอุ่นแล้ว ไม่ต้องทดสอบใน HCl หรือ HNO₃!</strong></div>
            <div>• <strong>หากละลายใน 2.0 M HCl แล้ว ไม่ต้องทดสอบใน 2.0 M HNO₃!</strong></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left (5 cols): Solid Sample Selector & Visual Tube -->
        <div class="lg:col-span-5 bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">เลือกตัวอย่างของแข็งสำหรับฝึกทดสอบ:</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
              ${window.SOLID_UNKNOWNS.map((s, i) => `
                <button onclick="selectSolidSample(${i})"
                  class="text-left p-2.5 rounded-xl border text-xs transition ${AppState.selectedSolidIdx === i ? "bg-indigo-600/25 border-indigo-400 text-white" : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600"}">
                  <div class="font-bold flex items-center justify-between">
                    <span>📦 ${s.code}</span>
                    <span class="text-indigo-300 font-mono">${s.appearance}</span>
                  </div>
                </button>
              `).join("")}
            </div>
          </div>

          <div class="lab-bench-bg rounded-2xl p-5 border border-slate-800 text-center my-auto">
            <div class="text-xs font-bold text-indigo-300 mb-1">${sample.code} (${sample.appearance})</div>
            <div class="text-xs text-slate-400 mb-3">${state.label}</div>
            ${tubeSVG}
            <div class="mt-3">
              <span class="px-3 py-1 rounded-full text-xs font-semibold ${state.dissolved ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-amber-500/20 text-amber-300 border border-amber-500/40"}">
                ${state.dissolved ? "✅ ของแข็งละลายหมด! ได้สารละลายตัวอย่าง" : "⏳ ของแข็งยังไม่ละลาย / รอเลือกตัวทำละลาย"}
              </span>
            </div>
          </div>
        </div>

        <!-- Right (7 cols): Step-by-Step Solvent Testing Matrix -->
        <div class="lg:col-span-7 bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
          <h3 class="text-base font-bold text-white">ดำเนินการทดสอบการละลายตามลำดับ 1 → 2 → 3</h3>

          <div class="space-y-3">
            <!-- Solvent 1: Water -->
            <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span class="text-xs font-bold text-sky-400">ลำดับที่ 1</span>
                  <h4 class="text-sm font-bold text-white">ตัวทำละลายที่ 1: น้ำกลั่น (H₂O) 1 mL</h4>
                </div>
                <div class="flex gap-2">
                  <button onclick="testSolidSolvent('H2O_RT', '1. เติมน้ำกลั่น 1 mL (เขย่าที่อุณหภูมิห้อง)', false)"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600/25 hover:bg-sky-600/40 text-sky-200 border border-sky-500/40 transition">
                    💧 ทดสอบในน้ำ (RT)
                  </button>
                  <button onclick="testSolidSolvent('H2O_HOT', '1. น้ำกลั่น 1 mL + อุ่นในน้ำเดือด 2–3 นาที', true)"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600/25 hover:bg-orange-600/40 text-orange-200 border border-orange-500/40 transition">
                    🔥 อุ่นในน้ำเดือด 2–3 นาที
                  </button>
                </div>
              </div>
            </div>

            <!-- Solvent 2: 2.0 M HCl -->
            <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span class="text-xs font-bold text-rose-400">ลำดับที่ 2 (ใช้เมื่อไม่ละลายในน้ำและน้ำอุ่นเท่านั้น)</span>
                  <h4 class="text-sm font-bold text-white">ตัวทำละลายที่ 2: สารละลาย 2.0 M HCl 1 mL</h4>
                </div>
                <div class="flex gap-2">
                  <button onclick="testSolidSolvent('HCl_RT', '2. เติม 2.0 M HCl 1 mL (เขย่าที่อุณหภูมิห้อง)', false)"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600/25 hover:bg-rose-600/40 text-rose-200 border border-rose-500/40 transition">
                    🧪 ทดสอบใน 2.0 M HCl (RT)
                  </button>
                  <button onclick="testSolidSolvent('HCl_HOT', '2. 2.0 M HCl 1 mL + อุ่นในน้ำเดือด 2–3 นาที', true)"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600/25 hover:bg-orange-600/40 text-orange-200 border border-orange-500/40 transition">
                    🔥 อุ่นในน้ำเดือด 2–3 นาที
                  </button>
                </div>
              </div>
            </div>

            <!-- Solvent 3: 2.0 M HNO3 -->
            <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span class="text-xs font-bold text-amber-400">ลำดับที่ 3 (ใช้เมื่อไม่ละลายในน้ำและ 2.0 M HCl เท่านั้น)</span>
                  <h4 class="text-sm font-bold text-white">ตัวทำละลายที่ 3: สารละลาย 2.0 M HNO₃ 1 mL</h4>
                </div>
                <div class="flex gap-2">
                  <button onclick="testSolidSolvent('HNO3_RT', '3. เติม 2.0 M HNO₃ 1 mL (เขย่าที่อุณหภูมิห้อง)', false)"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600/25 hover:bg-amber-600/40 text-amber-200 border border-amber-500/40 transition">
                    🧪 ทดสอบใน 2.0 M HNO₃ (RT)
                  </button>
                  <button onclick="testSolidSolvent('HNO3_HOT', '3. 2.0 M HNO₃ 1 mL + อุ่นในน้ำเดือด 2–3 นาที', true)"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600/25 hover:bg-orange-600/40 text-orange-200 border border-orange-500/40 transition">
                    🔥 อุ่นในน้ำเดือด 2–3 นาที
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Results Log of Tested Solvents -->
          <div class="space-y-2">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-400">ผลการทดสอบการละลายของ ${sample.code}:</div>
            ${AppState.solidTestedSteps.length === 0 ? `
              <div class="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-500 text-center">
                เริ่มกดปุ่ม "💧 ทดสอบในน้ำ (RT)" ด้านบนเพื่อเริ่มหาตัวทำละลายตามวิธีในคู่มือ
              </div>
            ` : AppState.solidTestedSteps.map(st => `
              <div class="p-3 rounded-xl border text-xs ${st.dissolved ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200" : "bg-slate-950/80 border-slate-800 text-slate-300"}">
                <div class="font-bold">${st.label}</div>
                <div class="mt-0.5">${st.obs}</div>
              </div>
            `).join("")}
          </div>

          ${state.dissolved ? `
            <div class="pt-2">
              <button onclick="sendSolidToVirtualLab()"
                class="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/25 hover:opacity-95 transition">
                🚀 นำสารละลายตัวอย่างนี้ไปวิเคราะห์ต่อในห้องแล็บเสมือนจริง (ตอนที่ 1–3) →
              </button>
            </div>
          ` : ""}
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// TAB 3: CONTROL TEST EXPLORER (หน้า 108-109 & สไลด์ 21-26)
// ----------------------------------------------------------------------------
function renderControlTestTab() {
  const ions = Object.values(window.CATION_DB).filter(c =>
    AppState.controlFilter === "exam5" ? c.inExam5 : true
  );
  if (!ions.some(c => c.id === AppState.selectedControlCation)) {
    AppState.selectedControlCation = ions[0].id;
    AppState.selectedControlStepIdx = 0;
  }
  const currentCation = window.CATION_DB[AppState.selectedControlCation];
  const currentStep = currentCation.controlSteps[AppState.selectedControlStepIdx] || currentCation.controlSteps[0];

  return `
    <div class="space-y-6">
      <!-- Filter & Cation Selector Header -->
      <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 class="text-lg font-bold text-white">📋 ตารางผลการทดลอง Control Test & สมการเคมี (หน้า 108–109)</h2>
            <p class="text-xs text-slate-400">คลิกเลือกแคทไอออนเพื่อดูภาพหลอดทดลองจริงในแต่ละขั้นตอน สิ่งที่สังเกตได้ และสมการปฏิกิริยา</p>
          </div>
          <div class="flex gap-2">
            <button onclick="AppState.controlFilter = 'exam5'; renderApp();"
              class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${AppState.controlFilter === "exam5" ? "bg-pink-600 text-white" : "bg-slate-800 text-slate-300"}">
              ⭐ เฉพาะ 5 ไอออนที่ใช้สอบ (ตอนที่ 1–3)
            </button>
            <button onclick="AppState.controlFilter = 'all9'; renderApp();"
              class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${AppState.controlFilter === "all9" ? "bg-sky-600 text-white" : "bg-slate-800 text-slate-300"}">
              📚 ครบทั้ง 9 ไอออนตามคู่มือ (ตอนที่ 1–4)
            </button>
          </div>
        </div>

        <!-- Cation Pills -->
        <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          ${ions.map(ion => `
            <button onclick="AppState.selectedControlCation = '${ion.id}'; AppState.selectedControlStepIdx = 0; renderApp();"
              class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 border ${AppState.selectedControlCation === ion.id ? `bg-gradient-to-r ${ion.badgeColor} text-white border-white/30 shadow-lg` : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"}">
              <span>${ion.symbol}</span>
              <span class="text-xs font-normal opacity-90">(${ion.name.split(" ")[0]})</span>
            </button>
          `).join("")}
        </div>
      </div>

      <!-- Visual Step-by-Step Progression Card -->
      <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2.5">
              <span class="px-3 py-1 rounded-lg bg-gradient-to-r ${currentCation.badgeColor} text-white font-bold text-sm">
                ${currentCation.symbol}
              </span>
              <h3 class="text-base sm:text-lg font-bold text-white">${currentCation.name} (${currentCation.thaiName})</h3>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-slate-700">${currentCation.groupName}</span>
            </div>
            <p class="text-xs sm:text-sm text-slate-300 mt-1.5">${currentCation.summary}</p>
          </div>
          <button onclick="AppState.selectedKnownIon = '${currentCation.id}'; initLabSample('known_single'); AppState.activeTab = 'lab'; renderApp();"
            class="px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 flex-shrink-0 transition">
            🧪 ทดลอง ${currentCation.symbol} ในแล็บเสมือนจริง →
          </button>
        </div>

        <!-- All Tubes Progression Row (Like Chula Slides 21-26!) -->
        <div class="lab-bench-bg rounded-2xl p-5 border border-slate-800">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            ลำดับการเปลี่ยนแปลงของหลอดทดลอง (คลิกที่หลอดเพื่อดูสมการละเอียด):
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            ${currentCation.controlSteps.map((st, idx) => {
              const isSelected = idx === AppState.selectedControlStepIdx;
              const svg = renderTestTubeSVG({
                liquidColor: st.liquidColor,
                ppts: st.ppt ? [st.ppt] : [],
                centrifuged: true,
                bubbles: Boolean(st.bubbles),
                hot: Boolean(st.hot),
                volume: 1.4,
                size: "normal"
              });
              return `
                <div onclick="AppState.selectedControlStepIdx = ${idx}; renderApp();"
                  class="cursor-pointer rounded-2xl p-3.5 border transition flex flex-col justify-between ${isSelected ? "bg-slate-900/95 border-sky-400 shadow-lg shadow-sky-500/10" : "bg-slate-900/60 border-slate-800 hover:border-slate-700"}">
                  <div>
                    <div class="flex items-center justify-between text-xs mb-1">
                      <span class="font-bold ${isSelected ? "text-sky-300" : "text-slate-300"}">${st.step}</span>
                      <span class="text-slate-500 font-mono">#${idx + 1}</span>
                    </div>
                    <div class="text-xs text-slate-400 mb-2 min-h-[32px]">${st.action}</div>
                  </div>
                  ${svg}
                  <div class="mt-3 pt-2.5 border-t border-slate-800/80 text-xs">
                    <div class="font-semibold text-amber-200">${st.observation}</div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Complete Table matching Page 108-109 of the Lab Manual -->
        <div class="overflow-x-auto rounded-xl border border-slate-800">
          <table class="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr class="bg-slate-950 text-slate-300 border-b border-slate-800">
                <th class="p-3.5 font-bold w-1/4">การทดสอบ (${currentCation.symbol})</th>
                <th class="p-3.5 font-bold w-1/3">สิ่งที่สังเกตได้</th>
                <th class="p-3.5 font-bold">ปฏิกิริยาที่เกิดขึ้น (สมการไอออนิกสุทธิ)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/80 bg-slate-900/60">
              ${currentCation.controlSteps.slice(1).map(st => `
                <tr class="hover:bg-slate-800/40">
                  <td class="p-3.5 font-semibold text-white">
                    <div>${st.step}</div>
                    <div class="text-xs font-normal text-slate-400 mt-0.5">${st.action}</div>
                  </td>
                  <td class="p-3.5 text-amber-200 font-medium">${st.observation}</td>
                  <td class="p-3.5 font-mono text-sky-300">${st.equation}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// TAB 4: INTERACTIVE FLOWCHART & BLANK WORKSHEET (หน้า 104-107, 110-111 & สไลด์ 28-31)
// ----------------------------------------------------------------------------
function renderFlowchartTab() {
  const sub = AppState.flowchartPart;

  return `
    <div class="space-y-6">
      <!-- Sub-navigation for Flowcharts -->
      <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold text-white">🔀 แผนผังการแยกแคทไอออน & ใบงานแผนผัง (หน้า 104–111)</h2>
          <p class="text-xs text-slate-400">เลือกดูแผนผังภาพรวมสำหรับการสอบปฏิบัติการ (5 ไอออน) หรือแผนผังแยกแต่ละตอน (ตอนที่ 1–4)</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button onclick="AppState.flowchartPart = 'overview_exam'; renderApp();"
            class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${sub === "overview_exam" ? "bg-pink-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}">
            ⭐ แผนผังภาพรวมสอบแล็บ (สไลด์หน้า 31)
          </button>
          <button onclick="AppState.flowchartPart = 'part1_2'; renderApp();"
            class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${sub === "part1_2" ? "bg-sky-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}">
            ตอนที่ 1 & 2 (กลุ่มคลอไรด์)
          </button>
          <button onclick="AppState.flowchartPart = 'part3_4'; renderApp();"
            class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${sub === "part3_4" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}">
            ตอนที่ 3 & 4 (กลุ่มไฮดรอกไซด์/เชิงซ้อน)
          </button>
          <button onclick="AppState.flowchartPart = 'blank_sheet'; renderApp();"
            class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${sub === "blank_sheet" ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}">
            📝 ฝึกเติมช่องว่างใบงาน (หน้า 110–111)
          </button>
        </div>
      </div>

      ${sub === "overview_exam" ? renderOverviewExamFlowchart() : ""}
      ${sub === "part1_2" ? renderPart1And2Flowchart() : ""}
      ${sub === "part3_4" ? renderPart3And4Flowchart() : ""}
      ${sub === "blank_sheet" ? renderBlankWorksheetFlowchart() : ""}
    </div>
  `;
}

function renderOverviewExamFlowchart() {
  return `
    <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-pink-400">แผนผังภาพรวมสำหรับการสอบปฏิบัติการ (5 แคทไอออน: Ag⁺, Pb²⁺, Ni²⁺, Fe³⁺, Mn²⁺)</span>
          <h3 class="text-base sm:text-lg font-bold text-white mt-0.5">สรุปขั้นตอนแยกและยืนยันผล (ตอนที่ 1 ถึง ตอนที่ 3)</h3>
        </div>
      </div>

      <!-- Visual Tree Layout matching Slide 31 -->
      <div class="space-y-6 text-xs sm:text-sm">
        <!-- Root Node -->
        <div class="max-w-md mx-auto text-center p-4 rounded-2xl bg-gradient-to-r from-sky-900/60 to-indigo-900/60 border border-sky-400/50 shadow-lg">
          <div class="font-bold text-white text-base">สารละลายตัวอย่าง (Ag⁺, Pb²⁺, Ni²⁺, Fe³⁺, Mn²⁺)</div>
          <div class="text-sky-300 mt-1 font-mono">↓ เติม 6 M HCl จนตกตะกอนสมบูรณ์ แล้วเซนตริฟิวจ์</div>
        </div>

        <!-- Split into Group 1 (Left) and Group 2 (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Left Branch: Group 1 Precipitate (5 cols) -->
          <div class="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div class="p-3 rounded-xl bg-slate-900 border border-slate-700 text-center">
              <span class="px-2 py-0.5 rounded bg-white/10 text-white font-bold text-xs">ตะกอนขาว (ตอนที่ 2)</span>
              <div class="font-bold text-white mt-1">AgCl(s), PbCl₂(s) (และ Hg₂Cl₂)</div>
              <div class="text-amber-300 font-mono text-xs mt-1">↓ เติมน้ำกลั่น 1 mL + อุ่นในอ่างน้ำร้อน แล้วเซนตริฟิวจ์</div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <!-- Ag+ Sub-branch -->
              <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-center">
                <div class="font-bold text-slate-200">“ตะกอนขาว” AgCl(s)</div>
                <div class="text-xs text-sky-400 font-mono">↓ + 6 M NH₃ 1 mL</div>
                <div class="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs">
                  สารละลายใสไม่มีสี<br><strong class="text-white">[Ag(NH₃)₂]⁺</strong>
                  <div class="text-slate-500 mt-1">(ถ้ามี Hg₂²⁺ จะได้ตะกอนเทาดำ)</div>
                </div>
                <div class="text-xs text-rose-400 font-mono">↓ + 6 M HNO₃ จนเป็นกรด</div>
                <div class="p-2.5 rounded-xl bg-slate-100 text-slate-900 font-bold shadow">
                  ⚪ ตะกอนสีขาว AgCl(s)<br>ยืนยัน Ag⁺
                </div>
              </div>

              <!-- Pb2+ Sub-branch -->
              <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-center">
                <div class="font-bold text-slate-200">“สารละลายใส” Pb²⁺(aq)</div>
                <div class="text-xs text-yellow-400 font-mono">↓ + 0.1 M K₂CrO₄ 2–3 หยด</div>
                <div class="p-2.5 rounded-xl bg-yellow-400 text-slate-950 font-bold shadow">
                  🟡 ตะกอนสีเหลือง<br>PbCrO₄(s)
                </div>
                <div class="text-xs text-sky-400 font-mono">↓ + 6 M NaOH มากเกินพอ</div>
                <div class="p-2.5 rounded-xl bg-yellow-500/20 border border-yellow-400 text-yellow-200 font-bold">
                  ✨ ตะกอนละลาย ได้สารละลายสีเหลือง [Pb(OH)₄]²⁻ + CrO₄²⁻<br>ยืนยัน Pb²⁺
                </div>
              </div>
            </div>
          </div>

          <!-- Right Branch: Group 2 Supernatant (7 cols) -->
          <div class="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div class="p-3 rounded-xl bg-slate-900 border border-slate-700 text-center">
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs">สารละลายใส (นำไปทำตอนที่ 1 ต่อ → ตอนที่ 3)</span>
              <div class="font-bold text-white mt-1">Ni²⁺, Fe³⁺, Mn²⁺</div>
              <div class="text-sky-300 font-mono text-xs mt-1">↓ เติม 6 M NaOH จนเป็นเบส + 3% H₂O₂ 1 mL อุ่นและเซนตริฟิวจ์</div>
            </div>

            <div class="p-3 rounded-xl bg-slate-900 border border-slate-700 text-center">
              <div class="font-bold text-white">“ตะกอน” Ni(OH)₂ (เขียว), Fe(OH)₃ (น้ำตาลแดง), MnO₂·xH₂O (ดำ)</div>
              <div class="text-amber-300 font-mono text-xs mt-1">
                ↓ ล้างตะกอน → ละลายใน 6 M HNO₃ 10 หยด + 6 M HCl 5–6 หยด (อุ่น) → เติม 4 M NH₄Cl + 15 M NH₃ + 3% H₂O₂
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
              <!-- Ni2+ Sub-branch (4 cols) -->
              <div class="md:col-span-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-center">
                <div class="font-bold text-blue-300">“สารละลายสีน้ำเงิน”<br>[Ni(NH₃)₆]²⁺</div>
                <div class="text-xs text-pink-400 font-mono">↓ + DMG 2–3 หยด เขย่า</div>
                <div class="p-3 rounded-xl bg-rose-600 text-white font-bold shadow">
                  🔴 ตะกอนสีแดงสด<br>Ni(C₄H₇O₂N₂)₂(s)<br>ยืนยัน Ni²⁺
                </div>
              </div>

              <!-- Fe3+ & Mn2+ Sub-branch (8 cols) -->
              <div class="md:col-span-8 p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-center">
                <div class="font-bold text-amber-200">“ตะกอน” Fe(OH)₃, MnO₂·xH₂O</div>
                <div class="text-xs text-amber-400 font-mono">↓ ล้างตะกอน → ละลายใน 6 M HCl 1 mL + 6 M HNO₃ 2 หยด (อุ่น) → แบ่งเป็น 3 หลอด</div>
                <div class="grid grid-cols-3 gap-2 pt-1">
                  <div class="p-2.5 rounded-xl bg-red-950/90 border border-red-500/50 text-red-100">
                    <div class="text-xs font-bold text-red-300">หลอดที่ 1 (+KSCN)</div>
                    <div class="font-bold mt-1">🩸 สารละลายสีแดงเลือดนก</div>
                    <div class="text-xs opacity-80">[Fe(SCN)]²⁺ (Fe³⁺)</div>
                  </div>
                  <div class="p-2.5 rounded-xl bg-blue-950/90 border border-blue-500/50 text-blue-100">
                    <div class="text-xs font-bold text-blue-300">หลอดที่ 2 (+K₄[Fe(CN)₆])</div>
                    <div class="font-bold mt-1">🔵 ตะกอนสีน้ำเงินเข้ม</div>
                    <div class="text-xs opacity-80">KFe[Fe(CN)₆] (Fe³⁺)</div>
                  </div>
                  <div class="p-2.5 rounded-xl bg-fuchsia-950/90 border border-fuchsia-500/50 text-fuchsia-100">
                    <div class="text-xs font-bold text-fuchsia-300">หลอดที่ 3 (+HNO₃/NaBiO₃)</div>
                    <div class="font-bold mt-1">🟣 สารละลายสีม่วงแดง</div>
                    <div class="text-xs opacity-80">MnO₄⁻ (Mn²⁺)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

function renderPart1And2Flowchart() {
  return `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 class="text-base font-bold text-sky-400">ตอนที่ 1: การตกตะกอนแคทไอออนทั้ง 9 ชนิดออกเป็นกลุ่มๆ (หน้า 104)</h3>
        <div class="space-y-3 text-xs sm:text-sm">
          <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <strong>สารตัวอย่าง:</strong> Ag⁺, Hg₂²⁺, Pb²⁺, Ni²⁺, Zn²⁺, Al³⁺, Cr³⁺, Fe³⁺, Mn²⁺
          </div>
          <div class="text-center text-sky-400 font-mono">↓ หยด 6 M HCl จนตกตะกอนสมบูรณ์ + เซนตริฟิวจ์</div>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-slate-950 border border-slate-700">
              <div class="font-bold text-white">⚪ ตะกอนขาว (กลุ่มที่ 1)</div>
              <div class="text-slate-300 mt-1">AgCl(s), PbCl₂(s), Hg₂Cl₂(s)</div>
              <div class="text-xs text-sky-400 mt-1">→ นำไปทดสอบในตอนที่ 2</div>
            </div>
            <div class="p-3 rounded-xl bg-slate-950 border border-slate-700">
              <div class="font-bold text-white">💧 สารละลายมีสีหรือไม่มีสี</div>
              <div class="text-slate-300 mt-1">Ni²⁺, Zn²⁺, Al³⁺, Cr³⁺, Fe³⁺, Mn²⁺</div>
              <div class="text-xs text-amber-300 mt-1">↓ หยด 6 M NaOH จนเป็นเบส + 0.5 mL + 3% H₂O₂ 1 mL อุ่นในชามกระเบื้องให้เหลือครึ่งหนึ่ง</div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 pt-2">
            <div class="p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
              <div class="font-bold text-emerald-300">ตะกอน (กลุ่มที่ 2 → ตอนที่ 3)</div>
              <div class="text-slate-300 mt-1">• Ni(OH)₂ (ตะกอนเขียว)<br>• Fe(OH)₃ (ตะกอนน้ำตาลแดง)<br>• MnO₂·xH₂O (ตะกอนดำ)</div>
            </div>
            <div class="p-3 rounded-xl bg-slate-950 border border-yellow-500/30">
              <div class="font-bold text-yellow-300">สารละลาย (กลุ่มที่ 3 → ตอนที่ 4)</div>
              <div class="text-slate-300 mt-1">• [Al(OH)₄]⁻ (ไม่มีสี)<br>• [Zn(OH)₄]²⁻ (ไม่มีสี)<br>• CrO₄²⁻ (สีเหลือง)</div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 class="text-base font-bold text-amber-400">ตอนที่ 2: การทดสอบเฉพาะของ Ag⁺, Hg₂²⁺, Pb²⁺ (หน้า 105)</h3>
        <div class="space-y-3 text-xs sm:text-sm">
          <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <strong>ตะกอนขาวจากตอนที่ 1:</strong> AgCl, Hg₂Cl₂, PbCl₂
            <div class="text-sky-400 font-mono mt-1">↓ เติมน้ำกลั่น 1 mL อุ่นบนอ่างน้ำร้อนพร้อมคนแรงๆ เซนตริฟิวจ์ขณะร้อน</div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="font-bold text-white">ตะกอนขาว AgCl, Hg₂Cl₂</div>
              <div class="text-xs text-slate-400">ล้างด้วยน้ำร้อน 2 mL แล้วหยด 6 M NH₃ 1 mL</div>
              <div class="p-2 rounded bg-zinc-800 text-zinc-200">
                <strong>ตะกอนเทาดำ:</strong> HgNH₂Cl + Hg⁰ → <strong class="text-amber-300">มี Hg₂²⁺</strong>
              </div>
              <div class="p-2 rounded bg-slate-900 border border-slate-700">
                <strong>สารละลายใส [Ag(NH₃)₂]⁺:</strong><br>หยด 6 M HNO₃ จนเป็นกรด → ได้ <strong>ตะกอนขาว AgCl</strong> → <strong class="text-sky-300">มี Ag⁺</strong>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="font-bold text-white">สารละลาย Pb²⁺</div>
              <div class="text-xs text-slate-400">หยด 0.1 M K₂CrO₄ 2–3 หยด</div>
              <div class="p-2 rounded bg-yellow-500/20 border border-yellow-500/40 text-yellow-200">
                <strong>ตะกอนเหลือง PbCrO₄(s)</strong>
              </div>
              <div class="text-xs text-slate-400">↓ แยกตะกอนมาเติม 6 M NaOH มากเกินพอ</div>
              <div class="p-2 rounded bg-yellow-500/10 border border-yellow-400/30 text-yellow-100">
                <strong>ตะกอนละลาย</strong> ได้สารละลาย [Pb(OH)₄]²⁻ + CrO₄²⁻ → <strong class="text-amber-300">มี Pb²⁺</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPart3And4Flowchart() {
  return `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 class="text-base font-bold text-emerald-400">ตอนที่ 3: การทดสอบเฉพาะของ Ni²⁺, Fe³⁺, Mn²⁺ (หน้า 106)</h3>
        <div class="space-y-3 text-xs sm:text-sm">
          <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <strong>ตะกอนจากตอนที่ 1:</strong> Ni(OH)₂, Fe(OH)₃, MnO₂·xH₂O
            <div class="text-slate-300 mt-1">1. ล้างด้วยน้ำกลั่น 2 mL เซนตริฟิวจ์</div>
            <div class="text-slate-300">2. เติม 6 M HNO₃ 10 หยด + 6 M HCl 5–6 หยด อุ่นจนละลายหมด</div>
            <div class="text-sky-400">3. เติม 4 M NH₄Cl 4 หยด + 15 M NH₃ จนเป็นเบส + 3% H₂O₂ 1 mL เซนตริฟิวจ์</div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="font-bold text-amber-200">ตะกอน Fe(OH)₃, MnO₂·xH₂O</div>
              <div class="text-xs text-slate-400">ล้างด้วยน้ำ 1 mL → ละลายใน 6 M HCl 1 mL + 6 M HNO₃ 2 หยด (อุ่น) → แบ่งเป็น 3 หลอด:</div>
              <div class="p-2 rounded bg-red-950/60 border border-red-500/40 text-red-200">
                <strong>หลอด 1:</strong> + 1 M KSCN 4–5 หยด → สารละลายสีแดงเลือดนก [Fe(SCN)]²⁺ (<strong>Fe³⁺</strong>)
              </div>
              <div class="p-2 rounded bg-blue-950/60 border border-blue-500/40 text-blue-200">
                <strong>หลอด 2:</strong> + 0.1 M K₄[Fe(CN)₆] 2–3 หยด → ตะกอนน้ำเงิน KFe[Fe(CN)₆] (<strong>Fe³⁺</strong>)
              </div>
              <div class="p-2 rounded bg-fuchsia-950/60 border border-fuchsia-500/40 text-fuchsia-200">
                <strong>หลอด 3:</strong> + 6 M HNO₃ 2 หยด (อุ่น) + NaBiO₃ 1 ช้อน → สารละลายสีม่วงแดง MnO₄⁻ (<strong>Mn²⁺</strong>)
              </div>
            </div>
            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="font-bold text-blue-300">สารละลายสีน้ำเงิน [Ni(NH₃)₆]²⁺</div>
              <div class="text-xs text-slate-400">เติม Dimethylglyoxime (DMG) 2–3 หยด เขย่าแรงๆ</div>
              <div class="p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 font-bold">
                🔴 ได้ตะกอนสีแดงของ Ni(C₄H₇O₂N₂)₂ → ยืนยันว่ามี Ni²⁺
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 class="text-base font-bold text-cyan-400">ตอนที่ 4: การทดสอบเฉพาะของ Cr³⁺, Al³⁺ และ Zn²⁺ (หน้า 107)</h3>
        <div class="space-y-3 text-xs sm:text-sm">
          <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <strong>สารละลายจากตอนที่ 1:</strong> CrO₄²⁻, [Al(OH)₄]⁻, [Zn(OH)₄]²⁻
            <div class="text-sky-400 mt-1">↓ หยด 6 M CH₃COOH จนเป็นกรด แล้วหยด 6 M NH₃ จนเป็นเบส + 0.5 mL คน 1 นาที เซนตริฟิวจ์</div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="font-bold text-white">ตะกอนวุ้นขาว Al(OH)₃</div>
              <div class="text-xs text-slate-400">ล้างด้วยน้ำ 1 mL → หยด 6 M CH₃COOH เพื่อละลายตะกอนพอดี → เติมน้ำกลั่น 1 mL → เติม Catechol violet 2 หยด</div>
              <div class="p-2.5 rounded-xl bg-blue-950/70 border border-blue-400/50 text-blue-200 font-bold">
                🔵 ได้สารละลายสีน้ำเงิน → ยืนยัน Al³⁺
              </div>
            </div>
            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div class="font-bold text-yellow-200">สารละลาย [Zn(NH₃)₄]²⁺, CrO₄²⁻</div>
              <div class="p-2 rounded bg-yellow-950/50 border border-yellow-500/40 text-yellow-100 text-xs">
                <strong>ก. ถ้าสารละลายมีสีเหลือง:</strong> เติม 1 M BaCl₂ 0.5 mL → ได้ตะกอนเหลือง BaCrO₄ → ละลายด้วย 6 M HNO₃ 0.5 mL + น้ำ 0.5 mL + 3% H₂O₂ 2–3 หยด → <strong>สารละลายสีน้ำเงิน CrO₅ ที่จางหายเร็ว (ยืนยัน Cr³⁺)</strong>
              </div>
              <div class="p-2 rounded bg-lime-950/50 border border-lime-500/40 text-lime-100 text-xs">
                <strong>ข. สารละลายใสไม่มีสี:</strong> หยด 6 M HCl จนเป็นกรด + 0.2 M K₄[Fe(CN)₆] 3 หยด → <strong>ตะกอนขาว/เขียวอ่อน K₂Zn₃[Fe(CN)₆]₂ ที่ละลายใน 6 M NaOH (ยืนยัน Zn²⁺)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBlankWorksheetFlowchart() {
  const blanks = [
    { id: "b1", part: "ตอนที่ 1 (หลังเติม 6 M HCl)", q: "ตะกอนสีขาวที่แยกไปตอนที่ 2 คือ:", ans: "AgCl(s), PbCl₂(s), Hg₂Cl₂(s) (ตะกอนขาว)" },
    { id: "b2", part: "ตอนที่ 1 (หลังเติม 6 M NaOH + H₂O₂)", q: "ตะกอนที่แยกไปตอนที่ 3 คือ:", ans: "Ni(OH)₂ (เขียว), Fe(OH)₃ (น้ำตาลแดง), MnO₂·xH₂O (ดำ)" },
    { id: "b3", part: "ตอนที่ 1 (หลังเติม 6 M NaOH + H₂O₂)", q: "สารละลายที่แยกไปตอนที่ 4 คือ:", ans: "CrO₄²⁻ (เหลือง), [Al(OH)₄]⁻ (ไม่มีสี), [Zn(OH)₄]²⁻ (ไม่มีสี)" },
    { id: "b4", part: "ตอนที่ 2 (หลังเติมน้ำร้อน 1 mL)", q: "สารละลายใสที่ละลายในน้ำร้อน และผลเมื่อเติม K₂CrO₄ → NaOH:", ans: "สารละลาย Pb²⁺ → ตะกอนเหลือง PbCrO₄ → สารละลาย [Pb(OH)₄]²⁻ + CrO₄²⁻" },
    { id: "b5", part: "ตอนที่ 2 (หลังเติม 6 M NH₃ 1 mL)", q: "ตะกอนและสารละลายที่ได้จากการแยก AgCl, Hg₂Cl₂:", ans: "ตะกอนเทาดำ (HgNH₂Cl + Hg⁰) และสารละลายใส [Ag(NH₃)₂]⁺ (เมื่อเติม HNO₃ ได้ตะกอนขาว AgCl)" },
    { id: "b6", part: "ตอนที่ 3 (หลังเติมกรด แล้วตามด้วย NH₄Cl + NH₃ + H₂O₂)", q: "สารละลายที่แยกได้ และผลเมื่อหยด DMG:", ans: "สารละลายสีน้ำเงิน [Ni(NH₃)₆]²⁺ → เมื่อหยด DMG ได้ตะกอนสีแดง Ni(C₄H₇O₂N₂)₂" },
    { id: "b7", part: "ตอนที่ 3 (แบ่งสารละลาย Fe³⁺, Mn²⁺ เป็น 3 หลอด)", q: "ผลในหลอดที่ 1 (+KSCN), หลอดที่ 2 (+K₄[Fe(CN)₆]), หลอดที่ 3 (+HNO₃, NaBiO₃):", ans: "หลอด 1: สารละลายสีแดงเลือดนก [Fe(SCN)]²⁺ | หลอด 2: ตะกอนน้ำเงิน KFe[Fe(CN)₆] | หลอด 3: สารละลายสีม่วงแดง MnO₄⁻" },
    { id: "b8", part: "ตอนที่ 4 (Cr³⁺, Al³⁺, Zn²⁺)", q: "ตะกอนวุ้นขาว และผลหลังละลายใน CH₃COOH + Catechol violet:", ans: "ตะกอนวุ้นขาว Al(OH)₃ → สารละลายสีน้ำเงินของ Al³⁺ complex" }
  ];

  return `
    <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 class="text-base font-bold text-amber-300">📝 ใบงานฝึกเติมคำในช่องสี่เหลี่ยมของแผนผัง (หน้า 110–111)</h3>
          <p class="text-xs text-slate-400">คลิกที่แต่ละช่องเพื่อดูเฉลยสิ่งที่สังเกตได้และสูตรเคมีที่ต้องเขียนลงในรายงาน</p>
        </div>
        <button onclick="toggleAllBlanks(${blanks.length})"
          class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30">
          👁️ เปิด/ปิดเฉลยทั้งหมด
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${blanks.map(b => {
          const shown = Boolean(AppState.blankSheetRevealed[b.id]);
          return `
            <div onclick="AppState.blankSheetRevealed['${b.id}'] = !AppState.blankSheetRevealed['${b.id}']; renderApp();"
              class="cursor-pointer p-4 rounded-xl border transition ${shown ? "bg-emerald-950/30 border-emerald-500/40" : "bg-slate-950/80 border-slate-800 hover:border-slate-700"}">
              <div class="text-xs font-bold text-sky-400">${b.part}</div>
              <div class="text-sm font-semibold text-white mt-1">${b.q}</div>
              <div class="mt-2.5 p-2.5 rounded-lg font-mono text-xs ${shown ? "bg-slate-900 text-emerald-300 border border-emerald-500/30" : "bg-slate-900/60 text-slate-500 border border-dashed border-slate-700"}">
                ${shown ? `✅ ${b.ans}` : "คลิกเพื่อดูคำตอบในช่องสี่เหลี่ยม..."}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// TAB 5: QUIZ MODE (เตรียมสอบปฏิบัติการ)
// ----------------------------------------------------------------------------
function renderQuizTab() {
  const questions = window.WORKSHEET_FLOW_ITEMS;
  let score = 0;
  questions.forEach(q => {
    if (AppState.quizAnswers[q.id] === q.correct) score++;
  });

  return `
    <div class="space-y-6 max-w-4xl mx-auto">
      <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-bold text-white">🎓 แบบทดสอบเตรียมสอบปฏิบัติการวิเคราะห์แคทไอออน</h2>
          <p class="text-xs text-slate-400">ทบทวนจุดสำคัญของปฏิกิริยา สีตะกอน และการเลือกตัวทำละลายของแข็ง</p>
        </div>
        <div class="flex items-center gap-3">
          ${AppState.quizSubmitted ? `
            <span class="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm">
              คะแนน: ${score} / ${questions.length}
            </span>
          ` : ""}
          <button onclick="AppState.quizAnswers = {}; AppState.quizSubmitted = false; renderApp();"
            class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700">
            🔄 ทำใหม่อีกครั้ง
          </button>
        </div>
      </div>

      <div class="space-y-4">
        ${questions.map((q, idx) => {
          const picked = AppState.quizAnswers[q.id];
          return `
            <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div class="text-xs font-bold text-pink-400 uppercase tracking-wider">${q.part}</div>
              <div class="text-sm sm:text-base font-bold text-white">ข้อที่ ${idx + 1}: ${q.prompt}</div>
              <div class="space-y-2 pt-1">
                ${q.options.map((opt, oIdx) => {
                  const isPicked = picked === oIdx;
                  let btnStyle = "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-600";
                  if (AppState.quizSubmitted) {
                    if (oIdx === q.correct) {
                      btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold";
                    } else if (isPicked && oIdx !== q.correct) {
                      btnStyle = "bg-rose-950/70 border-rose-500 text-rose-200";
                    }
                  } else if (isPicked) {
                    btnStyle = "bg-sky-500/20 border-sky-400 text-white font-semibold";
                  }

                  return `
                    <button onclick="selectQuizOption('${q.id}', ${oIdx})"
                      class="w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}">
                      <span>${opt}</span>
                      ${AppState.quizSubmitted && oIdx === q.correct ? `<span>✅</span>` : ""}
                      ${AppState.quizSubmitted && isPicked && oIdx !== q.correct ? `<span>❌</span>` : ""}
                    </button>
                  `;
                }).join("")}
              </div>
              ${AppState.quizSubmitted ? `
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-sky-300">
                  <strong>คำอธิบาย:</strong> ${q.explanation}
                </div>
              ` : ""}
            </div>
          `;
        }).join("")}
      </div>

      <div class="text-center pb-6">
        <button onclick="AppState.quizSubmitted = true; renderApp();"
          class="px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-600/30 hover:opacity-95 transition">
          ✅ ตรวจคำตอบทั้งหมด
        </button>
      </div>
    </div>
  `;
}

// ============================================================================
// HELPER HANDLERS
// ============================================================================
function toggleCustomMixIon(ionId) {
  if (AppState.customMixIons.has(ionId)) {
    if (AppState.customMixIons.size > 1) AppState.customMixIons.delete(ionId);
  } else {
    AppState.customMixIons.add(ionId);
  }
  initLabSample("custom_mix");
}

function setPresetMix(type) {
  if (type === "exam5") {
    AppState.customMixIons = new Set(["Ag+", "Pb2+", "Ni2+", "Fe3+", "Mn2+"]);
  } else {
    AppState.customMixIons = new Set(Object.keys(window.CATION_DB));
  }
  initLabSample("custom_mix");
}

function toggleGuess2Ion(ionId) {
  if (AppState.unknownGuesses2.has(ionId)) {
    AppState.unknownGuesses2.delete(ionId);
  } else {
    if (AppState.unknownGuesses2.size >= 2) {
      // Remove the oldest picked ion so user can smoothly pick 2
      const first = AppState.unknownGuesses2.values().next().value;
      AppState.unknownGuesses2.delete(first);
    }
    AppState.unknownGuesses2.add(ionId);
    AppState.eliminatedIons.delete(ionId);
  }
  renderApp();
}

function toggleEliminateIon(ionId) {
  if (AppState.eliminatedIons.has(ionId)) {
    AppState.eliminatedIons.delete(ionId);
  } else {
    AppState.eliminatedIons.add(ionId);
    AppState.unknownGuesses2.delete(ionId);
  }
  renderApp();
}

function getPairSeparationGuide(ionIds) {
  const infos = ionIds.map(id => window.CATION_DB[id]);
  const [a, b] = infos;
  if (!a || !b) return "";

  const groups = new Set([a.group, b.group]);
  let strategy = "";
  if (a.group === 1 && b.group === 1) {
    strategy = `<strong>ทั้ง ${a.symbol} และ ${b.symbol} อยู่กลุ่มที่ 1 (ตกตะกอนขาวกับ 6 M HCl ทั้งคู่):</strong>
      <br>1. หยด <strong>6 M HCl</strong> → ได้ตะกอนขาวผสม เซนตริฟิวจ์และแยกน้ำใสทิ้ง
      <br>2. กด <strong>เติมน้ำกลั่น 1 mL + อุ่นน้ำร้อน</strong> → PbCl₂ จะละลายออกมาในน้ำร้อน ส่วน AgCl/Hg₂Cl₂ ยังเป็นตะกอนขาว → กดเซนตริฟิวจ์แล้ว <strong>แยกตะกอน/สารละลาย</strong> เป็น 2 หลอด
      <br>3. <strong>หลอดสารละลายใส (น้ำร้อน):</strong> หยด 0.1 M K₂CrO₄ ได้ตะกอนเหลือง PbCrO₄ (ละลายใน 6 M NaOH) ยืนยัน <strong>Pb²⁺</strong>
      <br>4. <strong>หลอดตะกอนขาวที่เหลือ:</strong> หยด 6 M NH₃ ละลายเป็น [Ag(NH₃)₂]⁺ แล้วหยด 6 M HNO₃ ได้ตะกอนขาว AgCl กลับคืน ยืนยัน <strong>Ag⁺</strong>`;
  } else if (groups.has(1) && groups.has(2)) {
    const g1Ion = a.group === 1 ? a : b;
    const g2Ion = a.group === 2 ? a : b;
    strategy = `<strong>มีไอออนกลุ่มที่ 1 (${g1Ion.symbol}) ผสมกับกลุ่มที่ 2 (${g2Ion.symbol}):</strong>
      <br>1. หยด <strong>6 M HCl</strong> → ${g1Ion.symbol} ตกตะกอนสีขาว ส่วน ${g2Ion.symbol} ยังอยู่ในสารละลายใส → กด <strong>เซนตริฟิวจ์</strong> แล้วกด <strong>แยกตะกอน/สารละลาย (Decant)</strong> เป็น 2 หลอด
      <br>2. <strong>หลอดที่ 1 (ตะกอนขาว → ตอนที่ 2):</strong> ${g1Ion.id === "Pb2+" ? "เติมน้ำกลั่น 1 mL + อุ่นน้ำร้อน (ตะกอนละลายหมด) แล้วหยด 0.1 M K₂CrO₄ ได้ตะกอนเหลือง PbCrO₄ ที่ละลายใน 6 M NaOH" : "ไม่ละลายในน้ำร้อน แต่ละลายใน 6 M NH₃ ได้สารละลายใส เมื่อหยด 6 M HNO₃ ได้ตะกอนขาว AgCl กลับคืน"} → ยืนยัน <strong>${g1Ion.symbol}</strong>
      <br>3. <strong>หลอดที่ 2 (สารละลายใส → ตอนที่ 1 & 3):</strong> หยด 6 M NaOH + 3% H₂O₂ ได้ตะกอนของ ${g2Ion.symbol} → ล้างตะกอนและละลายใน 6 M HCl + 6 M HNO₃ → ${
        g2Ion.id === "Ni2+"
          ? "เติม 4 M NH₄Cl + 15 M NH₃ ได้สารละลายสีน้ำเงิน [Ni(NH₃)₆]²⁺ เมื่อหยด DMG ได้ตะกอนสีแดงสด"
          : g2Ion.id === "Fe3+"
            ? "แบ่งทดสอบด้วย 1 M KSCN (ได้สีแดงเลือดนก) และ 0.1 M K₄[Fe(CN)₆] (ได้ตะกอนสีน้ำเงินเข้ม)"
            : "เติม 6 M HNO₃ อุ่น แล้วใส่ผง NaBiO₃ ได้สารละลายสีม่วงแดงของ MnO₄⁻"
      } → ยืนยัน <strong>${g2Ion.symbol}</strong>`;
  } else if (a.group === 2 && b.group === 2) {
    const hasNi = a.id === "Ni2+" || b.id === "Ni2+";
    if (hasNi) {
      const other = a.id === "Ni2+" ? b : a;
      strategy = `<strong>ทั้ง Ni²⁺ และ ${other.symbol} อยู่กลุ่มที่ 2 (ไม่ตกตะกอนกับ 6 M HCl):</strong>
        <br>1. หยด <strong>6 M NaOH + 3% H₂O₂</strong> → ตกตะกอนไฮดรอกไซด์/ออกไซด์ทั้งคู่ → ล้างตะกอน แล้วละลายด้วย <strong>6 M HNO₃ + 6 M HCl</strong>
        <br>2. เติม <strong>4 M NH₄Cl + 15 M NH₃</strong> → <strong>Ni²⁺</strong> จะละลายเป็นสารละลายสีน้ำเงิน [Ni(NH₃)₆]²⁺ ส่วน <strong>${other.symbol}</strong> จะตกตะกอน! → กด <strong>เซนตริฟิวจ์</strong> แล้วกด <strong>แยกตะกอน/สารละลาย</strong>
        <br>3. <strong>หลอดสารละลายสีน้ำเงิน:</strong> หยด DMG ได้ตะกอนสีแดงสด ยืนยัน <strong>Ni²⁺</strong>
        <br>4. <strong>หลอดตะกอนที่เหลือ:</strong> ล้างตะกอน ละลายใน 6 M HCl + 6 M HNO₃ แล้วทดสอบ ${other.id === "Fe3+" ? "ด้วย KSCN (สีแดงเลือดนก) และ K₄[Fe(CN)₆] (ตะกอนน้ำเงิน)" : "ด้วย 6 M HNO₃ + ผง NaBiO₃ (สารละลายสีม่วงแดง MnO₄⁻)"} ยืนยัน <strong>${other.symbol}</strong>`;
    } else {
      strategy = `<strong>ทั้ง Fe³⁺ และ Mn²⁺ อยู่กลุ่มที่ 2 และตกตะกอนร่วมกันตลอด:</strong>
        <br>1. หยด <strong>6 M NaOH + 3% H₂O₂</strong> → ได้ตะกอนผสม Fe(OH)₃ + MnO₂·xH₂O
        <br>2. ล้างตะกอน แล้วละลายด้วย <strong>6 M HCl + 6 M HNO₃</strong> (เมื่อเติม NH₄Cl + NH₃ จะไม่เกิดสีน้ำเงินของ Ni²⁺ แต่ตกตะกอนทั้งคู่เหมือนเดิม)
        <br>3. เมื่อละลายตะกอนใน <strong>6 M HCl + 6 M HNO₃</strong> จนใสแล้ว ให้กดปุ่ม <strong>"🧪🧪🧪 แบ่งเป็น 3 หลอดย่อยทันที"</strong>:
        <br>&nbsp;&nbsp;• <strong>หลอดย่อย 1:</strong> หยด 1 M KSCN → ได้สารละลายสีแดงเลือดนก ยืนยัน <strong>Fe³⁺</strong>
        <br>&nbsp;&nbsp;• <strong>หลอดย่อย 2:</strong> หยด 0.1 M K₄[Fe(CN)₆] → ได้ตะกอนสีน้ำเงินเข้ม ยืนยัน <strong>Fe³⁺</strong>
        <br>&nbsp;&nbsp;• <strong>หลอดย่อย 3:</strong> หยด 6 M HNO₃ + เติมผง NaBiO₃ → ได้สารละลายสีม่วงแดงของ MnO₄⁻ ยืนยัน <strong>Mn²⁺</strong>`;
    }
  } else {
    strategy = `<strong>สรุปสมบัติของทั้ง 2 ไอออน:</strong><br>• <strong>${a.symbol}:</strong> ${a.summary}<br>• <strong>${b.symbol}:</strong> ${b.summary}`;
  }
  return strategy;
}

function revealUnknownSolution() {
  AppState.unknownRevealed = true;
  const secret = AppState.secretUnknownIons;
  if (secret.length === 2) {
    const [i1, i2] = secret.map(id => window.CATION_DB[id]);
    AppState.unknownFeedback = {
      correct: true,
      message: `<div class="space-y-2">
        <div class="font-bold text-base text-amber-300">👁️ เฉลยสารตัวอย่าง ${AppState.unknownCode}: มี ${i1.symbol} (${i1.thaiName}) ผสมกับ ${i2.symbol} (${i2.thaiName})</div>
        <div class="text-slate-200">${getPairSeparationGuide(secret)}</div>
      </div>`
    };
  } else {
    const i1 = window.CATION_DB[secret[0]];
    AppState.unknownFeedback = {
      correct: true,
      message: `👁️ เฉลยสารตัวอย่าง ${AppState.unknownCode}: คือ ${i1.symbol} (${i1.thaiName}) — ${i1.summary}`
    };
  }
  renderApp();
}

function checkUnknownAnswer() {
  const isTwoMix = AppState.labMode === "exam_2mix" || AppState.labMode === "full_2mix";

  if (isTwoMix) {
    const guesses = Array.from(AppState.unknownGuesses2);
    if (guesses.length < 2) {
      AppState.unknownFeedback = {
        correct: false,
        message: `⚠️ กรุณาคลิกเลือกแคทไอออนให้ครบ 2 ชนิดก่อนกดส่งคำตอบ (ขณะนี้เลือกไว้ ${guesses.length}/2 ชนิด)`
      };
      renderApp();
      return;
    }

    const secretSet = new Set(AppState.secretUnknownIons);
    const matched = guesses.filter(g => secretSet.has(g));
    const guessedSymbols = guesses.map(g => window.CATION_DB[g].symbol).join(" และ ");

    if (matched.length === 2) {
      AppState.unknownRevealed = true;
      const [i1, i2] = AppState.secretUnknownIons.map(id => window.CATION_DB[id]);
      AppState.unknownFeedback = {
        correct: true,
        message: `<div class="space-y-2">
          <div class="font-bold text-base text-emerald-300">🎉 ยอดเยี่ยม! คุณวิเคราะห์ถูกต้องทั้ง 2 ชนิด (2/2): ${i1.symbol} และ ${i2.symbol}</div>
          <div class="text-slate-200">${getPairSeparationGuide(AppState.secretUnknownIons)}</div>
        </div>`
      };
    } else if (matched.length === 1) {
      AppState.unknownFeedback = {
        correct: false,
        message: `💡 <strong>เกือบถูกแล้ว! (ถูกต้อง 1 ชนิด จากที่เลือก ${guessedSymbols})</strong> — มี 1 ตัวที่อยู่ในหลอดตัวอย่างจริง แต่อีก 1 ตัวยังไม่ใช่ ลองตรวจสอบผลในหลอดที่แยกไว้อีกครั้ง หรือกดปุ่ม "👁️ เฉลย & วิธีแยกคู่นี้"`
      };
    } else {
      AppState.unknownFeedback = {
        correct: false,
        message: `❌ <strong>ยังไม่ถูกต้อง (0/2 ชนิด สำหรับ ${guessedSymbols})</strong> — ลองเริ่มหยด 6 M HCl เพื่อดูว่ามีกลุ่มที่ 1 ตกตะกอนขาวหรือไม่ แล้วแยกสารละลายไปตรวจกลุ่มที่ 2 ด้วย 6 M NaOH + 3% H₂O₂`
      };
    }
    renderApp();
    return;
  }

  // Single ion unknown check
  if (!AppState.unknownGuess) {
    AppState.unknownFeedback = {
      correct: false,
      message: "⚠️ กรุณาเลือกแคทไอออนจากรายการก่อนกดส่งคำตอบ"
    };
    renderApp();
    return;
  }
  const actual = AppState.secretUnknownIons[0];
  const actualInfo = window.CATION_DB[actual];
  if (AppState.unknownGuess === actual) {
    AppState.unknownRevealed = true;
    AppState.unknownFeedback = {
      correct: true,
      message: `🎉 ถูกต้อง! สารตัวอย่าง ${AppState.unknownCode} คือ ${actualInfo.symbol} (${actualInfo.thaiName}) — ${actualInfo.summary}`
    };
  } else {
    const guessedInfo = window.CATION_DB[AppState.unknownGuess];
    AppState.unknownFeedback = {
      correct: false,
      message: `❌ ยังไม่ถูกต้อง (${guessedInfo.symbol} ไม่ใช่ไอออนในหลอดนี้) ลองตรวจสอบผลในแต่ละขั้นตอนอีกครั้ง หรือกดเปิด X-Ray เพื่อดูใบ้`
    };
  }
  renderApp();
}

function deleteSelectedTube() {
  if (AppState.tubes.length <= 1) return;
  AppState.tubes.splice(AppState.selectedTubeIndex, 1);
  AppState.selectedTubeIndex = Math.max(0, AppState.selectedTubeIndex - 1);
  renderApp();
}

function toggleAllBlanks() {
  const keys = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"];
  const allOpen = keys.every(k => AppState.blankSheetRevealed[k]);
  keys.forEach(k => {
    AppState.blankSheetRevealed[k] = !allOpen;
  });
  renderApp();
}

function selectQuizOption(qId, oIdx) {
  if (AppState.quizSubmitted) return;
  AppState.quizAnswers[qId] = oIdx;
  renderApp();
}

// ============================================================================
// MAIN APP SHELL RENDERER
// ============================================================================
function renderApp() {
  const root = document.getElementById("app-root");
  if (!root) return;

  const tabs = [
    { id: "lab", label: "🧪 ห้องแล็บเสมือนจริง (Virtual Lab)" },
    { id: "solid", label: "🪨 ทดสอบละลายของแข็ง (ส่วนที่ 2)" },
    { id: "control", label: "📋 ตาราง Control Test & สมการ" },
    { id: "flowchart", label: "🔀 แผนผัง & ใบงาน (หน้า 104–111)" },
    { id: "quiz", label: "🎓 แบบทดสอบก่อนสอบแล็บ" }
  ];

  root.innerHTML = `
    <!-- Top Header -->
    <header class="border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-md sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-pink-500/20">
            Cu
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-wider text-pink-400">Chem Chula • การทดลองที่ 10</span>
              <span class="px-2 py-0.5 rounded-full text-xs bg-sky-500/15 text-sky-300 border border-sky-500/30 font-medium">Qualitative Analysis</span>
            </div>
            <h1 class="text-base sm:text-lg font-extrabold text-white tracking-tight">
              การวิเคราะห์เชิงคุณภาพสำหรับแคทไอออน (Cation Analysis Simulator)
            </h1>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          ${tabs.map(t => `
            <button onclick="AppState.activeTab = '${t.id}'; renderApp();"
              class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${AppState.activeTab === t.id ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20" : "text-slate-300 hover:bg-slate-800/80"}">
              ${t.label}
            </button>
          `).join("")}
        </nav>
      </div>
    </header>

    <!-- Main Content Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      ${AppState.activeTab === "lab" ? renderVirtualLabTab() : ""}
      ${AppState.activeTab === "solid" ? renderSolidSolubilityTab() : ""}
      ${AppState.activeTab === "control" ? renderControlTestTab() : ""}
      ${AppState.activeTab === "flowchart" ? renderFlowchartTab() : ""}
      ${AppState.activeTab === "quiz" ? renderQuizTab() : ""}
    </main>

    <!-- Footer with Waste Disposal Reminder from Slide 33 -->
    <footer class="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-800/80 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
      <div>
        ♻️ <strong>ข้อควรระวังเรื่องการทิ้งของเสีย (สไลด์หน้า 33):</strong> ของเสียที่มีแคทไอออน 8 ตัวที่ไม่มีปรอท (Hg) ทิ้งในถังของเสียประเภทที่ 6 โลหะหนัก • กรณีที่มีปรอท ให้ทิ้งในถังของเสียที่มีปรอท
      </div>
      <div class="text-slate-500">
        Qualitative Analysis for Cations • Department of Chemistry, Faculty of Science, Chulalongkorn University
      </div>
    </footer>
  `;
}

// Initialize on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  initLabSample("exam_2mix");
});
