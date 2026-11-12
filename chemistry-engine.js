// ============================================================================
// CHULA CHEM LAB 10: QUALITATIVE ANALYSIS FOR CATIONS - CHEMISTRY ENGINE
// Supports all 9 Manual Cations + 5 Exam Focus Cations + Solid Unknowns
// ============================================================================

window.CATION_DB = {
  "Ag+": {
    id: "Ag+",
    symbol: "Ag⁺",
    name: "Silver(I) ion",
    thaiName: "ซิลเวอร์(I) ไอออน",
    group: 1,
    groupName: "กลุ่มที่ 1 (คลอไรด์ที่ไม่ละลาย)",
    inExam5: true,
    initialSolutionColor: "rgba(226, 232, 240, 0.18)",
    initialColorDesc: "ใสไม่มีสี (0.1 M AgNO₃)",
    badgeColor: "from-slate-400 to-slate-600",
    summary: "ตกตะกอนขาว AgCl กับ HCl, ไม่ละลายในน้ำร้อน, ละลายใน 6 M NH₃ ได้สารละลายใส [Ag(NH₃)₂]⁺ และตกตะกอนขาว AgCl กลับคืนเมื่อเติม 6 M HNO₃ จนเป็นกรด",
    controlSteps: [
      {
        step: "เริ่มต้น",
        action: "สารละลาย 0.1 M AgNO₃ 1 mL (20 หยด)",
        observation: "สารละลายใสไม่มีสี",
        equation: "AgNO₃(aq) → Ag⁺(aq) + NO₃⁻(aq)",
        liquidColor: "rgba(226, 232, 240, 0.18)",
        ppt: null,
        pH: "neutral"
      },
      {
        step: "(i) หยด 6 M HCl 1–2 หยด",
        action: "เติม 6 M HCl จนตกตะกอนสมบูรณ์ แล้วเซนตริฟิวจ์แยกตะกอน",
        observation: "เกิดตะกอนสีขาวของ AgCl(s) (ไม่ละลายในน้ำร้อน)",
        equation: "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (ตะกอนขาว)",
        liquidColor: "rgba(226, 232, 240, 0.18)",
        ppt: { color: "#f8fafc", border: "#cbd5e1", label: "AgCl(s) ตะกอนขาว", amount: 0.35, style: "curdy" },
        pH: "acidic"
      },
      {
        step: "(ii) ละลายตะกอนขาวใน 6 M NH₃",
        action: "หยด 6 M NH₃ 1 mL ทีละหยดลงบนตะกอนขาว ใช้แท่งแก้วคน",
        observation: "ตะกอนสีขาวละลายหมด ได้สารละลายใสไม่มีสีของ [Ag(NH₃)₂]⁺",
        equation: "AgCl(s) + 2NH₃(aq) → [Ag(NH₃)₂]⁺(aq) + Cl⁻(aq)",
        liquidColor: "rgba(226, 232, 240, 0.22)",
        ppt: null,
        pH: "ammoniacal"
      },
      {
        step: "(iii) หยด 6 M HNO₃ จนเป็นกรด",
        action: "หยด 6 M HNO₃ ทีละหยดลงในสารละลายจนมีฤทธิ์เป็นกรด (ทดสอบด้วยลิตมัส)",
        observation: "เกิดตะกอนสีขาวขุ่นของ AgCl(s) กลับคืนมา",
        equation: "[Ag(NH₃)₂]⁺(aq) + Cl⁻(aq) + 2H⁺(aq) → AgCl(s)↓ + 2NH₄⁺(aq)",
        liquidColor: "rgba(241, 245, 249, 0.35)",
        ppt: { color: "#f8fafc", border: "#cbd5e1", label: "AgCl(s) ตะกอนขาว", amount: 0.35, style: "curdy" },
        pH: "acidic"
      }
    ]
  },

  "Pb2+": {
    id: "Pb2+",
    symbol: "Pb²⁺",
    name: "Lead(II) ion",
    thaiName: "เลด(II) ไอออน",
    group: 1,
    groupName: "กลุ่มที่ 1 (คลอไรด์ที่ไม่ละลาย)",
    inExam5: true,
    initialSolutionColor: "rgba(226, 232, 240, 0.18)",
    initialColorDesc: "ใสไม่มีสี (0.1 M Pb(NO₃)₂)",
    badgeColor: "from-amber-400 to-yellow-600",
    summary: "ตกตะกอนขาว PbCl₂ กับ HCl, ตะกอนละลายได้ในน้ำร้อน, เมื่อเติม 0.1 M K₂CrO₄ ได้ตะกอนสีเหลืองของ PbCrO₄ ซึ่งละลายได้ใน 6 M NaOH ได้สารละลายสีเหลืองของ [Pb(OH)₄]²⁻ และ CrO₄²⁻",
    controlSteps: [
      {
        step: "เริ่มต้น",
        action: "สารละลาย 0.1 M Pb(NO₃)₂ 1 mL",
        observation: "สารละลายใสไม่มีสี",
        equation: "Pb(NO₃)₂(aq) → Pb²⁺(aq) + 2NO₃⁻(aq)",
        liquidColor: "rgba(226, 232, 240, 0.18)",
        ppt: null,
        pH: "neutral"
      },
      {
        step: "(i) หยด 6 M HCl 1–2 หยด",
        action: "เติม 6 M HCl จนตกตะกอนสมบูรณ์ แล้วเซนตริฟิวจ์แยกตะกอน",
        observation: "เกิดตะกอนสีขาวของ PbCl₂(s)",
        equation: "Pb²⁺(aq) + 2Cl⁻(aq) → PbCl₂(s)↓ (ตะกอนขาว)",
        liquidColor: "rgba(226, 232, 240, 0.18)",
        ppt: { color: "#f8fafc", border: "#cbd5e1", label: "PbCl₂(s) ตะกอนขาว", amount: 0.35, style: "crystalline" },
        pH: "acidic"
      },
      {
        step: "(ii) ละลายตะกอนขาวในน้ำร้อน",
        action: "เติมน้ำกลั่น 1 mL นำไปอุ่นบนอ่างน้ำร้อนพร้อมคนด้วยแท่งแก้ว",
        observation: "ตะกอนสีขาวละลายหมด ได้สารละลายใสไม่มีสี",
        equation: "PbCl₂(s)  ──(น้ำร้อน Δ)──►  Pb²⁺(aq) + 2Cl⁻(aq)",
        liquidColor: "rgba(226, 232, 240, 0.20)",
        ppt: null,
        pH: "neutral",
        hot: true
      },
      {
        step: "(iii) หยด 0.1 M K₂CrO₄ 2–3 หยด",
        action: "หยด 0.1 M K₂CrO₄ ลงในสารละลาย แล้วเซนตริฟิวจ์แยกตะกอน",
        observation: "เกิดตะกอนสีเหลืองสดของ PbCrO₄(s)",
        equation: "Pb²⁺(aq) + CrO₄²⁻(aq) → PbCrO₄(s)↓ (ตะกอนสีเหลือง)",
        liquidColor: "rgba(253, 224, 71, 0.25)",
        ppt: { color: "#facc15", border: "#eab308", label: "PbCrO₄(s) ตะกอนเหลือง", amount: 0.38, style: "dense" },
        pH: "neutral"
      },
      {
        step: "(iv) ละลายตะกอนเหลืองใน 6 M NaOH",
        action: "นำเฉพาะตะกอนเหลืองมาเติม 6 M NaOH มากเกินพอ",
        observation: "ตะกอนสีเหลืองละลาย ได้สารละลายใสสีเหลือง",
        equation: "PbCrO₄(s) + 4OH⁻(aq) → [Pb(OH)₄]²⁻(aq) (ไม่มีสี) + CrO₄²⁻(aq) (สีเหลือง)",
        liquidColor: "rgba(250, 204, 21, 0.55)",
        ppt: null,
        pH: "basic"
      }
    ]
  },

  "Hg2_2+": {
    id: "Hg2_2+",
    symbol: "Hg₂²⁺",
    name: "Mercury(I) ion",
    thaiName: "เมอร์คิวรี(I) ไอออน",
    group: 1,
    groupName: "กลุ่มที่ 1 (คลอไรด์ที่ไม่ละลาย)",
    inExam5: false,
    initialSolutionColor: "rgba(226, 232, 240, 0.18)",
    initialColorDesc: "ใสไม่มีสี (0.1 M Hg₂(NO₃)₂)",
    badgeColor: "from-zinc-500 to-neutral-700",
    summary: "ตกตะกอนขาว Hg₂Cl₂ กับ HCl, ไม่ละลายในน้ำร้อน, เมื่อเติม 6 M NH₃ จะเกิดปฏิกิริยา disproportionation ได้ตะกอนสีเทา-ดำของ HgNH₂Cl (ขาว) ผสมกับ Hg⁰ (ดำ)",
    controlSteps: [
      {
        step: "เริ่มต้น",
        action: "สารละลาย 0.1 M Hg₂(NO₃)₂ 1 mL",
        observation: "สารละลายใสไม่มีสี",
        equation: "Hg₂(NO₃)₂(aq) → Hg₂²⁺(aq) + 2NO₃⁻(aq)",
        liquidColor: "rgba(226, 232, 240, 0.18)",
        ppt: null,
        pH: "acidic"
      },
      {
        step: "(i) หยด 6 M HCl 1–2 หยด",
        action: "เติม 6 M HCl จนตกตะกอนสมบูรณ์ เซนตริฟิวจ์แยกตะกอนขาว",
        observation: "เกิดตะกอนสีขาวของ Hg₂Cl₂(s) (ไม่ละลายในน้ำร้อน)",
        equation: "Hg₂²⁺(aq) + 2Cl⁻(aq) → Hg₂Cl₂(s)↓ (ตะกอนขาว)",
        liquidColor: "rgba(226, 232, 240, 0.18)",
        ppt: { color: "#f8fafc", border: "#cbd5e1", label: "Hg₂Cl₂(s) ตะกอนขาว", amount: 0.35, style: "dense" },
        pH: "acidic"
      },
      {
        step: "(ii) หยด 6 M NH₃ ในตะกอนขาว",
        action: "หยด 6 M NH₃ 1 mL ลงบนตะกอนขาวที่ล้างด้วยน้ำร้อนแล้ว",
        observation: "ตะกอนเปลี่ยนจากสีขาวเป็นตะกอนสีเทา-ดำ (ปฏิกิริยา Disproportionation)",
        equation: "Hg₂Cl₂(s) + 2NH₃(aq) → HgNH₂Cl(s)↓ (ขาว) + Hg⁰(l)↓ (ดำ) + NH₄⁺(aq) + Cl⁻(aq)",
        liquidColor: "rgba(226, 232, 240, 0.22)",
        ppt: { color: "#3f3f46", border: "#18181b", label: "HgNH₂Cl + Hg⁰ ตะกอนเทาดำ", amount: 0.36, style: "speckled" },
        pH: "ammoniacal"
      }
    ]
  },

  "Ni2+": {
    id: "Ni2+",
    symbol: "Ni²⁺",
    name: "Nickel(II) ion",
    thaiName: "นิกเกิล(II) ไอออน",
    group: 2,
    groupName: "กลุ่มที่ 2 (ไฮดรอกไซด์ที่ไม่ละลาย)",
    inExam5: true,
    initialSolutionColor: "rgba(74, 222, 128, 0.38)",
    initialColorDesc: "สีเขียวอ่อนใส (0.1 M Ni(NO₃)₂)",
    badgeColor: "from-emerald-400 to-rose-500",
    summary: "ไม่ตกตะกอนกับ HCl, ตกตะกอนสีเขียว Ni(OH)₂ ใน NaOH, ละลายตะกอนในกรดแล้วเติม NH₄Cl + 15 M NH₃ ได้สารละลายเชิงซ้อนสีน้ำเงิน [Ni(NH₃)₆]²⁺ เมื่อหยด DMG ได้ตะกอนสีแดงสด",
    controlSteps: [
      {
        step: "เริ่มต้น",
        action: "สารละลาย 0.1 M Ni(NO₃)₂ 1 mL",
        observation: "สารละลายใสสีเขียวอ่อน (ไม่ตกตะกอนเมื่อเติม 6 M HCl)",
        equation: "Ni(NO₃)₂(aq) → Ni²⁺(aq) + 2NO₃⁻(aq)",
        liquidColor: "rgba(74, 222, 128, 0.38)",
        ppt: null,
        pH: "neutral"
      },
      {
        step: "(i) หยด 6 M NaOH จนเป็นเบส",
        action: "หยด 6 M NaOH จนเป็นเบส (+ 0.5 mL และ 3% H₂O₂ 1 mL อุ่นแล้วเซนตริฟิวจ์)",
        observation: "เกิดตะกอนสีเขียวของ Ni(OH)₂(s)",
        equation: "Ni²⁺(aq) + 2OH⁻(aq) → Ni(OH)₂(s)↓ (ตะกอนสีเขียว)",
        liquidColor: "rgba(226, 232, 240, 0.20)",
        ppt: { color: "#4ade80", border: "#16a34a", label: "Ni(OH)₂(s) ตะกอนเขียว", amount: 0.38, style: "gelatinous" },
        pH: "basic"
      },
      {
        step: "(ii) ละลายตะกอนใน 6 M HNO₃ 10 หยด + 6 M HCl 5–6 หยด",
        action: "ล้างตะกอนด้วยน้ำกลั่น 2 mL แล้วเติมกรด อุ่นและคนจนตะกอนละลายหมด",
        observation: "ตะกอนสีเขียวละลายหมด ได้สารละลายใสสีเขียวอ่อน",
        equation: "Ni(OH)₂(s) + 2H⁺(aq) → Ni²⁺(aq) + 2H₂O(l)",
        liquidColor: "rgba(74, 222, 128, 0.35)",
        ppt: null,
        pH: "acidic",
        hot: true
      },
      {
        step: "(iii) เติม 4 M NH₄Cl 4 หยด + 15 M NH₃ จนเป็นเบส",
        action: "เติม 4 M NH₄Cl 4 หยด ตามด้วย 15 M NH₃ จนเป็นเบส",
        observation: "เกิดสารละลายเชิงซ้อนสีน้ำเงิน-ม่วงของ [Ni(NH₃)₆]²⁺",
        equation: "Ni²⁺(aq) + 6NH₃(aq) → [Ni(NH₃)₆]²⁺(aq) (สารละลายสีน้ำเงิน)",
        liquidColor: "rgba(59, 130, 246, 0.65)",
        ppt: null,
        pH: "ammoniacal"
      },
      {
        step: "(iv) หยด Dimethylglyoxime (DMG) 2–3 หยด",
        action: "หยดสารละลาย DMG 2–3 หยด แล้วเขย่าแรงๆ",
        observation: "เกิดตะกอนสีแดงชมพูสด (ตะกอนแดง) ของ Nickel dimethylglyoxime",
        equation: "[Ni(NH₃)₆]²⁺(aq) + 2C₄H₈O₂N₂(aq) + 4H₂O(l) → Ni(C₄H₇O₂N₂)₂(s)↓ (ตะกอนแดง) + 6NH₄⁺(aq) + 4OH⁻(aq)",
        liquidColor: "rgba(244, 63, 94, 0.28)",
        ppt: { color: "#e11d48", border: "#9f1239", label: "Ni(DMG)₂(s) ตะกอนสีแดง", amount: 0.45, style: "fluffy" },
        pH: "ammoniacal"
      }
    ]
  },

  "Mn2+": {
    id: "Mn2+",
    symbol: "Mn²⁺",
    name: "Manganese(II) ion",
    thaiName: "แมงกานีส(II) ไอออน",
    group: 2,
    groupName: "กลุ่มที่ 2 (ไฮดรอกไซด์และออกไซด์ที่ไม่ละลาย)",
    inExam5: true,
    initialSolutionColor: "rgba(251, 207, 232, 0.22)",
    initialColorDesc: "ใสชมพูอ่อนมาก/เกือบไม่มีสี (0.1 M Mn(NO₃)₂)",
    badgeColor: "from-purple-500 to-fuchsia-700",
    summary: "เติม NaOH + H₂O₂ ได้ตะกอนสีดำของ MnO₂·xH₂O, ละลายตะกอนใน 6 M HCl + 6 M HNO₃ อุ่น, จากนั้นเติม 6 M HNO₃ และผง NaBiO₃ ได้สารละลายสีม่วงแดงของ MnO₄⁻",
    controlSteps: [
      {
        step: "เริ่มต้น",
        action: "สารละลาย 0.1 M Mn(NO₃)₂ 1 mL",
        observation: "สารละลายใสเกือบไม่มีสี (ชมพูจางมาก)",
        equation: "Mn(NO₃)₂(aq) → Mn²⁺(aq) + 2NO₃⁻(aq)",
        liquidColor: "rgba(251, 207, 232, 0.22)",
        ppt: null,
        pH: "neutral"
      },
      {
        step: "(i) หยด 6 M NaOH จนเป็นเบส + 3% H₂O₂ 1 mL",
        action: "เติม 6 M NaOH จนเป็นเบส (ได้ตะกอนสีครีม Mn(OH)₂) แล้วเติม 3% H₂O₂ 1 mL อุ่นไล่ H₂O₂",
        observation: "เกิดตะกอนสีครีมของ Mn(OH)₂ แล้วเปลี่ยนเป็นตะกอนสีดำ/น้ำตาลดำของ MnO₂·2H₂O ทันที",
        equation: "Mn²⁺(aq) + 2OH⁻(aq) → Mn(OH)₂(s) (สีครีม) ──(H₂O₂)──► MnO₂·2H₂O(s)↓ (ตะกอนสีดำ)",
        liquidColor: "rgba(226, 232, 240, 0.22)",
        ppt: { color: "#1c1917", border: "#44403c", label: "MnO₂·xH₂O(s) ตะกอนสีดำ", amount: 0.40, style: "dense" },
        pH: "basic",
        bubbles: true
      },
      {
        step: "(ii) ละลายตะกอนใน 6 M HNO₃ 2 หยด + 6 M HCl 1 mL",
        action: "ล้างตะกอนด้วยน้ำกลั่น แล้วเติม 6 M HCl 1 mL + 6 M HNO₃ 2 หยด นำไปอุ่นและคนจนละลายหมด",
        observation: "ตะกอนสีดำละลายหมด มีแก๊ส Cl₂ เกิดขึ้น ได้สารละลายใสสีเหลืองอ่อน/ไม่มีสีของ Mn²⁺",
        equation: "MnO₂·2H₂O(s) + 2Cl⁻(aq) + 4H⁺(aq) → Mn²⁺(aq) + 4H₂O(l) + Cl₂(g)↑",
        liquidColor: "rgba(253, 224, 71, 0.28)",
        ppt: null,
        pH: "acidic",
        hot: true,
        bubbles: true
      },
      {
        step: "(iii) เติม 6 M HNO₃ 2 หยด (อุ่น) + NaBiO₃(s) 1 ช้อนเล็ก",
        action: "เติม 6 M HNO₃ 2 หยด นำไปอุ่น แล้วตักของแข็ง NaBiO₃ 1 ช้อนเล็กใส่และเขย่า",
        observation: "สารละลายเปลี่ยนเป็นสีม่วงแดงของ MnO₄⁻ (มีผง NaBiO₃ ที่เหลือตกอยู่ก้นหลอด)",
        equation: "2Mn²⁺(aq) + 5NaBiO₃(s) + 14H⁺(aq) → 2MnO₄⁻(aq) (สีม่วงแดง) + 5Bi³⁺(aq) + 7H₂O(l) + 5Na⁺(aq)",
        liquidColor: "rgba(162, 28, 175, 0.82)",
        ppt: { color: "#a8a29e", border: "#78716c", label: "NaBiO₃(s) ส่วนเกินก้นหลอด", amount: 0.16, style: "dense" },
        pH: "acidic"
      }
    ]
  },

  "Fe3+": {
    id: "Fe3+",
    symbol: "Fe³⁺",
    name: "Iron(III) ion",
    thaiName: "ไอร์ออน(III) ไอออน",
    group: 2,
    groupName: "กลุ่มที่ 2 (ไฮดรอกไซด์ที่ไม่ละลาย)",
    inExam5: true,
    initialSolutionColor: "rgba(250, 204, 21, 0.45)",
    initialColorDesc: "สีเหลืองอ่อนใส (0.1 M Fe(NO₃)₃)",
    badgeColor: "from-red-600 to-blue-700",
    summary: "เติม NaOH ได้ตะกอนสีน้ำตาลแดง Fe(OH)₃, ละลายในกรด HCl + HNO₃ ได้สารละลายสีเหลือง แบ่งทดสอบ: (1) เติม KSCN ได้สารละลายสีแดงเลือดนก [Fe(SCN)]²⁺ (2) เติม K₄[Fe(CN)₆] ได้ตะกอนสีน้ำเงินเข้ม KFe[Fe(CN)₆]",
    controlSteps: [
      {
        step: "เริ่มต้น",
        action: "สารละลาย 0.1 M Fe(NO₃)₃ 1 mL",
        observation: "สารละลายใสสีเหลืองอ่อน",
        equation: "Fe(NO₃)₃(aq) → Fe³⁺(aq) + 3NO₃⁻(aq)",
        liquidColor: "rgba(250, 204, 21, 0.45)",
        ppt: null,
        pH: "acidic"
      },
      {
        step: "(i) หยด 6 M NaOH จนเป็นเบส",
        action: "หยด 6 M NaOH จนเป็นเบส (+ 3% H₂O₂ 1 mL ในขั้นตอนรวม)",
        observation: "เกิดตะกอนสีน้ำตาลแดงของ Fe(OH)₃(s)",
        equation: "Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s)↓ (ตะกอนสีน้ำตาลแดง)",
        liquidColor: "rgba(226, 232, 240, 0.20)",
        ppt: { color: "#9a3412", border: "#7c2d12", label: "Fe(OH)₃(s) ตะกอนน้ำตาลแดง", amount: 0.38, style: "gelatinous" },
        pH: "basic"
      },
      {
        step: "(ii) ละลายตะกอนใน 6 M HNO₃ 2 หยด + 6 M HCl 1 mL",
        action: "ล้างตะกอนด้วยน้ำกลั่น เติม 6 M HCl 1 mL + 6 M HNO₃ 2 หยด อุ่นจนละลายหมด แล้วแบ่งเป็น 2 หลอด",
        observation: "ตะกอนสีน้ำตาลแดงละลายหมด ได้สารละลายใสสีเหลืองของ Fe³⁺",
        equation: "Fe(OH)₃(s) + 3H⁺(aq) → Fe³⁺(aq) (สารละลายสีเหลือง) + 3H₂O(l)",
        liquidColor: "rgba(250, 204, 21, 0.50)",
        ppt: null,
        pH: "acidic",
        hot: true
      },
      {
        step: "(iii-1) หลอดที่ 1: หยด 1 M KSCN 4–5 หยด",
        action: "เติม 1 M KSCN 4–5 หยด ลงในหลอดที่ 1",
        observation: "ได้สารละลายสีแดงเลือดนกเข้มของ [Fe(SCN)]²⁺",
        equation: "Fe³⁺(aq) + SCN⁻(aq) → [Fe(SCN)]²⁺(aq) (สารละลายสีแดงเลือดนก)",
        liquidColor: "rgba(153, 27, 27, 0.92)",
        ppt: null,
        pH: "acidic"
      },
      {
        step: "(iii-2) หลอดที่ 2: หยด 0.1 M K₄[Fe(CN)₆] 2–3 หยด",
        action: "เติม 0.1 M K₄[Fe(CN)₆] 2–3 หยด ลงในหลอดที่ 2",
        observation: "เกิดตะกอนสีน้ำเงินเข้ม (Prussian Blue) ของ KFe[Fe(CN)₆](s)",
        equation: "Fe³⁺(aq) + K⁺(aq) + [Fe(CN)₆]⁴⁻(aq) → KFe[Fe(CN)₆](s)↓ (ตะกอนสีน้ำเงินเข้ม)",
        liquidColor: "rgba(30, 58, 138, 0.70)",
        ppt: { color: "#1e3a8a", border: "#172554", label: "KFe[Fe(CN)₆](s) ตะกอนน้ำเงิน", amount: 0.42, style: "dense" },
        pH: "acidic"
      }
    ]
  },

  "Cr3+": {
    id: "Cr3+",
    symbol: "Cr³⁺",
    name: "Chromium(III) ion",
    thaiName: "โครเมียม(III) ไอออน",
    group: 3,
    groupName: "กลุ่มที่ 3 (เกิดสารเชิงซ้อน/ออกซิไดส์ใน NaOH + H₂O₂)",
    inExam5: false,
    initialSolutionColor: "rgba(20, 184, 166, 0.48)",
    initialColorDesc: "สีเขียวอมน้ำเงิน/ม่วง (0.1 M Cr(NO₃)₃)",
    badgeColor: "from-teal-500 to-amber-500",
    summary: "ใน NaOH มากเกินพอได้ [Cr(OH)₄]⁻ สีเขียว เมื่อเติม 3% H₂O₂ แล้วต้มจะได้สารละลายสีเหลือง CrO₄²⁻ เติม BaCl₂ ได้ตะกอนเหลือง BaCrO₄ เมื่อละลายใน HNO₃ และเติม H₂O₂ ได้สารละลายสีน้ำเงิน CrO₅ ที่จางหายอย่างรวดเร็ว",
    controlSteps: [
      {
        step: "เริ่มต้น",
        action: "สารละลาย 0.1 M Cr(NO₃)₃ 1 mL",
        observation: "สารละลายใสสีเขียวอมม่วง/เขียวเข้ม",
        equation: "Cr(NO₃)₃(aq) → Cr³⁺(aq) + 3NO₃⁻(aq)",
        liquidColor: "rgba(20, 184, 166, 0.48)",
        ppt: null,
        pH: "acidic"
      },
      {
        step: "(i) หยด 6 M NaOH จนเป็นเบสและมากเกินพอ",
        action: "หยด 6 M NaOH ทีละหยด (เกิดตะกอนเขียวเทา Cr(OH)₃ แล้วละลายใน NaOH มากเกินพอ)",
        observation: "เกิดตะกอนสีเขียว Cr(OH)₃ แล้วละลายเป็นสารละลายสีเขียวของ [Cr(OH)₄]⁻",
        equation: "Cr³⁺(aq) + 3OH⁻(aq) → Cr(OH)₃(s) ──(+OH⁻)──► [Cr(OH)₄]⁻(aq) (สารละลายสีเขียว)",
        liquidColor: "rgba(34, 197, 94, 0.45)",
        ppt: null,
        pH: "basic"
      },
      {
        step: "(ii) เติม 6 M NaOH 0.5 mL + 3% H₂O₂ 1 mL ต้มไล่ H₂O₂",
        action: "เติม 3% H₂O₂ 1 mL แล้วนำไปต้มในชามกระเบื้องจนปริมาตรลดลงครึ่งหนึ่ง",
        observation: "สารละลายเปลี่ยนจากสีเขียวเป็นสีเหลืองสดของ CrO₄²⁻",
        equation: "2[Cr(OH)₄]⁻(aq) + 3H₂O₂(aq) + 2OH⁻(aq) → 2CrO₄²⁻(aq) (สีเหลือง) + 8H₂O(l)",
        liquidColor: "rgba(250, 204, 21, 0.65)",
        ppt: null,
        pH: "basic",
        hot: true,
        bubbles: true
      },
      {
        step: "(iii) หยด 1 M BaCl₂ 0.5 mL (หลังปรับด้วย CH₃COOH และ NH₃)",
        action: "เติม 1 M BaCl₂ 0.5 mL ลงในสารละลายสีเหลือง แล้วเซนตริฟิวจ์แยกตะกอน",
        observation: "เกิดตะกอนสีเหลืองอ่อนของ BaCrO₄(s)",
        equation: "CrO₄²⁻(aq) + Ba²⁺(aq) → BaCrO₄(s)↓ (ตะกอนเหลือง)",
        liquidColor: "rgba(226, 232, 240, 0.20)",
        ppt: { color: "#fde047", border: "#ca8a04", label: "BaCrO₄(s) ตะกอนเหลือง", amount: 0.36, style: "dense" },
        pH: "ammoniacal"
      },
      {
        step: "(iv) ละลายตะกอนเหลืองด้วย 6 M HNO₃ + 3% H₂O₂ 2–3 หยด",
        action: "ละลายตะกอนใน 6 M HNO₃ 0.5 mL + น้ำ 0.5 mL (ได้สีส้ม Cr₂O₇²⁻) แล้วหยด 3% H₂O₂ 2–3 หยด",
        observation: "เกิดสารละลายสีน้ำเงินเข้มของ CrO(O₂)₂ (CrO₅) ซึ่งจางหายไปอย่างรวดเร็ว",
        equation: "2CrO₄²⁻ + 2H⁺ → Cr₂O₇²⁻ (ส้ม) + H₂O ;  Cr₂O₇²⁻(aq) + 2H⁺(aq) + 4H₂O₂(aq) → 2CrO(O₂)₂(aq) (สีน้ำเงิน) + 5H₂O(l)",
        liquidColor: "rgba(29, 78, 216, 0.80)",
        ppt: null,
        pH: "acidic",
        bubbles: true
      }
    ]
  },

  "Al3+": {
    id: "Al3+",
    symbol: "Al³⁺",
    name: "Aluminum(III) ion",
    thaiName: "อะลูมิเนียม(III) ไอออน",
    group: 3,
    groupName: "กลุ่มที่ 3 (ไอออนเชิงซ้อนไฮดรอกโซ [Al(OH)₄]⁻)",
    inExam5: false,
    initialSolutionColor: "rgba(226, 232, 240, 0.18)",
    initialColorDesc: "ใสไม่มีสี (0.1 M Al(NO₃)₃)",
    badgeColor: "from-sky-400 to-indigo-600",
    summary: "ใน NaOH มากเกินพอได้สารละลายใส [Al(OH)₄]⁻ เมื่อทำให้เป็นกรดด้วย CH₃COOH แล้วเติม 6 M NH₃ มากเกินพอจะได้ตะกอนวุ้นขาว Al(OH)₃ นำมาละลายใน CH₃COOH พอดี เจือจางด้วยน้ำ และหยด Catechol violet ได้สารละลายสีน้ำเงิน",
    controlSteps: [
      {
        step: "เริ่มต้น",
        action: "สารละลาย 0.1 M Al(NO₃)₃ 1 mL",
        observation: "สารละลายใสไม่มีสี (ใน NaOH มากเกินพอเป็น [Al(OH)₄]⁻ ใสไม่มีสี)",
        equation: "Al³⁺(aq) + 4OH⁻(aq) → [Al(OH)₄]⁻(aq) (สารละลายใสไม่มีสี)",
        liquidColor: "rgba(226, 232, 240, 0.18)",
        ppt: null,
        pH: "basic"
      },
      {
        step: "(i) หยด 6 M CH₃COOH จนเป็นกรด แล้วหยด 6 M NH₃ จนเป็นเบส + 0.5 mL",
        action: "ปรับเป็นกรดด้วย 6 M CH₃COOH แล้วเติม 6 M NH₃ จนเป็นเบส + 0.5 mL คน 1 นาที เซนตริฟิวจ์",
        observation: "เกิดตะกอนวุ้นสีขาวของ Al(OH)₃(s)",
        equation: "Al³⁺(aq) + 3NH₃(aq) + 3H₂O(l) → Al(OH)₃(s)↓ (ตะกอนวุ้นขาว) + 3NH₄⁺(aq)",
        liquidColor: "rgba(226, 232, 240, 0.22)",
        ppt: { color: "rgba(248, 250, 252, 0.85)", border: "#94a3b8", label: "Al(OH)₃(s) ตะกอนวุ้นขาว", amount: 0.36, style: "gelatinous" },
        pH: "ammoniacal"
      },
      {
        step: "(ii) ล้างตะกอนด้วยน้ำกลั่น 1 mL และละลายใน 6 M CH₃COOH พอดี",
        action: "ล้างตะกอนวุ้นด้วยน้ำกลั่น 1 mL เซนตริฟิวจ์ แล้วหยด 6 M CH₃COOH ทีละหยดจนละลายพอดี เติมน้ำกลั่น 1 mL",
        observation: "ตะกอนวุ้นขาวละลายหมด ได้สารละลายใสไม่มีสีของ Al³⁺",
        equation: "Al(OH)₃(s) + 3H⁺(aq) → Al³⁺(aq) + 3H₂O(l)",
        liquidColor: "rgba(226, 232, 240, 0.18)",
        ppt: null,
        pH: "weak_acidic"
      },
      {
        step: "(iii) หยด Catechol violet 2 หยด",
        action: "หยดอินดิเคเตอร์ Catechol violet 2 หยดลงในสารละลาย",
        observation: "สารละลายเปลี่ยนเป็นสีน้ำเงิน (Al³⁺-catechol violet complex)",
        equation: "Al³⁺(aq) + Catechol violet(aq) → [Al(Catechol violet)] complex (สารละลายสีน้ำเงิน)",
        liquidColor: "rgba(37, 99, 235, 0.78)",
        ppt: null,
        pH: "weak_acidic"
      }
    ]
  },

  "Zn2+": {
    id: "Zn2+",
    symbol: "Zn²⁺",
    name: "Zinc(II) ion",
    thaiName: "ซิงค์(II) ไอออน",
    group: 3,
    groupName: "กลุ่มที่ 3 & 4 ([Zn(OH)₄]²⁻ และ [Zn(NH₃)₄]²⁺)",
    inExam5: false,
    initialSolutionColor: "rgba(226, 232, 240, 0.18)",
    initialColorDesc: "ใสไม่มีสี (0.1 M Zn(NO₃)₂)",
    badgeColor: "from-cyan-400 to-teal-600",
    summary: "ละลายใน NaOH มากเกินพอเป็น [Zn(OH)₄]²⁻ และใน NH₃ มากเกินพอเป็น [Zn(NH₃)₄]²⁺ เมื่อปรับให้เป็นกรดด้วย 6 M HCl แล้วหยด 0.2 M K₄[Fe(CN)₆] จะได้ตะกอนสีขาว/เขียวอ่อน K₂Zn₃[Fe(CN)₆]₂ ซึ่งละลายได้ใน 6 M NaOH",
    controlSteps: [
      {
        step: "เริ่มต้น",
        action: "สารละลาย 0.1 M Zn(NO₃)₂ 1 mL",
        observation: "สารละลายใสไม่มีสี (ใน NaOH มากเกินพอได้ [Zn(OH)₄]²⁻ ใสไม่มีสี)",
        equation: "Zn²⁺(aq) + 4OH⁻(aq) → [Zn(OH)₄]²⁻(aq) (สารละลายใสไม่มีสี)",
        liquidColor: "rgba(226, 232, 240, 0.18)",
        ppt: null,
        pH: "basic"
      },
      {
        step: "(i) ปรับด้วย 6 M CH₃COOH แล้วเติม 6 M NH₃ จนเป็นเบส + 0.5 mL",
        action: "หยด 6 M NH₃ จนเป็นเบส + 0.5 mL มากเกินพอ",
        observation: "ได้สารละลายใสไม่มีสีของไอออนเชิงซ้อน [Zn(NH₃)₄]²⁺ (ไม่เกิดตะกอนเหมือน Al³⁺)",
        equation: "Zn²⁺(aq) + 4NH₃(aq) → [Zn(NH₃)₄]²⁺(aq) (สารละลายใสไม่มีสี)",
        liquidColor: "rgba(226, 232, 240, 0.20)",
        ppt: null,
        pH: "ammoniacal"
      },
      {
        step: "(ii) หยด 6 M HCl จนเป็นกรด + 0.2 M K₄[Fe(CN)₆] 3 หยด",
        action: "หยด 6 M HCl จนสารละลายมีฤทธิ์เป็นกรด แล้วเติม 0.2 M K₄[Fe(CN)₆] 3 หยด เขย่า",
        observation: "เกิดตะกอนสีขาวหรือเขียวอ่อนของ K₂Zn₃[Fe(CN)₆]₂(s)",
        equation: "3Zn²⁺(aq) + 2K⁺(aq) + 2[Fe(CN)₆]⁴⁻(aq) → K₂Zn₃[Fe(CN)₆]₂(s)↓ (ตะกอนขาว/เขียวอ่อน)",
        liquidColor: "rgba(220, 252, 231, 0.25)",
        ppt: { color: "#d9f99d", border: "#84cc16", label: "K₂Zn₃[Fe(CN)₆]₂(s) ตะกอนขาวเขียวอ่อน", amount: 0.36, style: "dense" },
        pH: "acidic"
      },
      {
        step: "(iii) ละลายตะกอนใน 6 M NaOH",
        action: "เติม 6 M NaOH ลงในตะกอน K₂Zn₃[Fe(CN)₆]₂",
        observation: "ตะกอนละลายหมด ได้สารละลายใส",
        equation: "K₂Zn₃[Fe(CN)₆]₂(s) + 12OH⁻(aq) → 2[Fe(CN)₆]⁴⁻(aq) + 3[Zn(OH)₄]²⁻(aq) + 2K⁺(aq)",
        liquidColor: "rgba(254, 249, 195, 0.22)",
        ppt: null,
        pH: "basic"
      }
    ]
  }
};

// ============================================================================
// REAGENT CATALOG FOR THE VIRTUAL LAB BENCH
// ============================================================================
window.REAGENT_CATALOG = [
  {
    id: "HCl_6M",
    name: "6 M HCl",
    sub: "กรดไฮโดรคลอริก",
    category: "acid_base",
    dropColor: "#e2e8f0",
    bottleColor: "border-rose-500/40 bg-rose-950/30 text-rose-200",
    desc: "ตกตะกอนแคทไอออนกลุ่มที่ 1 (AgCl, PbCl₂, Hg₂Cl₂) / ปรับสภาพเป็นกรด / ละลายตะกอนไฮดรอกไซด์"
  },
  {
    id: "HNO3_6M",
    name: "6 M HNO₃",
    sub: "กรดไนตริก",
    category: "acid_base",
    dropColor: "#e2e8f0",
    bottleColor: "border-orange-500/40 bg-orange-950/30 text-orange-200",
    desc: "ปรับเป็นกรดเพื่อตกตะกอน AgCl กลับคืน / ละลายตะกอนกลุ่มที่ 2 ร่วมกับ HCl / ละลายตะกอน BaCrO₄"
  },
  {
    id: "CH3COOH_6M",
    name: "6 M CH₃COOH",
    sub: "กรดแอซีติก",
    category: "acid_base",
    dropColor: "#e2e8f0",
    bottleColor: "border-amber-500/40 bg-amber-950/30 text-amber-200",
    desc: "ปรับสารละลายตอนที่ 4 ให้เป็นกรดอ่อน และใช้ละลายตะกอนวุ้น Al(OH)₃ พอดี"
  },
  {
    id: "NaOH_6M",
    name: "6 M NaOH",
    sub: "โซเดียมไฮดรอกไซด์",
    category: "acid_base",
    dropColor: "#e2e8f0",
    bottleColor: "border-sky-500/40 bg-sky-950/30 text-sky-200",
    desc: "ตกตะกอนไฮดรอกไซด์กลุ่มที่ 2 (Ni²⁺, Fe³⁺, Mn²⁺) / ละลายกลุ่มที่ 3 ([Al(OH)₄]⁻, [Zn(OH)₄]²⁻) / ละลาย PbCrO₄"
  },
  {
    id: "NH3_6M",
    name: "6 M NH₃",
    sub: "แอมโมเนีย 6 M",
    category: "acid_base",
    dropColor: "#e2e8f0",
    bottleColor: "border-indigo-500/40 bg-indigo-950/30 text-indigo-200",
    desc: "ละลายตะกอน AgCl เป็น [Ag(NH₃)₂]⁺ / ทำปฏิกิริยากับ Hg₂Cl₂ ได้ตะกอนเทาดำ / ตกตะกอน Al(OH)₃ ในตอนที่ 4"
  },
  {
    id: "NH4Cl_NH3_15M",
    name: "4 M NH₄Cl + 15 M NH₃",
    sub: "บัฟเฟอร์แอมโมเนียเข้มข้น",
    category: "acid_base",
    dropColor: "#e2e8f0",
    bottleColor: "border-blue-500/40 bg-blue-950/30 text-blue-200",
    desc: "เปลี่ยน Ni²⁺ เป็นสารละลายเชิงซ้อนสีน้ำเงิน [Ni(NH₃)₆]²⁺ ขณะที่ Fe³⁺ และ Mn²⁺ ตกตะกอน"
  },
  {
    id: "H2O2_3pct",
    name: "3% H₂O₂",
    sub: "ไฮโดรเจนเปอร์ออกไซด์",
    category: "redox",
    dropColor: "#e2e8f0",
    bottleColor: "border-cyan-500/40 bg-cyan-950/30 text-cyan-200",
    desc: "ออกซิไดส์ Mn(OH)₂ เป็น MnO₂·xH₂O (ตะกอนดำ) / ออกซิไดส์ [Cr(OH)₄]⁻ เป็น CrO₄²⁻ (เหลือง) / ทดสอบ CrO₅ (น้ำเงิน)"
  },
  {
    id: "K2CrO4",
    name: "0.1 M K₂CrO₄",
    sub: "โพแทสเซียมโครเมต",
    category: "specific",
    dropColor: "#facc15",
    bottleColor: "border-yellow-500/50 bg-yellow-950/40 text-yellow-200",
    desc: "ทดสอบ Pb²⁺ ได้ตะกอนสีเหลืองสดของ PbCrO₄(s)"
  },
  {
    id: "DMG",
    name: "DMG (Dimethylglyoxime)",
    sub: "ไดเมทิลไกลออกซีม",
    category: "specific",
    dropColor: "#f8fafc",
    bottleColor: "border-pink-500/50 bg-pink-950/40 text-pink-200",
    desc: "ทดสอบ [Ni(NH₃)₆]²⁺ ในสภาวะเบส ได้ตะกอนสีแดงชมพูสดของ Ni(DMG)₂(s)"
  },
  {
    id: "KSCN",
    name: "1.0 M KSCN",
    sub: "โพแทสเซียมไทโอไซยาเนต",
    category: "specific",
    dropColor: "#f8fafc",
    bottleColor: "border-red-500/50 bg-red-950/40 text-red-200",
    desc: "ทดสอบ Fe³⁺ (หลอดที่ 1) ได้สารละลายสีแดงเลือดนกของ [Fe(SCN)]²⁺"
  },
  {
    id: "K4FeCN6",
    name: "K₄[Fe(CN)₆]",
    sub: "โพแทสเซียมเฮกซะไซยาโนเฟอร์เรต(II)",
    category: "specific",
    dropColor: "#fef08a",
    bottleColor: "border-blue-400/50 bg-blue-950/40 text-blue-200",
    desc: "ทดสอบ Fe³⁺ ได้ตะกอนสีน้ำเงินเข้ม KFe[Fe(CN)₆] / ทดสอบ Zn²⁺ ในกรดได้ตะกอนขาวเขียวอ่อน K₂Zn₃[Fe(CN)₆]₂"
  },
  {
    id: "NaBiO3",
    name: "NaBiO₃ (ของแข็ง)",
    sub: "โซเดียมบิสมัทเทต",
    category: "specific",
    dropColor: "#a8a29e",
    bottleColor: "border-purple-500/50 bg-purple-950/40 text-purple-200",
    desc: "ออกซิไดส์ Mn²⁺ ในกรด HNO₃ อุ่น ได้สารละลายสีม่วงแดงของ MnO₄⁻"
  },
  {
    id: "BaCl2",
    name: "1.0 M BaCl₂",
    sub: "แบเรียมคลอไรด์",
    category: "specific",
    dropColor: "#f8fafc",
    bottleColor: "border-lime-500/40 bg-lime-950/30 text-lime-200",
    desc: "ตกตะกอน CrO₄²⁻ ในตอนที่ 4 ได้ตะกอนสีเหลืองของ BaCrO₄(s)"
  },
  {
    id: "CatecholViolet",
    name: "Catechol Violet",
    sub: "คาเทคอลไวโอเลต",
    category: "specific",
    dropColor: "#c084fc",
    bottleColor: "border-violet-500/40 bg-violet-950/30 text-violet-200",
    desc: "ทดสอบ Al³⁺ (หลังจากละลาย Al(OH)₃ ใน CH₃COOH และเจือจางด้วยน้ำ) ได้สารละลายสีน้ำเงิน"
  }
];

// ============================================================================
// SOLID UNKNOWN SOLUBILITY PRESETS (ส่วนที่ 2: การเลือกตัวทำละลาย หน้า 103 & สไลด์ 34)
// ============================================================================
window.SOLID_UNKNOWNS = [
  {
    code: "SOLID-A1",
    cation: "Ag+",
    saltFormula: "AgNO₃(s)",
    appearance: "ผลึกของแข็งสีขาว",
    solubleIn: "H2O_RT",
    solubilityNotes: {
      H2O_RT: { dissolved: true, obs: "ของแข็งละลายหมดทันที ได้สารละลายใสไม่มีสี (ใช้ น้ำ เป็นตัวทำละลายได้ทันที ไม่ต้องทดสอบ HCl/HNO₃)", color: "rgba(226, 232, 240, 0.18)", ppt: null },
      H2O_HOT: { dissolved: true, obs: "ละลายหมด ได้สารละลายใสไม่มีสี", color: "rgba(226, 232, 240, 0.18)", ppt: null },
      HCl_RT: { dissolved: false, obs: "ไม่ละลาย และเกิดตะกอนขาวขุ่นของ AgCl(s) ทันทีเพราะทำปฏิกิริยากับ Cl⁻!", color: "rgba(226, 232, 240, 0.25)", ppt: "#f8fafc" },
      HCl_HOT: { dissolved: false, obs: "ไม่ละลาย (ตะกอนขาว AgCl ไม่ละลายในกรด HCl ร้อน)", color: "rgba(226, 232, 240, 0.25)", ppt: "#f8fafc" },
      HNO3_RT: { dissolved: true, obs: "ละลายหมด ได้สารละลายใสไม่มีสี", color: "rgba(226, 232, 240, 0.18)", ppt: null },
      HNO3_HOT: { dissolved: true, obs: "ละลายหมด ได้สารละลายใสไม่มีสี", color: "rgba(226, 232, 240, 0.18)", ppt: null }
    }
  },
  {
    code: "SOLID-B2",
    cation: "Pb2+",
    saltFormula: "PbCO₃(s) / เกลือเลดที่ไม่ละลายน้ำ",
    appearance: "ผงของแข็งสีขาว",
    solubleIn: "HNO3_RT",
    solubilityNotes: {
      H2O_RT: { dissolved: false, obs: "ไม่ละลายในน้ำที่อุณหภูมิห้อง ของแข็งสีขาวนอนก้นหลอด", color: "rgba(226, 232, 240, 0.18)", ppt: "#f8fafc" },
      H2O_HOT: { dissolved: false, obs: "นำไปอุ่นในน้ำเดือด 2–3 นาทีแล้ว ยังไม่ละลาย ต้องเปลี่ยนตัวทำละลายถัดไป", color: "rgba(226, 232, 240, 0.18)", ppt: "#f8fafc" },
      HCl_RT: { dissolved: false, obs: "ไม่ละลายใน 2.0 M HCl ที่อุณหภูมิห้อง (เกิดตะกอนขาว PbCl₂ เคลือบผิว)", color: "rgba(226, 232, 240, 0.20)", ppt: "#f8fafc" },
      HCl_HOT: { dissolved: false, obs: "ละลายได้บางส่วนเมื่อร้อนแต่ตกตะกอนขาวเมื่อเย็นลง จึงควรเปลี่ยนเป็น 2.0 M HNO₃", color: "rgba(226, 232, 240, 0.20)", ppt: "#f8fafc" },
      HNO3_RT: { dissolved: true, obs: "ละลายหมดใน 2.0 M HNO₃ พร้อมเกิดฟองแก๊ส CO₂ เล็กน้อย ได้สารละลายใสไม่มีสี!", color: "rgba(226, 232, 240, 0.18)", ppt: null },
      HNO3_HOT: { dissolved: true, obs: "ละลายหมดอย่างสมบูรณ์ ได้สารละลายใสไม่มีสี", color: "rgba(226, 232, 240, 0.18)", ppt: null }
    }
  },
  {
    code: "SOLID-C3",
    cation: "Ni2+",
    saltFormula: "Ni(NO₃)₂·6H₂O(s)",
    appearance: "ผลึกสีเขียวสด",
    solubleIn: "H2O_RT",
    solubilityNotes: {
      H2O_RT: { dissolved: true, obs: "ละลายหมดในน้ำกลั่นทันที ได้สารละลายใสสีเขียวอ่อน (ไม่ต้องทดสอบตัวทำละลายอื่นต่อ)", color: "rgba(74, 222, 128, 0.38)", ppt: null },
      H2O_HOT: { dissolved: true, obs: "ละลายหมด ได้สารละลายใสสีเขียวอ่อน", color: "rgba(74, 222, 128, 0.38)", ppt: null },
      HCl_RT: { dissolved: true, obs: "ละลายหมด ได้สารละลายใสสีเขียวอ่อน", color: "rgba(74, 222, 128, 0.38)", ppt: null },
      HCl_HOT: { dissolved: true, obs: "ละลายหมด ได้สารละลายใสสีเขียวอ่อน", color: "rgba(74, 222, 128, 0.38)", ppt: null },
      HNO3_RT: { dissolved: true, obs: "ละลายหมด ได้สารละลายใสสีเขียวอ่อน", color: "rgba(74, 222, 128, 0.38)", ppt: null },
      HNO3_HOT: { dissolved: true, obs: "ละลายหมด ได้สารละลายใสสีเขียวอ่อน", color: "rgba(74, 222, 128, 0.38)", ppt: null }
    }
  },
  {
    code: "SOLID-D4",
    cation: "Mn2+",
    saltFormula: "MnCO₃(s)",
    appearance: "ผงสีขาวอมชมพูอ่อน/ครีม",
    solubleIn: "HCl_RT",
    solubilityNotes: {
      H2O_RT: { dissolved: false, obs: "ไม่ละลายในน้ำที่อุณหภูมิห้อง", color: "rgba(226, 232, 240, 0.18)", ppt: "#f5f5f4" },
      H2O_HOT: { dissolved: false, obs: "อุ่นในน้ำเดือด 2–3 นาทีแล้วยังไม่ละลาย ให้เปลี่ยนตัวทำละลายเป็น 2.0 M HCl", color: "rgba(226, 232, 240, 0.18)", ppt: "#f5f5f4" },
      HCl_RT: { dissolved: true, obs: "ละลายหมดใน 2.0 M HCl ได้สารละลายใสเกือบไม่มีสี (ชมพูจางมาก) ใช้เป็นสารละลายตัวอย่างได้ทันที!", color: "rgba(251, 207, 232, 0.22)", ppt: null },
      HCl_HOT: { dissolved: true, obs: "ละลายหมดอย่างรวดเร็ว ได้สารละลายใส", color: "rgba(251, 207, 232, 0.22)", ppt: null },
      HNO3_RT: { dissolved: true, obs: "ละลายหมดใน 2.0 M HNO₃", color: "rgba(251, 207, 232, 0.22)", ppt: null },
      HNO3_HOT: { dissolved: true, obs: "ละลายหมดใน 2.0 M HNO₃", color: "rgba(251, 207, 232, 0.22)", ppt: null }
    }
  },
  {
    code: "SOLID-E5",
    cation: "Fe3+",
    saltFormula: "Fe₂O₃ / Fe(OH)₃(s)",
    appearance: "ผงของแข็งสีน้ำตาลแดง",
    solubleIn: "HCl_HOT",
    solubilityNotes: {
      H2O_RT: { dissolved: false, obs: "ไม่ละลายในน้ำกลั่นที่อุณหภูมิห้อง", color: "rgba(226, 232, 240, 0.18)", ppt: "#9a3412" },
      H2O_HOT: { dissolved: false, obs: "อุ่นในถ้วยน้ำเดือด 2–3 นาทีแล้วไม่ละลาย เปลี่ยนตัวทำละลายเป็น 2.0 M HCl", color: "rgba(226, 232, 240, 0.18)", ppt: "#9a3412" },
      HCl_RT: { dissolved: false, obs: "ละลายได้ช้ามากที่อุณหภูมิห้อง แนะนำให้นำไปอุ่นในถ้วยน้ำเดือด 2–3 นาที", color: "rgba(250, 204, 21, 0.22)", ppt: "#9a3412" },
      HCl_HOT: { dissolved: true, obs: "เมื่ออุ่นใน 2.0 M HCl ตะกอนละลายหมด ได้สารละลายใสสีเหลืองของ Fe³⁺!", color: "rgba(250, 204, 21, 0.48)", ppt: null },
      HNO3_RT: { dissolved: false, obs: "ละลายได้ช้าที่อุณหภูมิห้อง", color: "rgba(250, 204, 21, 0.20)", ppt: "#9a3412" },
      HNO3_HOT: { dissolved: true, obs: "ละลายหมดเมื่ออุ่นใน 2.0 M HNO₃ ได้สารละลายสีเหลือง", color: "rgba(250, 204, 21, 0.45)", ppt: null }
    }
  }
];

// ============================================================================
// DYNAMIC TEST TUBE SIMULATION ENGINE
// ============================================================================
class VirtualTube {
  constructor(config = {}) {
    this.id = config.id || "tube-" + Math.random().toString(36).slice(2, 7);
    this.name = config.name || "หลอดที่ 1";
    this.subtitle = config.subtitle || "สารละลายตัวอย่าง (1 mL)";
    // Aqueous species present in solution
    this.aq = new Set(config.aq || []);
    // Solid precipitates present in tube: array of { id, formula, label, color, border, style, amount }
    this.ppts = config.ppts ? JSON.parse(JSON.stringify(config.ppts)) : [];
    // Chemical environment
    this.pH = config.pH || "neutral"; // 'acidic', 'weak_acidic', 'neutral', 'basic', 'ammoniacal'
    this.acidType = config.acidType || "none"; // 'HCl', 'HNO3', 'aqua_regia', 'CH3COOH'
    this.hasCl = Boolean(config.hasCl);
    this.hasH2O2 = Boolean(config.hasH2O2);
    this.hasCrO4Reagent = Boolean(config.hasCrO4Reagent);
    this.temperature = config.temperature || "rt"; // 'rt' | 'hot'
    this.centrifuged = Boolean(config.centrifuged);
    this.washed = Boolean(config.washed);
    this.bubbles = Boolean(config.bubbles);
    this.volume = config.volume || 1.0; // mL
    this.logs = config.logs ? [...config.logs] : [];
    this.lastEquation = config.lastEquation || "";
    this.lastObservation = config.lastObservation || "สารละลายเริ่มต้นพร้อมทำการทดลอง";
  }

  clone(newName, newSubtitle) {
    return new VirtualTube({
      name: newName || this.name + " (แบ่ง)",
      subtitle: newSubtitle || this.subtitle,
      aq: Array.from(this.aq),
      ppts: this.ppts,
      pH: this.pH,
      acidType: this.acidType,
      hasCl: this.hasCl,
      hasH2O2: this.hasH2O2,
      hasCrO4Reagent: this.hasCrO4Reagent,
      temperature: this.temperature,
      centrifuged: this.centrifuged,
      washed: this.washed,
      bubbles: false,
      volume: Math.max(0.5, +(this.volume / 2).toFixed(1)),
      logs: [...this.logs],
      lastEquation: this.lastEquation,
      lastObservation: this.lastObservation
    });
  }

  hasPpt(id) {
    return this.ppts.some(p => p.id === id);
  }

  addPpt(pptObj) {
    const existing = this.ppts.find(p => p.id === pptObj.id);
    if (!existing) {
      this.ppts.push(pptObj);
    }
    this.centrifuged = false;
  }

  removePpt(id) {
    this.ppts = this.ppts.filter(p => p.id !== id);
  }

  // Compute realistic liquid color based on aqueous species
  getLiquidColor() {
    if (this.aq.has("[Fe(SCN)]2+")) return "rgba(153, 27, 27, 0.94)"; // Blood red
    if (this.aq.has("MnO4-")) return "rgba(162, 28, 175, 0.86)"; // Permanganate purple-red
    if (this.aq.has("CrO5_blue")) return "rgba(29, 78, 216, 0.85)"; // Deep blue CrO5
    if (this.aq.has("Al_CV_complex")) return "rgba(37, 99, 235, 0.82)"; // Catechol violet + Al3+ blue
    if (this.aq.has("[Ni(NH3)6]2+")) return "rgba(59, 130, 246, 0.68)"; // Royal blue-violet
    if (this.aq.has("Cr2O7_2-")) return "rgba(249, 115, 22, 0.72)"; // Orange dichromate
    if (this.aq.has("CrO4_2-") || this.hasCrO4Reagent) return "rgba(250, 204, 21, 0.65)"; // Bright yellow chromate
    if (this.aq.has("[Cr(OH)4]-")) return "rgba(34, 197, 94, 0.50)"; // Deep green chromite
    if (this.aq.has("Fe3+") && this.aq.has("Ni2+")) return "rgba(163, 230, 53, 0.45)"; // Yellow + Green
    if (this.aq.has("Fe3+")) return "rgba(250, 204, 21, 0.48)"; // Yellow Fe3+
    if (this.aq.has("Cr3+")) return "rgba(20, 184, 166, 0.48)"; // Blue-green Cr3+
    if (this.aq.has("Ni2+")) return "rgba(74, 222, 128, 0.38)"; // Pale green Ni2+
    if (this.aq.has("Mn2+")) return "rgba(251, 207, 232, 0.22)"; // Very pale pink Mn2+
    if (this.aq.has("CatecholViolet_free")) return "rgba(168, 85, 247, 0.38)"; // Violet-amber indicator
    return "rgba(226, 232, 240, 0.18)"; // Colorless
  }

  // Apply a reagent or action to this test tube and return { obs, eq, type }
  applyReagent(reagentId) {
    this.bubbles = false;
    let observations = [];
    let equations = [];
    this.volume = Math.min(4.0, +(this.volume + 0.3).toFixed(1));

    // ------------------------------------------------------------------------
    // 1. 6 M HCl
    // ------------------------------------------------------------------------
    if (reagentId === "HCl_6M") {
      this.hasCl = true;
      this.pH = "acidic";
      this.acidType = this.acidType === "HNO3" ? "aqua_regia" : "HCl";

      // Re-precipitate [Ag(NH3)2]+ if present
      if (this.aq.has("[Ag(NH3)2]+")) {
        this.aq.delete("[Ag(NH3)2]+");
        this.addPpt({ id: "AgCl", formula: "AgCl(s)", label: "AgCl(s) ตะกอนขาว", color: "#f8fafc", border: "#cbd5e1", style: "curdy" });
        observations.push("เกิดตะกอนสีขาวของ AgCl(s) กลับคืนมาเมื่อสารละลายเป็นกรด");
        equations.push("[Ag(NH₃)₂]⁺(aq) + Cl⁻(aq) + 2H⁺(aq) → AgCl(s)↓ + 2NH₄⁺(aq)");
      }

      // Precipitate Group 1 cations (Ag+, Pb2+, Hg2_2+)
      if (this.aq.has("Ag+")) {
        this.aq.delete("Ag+");
        this.addPpt({ id: "AgCl", formula: "AgCl(s)", label: "AgCl(s) ตะกอนขาว", color: "#f8fafc", border: "#cbd5e1", style: "curdy" });
        observations.push("เกิดตะกอนสีขาวของ AgCl(s)");
        equations.push("Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓");
      }
      if (this.aq.has("Pb2+") && this.temperature !== "hot") {
        this.aq.delete("Pb2+");
        this.addPpt({ id: "PbCl2", formula: "PbCl₂(s)", label: "PbCl₂(s) ตะกอนขาว", color: "#f8fafc", border: "#cbd5e1", style: "crystalline" });
        observations.push("เกิดตะกอนสีขาวของ PbCl₂(s)");
        equations.push("Pb²⁺(aq) + 2Cl⁻(aq) → PbCl₂(s)↓");
      }
      if (this.aq.has("Hg2_2+")) {
        this.aq.delete("Hg2_2+");
        this.addPpt({ id: "Hg2Cl2", formula: "Hg₂Cl₂(s)", label: "Hg₂Cl₂(s) ตะกอนขาว", color: "#f8fafc", border: "#cbd5e1", style: "dense" });
        observations.push("เกิดตะกอนสีขาวของ Hg₂Cl₂(s)");
        equations.push("Hg₂²⁺(aq) + 2Cl⁻(aq) → Hg₂Cl₂(s)↓");
      }

      // Convert hydroxo / ammine complexes back to free ions in acid
      if (this.aq.has("[Zn(NH3)4]2+") || this.aq.has("[Zn(OH)4]2-")) {
        this.aq.delete("[Zn(NH3)4]2+");
        this.aq.delete("[Zn(OH)4]2-");
        this.aq.add("Zn2+");
        observations.push("สารละลายมีฤทธิ์เป็นกรด เปลี่ยนสารเชิงซ้อนซิงค์เป็น Zn²⁺(aq)");
        equations.push("[Zn(NH₃)₄]²⁺(aq) + 4H⁺(aq) → Zn²⁺(aq) + 4NH₄⁺(aq)");
      }
      if (this.aq.has("[Al(OH)4]-")) {
        this.aq.delete("[Al(OH)4]-");
        this.aq.add("Al3+");
        observations.push("เปลี่ยน [Al(OH)₄]⁻ เป็น Al³⁺(aq)");
        equations.push("[Al(OH)₄]⁻(aq) + 4H⁺(aq) → Al³⁺(aq) + 4H₂O(l)");
      }
      if (this.aq.has("[Ni(NH3)6]2+")) {
        this.aq.delete("[Ni(NH3)6]2+");
        this.aq.add("Ni2+");
        observations.push("สารละลายเปลี่ยนจากสีน้ำเงินกลับเป็นสีเขียวอ่อนของ Ni²⁺(aq)");
      }

      // Dissolve Group 2/3 hydroxide precipitates
      if (this.hasPpt("Fe(OH)3")) {
        this.removePpt("Fe(OH)3");
        this.aq.add("Fe3+");
        observations.push("ตะกอนสีน้ำตาลแดง Fe(OH)₃ ละลาย ได้สารละลายสีเหลืองของ Fe³⁺(aq)");
        equations.push("Fe(OH)₃(s) + 3H⁺(aq) → Fe³⁺(aq) + 3H₂O(l)");
      }
      if (this.hasPpt("Ni(OH)2")) {
        this.removePpt("Ni(OH)2");
        this.aq.add("Ni2+");
        observations.push("ตะกอนสีเขียว Ni(OH)₂ ละลาย ได้สารละลายสีเขียวอ่อนของ Ni²⁺(aq)");
        equations.push("Ni(OH)₂(s) + 2H⁺(aq) → Ni²⁺(aq) + 2H₂O(l)");
      }
      if (this.hasPpt("MnO2")) {
        this.removePpt("MnO2");
        this.aq.add("Mn2+");
        this.bubbles = true;
        observations.push("ตะกอนสีดำ MnO₂·xH₂O ละลายในกรด HCl ได้สารละลายใสของ Mn²⁺(aq) และแก๊ส Cl₂");
        equations.push("MnO₂·2H₂O(s) + 2Cl⁻(aq) + 4H⁺(aq) → Mn²⁺(aq) + 4H₂O(l) + Cl₂(g)↑");
      }
      if (this.hasPpt("Al(OH)3")) {
        this.removePpt("Al(OH)3");
        this.aq.add("Al3+");
        observations.push("ตะกอนวุ้นขาว Al(OH)₃ ละลายในกรด ได้ Al³⁺(aq)");
        equations.push("Al(OH)₃(s) + 3H⁺(aq) → Al³⁺(aq) + 3H₂O(l)");
      }

      if (observations.length === 0) {
        observations.push("ไม่เกิดตะกอนกับ 6 M HCl (ไม่มีแคทไอออนกลุ่มที่ 1 หรือตะกอนตกหมดแล้ว) สารละลายมีฤทธิ์เป็นกรด");
      }
    }

    // ------------------------------------------------------------------------
    // 2. 6 M HNO3
    // ------------------------------------------------------------------------
    else if (reagentId === "HNO3_6M") {
      this.pH = "acidic";
      this.acidType = this.acidType === "HCl" ? "aqua_regia" : "HNO3";

      if (this.aq.has("[Ag(NH3)2]+")) {
        this.aq.delete("[Ag(NH3)2]+");
        this.addPpt({ id: "AgCl", formula: "AgCl(s)", label: "AgCl(s) ตะกอนขาว", color: "#f8fafc", border: "#cbd5e1", style: "curdy" });
        observations.push("เกิดตะกอนสีขาวของ AgCl(s) กลับคืนมา! ยืนยันว่ามี Ag⁺");
        equations.push("[Ag(NH₃)₂]⁺(aq) + Cl⁻(aq) + 2H⁺(aq) → AgCl(s)↓ + 2NH₄⁺(aq)");
      }
      if (this.hasPpt("BaCrO4")) {
        this.removePpt("BaCrO4");
        this.aq.add("Cr2O7_2-");
        observations.push("ตะกอนเหลือง BaCrO₄ ละลายใน 6 M HNO₃ ได้สารละลายสีส้มของ Cr₂O₇²⁻(aq)");
        equations.push("2BaCrO₄(s) + 2H⁺(aq) → Cr₂O₇²⁻(aq) (สีส้ม) + 2Ba²⁺(aq) + H₂O(l)");
      }
      if (this.aq.has("CrO4_2-")) {
        this.aq.delete("CrO4_2-");
        this.aq.add("Cr2O7_2-");
        observations.push("สารละลายสีเหลือง CrO₄²⁻ เปลี่ยนเป็นสารละลายสีส้มของ Cr₂O₇²⁻ ในกรด");
        equations.push("2CrO₄²⁻(aq) + 2H⁺(aq) → Cr₂O₇²⁻(aq) + H₂O(l)");
      }
      if (this.hasPpt("Ni(OH)2")) {
        this.removePpt("Ni(OH)2");
        this.aq.add("Ni2+");
        observations.push("ตะกอนสีเขียว Ni(OH)₂ ละลายในกรด ได้ Ni²⁺(aq)");
        equations.push("Ni(OH)₂(s) + 2H⁺(aq) → Ni²⁺(aq) + 2H₂O(l)");
      }
      if (this.hasPpt("Fe(OH)3")) {
        this.removePpt("Fe(OH)3");
        this.aq.add("Fe3+");
        observations.push("ตะกอนสีน้ำตาลแดง Fe(OH)₃ ละลายในกรด ได้สารละลายสีเหลืองของ Fe³⁺(aq)");
        equations.push("Fe(OH)₃(s) + 3H⁺(aq) → Fe³⁺(aq) + 3H₂O(l)");
      }
      if (this.hasPpt("MnO2") && this.hasCl) {
        this.removePpt("MnO2");
        this.aq.add("Mn2+");
        this.bubbles = true;
        observations.push("ตะกอนสีดำ MnO₂·xH₂O ละลายในกรดผสม HCl + HNO₃ ได้สารละลายของ Mn²⁺(aq)");
        equations.push("MnO₂·2H₂O(s) + 2Cl⁻(aq) + 4H⁺(aq) → Mn²⁺(aq) + 4H₂O(l) + Cl₂(g)↑");
      }

      if (observations.length === 0) {
        observations.push("ปรับสภาพสารละลายให้มีฤทธิ์เป็นกรดด้วย 6 M HNO₃");
      }
    }

    // ------------------------------------------------------------------------
    // 3. 6 M CH3COOH
    // ------------------------------------------------------------------------
    else if (reagentId === "CH3COOH_6M") {
      this.pH = "weak_acidic";
      this.acidType = "CH3COOH";

      if (this.aq.has("[Al(OH)4]-")) {
        this.aq.delete("[Al(OH)4]-");
        this.aq.add("Al3+");
        observations.push("ปรับสารละลายเป็นกรดด้วย 6 M CH₃COOH: [Al(OH)₄]⁻ เปลี่ยนเป็น Al³⁺(aq)");
        equations.push("[Al(OH)₄]⁻(aq) + 4H⁺(aq) → Al³⁺(aq) + 4H₂O(l)");
      }
      if (this.aq.has("[Zn(OH)4]2-")) {
        this.aq.delete("[Zn(OH)4]2-");
        this.aq.add("Zn2+");
        observations.push("ปรับสารละลายเป็นกรดด้วย 6 M CH₃COOH: [Zn(OH)₄]²⁻ เปลี่ยนเป็น Zn²⁺(aq)");
        equations.push("[Zn(OH)₄]²⁻(aq) + 4H⁺(aq) → Zn²⁺(aq) + 4H₂O(l)");
      }
      if (this.hasPpt("Al(OH)3")) {
        this.removePpt("Al(OH)3");
        this.aq.add("Al3+");
        observations.push("ตะกอนวุ้นขาว Al(OH)₃ ละลายพอดีใน 6 M CH₃COOH ได้สารละลายใสของ Al³⁺(aq) พร้อมทดสอบด้วย Catechol violet");
        equations.push("Al(OH)₃(s) + 3CH₃COOH(aq) → Al³⁺(aq) + 3CH₃COO⁻(aq) + 3H₂O(l)");
      }

      if (observations.length === 0) {
        observations.push("สารละลายมีฤทธิ์เป็นกรดอ่อนด้วย 6 M CH₃COOH");
      }
    }

    // ------------------------------------------------------------------------
    // 4. 6 M NaOH (Excess)
    // ------------------------------------------------------------------------
    else if (reagentId === "NaOH_6M") {
      this.pH = "basic";
      this.acidType = "none";

      // Group 2 Hydroxides precipitate
      if (this.aq.has("Ni2+") || this.aq.has("[Ni(NH3)6]2+")) {
        this.aq.delete("Ni2+");
        this.aq.delete("[Ni(NH3)6]2+");
        this.addPpt({ id: "Ni(OH)2", formula: "Ni(OH)₂(s)", label: "Ni(OH)₂(s) ตะกอนเขียว", color: "#4ade80", border: "#16a34a", style: "gelatinous" });
        observations.push("เกิดตะกอนสีเขียวของ Ni(OH)₂(s)");
        equations.push("Ni²⁺(aq) + 2OH⁻(aq) → Ni(OH)₂(s)↓ (ตะกอนเขียว)");
      }
      if (this.aq.has("Fe3+")) {
        this.aq.delete("Fe3+");
        this.addPpt({ id: "Fe(OH)3", formula: "Fe(OH)₃(s)", label: "Fe(OH)₃(s) ตะกอนน้ำตาลแดง", color: "#9a3412", border: "#7c2d12", style: "gelatinous" });
        observations.push("เกิดตะกอนสีน้ำตาลแดงของ Fe(OH)₃(s)");
        equations.push("Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s)↓ (ตะกอนน้ำตาลแดง)");
      }
      if (this.aq.has("Mn2+")) {
        this.aq.delete("Mn2+");
        if (this.hasH2O2) {
          this.addPpt({ id: "MnO2", formula: "MnO₂·xH₂O(s)", label: "MnO₂·xH₂O(s) ตะกอนดำ", color: "#1c1917", border: "#44403c", style: "dense" });
          observations.push("เกิดตะกอนสีดำของ MnO₂·xH₂O(s)");
          equations.push("Mn²⁺(aq) + 2OH⁻(aq) + H₂O₂(aq) → MnO₂·2H₂O(s)↓ (ตะกอนดำ)");
        } else {
          this.addPpt({ id: "Mn(OH)2", formula: "Mn(OH)₂(s)", label: "Mn(OH)₂(s) ตะกอนสีครีม", color: "#fef3c7", border: "#d97706", style: "gelatinous" });
          observations.push("เกิดตะกอนสีครีมของ Mn(OH)₂(s) (เมื่อเติม 3% H₂O₂ หรือถูกออกซิไดส์จะเปลี่ยนเป็นตะกอนสีดำ MnO₂·xH₂O)");
          equations.push("Mn²⁺(aq) + 2OH⁻(aq) → Mn(OH)₂(s)↓ (ตะกอนสีครีม)");
        }
      }

      // Group 3 Hydroxo complexes
      if (this.aq.has("Al3+") || this.hasPpt("Al(OH)3")) {
        this.aq.delete("Al3+");
        this.removePpt("Al(OH)3");
        this.aq.add("[Al(OH)4]-");
        observations.push("Al³⁺ เกิดสารเชิงซ้อนไฮดรอกโซ [Al(OH)₄]⁻(aq) ได้สารละลายใสไม่มีสี");
        equations.push("Al³⁺(aq) + 4OH⁻(aq) → [Al(OH)₄]⁻(aq)");
      }
      if (this.aq.has("Zn2+") || this.aq.has("[Zn(NH3)4]2+")) {
        this.aq.delete("Zn2+");
        this.aq.delete("[Zn(NH3)4]2+");
        this.aq.add("[Zn(OH)4]2-");
        observations.push("Zn²⁺ เกิดสารเชิงซ้อนไฮดรอกโซ [Zn(OH)₄]²⁻(aq) ได้สารละลายใสไม่มีสี");
        equations.push("Zn²⁺(aq) + 4OH⁻(aq) → [Zn(OH)₄]²⁻(aq)");
      }
      if (this.aq.has("Cr3+")) {
        this.aq.delete("Cr3+");
        if (this.hasH2O2) {
          this.aq.add("CrO4_2-");
          observations.push("Cr³⁺ ถูกออกซิไดส์ในเบสได้สารละลายสีเหลืองของ CrO₄²⁻(aq)");
          equations.push("2Cr(OH)₃(s) + 3H₂O₂(aq) + 4OH⁻(aq) → 2CrO₄²⁻(aq) + 8H₂O(l)");
        } else {
          this.aq.add("[Cr(OH)4]-");
          observations.push("เกิดตะกอนเขียว Cr(OH)₃ แล้วละลายใน NaOH มากเกินพอได้สารละลายสีเขียวของ [Cr(OH)₄]⁻(aq)");
          equations.push("Cr(OH)₃(s) + OH⁻(aq) → [Cr(OH)₄]⁻(aq)");
        }
      }

      // Specific test reactions with NaOH
      if (this.hasPpt("PbCrO4")) {
        this.removePpt("PbCrO4");
        this.aq.add("[Pb(OH)4]2-");
        this.aq.add("CrO4_2-");
        observations.push("ตะกอนสีเหลือง PbCrO₄ ละลายหมดใน 6 M NaOH ได้สารละลายใสสีเหลือง! ยืนยันว่ามี Pb²⁺");
        equations.push("PbCrO₄(s) + 4OH⁻(aq) → [Pb(OH)₄]²⁻(aq) (ไม่มีสี) + CrO₄²⁻(aq) (สีเหลือง)");
      }
      if (this.hasPpt("K2Zn3[Fe(CN)6]2")) {
        this.removePpt("K2Zn3[Fe(CN)6]2");
        this.aq.add("[Zn(OH)4]2-");
        observations.push("ตะกอนสีขาว/เขียวอ่อน K₂Zn₃[Fe(CN)₆]₂ ละลายหมดใน 6 M NaOH! ยืนยันว่ามี Zn²⁺");
        equations.push("K₂Zn₃[Fe(CN)₆]₂(s) + 12OH⁻(aq) → 2[Fe(CN)₆]⁴⁻(aq) + 3[Zn(OH)₄]²⁻(aq) + 2K⁺(aq)");
      }

      if (observations.length === 0) {
        observations.push("สารละลายมีฤทธิ์เป็นเบสแก่ (กระดาษลิตมัสสีแดงเปลี่ยนเป็นสีน้ำเงิน)");
      }
    }

    // ------------------------------------------------------------------------
    // 5. 6 M NH3
    // ------------------------------------------------------------------------
    else if (reagentId === "NH3_6M") {
      this.pH = "ammoniacal";

      // Group 1 precipitates with NH3
      if (this.hasPpt("AgCl")) {
        this.removePpt("AgCl");
        this.aq.add("[Ag(NH3)2]+");
        this.hasCl = true;
        observations.push("ตะกอนสีขาว AgCl ละลายใน 6 M NH₃ ได้สารละลายใสไม่มีสีของ [Ag(NH₃)₂]⁺");
        equations.push("AgCl(s) + 2NH₃(aq) → [Ag(NH₃)₂]⁺(aq) + Cl⁻(aq)");
      }
      if (this.hasPpt("Hg2Cl2")) {
        this.removePpt("Hg2Cl2");
        this.addPpt({ id: "HgNH2Cl_Hg", formula: "HgNH₂Cl + Hg⁰", label: "HgNH₂Cl + Hg⁰ ตะกอนเทาดำ", color: "#3f3f46", border: "#18181b", style: "speckled" });
        observations.push("ตะกอนขาว Hg₂Cl₂ เปลี่ยนเป็นตะกอนสีเทา-ดำ ของ HgNH₂Cl(s) และ Hg⁰! ยืนยันว่ามี Hg₂²⁺");
        equations.push("Hg₂Cl₂(s) + 2NH₃(aq) → HgNH₂Cl(s)↓ (ขาว) + Hg⁰(l)↓ (ดำ) + NH₄⁺(aq) + Cl⁻(aq)");
      }

      // Group 3/4 in Part 4: Al3+ precipitates as white gelatinous Al(OH)3, Zn2+ forms [Zn(NH3)4]2+
      if (this.aq.has("Al3+")) {
        this.aq.delete("Al3+");
        this.addPpt({ id: "Al(OH)3", formula: "Al(OH)₃(s)", label: "Al(OH)₃(s) ตะกอนวุ้นขาว", color: "rgba(248, 250, 252, 0.88)", border: "#94a3b8", style: "gelatinous" });
        observations.push("เกิดตะกอนวุ้นสีขาวของ Al(OH)₃(s)");
        equations.push("Al³⁺(aq) + 3NH₃(aq) + 3H₂O(l) → Al(OH)₃(s)↓ (ตะกอนวุ้นขาว) + 3NH₄⁺(aq)");
      }
      if (this.aq.has("Zn2+")) {
        this.aq.delete("Zn2+");
        this.aq.add("[Zn(NH3)4]2+");
        observations.push("Zn²⁺ รวมกับ NH₃ มากเกินพอเกิดไอออนเชิงซ้อนใสไม่มีสีของ [Zn(NH₃)₄]²⁺(aq)");
        equations.push("Zn²⁺(aq) + 4NH₃(aq) → [Zn(NH₃)₄]²⁺(aq)");
      }
      if (this.aq.has("Cr2O7_2-")) {
        this.aq.delete("Cr2O7_2-");
        this.aq.add("CrO4_2-");
        observations.push("Cr₂O₇²⁻ เปลี่ยนกลับเป็นสารละลายสีเหลืองของ CrO₄²⁻ ในเบส");
      }
      if (this.aq.has("Ni2+")) {
        this.aq.delete("Ni2+");
        this.aq.add("[Ni(NH3)6]2+");
        observations.push("เกิดสารละลายเชิงซ้อนสีน้ำเงินของ [Ni(NH₃)₆]²⁺(aq)");
        equations.push("Ni²⁺(aq) + 6NH₃(aq) → [Ni(NH₃)₆]²⁺(aq)");
      }

      if (observations.length === 0) {
        observations.push("สารละลายมีฤทธิ์เป็นเบสด้วย 6 M NH₃");
      }
    }

    // ------------------------------------------------------------------------
    // 6. 4 M NH4Cl + 15 M NH3 (Part 3 separation of Ni2+ from Fe3+ & Mn2+)
    // ------------------------------------------------------------------------
    else if (reagentId === "NH4Cl_NH3_15M") {
      this.pH = "ammoniacal";

      if (this.aq.has("Ni2+")) {
        this.aq.delete("Ni2+");
        this.aq.add("[Ni(NH3)6]2+");
        observations.push("Ni²⁺ รวมกับ NH₃ เข้มข้นได้สารละลายเชิงซ้อนสีน้ำเงินของ [Ni(NH₃)₆]²⁺(aq)");
        equations.push("Ni²⁺(aq) + 6NH₃(aq) → [Ni(NH₃)₆]²⁺(aq) (สารละลายสีน้ำเงิน)");
      }
      if (this.aq.has("Fe3+")) {
        this.aq.delete("Fe3+");
        this.addPpt({ id: "Fe(OH)3", formula: "Fe(OH)₃(s)", label: "Fe(OH)₃(s) ตะกอนน้ำตาลแดง", color: "#9a3412", border: "#7c2d12", style: "gelatinous" });
        observations.push("Fe³⁺ ตกตะกอนสีน้ำตาลแดงของ Fe(OH)₃(s)");
        equations.push("Fe³⁺(aq) + 3NH₃(aq) + 3H₂O(l) → Fe(OH)₃(s)↓ + 3NH₄⁺(aq)");
      }
      if (this.aq.has("Mn2+")) {
        this.aq.delete("Mn2+");
        this.addPpt({ id: "MnO2", formula: "MnO₂·xH₂O(s)", label: "MnO₂·xH₂O(s) ตะกอนดำ", color: "#1c1917", border: "#44403c", style: "dense" });
        observations.push("Mn²⁺ ตกตะกอนสีดำของ MnO₂·xH₂O(s) (แนะนำให้เติม 3% H₂O₂ 1 mL ร่วมด้วยเพื่อให้ตกตะกอนสมบูรณ์)");
        equations.push("Mn²⁺(aq) + 2NH₃(aq) + 2H₂O(l) + H₂O₂(aq) → MnO₂·2H₂O(s)↓ + 2NH₄⁺(aq)");
      }

      if (observations.length === 0) {
        observations.push("เติมบัฟเฟอร์ 4 M NH₄Cl + 15 M NH₃ จนสารละลายมีฤทธิ์เป็นเบส");
      }
    }

    // ------------------------------------------------------------------------
    // 7. 3% H2O2
    // ------------------------------------------------------------------------
    else if (reagentId === "H2O2_3pct") {
      this.hasH2O2 = true;
      this.bubbles = true;

      if (this.hasPpt("Mn(OH)2") || (this.aq.has("Mn2+") && (this.pH === "basic" || this.pH === "ammoniacal"))) {
        this.removePpt("Mn(OH)2");
        this.aq.delete("Mn2+");
        this.addPpt({ id: "MnO2", formula: "MnO₂·xH₂O(s)", label: "MnO₂·xH₂O(s) ตะกอนดำ", color: "#1c1917", border: "#44403c", style: "dense" });
        observations.push("3% H₂O₂ ออกซิไดส์แมงกานีสในเบส ได้ตะกอนสีดำของ MnO₂·2H₂O(s)!");
        equations.push("Mn(OH)₂(s) + H₂O₂(aq) → MnO₂·2H₂O(s)↓ (ตะกอนสีดำ)");
      }
      if (this.aq.has("[Cr(OH)4]-") || (this.aq.has("Cr3+") && this.pH === "basic")) {
        this.aq.delete("[Cr(OH)4]-");
        this.aq.delete("Cr3+");
        this.aq.add("CrO4_2-");
        observations.push("3% H₂O₂ ออกซิไดส์ [Cr(OH)₄]⁻ (สีเขียว) เป็นสารละลายสีเหลืองสดของ CrO₄²⁻(aq)!");
        equations.push("2[Cr(OH)₄]⁻(aq) + 3H₂O₂(aq) + 2OH⁻(aq) → 2CrO₄²⁻(aq) (สีเหลือง) + 8H₂O(l)");
      }
      if (this.aq.has("Cr2O7_2-") && this.pH === "acidic") {
        this.aq.delete("Cr2O7_2-");
        this.aq.add("CrO5_blue");
        observations.push("เกิดสารละลายสีน้ำเงินเข้มของ CrO(O₂)₂ (chromium pentoxide, CrO₅) ซึ่งจางหายไปอย่างรวดเร็ว! ยืนยันว่ามี Cr³⁺");
        equations.push("Cr₂O₇²⁻(aq) + 2H⁺(aq) + 4H₂O₂(aq) → 2CrO(O₂)₂(aq) (สีน้ำเงิน) + 5H₂O(l)");
      }

      if (observations.length === 0) {
        observations.push("เติม 3% H₂O₂ 1 mL ลงในสารละลาย (เกิดฟองแก๊ส O₂ เล็กน้อย)");
      }
    }

    // ------------------------------------------------------------------------
    // 8. 0.1 M K2CrO4 (Lead confirmation test)
    // ------------------------------------------------------------------------
    else if (reagentId === "K2CrO4") {
      this.hasCrO4Reagent = true;
      if (this.aq.has("Pb2+")) {
        this.aq.delete("Pb2+");
        this.addPpt({ id: "PbCrO4", formula: "PbCrO₄(s)", label: "PbCrO₄(s) ตะกอนเหลือง", color: "#facc15", border: "#eab308", style: "dense" });
        observations.push("เกิดตะกอนสีเหลืองสดของ PbCrO₄(s)! (สามารถยืนยันต่อโดยแยกตะกอนมาละลายใน 6 M NaOH)");
        equations.push("Pb²⁺(aq) + CrO₄²⁻(aq) → PbCrO₄(s)↓ (ตะกอนสีเหลือง)");
      } else {
        observations.push("สารละลายมีสีเหลืองของ K₂CrO₄ แต่ไม่เกิดตะกอนเหลืองของ PbCrO₄");
      }
    }

    // ------------------------------------------------------------------------
    // 9. DMG (Dimethylglyoxime - Nickel confirmation test)
    // ------------------------------------------------------------------------
    else if (reagentId === "DMG") {
      if (this.aq.has("[Ni(NH3)6]2+") || (this.aq.has("Ni2+") && (this.pH === "ammoniacal" || this.pH === "basic"))) {
        this.aq.delete("[Ni(NH3)6]2+");
        this.aq.delete("Ni2+");
        this.addPpt({ id: "Ni(DMG)2", formula: "Ni(C₄H₇O₂N₂)₂(s)", label: "Ni(DMG)₂(s) ตะกอนสีแดง", color: "#e11d48", border: "#9f1239", style: "fluffy" });
        observations.push("เกิดตะกอนสีแดงชมพูสด (ตะกอนแดง) ของ Nickel dimethylglyoxime! ยืนยันว่ามี Ni²⁺");
        equations.push("[Ni(NH₃)₆]²⁺(aq) + 2C₄H₈O₂N₂(aq) + 4H₂O(l) → Ni(C₄H₇O₂N₂)₂(s)↓ (ตะกอนแดง) + 6NH₄⁺(aq) + 4OH⁻(aq)");
      } else if (this.aq.has("Ni2+")) {
        observations.push("มี Ni²⁺ อยู่แต่สารละลายยังไม่เป็นเบสแอมโมเนีย! ต้องเติม 4 M NH₄Cl + 15 M NH₃ จนเป็นเบสก่อนหยด DMG");
      } else {
        observations.push("ไม่เกิดตะกอนสีแดงเมื่อหยด DMG (ไม่มี Ni²⁺ ในหลอดนี้)");
      }
    }

    // ------------------------------------------------------------------------
    // 10. 1 M KSCN (Iron(III) confirmation test #1)
    // ------------------------------------------------------------------------
    else if (reagentId === "KSCN") {
      if (this.aq.has("Fe3+")) {
        this.aq.add("[Fe(SCN)]2+");
        observations.push("สารละลายเปลี่ยนเป็นสีแดงเลือดนกเข้มของ [Fe(SCN)]²⁺(aq)! ยืนยันว่ามี Fe³⁺");
        equations.push("Fe³⁺(aq) + SCN⁻(aq) → [Fe(SCN)]²⁺(aq) (สารละลายสีแดงเลือดนก)");
      } else if (this.hasPpt("Fe(OH)3")) {
        observations.push("Fe(OH)₃ ยังอยู่ในรูปตะกอน! ต้องละลายตะกอนใน 6 M HCl + 6 M HNO₃ ก่อนเติม KSCN");
      } else {
        observations.push("ไม่เกิดสารละลายสีแดงเลือดนก (ไม่มี Fe³⁺ ในสารละลายนี้)");
      }
    }

    // ------------------------------------------------------------------------
    // 11. K4[Fe(CN)6] (Iron(III) test #2 & Zinc test)
    // ------------------------------------------------------------------------
    else if (reagentId === "K4FeCN6") {
      if (this.aq.has("Fe3+")) {
        this.aq.delete("Fe3+");
        this.addPpt({ id: "KFe[Fe(CN)6]", formula: "KFe[Fe(CN)₆](s)", label: "KFe[Fe(CN)₆](s) ตะกอนน้ำเงิน", color: "#1e3a8a", border: "#172554", style: "dense" });
        observations.push("เกิดตะกอนสีน้ำเงินเข้ม (Prussian Blue) ของ KFe[Fe(CN)₆](s)! ยืนยันว่ามี Fe³⁺");
        equations.push("Fe³⁺(aq) + K⁺(aq) + [Fe(CN)₆]⁴⁻(aq) → KFe[Fe(CN)₆](s)↓ (ตะกอนสีน้ำเงิน)");
      } else if (this.aq.has("Zn2+") && (this.pH === "acidic" || this.pH === "weak_acidic" || this.pH === "neutral")) {
        this.aq.delete("Zn2+");
        this.addPpt({ id: "K2Zn3[Fe(CN)6]2", formula: "K₂Zn₃[Fe(CN)₆]₂(s)", label: "K₂Zn₃[Fe(CN)₆]₂ ตะกอนขาวเขียวอ่อน", color: "#d9f99d", border: "#84cc16", style: "dense" });
        observations.push("เกิดตะกอนสีขาวอมเขียวอ่อนของ K₂Zn₃[Fe(CN)₆]₂(s)! (ทดสอบต่อโดยละลายใน 6 M NaOH)");
        equations.push("3Zn²⁺(aq) + 2K⁺(aq) + 2[Fe(CN)₆]⁴⁻(aq) → K₂Zn₃[Fe(CN)₆]₂(s)↓");
      } else if (this.aq.has("[Zn(NH3)4]2+")) {
        observations.push("ต้องหยด 6 M HCl จนสารละลายมีฤทธิ์เป็นกรดก่อนเติม K₄[Fe(CN)₆] เพื่อทดสอบ Zn²⁺");
      } else {
        observations.push("ไม่เกิดตะกอนสีน้ำเงินหรือตะกอนขาวเขียวอ่อนเมื่อหยด K₄[Fe(CN)₆]");
      }
    }

    // ------------------------------------------------------------------------
    // 12. NaBiO3(s) (Manganese(II) confirmation test)
    // ------------------------------------------------------------------------
    else if (reagentId === "NaBiO3") {
      if (this.aq.has("Mn2+") && this.pH === "acidic") {
        this.aq.delete("Mn2+");
        this.aq.add("MnO4-");
        this.addPpt({ id: "NaBiO3_excess", formula: "NaBiO₃(s)", label: "ผง NaBiO₃ ส่วนเกิน", color: "#a8a29e", border: "#78716c", style: "dense" });
        observations.push("เกิดสารละลายสีม่วงแดงของ MnO₄⁻(aq)! ยืนยันว่ามี Mn²⁺");
        equations.push("2Mn²⁺(aq) + 5NaBiO₃(s) + 14H⁺(aq) → 2MnO₄⁻(aq) (สีม่วงแดง) + 5Bi³⁺(aq) + 7H₂O(l) + 5Na⁺(aq)");
      } else if (this.aq.has("Mn2+")) {
        observations.push("ต้องเติม 6 M HNO₃ 2 หยดให้สารละลายเป็นกรดและอุ่นก่อนเติม NaBiO₃!");
      } else if (this.hasPpt("MnO2")) {
        observations.push("MnO₂·xH₂O ยังเป็นตะกอนสีดำ! ต้องละลายตะกอนด้วย 6 M HCl + 6 M HNO₃ ก่อน");
      } else {
        this.addPpt({ id: "NaBiO3_excess", formula: "NaBiO₃(s)", label: "ผง NaBiO₃ ที่ไม่ละลาย", color: "#a8a29e", border: "#78716c", style: "dense" });
        observations.push("ผง NaBiO₃ นอนก้นหลอด สารละลายไม่เปลี่ยนเป็นสีม่วงแดง (ไม่มี Mn²⁺)");
      }
    }

    // ------------------------------------------------------------------------
    // 13. 1 M BaCl2 (Chromium test in Part 4)
    // ------------------------------------------------------------------------
    else if (reagentId === "BaCl2") {
      if (this.aq.has("CrO4_2-")) {
        this.aq.delete("CrO4_2-");
        this.addPpt({ id: "BaCrO4", formula: "BaCrO₄(s)", label: "BaCrO₄(s) ตะกอนเหลือง", color: "#fde047", border: "#ca8a04", style: "dense" });
        observations.push("เกิดตะกอนสีเหลืองของ BaCrO₄(s)!");
        equations.push("CrO₄²⁻(aq) + Ba²⁺(aq) → BaCrO₄(s)↓ (ตะกอนเหลือง)");
      } else {
        observations.push("ไม่เกิดตะกอนเหลืองของ BaCrO₄ (ไม่มี CrO₄²⁻ ในสารละลาย)");
      }
    }

    // ------------------------------------------------------------------------
    // 14. Catechol Violet (Aluminum confirmation test in Part 4)
    // ------------------------------------------------------------------------
    else if (reagentId === "CatecholViolet") {
      if (this.aq.has("Al3+") && (this.pH === "weak_acidic" || this.pH === "neutral")) {
        this.aq.add("Al_CV_complex");
        observations.push("สารละลายเปลี่ยนเป็นสีน้ำเงินสด! ยืนยันว่ามี Al³⁺");
        equations.push("Al³⁺(aq) + Catechol violet(aq) → [Al(Catechol violet)] complex (สารละลายสีน้ำเงิน)");
      } else if (this.hasPpt("Al(OH)3")) {
        observations.push("ต้องละลายตะกอนวุ้นขาว Al(OH)₃ ด้วย 6 M CH₃COOH พอดี และเติมน้ำกลั่น 1 mL ก่อนหยด Catechol violet");
      } else {
        this.aq.add("CatecholViolet_free");
        observations.push("ไม่เปลี่ยนเป็นสีน้ำเงินของสารเชิงซ้อน Al³⁺");
      }
    }

    const obsText = observations.join(" • ");
    const eqText = equations.join(" | ");
    this.lastObservation = obsText;
    if (eqText) this.lastEquation = eqText;
    this.logs.unshift({
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      action: `เติม ${window.REAGENT_CATALOG.find(r => r.id === reagentId)?.name || reagentId}`,
      obs: obsText,
      eq: eqText
    });

    return { obs: obsText, eq: eqText };
  }

  // Equipment Action: Heat in Hot Water Bath / Hot Plate
  heatTube() {
    this.temperature = "hot";
    let observations = [];
    let equations = [];

    if (this.hasPpt("PbCl2")) {
      this.removePpt("PbCl2");
      this.aq.add("Pb2+");
      observations.push("ตะกอนขาว PbCl₂(s) ละลายในน้ำร้อนได้เป็นสารละลายใสของ Pb²⁺(aq)!");
      equations.push("PbCl₂(s) ──(น้ำร้อน Δ)──► Pb²⁺(aq) + 2Cl⁻(aq)");
    }
    if (this.hasPpt("AgCl") || this.hasPpt("Hg2Cl2")) {
      observations.push("ตะกอนขาวของ AgCl / Hg₂Cl₂ ไม่ละลายในน้ำร้อน (สามารถเซนตริฟิวจ์ขณะร้อนเพื่อแยกสารละลาย Pb²⁺ ออก)");
    }
    if (this.hasH2O2 && this.pH === "basic") {
      this.bubbles = true;
      observations.push("อุ่นบน Hot plate / อ่างน้ำร้อน: สลาย H₂O₂ ส่วนเกินและทำให้ปฏิกิริยาออกซิเดชันสมบูรณ์");
    }

    if (observations.length === 0) {
      observations.push("อุ่นหลอดทดลองในอ่างน้ำร้อน (อุณหภูมิสูงช่วยให้ตะกอนละลายหรือปฏิกิริยาเกิดสมบูรณ์ขึ้น)");
    }

    const obsText = observations.join(" • ");
    const eqText = equations.join(" | ");
    this.lastObservation = obsText;
    if (eqText) this.lastEquation = eqText;
    this.logs.unshift({
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      action: "🔥 อุ่นในอ่างน้ำร้อน / Hot Plate",
      obs: obsText,
      eq: eqText
    });
    return { obs: obsText, eq: eqText };
  }

  // Equipment Action: Add Distilled Water + Heat (for Part 2 Hot Water extraction or Part 4 dilution)
  addHotWater() {
    this.volume = Math.min(4.0, +(this.volume + 1.0).toFixed(1));
    this.temperature = "hot";
    let obs = "เติมน้ำกลั่น 1 mL และนำไปอุ่นบนอ่างน้ำร้อนพร้อมคนด้วยแท่งแก้ว";
    let eq = "";
    const hadPbCl2 = this.hasPpt("PbCl2");
    const hasOtherGroup1 = this.hasPpt("AgCl") || this.hasPpt("Hg2Cl2");

    if (hadPbCl2 && hasOtherGroup1) {
      this.removePpt("PbCl2");
      this.aq.add("Pb2+");
      this.centrifuged = false;
      obs = "เติมน้ำกลั่น 1 mL และอุ่นในอ่างน้ำร้อน: ตะกอนขาวละลายบางส่วน! (PbCl₂ ละลายออกมาเป็น Pb²⁺ ในสารละลายใส แต่ยังมีตะกอนขาวของ AgCl เหลืออยู่) → ให้กด 'เซนตริฟิวจ์' แล้วกด 'แยกตะกอน/สารละลาย' เพื่อนำน้ำใสไปตรวจ Pb²⁺ และเก็บตะกอนขาวไว้ตรวจ Ag⁺";
      eq = "PbCl₂(s) ──(น้ำร้อน Δ)──► Pb²⁺(aq) + 2Cl⁻(aq) ; AgCl(s) ไม่ละลายในน้ำร้อน";
    } else if (hadPbCl2) {
      this.removePpt("PbCl2");
      this.aq.add("Pb2+");
      obs = "เติมน้ำกลั่น 1 mL และอุ่นในอ่างน้ำร้อน: ตะกอนขาว PbCl₂ ละลายหมด ได้สารละลายใสไม่มีสี! (ไม่มีตะกอน AgCl เหลือ) → หยด 0.1 M K₂CrO₄ เพื่อยืนยัน Pb²⁺ ได้เลย";
      eq = "PbCl₂(s) ──(น้ำร้อน Δ)──► Pb²⁺(aq) + 2Cl⁻(aq)";
    } else if (hasOtherGroup1) {
      obs = "เติมน้ำกลั่น 1 mL และอุ่นในอ่างน้ำร้อน: ตะกอนสีขาวไม่ละลายในน้ำร้อน (ไม่มี Pb²⁺) → นำตะกอนขาวไปหยด 6 M NH₃ เพื่อทดสอบ Ag⁺ ต่อได้เลย";
    }
    this.lastObservation = obs;
    if (eq) this.lastEquation = eq;
    this.logs.unshift({
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      action: "💧🔥 เติมน้ำกลั่น 1 mL + อุ่นในอ่างน้ำร้อน",
      obs,
      eq
    });
    return { obs, eq };
  }

  // Equipment Action: Centrifuge
  centrifuge() {
    if (this.ppts.length === 0) {
      const obs = "ไม่มีตะกอนแขวนลอยในหลอดนี้ สารละลายยังคงใสเหมือนเดิม";
      this.lastObservation = obs;
      return { obs, eq: "" };
    }
    this.centrifuged = true;
    const pptNames = this.ppts.map(p => p.formula).join(", ");
    const obs = `เซนตริฟิวจ์เสร็จสิ้น: ตะกอน (${pptNames}) อัดแน่นอยู่ที่ก้นหลอด พร้อมแยกสารละลายใส (Decant) หรือล้างตะกอน`;
    this.lastObservation = obs;
    this.logs.unshift({
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      action: "🌀 นำไปเซนตริฟิวจ์ (Centrifuge)",
      obs,
      eq: ""
    });
    return { obs, eq: "" };
  }

  // Equipment Action: Wash Precipitate with Distilled Water & Centrifuge
  washPrecipitate() {
    if (this.ppts.length === 0) {
      return { obs: "ไม่มีตะกอนให้ล้างในหลอดนี้", eq: "" };
    }
    // Washing removes supernatant aqueous ions and leaves only clean precipitate
    this.aq.clear();
    this.hasCrO4Reagent = false;
    this.hasH2O2 = false;
    this.pH = "neutral";
    this.acidType = "none";
    this.washed = true;
    this.centrifuged = true;
    this.volume = 0.6;
    const pptNames = this.ppts.map(p => p.formula).join(", ");
    const obs = `ล้างตะกอน (${pptNames}) ด้วยน้ำกลั่น เซนตริฟิวจ์และเทน้ำล้างทิ้ง เหลือเฉพาะตะกอนสะอาดในหลอด`;
    this.lastObservation = obs;
    this.logs.unshift({
      time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      action: "🚿 ล้างตะกอนด้วยน้ำกลั่น + เซนตริฟิวจ์",
      obs,
      eq: ""
    });
    return { obs, eq: "" };
  }
}

window.VirtualTube = VirtualTube;

// ============================================================================
// SMART LAB ADVISOR: RECOMMENDED NEXT STEPS BASED ON TUBE STATE
// ============================================================================
window.getSmartRecommendations = function(tube) {
  const recs = [];

  // Check if uncentrifuged precipitate exists
  if (tube.ppts.length > 0 && !tube.centrifuged) {
    recs.push({
      title: "🌀 เซนตริฟิวจ์ (Centrifuge)",
      detail: "มีตะกอนแขวนลอยอยู่ในหลอด ควรนำไปเซนตริฟิวจ์เพื่อให้ตะกอนตกนอนก้นหลอดก่อนแยกสารละลาย",
      actionType: "equip",
      actionId: "centrifuge",
      priority: "high"
    });
  }

  // Check if centrifuged and has both precipitate and supernatant
  if (tube.ppts.length > 0 && tube.centrifuged && tube.aq.size > 0) {
    recs.push({
      title: "🧪 แยกตะกอนและสารละลายใส (Decant)",
      detail: "แยกสารละลายใสเหนือตะกอนออกเป็นอีกหลอด เพื่อนำไปวิเคราะห์ตอนถัดไป",
      actionType: "equip",
      actionId: "decant",
      priority: "high"
    });
  }

  // Group 1 initial check
  const hasInitialIons = ["Ag+", "Pb2+", "Hg2_2+", "Ni2+", "Fe3+", "Mn2+", "Cr3+", "Al3+", "Zn2+"].some(i => tube.aq.has(i));
  if (hasInitialIons && !tube.hasCl && tube.ppts.length === 0 && tube.pH === "neutral") {
    recs.push({
      title: "ตอนที่ 1: หยด 6 M HCl (แยกแคทไอออนกลุ่มที่ 1)",
      detail: "หยด 6 M HCl 1–2 หยด เพื่อตรวจสอบว่ามีตะกอนขาวของ AgCl, PbCl₂ หรือ Hg₂Cl₂ หรือไม่",
      actionType: "reagent",
      actionId: "HCl_6M",
      priority: "normal"
    });
  }

  // If HCl added and no Group 1 ppt, move to Group 2/3 precipitation with NaOH + H2O2
  if (tube.hasCl && tube.ppts.length === 0 && (tube.aq.has("Ni2+") || tube.aq.has("Fe3+") || tube.aq.has("Mn2+") || tube.aq.has("Cr3+") || tube.aq.has("Al3+") || tube.aq.has("Zn2+")) && tube.pH === "acidic") {
    recs.push({
      title: "ตอนที่ 1: หยด 6 M NaOH จนเป็นเบส + 0.5 mL",
      detail: "แยกแคทไอออนกลุ่มที่ 2 (ตะกอนไฮดรอกไซด์ Ni²⁺, Fe³⁺, Mn²⁺) ออกจากกลุ่มที่ 3 (สารละลาย)",
      actionType: "reagent",
      actionId: "NaOH_6M",
      priority: "normal"
    });
  }

  if (tube.pH === "basic" && !tube.hasH2O2 && (tube.hasPpt("Mn(OH)2") || tube.aq.has("[Cr(OH)4]-") || tube.hasPpt("Ni(OH)2") || tube.hasPpt("Fe(OH)3"))) {
    recs.push({
      title: "ตอนที่ 1: เติม 3% H₂O₂ 1 mL แล้วอุ่น",
      detail: "ออกซิไดส์ Mn(OH)₂ เป็นตะกอนดำ MnO₂·xH₂O และออกซิไดส์ [Cr(OH)₄]⁻ เป็น CrO₄²⁻ สีเหลือง",
      actionType: "reagent",
      actionId: "H2O2_3pct",
      priority: "normal"
    });
  }

  // Part 2: Group 1 white precipitates
  if ((tube.hasPpt("AgCl") || tube.hasPpt("PbCl2") || tube.hasPpt("Hg2Cl2")) && tube.temperature !== "hot") {
    recs.push({
      title: "ตอนที่ 2: เติมน้ำกลั่น 1 mL + อุ่นในอ่างน้ำร้อน",
      detail: "ทดสอบการละลายของตะกอนขาวในน้ำร้อนเพื่อแยก PbCl₂ (ละลายในน้ำร้อน) ออกจาก AgCl, Hg₂Cl₂",
      actionType: "equip",
      actionId: "hot_water",
      priority: "normal"
    });
  }

  if (tube.aq.has("Pb2+") && !tube.hasCrO4Reagent && tube.ppts.length === 0) {
    recs.push({
      title: "ตอนที่ 2 (ทดสอบ Pb²⁺): หยด 0.1 M K₂CrO₄ 2–3 หยด",
      detail: "ถ้ามี Pb²⁺ จะเกิดตะกอนสีเหลืองของ PbCrO₄(s)",
      actionType: "reagent",
      actionId: "K2CrO4",
      priority: "normal"
    });
  }

  if (tube.hasPpt("PbCrO4")) {
    recs.push({
      title: "ตอนที่ 2 (ยืนยัน Pb²⁺): ละลายตะกอนเหลืองใน 6 M NaOH",
      detail: "ตะกอนเหลือง PbCrO₄ จะละลายใน 6 M NaOH ได้สารละลายสีเหลืองของ [Pb(OH)₄]²⁻ และ CrO₄²⁻",
      actionType: "reagent",
      actionId: "NaOH_6M",
      priority: "normal"
    });
  }

  if ((tube.hasPpt("AgCl") || tube.hasPpt("Hg2Cl2")) && tube.aq.size === 0) {
    recs.push({
      title: "ตอนที่ 2 (ทดสอบ Ag⁺ / Hg₂²⁺): หยด 6 M NH₃ 1 mL",
      detail: "AgCl จะละลายเป็น [Ag(NH₃)₂]⁺ ใสไม่มีสี ส่วน Hg₂Cl₂ จะเปลี่ยนเป็นตะกอนเทาดำ",
      actionType: "reagent",
      actionId: "NH3_6M",
      priority: "normal"
    });
  }

  if (tube.aq.has("[Ag(NH3)2]+")) {
    recs.push({
      title: "ตอนที่ 2 (ยืนยัน Ag⁺): หยด 6 M HNO₃ จนเป็นกรด",
      detail: "ทำลายสารเชิงซ้อน [Ag(NH₃)₂]⁺ จะได้ตะกอนสีขาวของ AgCl(s) กลับคืนมา",
      actionType: "reagent",
      actionId: "HNO3_6M",
      priority: "normal"
    });
  }

  // Part 3: Group 2 precipitates (Ni(OH)2, Fe(OH)3, MnO2)
  if ((tube.hasPpt("Ni(OH)2") || tube.hasPpt("Fe(OH)3") || tube.hasPpt("MnO2")) && tube.aq.size === 0) {
    recs.push({
      title: "ตอนที่ 3: ละลายตะกอนด้วย 6 M HCl + 6 M HNO₃",
      detail: "เติม 6 M HCl และ 6 M HNO₃ เพื่อละลายตะกอนไฮดรอกไซด์/ออกไซด์ให้หมด",
      actionType: "reagent",
      actionId: "HCl_6M",
      priority: "normal"
    });
  }

  if ((tube.aq.has("Ni2+") || tube.aq.has("Fe3+") || tube.aq.has("Mn2+")) && tube.pH === "acidic" && tube.hasCl) {
    if (tube.aq.has("Ni2+")) {
      recs.push({
        title: "ตอนที่ 3: เติม 4 M NH₄Cl + 15 M NH₃ จนเป็นเบส",
        detail: "แยก Ni²⁺ ออกมาเป็นสารละลายสีน้ำเงิน [Ni(NH₃)₆]²⁺ ส่วน Fe³⁺/Mn²⁺ ตกตะกอน",
        actionType: "reagent",
        actionId: "NH4Cl_NH3_15M",
        priority: "normal"
      });
    }
    if (tube.aq.has("Fe3+") || tube.aq.has("Mn2+")) {
      recs.push({
        title: "ตอนที่ 3 (ทดสอบ Fe³⁺ หลอด 1): หยด 1 M KSCN 4–5 หยด",
        detail: "ถ้ามี Fe³⁺ จะได้สารละลายสีแดงเลือดนกเข้มของ [Fe(SCN)]²⁺ (สามารถแบ่งหลอดก่อนทดสอบได้)",
        actionType: "reagent",
        actionId: "KSCN",
        priority: "normal"
      });
      recs.push({
        title: "ตอนที่ 3 (ทดสอบ Fe³⁺ หลอด 2): หยด 0.1 M K₄[Fe(CN)₆] 2–3 หยด",
        detail: "ถ้ามี Fe³⁺ จะได้ตะกอนสีน้ำเงินเข้มของ KFe[Fe(CN)₆]",
        actionType: "reagent",
        actionId: "K4FeCN6",
        priority: "normal"
      });
      recs.push({
        title: "ตอนที่ 3 (ทดสอบ Mn²⁺ หลอด 3): เติม NaBiO₃ (ของแข็ง)",
        detail: "ในกรด HNO₃ อุ่น ถ้ามี Mn²⁺ จะเปลี่ยนเป็นสารละลายสีม่วงแดงของ MnO₄⁻",
        actionType: "reagent",
        actionId: "NaBiO3",
        priority: "normal"
      });
    }
  }

  if (tube.aq.has("[Ni(NH3)6]2+")) {
    recs.push({
      title: "ตอนที่ 3 (ยืนยัน Ni²⁺): หยด DMG 2–3 หยด",
      detail: "เกิดตะกอนสีแดงชมพูสดของ Ni(C₄H₇O₂N₂)₂",
      actionType: "reagent",
      actionId: "DMG",
      priority: "normal"
    });
  }

  // Part 4 recommendations
  if (tube.aq.has("[Al(OH)4]-") || tube.aq.has("[Zn(OH)4]2-")) {
    recs.push({
      title: "ตอนที่ 4: หยด 6 M CH₃COOH จนเป็นกรด",
      detail: "เปลี่ยน [Al(OH)₄]⁻ และ [Zn(OH)₄]²⁻ กลับเป็น Al³⁺ และ Zn²⁺",
      actionType: "reagent",
      actionId: "CH3COOH_6M",
      priority: "normal"
    });
  }

  if ((tube.aq.has("Al3+") || tube.aq.has("Zn2+")) && tube.pH === "weak_acidic" && !tube.washed) {
    recs.push({
      title: "ตอนที่ 4: หยด 6 M NH₃ จนเป็นเบส + 0.5 mL",
      detail: "Al³⁺ จะตกตะกอนวุ้นขาว Al(OH)₃ ส่วน Zn²⁺ ละลายเป็น [Zn(NH₃)₄]²⁺",
      actionType: "reagent",
      actionId: "NH3_6M",
      priority: "normal"
    });
  }

  if (tube.aq.has("Al3+") && tube.pH === "weak_acidic" && tube.washed) {
    recs.push({
      title: "ตอนที่ 4 (ยืนยัน Al³⁺): หยด Catechol violet 2 หยด",
      detail: "สารละลายจะเปลี่ยนเป็นสีน้ำเงินของสารเชิงซ้อน Al³⁺",
      actionType: "reagent",
      actionId: "CatecholViolet",
      priority: "normal"
    });
  }

  if (tube.aq.has("CrO4_2-") && tube.pH === "ammoniacal") {
    recs.push({
      title: "ตอนที่ 4 (ทดสอบ CrO₄²⁻): เติม 1 M BaCl₂ 0.5 mL",
      detail: "เกิดตะกอนสีเหลืองของ BaCrO₄(s)",
      actionType: "reagent",
      actionId: "BaCl2",
      priority: "normal"
    });
  }

  if (tube.hasPpt("BaCrO4")) {
    recs.push({
      title: "ตอนที่ 4 (ยืนยัน Cr³⁺ ขั้น 1): ละลายตะกอนเหลืองด้วย 6 M HNO₃",
      detail: "เปลี่ยน BaCrO₄ เป็นสารละลายสีส้มของ Cr₂O₇²⁻",
      actionType: "reagent",
      actionId: "HNO3_6M",
      priority: "normal"
    });
  }

  if (tube.aq.has("Cr2O7_2-")) {
    recs.push({
      title: "ตอนที่ 4 (ยืนยัน Cr³⁺ ขั้น 2): หยด 3% H₂O₂ 2–3 หยด",
      detail: "เกิดสารละลายสีน้ำเงินเข้มของ CrO₅ (CrO(O₂)₂) ที่จางหายอย่างรวดเร็ว",
      actionType: "reagent",
      actionId: "H2O2_3pct",
      priority: "normal"
    });
  }

  return recs;
};

// ============================================================================
// WORKSHEET & QUIZ QUESTIONS (ตรงตามใบรายงานผล หน้า 108-111)
// ============================================================================
window.WORKSHEET_FLOW_ITEMS = [
  {
    id: "q1",
    part: "ตอนที่ 1: การแยกแคทไอออนออกเป็นกลุ่มๆ",
    prompt: "เมื่อนำสารตัวอย่างมาเติม 6 M HCl จนตกตะกอนสมบูรณ์ ตะกอนสีขาวที่ได้ในกลุ่มที่ 1 (กรณีสอบ 5 ไอออน) คือข้อใด?",
    options: ["AgCl(s) หรือ PbCl₂(s)", "Ni(OH)₂(s) หรือ Fe(OH)₃(s)", "PbCrO₄(s) หรือ BaCrO₄(s)", "KFe[Fe(CN)₆](s)"],
    correct: 0,
    explanation: "แคทไอออนกลุ่มที่ 1 ได้แก่ Ag⁺ และ Pb²⁺ (รวมถึง Hg₂²⁺ ตามคู่มือเต็ม) จะรวมกับ Cl⁻ จาก 6 M HCl ได้ตะกอนสีขาวของ AgCl(s), PbCl₂(s)"
  },
  {
    id: "q2",
    part: "ตอนที่ 1: การแยกแคทไอออนกลุ่มที่ 2",
    prompt: "สารละลายที่แยกตะกอนคลอไรด์ออกแล้ว เมื่อเติม 6 M NaOH จนเป็นเบส + 3% H₂O₂ และอุ่น ตะกอนของ Ni²⁺, Fe³⁺ และ Mn²⁺ มีสีอะไรตามลำดับ?",
    options: [
      "เขียว (Ni(OH)₂), น้ำตาลแดง (Fe(OH)₃), ดำ (MnO₂·xH₂O)",
      "น้ำเงิน (Ni(OH)₂), แดงเลือดนก (Fe(OH)₃), ม่วงแดง (MnO₂)",
      "ขาว (Ni(OH)₂), เหลือง (Fe(OH)₃), ครีม (MnO₂)",
      "แดง (Ni(OH)₂), น้ำเงิน (Fe(OH)₃), ดำ (MnO₂)"
    ],
    correct: 0,
    explanation: "ใน 6 M NaOH + 3% H₂O₂: Ni²⁺ ได้ตะกอนสีเขียว Ni(OH)₂, Fe³⁺ ได้ตะกอนสีน้ำตาลแดง Fe(OH)₃ และ Mn²⁺ ถูกออกซิไดส์เป็นตะกอนสีดำ MnO₂·xH₂O"
  },
  {
    id: "q3",
    part: "ตอนที่ 2: การทดสอบเฉพาะของ Ag⁺ และ Pb²⁺",
    prompt: "ในการแยกตะกอนขาว AgCl และ PbCl₂ ออกจากกัน ใช้สมบัติใด และยืนยัน Pb²⁺ ด้วยรีเอเจนต์ใด?",
    options: [
      "ละลาย PbCl₂ ด้วยน้ำร้อน แล้วหยด 0.1 M K₂CrO₄ ได้ตะกอนเหลือง PbCrO₄ ที่ละลายใน 6 M NaOH",
      "ละลาย PbCl₂ ด้วย 6 M NH₃ แล้วหยด 6 M HNO₃ ได้ตะกอนขาว",
      "ละลาย AgCl ด้วยน้ำร้อน แล้วหยด KSCN ได้สีแดง",
      "ละลายตะกอนทั้งสองด้วย 6 M HNO₃ แล้วเติม BaCl₂"
    ],
    correct: 0,
    explanation: "PbCl₂ ละลายได้ในน้ำร้อน (แยกออกจาก AgCl ที่ไม่ละลายในน้ำร้อน) จากนั้นเติม K₂CrO₄ ได้ตะกอนสีเหลืองของ PbCrO₄ ซึ่งละลายใน NaOH ได้ [Pb(OH)₄]²⁻"
  },
  {
    id: "q4",
    part: "ตอนที่ 2: การทดสอบเฉพาะของ Ag⁺ และ Hg₂²⁺",
    prompt: "เมื่อเติม 6 M NH₃ ลงบนตะกอนขาว AgCl และ Hg₂Cl₂ จะสังเกตเห็นการเปลี่ยนแปลงอย่างไร?",
    options: [
      "AgCl ละลายเป็นสารละลายใส [Ag(NH₃)₂]⁺ (ตกตะกอนขาวกลับเมื่อเติม HNO₃) ส่วน Hg₂Cl₂ เปลี่ยนเป็นตะกอนเทาดำ (HgNH₂Cl + Hg⁰)",
      "ทั้ง AgCl และ Hg₂Cl₂ ละลายเป็นสารละลายใสไม่มีสี",
      "AgCl เปลี่ยนเป็นตะกอนเทาดำ ส่วน Hg₂Cl₂ ละลายเป็นสารละลายใส",
      "ทั้งสองไม่เกิดปฏิกิริยากับ NH₃"
    ],
    correct: 0,
    explanation: "AgCl เกิดไอออนเชิงซ้อนแอมมีน [Ag(NH₃)₂]⁺ ที่ละลายน้ำได้ ส่วน Hg₂Cl₂ เกิดปฏิกิริยา disproportionation ได้ HgNH₂Cl (ขาว) + Hg⁰ (ดำ) เห็นเป็นตะกอนสีเทาดำ"
  },
  {
    id: "q5",
    part: "ตอนที่ 3: การทดสอบเฉพาะของ Ni²⁺",
    prompt: "หลังจากละลายตะกอนกลุ่มที่ 2 ด้วยกรด แล้วเติม 4 M NH₄Cl + 15 M NH₃ จนเป็นเบส สารละลายของ Ni²⁺ จะมีสีอะไร และเมื่อหยด DMG จะได้ผลอย่างไร?",
    options: [
      "สารละลายสีน้ำเงินของ [Ni(NH₃)₆]²⁺ เมื่อหยด DMG ได้ตะกอนสีแดงของ Ni(C₄H₇O₂N₂)₂",
      "สารละลายสีเขียว เมื่อหยด DMG ได้สารละลายสีม่วงแดง",
      "สารละลายใสไม่มีสี เมื่อหยด DMG ได้ตะกอนสีเหลือง",
      "สารละลายสีเหลือง เมื่อหยด DMG ได้ตะกอนสีน้ำเงิน"
    ],
    correct: 0,
    explanation: "Ni²⁺ เกิดไอออนเชิงซ้อนแอมมีน [Ni(NH₃)₆]²⁺ สีน้ำเงิน และทำปฏิกิริยากับ Dimethylglyoxime (DMG) ในเบสได้ตะกอนสีแดงสด"
  },
  {
    id: "q6",
    part: "ตอนที่ 3: การทดสอบเฉพาะของ Fe³⁺ และ Mn²⁺",
    prompt: "ในการทดสอบ Fe³⁺ (หลอดที่ 1 และ 2) และ Mn²⁺ (หลอดที่ 3) ข้อใดระบุผลการทดลองได้ถูกต้องทั้งหมด?",
    options: [
      "Fe³⁺ + KSCN → สารละลายสีแดงเลือดนก [Fe(SCN)]²⁺ | Fe³⁺ + K₄[Fe(CN)₆] → ตะกอนน้ำเงิน KFe[Fe(CN)₆] | Mn²⁺ + NaBiO₃/HNO₃ → สารละลายสีม่วงแดง MnO₄⁻",
      "Fe³⁺ + KSCN → ตะกอนสีน้ำเงิน | Fe³⁺ + K₄[Fe(CN)₆] → สารละลายสีแดงเลือดนก | Mn²⁺ + NaBiO₃ → ตะกอนสีดำ",
      "Fe³⁺ + DMG → ตะกอนสีแดง | Mn²⁺ + KSCN → สารละลายสีม่วงแดง",
      "Fe³⁺ + BaCl₂ → ตะกอนสีเหลือง | Mn²⁺ + H₂O₂ → สารละลายสีน้ำเงิน"
    ],
    correct: 0,
    explanation: "หลอดที่ 1 เติม KSCN ได้สารละลายสีแดงเลือดนก [Fe(SCN)]²⁺, หลอดที่ 2 เติม K₄[Fe(CN)₆] ได้ตะกอนสีน้ำเงินเข้ม KFe[Fe(CN)₆], หลอดที่ 3 เติม HNO₃ + NaBiO₃ ได้สารละลายสีม่วงแดงของ MnO₄⁻"
  },
  {
    id: "q7",
    part: "ส่วนที่ 2: การเลือกตัวทำละลายของสารตัวอย่างของแข็ง (หน้า 103 & สไลด์ 34)",
    prompt: "ลำดับการเลือกตัวทำละลายสำหรับสารตัวอย่างที่เป็นของแข็ง (~10 mg ขนาดเมล็ดถั่วเขียว) ที่ถูกต้องคือข้อใด?",
    options: [
      "1. น้ำกลั่น  →  2. 2.0 M HCl  →  3. 2.0 M HNO₃ (แต่ละขั้นถ้าไม่ละลายที่ RT ให้อุ่นในถ้วยน้ำเดือด 2–3 นาทีก่อนเปลี่ยนตัวทำละลาย)",
      "1. 6.0 M HCl  →  2. 6.0 M NaOH  →  3. 15 M NH₃",
      "1. 2.0 M HNO₃  →  2. 2.0 M HCl  →  3. น้ำกลั่น",
      "นำของแข็งผสมกับ NaBiO₃ แล้วเติมน้ำร้อนทันที"
    ],
    correct: 0,
    explanation: "ตามคู่มือหน้า 103 และสไลด์หน้า 34 ให้ทดสอบการละลายตามลำดับ: (1) น้ำ (2) 2.0 M HCl (3) 2.0 M HNO₃ หากไม่ละลายที่อุณหภูมิห้องให้อุ่นในน้ำเดือด 2–3 นาที หากละลายหมดในตัวทำละลายใดแล้ว ไม่ต้องทดสอบตัวทำละลายถัดไป"
  }
];
