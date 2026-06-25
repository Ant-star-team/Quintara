import { useState, useEffect, useRef } from "react";

const ICON = "/icon-192.png";
const API = "/api/claude";

const SIGNS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const SYM = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
const NAKS = ["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishtha","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];
const TITH = ["Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi","Purnima"];
const YOGA = ["Vishkambha","Priti","Ayushman","Saubhagya","Shobhana","Atiganda","Sukarma","Dhriti","Shoola","Ganda","Vriddhi","Dhruva","Vyaghata","Harshana","Vajra","Siddhi","Vyatipata","Variyan","Parigha","Shiva","Siddha","Sadhya","Shubha","Shukla","Brahma","Indra","Vaidhriti"];
const CANI = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
const CEL = ["Metal","Water","Wood","Fire","Earth"];
const PNMS = ["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn","Rahu","Ketu"];
const PICS = ["☉","☽","♂","☿","♃","♀","♄","☊","☋"];
const DL = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"];
const DY = [7,20,6,10,7,18,16,19,17];
const CLRS = ["Ruby Red","Sky Blue","Emerald Green","Royal Gold","Midnight Violet","Coral Pink","Pearl White","Cosmic Indigo","Sunrise Orange"];
const RAHU = ["7:30-9:00 AM","9:00-10:30 AM","10:30-12:00 PM","1:30-3:00 PM","3:00-4:30 PM","4:30-6:00 PM","12:00-1:30 PM"];
const LANGS = ["Hindi","English","Bengali","Arabic","Chinese","Spanish","Urdu","Tamil","Telugu","French","German","Japanese","Korean","Bahasa","Filipino"];

const VIP_CODES = {
  "QUINTARA20": { pct: 20, label: "20% off Premium" },
  "QUINTARA30": { pct: 30, label: "30% off Premium" },
  "QUINTARA50": { pct: 50, label: "50% off Premium" },
  "STARGIFT70": { pct: 70, label: "70% off Premium" },
  "COSMOSVIP": { pct: 100, label: "100% off -- Full VIP access, free" },
  "APEXLAUNCH": { pct: 100, label: "100% off -- Founder's launch gift" }
};

const MAJOR = [
  {n:0,nm:"The Fool",kw:"New beginnings, innocence, spontaneity"},
  {n:1,nm:"The Magician",kw:"Manifestation, resourcefulness, power"},
  {n:2,nm:"The High Priestess",kw:"Intuition, mystery, inner knowledge"},
  {n:3,nm:"The Empress",kw:"Fertility, abundance, nurturing"},
  {n:4,nm:"The Emperor",kw:"Authority, structure, stability"},
  {n:5,nm:"The Hierophant",kw:"Tradition, conformity, morality"},
  {n:6,nm:"The Lovers",kw:"Love, harmony, relationships"},
  {n:7,nm:"The Chariot",kw:"Control, willpower, victory"},
  {n:8,nm:"Strength",kw:"Strength, courage, patience"},
  {n:9,nm:"The Hermit",kw:"Soul-searching, introspection, guidance"},
  {n:10,nm:"Wheel of Fortune",kw:"Good luck, karma, destiny"},
  {n:11,nm:"Justice",kw:"Justice, fairness, truth"},
  {n:12,nm:"The Hanged Man",kw:"Pause, surrender, letting go"},
  {n:13,nm:"Death",kw:"Endings, change, transformation"},
  {n:14,nm:"Temperance",kw:"Balance, moderation, patience"},
  {n:15,nm:"The Devil",kw:"Shadow self, attachment, restriction"},
  {n:16,nm:"The Tower",kw:"Sudden change, upheaval, revelation"},
  {n:17,nm:"The Star",kw:"Hope, faith, rejuvenation"},
  {n:18,nm:"The Moon",kw:"Illusion, fear, the unconscious"},
  {n:19,nm:"The Sun",kw:"Joy, success, positivity"},
  {n:20,nm:"Judgement",kw:"Reflection, reckoning, awakening"},
  {n:21,nm:"The World",kw:"Completion, integration, accomplishment"},
];

const C = {
  gold:"#ffd700", g2:"#d4a017", g3:"#f0c040",
  grn:"#00c853", gr2:"#00e676", gr3:"#69f0ae",
  pur:"#7c3aed", p2:"#a855f7", p3:"#d8b4fe",
  dk:"#020205", dk2:"#07070f", dk3:"#0d0d1c",
  tx:"#ede8f5", tx2:"#a89fc0", tx3:"#6a6280",
  cd:"rgba(13,13,28,.97)", cd2:"rgba(18,18,40,.99)",
  br:"rgba(212,160,23,.2)", bg:"rgba(0,200,83,.14)", bp:"rgba(124,58,237,.25)"
};

function gSun(d) {
  const m = d.getMonth() + 1, n = d.getDate();
  if ((m === 3 && n >= 21) || (m === 4 && n <= 19)) return 0;
  if ((m === 4 && n >= 20) || (m === 5 && n <= 20)) return 1;
  if ((m === 5 && n >= 21) || (m === 6 && n <= 20)) return 2;
  if ((m === 6 && n >= 21) || (m === 7 && n <= 22)) return 3;
  if ((m === 7 && n >= 23) || (m === 8 && n <= 22)) return 4;
  if ((m === 8 && n >= 23) || (m === 9 && n <= 22)) return 5;
  if ((m === 9 && n >= 23) || (m === 10 && n <= 22)) return 6;
  if ((m === 10 && n >= 23) || (m === 11 && n <= 21)) return 7;
  if ((m === 11 && n >= 22) || (m === 12 && n <= 21)) return 8;
  if ((m === 12 && n >= 22) || (m === 1 && n <= 19)) return 9;
  if ((m === 1 && n >= 20) || (m === 2 && n <= 18)) return 10;
  return 11;
}
function gLP(d) {
  let n = d.toISOString().slice(0, 10).replace(/-/g, "").split("").reduce((a, c) => a + parseInt(c), 0);
  while (n > 9 && n !== 11 && n !== 22) n = String(n).split("").reduce((a, c) => a + parseInt(c), 0);
  return n;
}
function gDN(dob) {
  // Personal Day Number (Pythagorean numerology): combine birth month+day with today's date
  const today = new Date();
  let birthPart = 0;
  if (dob) {
    const p = dob.split("-");
    if (p.length === 3) birthPart = parseInt(p[1]) + parseInt(p[2]);
  }
  let n = birthPart + (today.getMonth() + 1) + today.getDate() + today.getFullYear();
  n = String(n).split("").reduce((a, c) => a + parseInt(c), 0);
  while (n > 9) n = String(n).split("").reduce((a, c) => a + parseInt(c), 0);
  return n || 1;
}
function gPan(d) {
  const SYN = 29.53058867;
  const ref = new Date(2000, 0, 6, 18, 14, 0);
  const diff = (d - ref) / 86400000;
  const age = ((diff % SYN) + SYN) % SYN;
  const nakI = Math.abs(Math.floor((((diff * 13.176) % 360 + 360) % 360) / (360 / 27))) % 27;
  const sL = (d.getFullYear() - 2000) * 0.9856 + d.getMonth() * 30.4 + d.getDate();
  const yI = Math.abs(Math.floor((((sL + age * (360 / SYN)) % 360 + 360) % 360) / (360 / 27))) % 27;
  const ph = age < 1 ? "New Moon" : age < 7.4 ? "Waxing Crescent" : age < 11 ? "First Quarter" : age < 14.5 ? "Waxing Gibbous" : age < 16 ? "Full Moon" : age < 22 ? "Waning Gibbous" : age < 26 ? "Last Quarter" : "Waning Crescent";
  return {
    nak: NAKS[nakI],
    tithi: TITH[Math.floor(age / (SYN / 30)) % 15],
    yoga: YOGA[yI],
    vaara: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d.getDay()],
    rahu: RAHU[d.getDay()],
    phase: ph,
    moonAge: age.toFixed(1)
  };
}
function gAsc(d, sl, ex) {
  let h = 9;
  if (ex) { const p = ex.split(":"); h = parseInt(p[0]) + (parseInt(p[1] || 0) / 60); }
  else h = { morning: 9, afternoon: 14, evening: 19, night: 23 }[sl] || 9;
  return (gSun(d) + Math.floor(h / 2)) % 12;
}
function gMoon(d) { return (gSun(d) + 2) % 12; }
function gDashas(d) {
  const si = gLP(d) % 9;
  let yr = d.getFullYear();
  return DL.map((_, i) => { const ix = (si + i) % 9; const o = { l: DL[ix], y: DY[ix], s: yr, e: yr + DY[ix] }; yr += DY[ix]; return o; });
}
function gPlanets(d) {
  const s = gSun(d);
  return PNMS.map((n, i) => ({ nm: n, ic: PICS[i], sg: SIGNS[(s + i * 3 + Math.floor(i / 3)) % 12], dg: Math.floor((d.getDate() * i * 7 + d.getMonth() * 13) % 30), hs: ((i * 2 + 1) % 12) + 1 }));
}
function gChinese(d) { return { animal: CANI[(d.getFullYear() - 4) % 12], element: CEL[Math.floor((d.getFullYear() - 4) % 10 / 2)] }; }
function gIni(n) { if (!n) return "?"; const p = n.trim().split(" "); return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : n.slice(0, 2).toUpperCase(); }

function buildSys(user, sys) {
  const c = user && user.c ? user.c : {};
  const slotMap = { morning: "morning 6AM-12PM", afternoon: "afternoon 12-6PM", evening: "evening 6-10PM", night: "night 10PM-6AM" };
  let profile = "No birth profile yet -- this person has not completed onboarding, so give general wisdom and gently invite them to share their birth details for a personalized reading.";
  let activeDashaLine = "";
  if (user) {
    if (c.dashas && c.dashas.length) {
      const nowYr = new Date().getFullYear();
      const active = c.dashas.find(d => nowYr >= d.s && nowYr < d.e);
      if (active) {
        const yearsIn = nowYr - active.s;
        activeDashaLine = "CURRENT ACTIVE DASHA: " + active.l + " Mahadasha, running from " + active.s + " to " + active.e + " (" + active.y + " years total, currently " + yearsIn + " years into it). When the user asks about their dasha, ALWAYS reference this " + active.l + " Dasha specifically -- describe what " + active.l + " as a Dasha lord brings (its themes, what to embrace, what to be cautious of), since this IS their current real-time planetary period.";
      }
    }
    const lines = [
      "SEEKER: " + user.name,
      "DOB: " + (user.dob || "?") + " | Place: " + (user.place || "?"),
      "Birth time: " + (user.exact ? "Exact " + user.exact : (slotMap[user.slot] || "?")),
      "Sun sign: " + (c.sun != null ? SIGNS[c.sun] : "?") + " | Moon sign: " + (c.moon != null ? SIGNS[c.moon] : "?") + " | Ascendant: " + (c.asc != null ? SIGNS[c.asc] : "?"),
      "Nakshatra: " + ((c.pan && c.pan.nak) || "?") + " | Tithi: " + ((c.pan && c.pan.tithi) || "?") + " | Yoga: " + ((c.pan && c.pan.yoga) || "?"),
      "Life Path number: " + (c.lp || "?") + " | Chinese zodiac: " + ((c.ch && c.ch.animal) || "?") + " " + ((c.ch && c.ch.element) || ""),
      activeDashaLine,
      "Active traditions toggled on: " + Object.keys(sys || {}).filter(k => sys[k]).join(", "),
      "Reply language: " + (user.lang || "English")
    ].filter(Boolean);
    profile = lines.join("\n");
  }
  return "You are QUINTARA, an expert AI Astrologer-Oracle. You synthesize real, accurate knowledge from these classical traditions and must use them correctly:\n\nVEDIC JYOTISH (sidereal zodiac) -- primary classical texts to draw from:\n- Brihat Parashara Hora Shastra (the foundational Vedic text, attributed to sage Parashara) -- houses, planets, yogas, dashas\n- Brihat Jataka and Laghu Jataka by Varahamihira -- natal chart interpretation\n- Phaladeepika by Mantreswara -- predictive results of planetary combinations\n- Saravali by Kalyana Varma -- comprehensive yoga and planetary combination text\n- Jataka Parijata by Vaidyanatha Dikshita -- detailed natal astrology\n- Sarvartha Chintamani by Venkatesa -- results of planetary periods and yogas\n- Laghu Parashari -- simplified Parashari method for quick chart reading\n- Jaimini Sutras by sage Jaimini -- alternate Vedic system using Karakas and Chara dashas\nUse: lagna (ascendant), 12 houses (bhavas), 9 grahas (planets), 27 nakshatras with ruling deities, Vimshottari Dasha periods, classical yogas (Raj Yoga, Dhana Yoga, Gajakesari Yoga, etc).\n\nWESTERN ASTROLOGY (tropical zodiac) -- primary texts:\n- Ptolemy's Tetrabiblos (2nd century CE) -- the foundational Hellenistic text\n- Hellenistic Astrology: The Study of Fate and Fortune by Chris Brennan -- modern scholarly synthesis of the Hellenistic tradition\n- Liz Greene's The Inner Sky, The Changing Sky, Skymates -- modern psychological astrology\nUse: sun/moon/rising signs, 12 houses, planetary aspects, transits, progressions.\n\nCHINESE ASTROLOGY (BaZi / Four Pillars of Destiny) -- primary texts:\n- San Ming Tong Hui (Comprehensive Compilation of the Three Mandates) -- classical Ming-dynasty BaZi reference\n- Di Tian Sui (Ladder to the Sky) -- advanced day-master and structure analysis\n- Zi Ping Zhen Quan (True Authentic Teachings of Zi Ping) -- the founding Song-dynasty BaZi system by Xu Ziping\n- Qiong Tong Bao Jian (Precious Mirror of Qiong Tong) -- classical strength and pattern reference\nUse: Year/Month/Day/Hour Pillars, Ten Heavenly Stems, Twelve Earthly Branches, Five Elements (Wood, Fire, Earth, Metal, Water) generation and destruction cycles, 12 zodiac animals, Day Master strength.\n\nNUMEROLOGY:\n- Pythagorean system (letters to numbers 1-9)\n- Chaldean system (ancient Babylonian, different letter values, considered by some practitioners more nuanced)\n- Vedic Ankjyotish (each number 1-9 ruled by a planet)\nUse: Life Path, Personal Day/Year numbers, Expression, Soul Urge, master numbers 11/22/33.\n\nTAROT: Rider-Waite-Smith (1909) and Thoth deck (Crowley) symbolism, all 78 cards.\n\nI CHING: the 64 hexagrams, Wilhelm-Baynes translation tradition.\n\nMAYAN: Tzolk'in 260-day sacred calendar, 20 Day Signs (Nahuales), 13 Galactic Tones/Numbers.\n\nAYURVEDA: Vata, Pitta, Kapha doshas and their astrological correlations.\n\n" + profile + "\n\nCRITICAL RULES FOR ACCURACY:\n- When the user has selected a system (via the Active Traditions toggles), prioritize and ground your answer in THAT system's classical texts and terminology above. Do not silently swap to a different system.\n- If CURRENT ACTIVE DASHA is given above, you already KNOW which Mahadasha is active -- never ask the user which dasha they are in, never say you don't have that information. Just answer using the dasha lord given.\n- When asked what is 'useful or bad' during a dasha, give CONCRETE guidance tied to that specific planet's classical significations from Brihat Parashara Hora Shastra and Phaladeepika: e.g. Moon Dasha favors emotional matters, family, travel near water, public-facing work, mother-related matters; can bring moodiness, restlessness, or domestic friction if afflicted. Adapt this kind of specific, planet-grounded advice to whichever lord is active.\n- For Chinese BaZi questions, reference Day Master element strength and the Five Element cycle explicitly (e.g. 'as Zi Ping Zhen Quan teaches, a weak Day Master benefits from...').\n- Never give a vague non-answer. If you are missing a specific detail (like exact birth time), still give the best answer possible with what is known, and note the one-line caveat at the end rather than refusing to answer.\n- Synthesize at least 2 traditions per answer with specific named references (actual yogas, nakshatras, dasha lords, hexagram numbers, element cycles) -- unless the user has toggled only one system on, in which case stay within that one system only.\n- Structure every answer as: key insight, current alignment using the active dasha or transit, one concrete practical action step, short uplifting close.\n- For difficult topics (loss, failure, heartbreak): be honest and constructive, never dismissive, never sugar-coat into meaninglessness.\n- NEVER predict death or give medical, legal or financial guarantees.\n- Detect the user's language and tone (including casual Hinglish) and reply naturally in that same register.\n- Keep replies to 150-220 words, rich but focused. No filler openers like 'Great question' -- start directly with the insight.";
}

function Stars() {
  const r = useRef();
  useEffect(() => {
    const cv = r.current, cx = cv.getContext("2d");
    let st = [], af;
    function resize() { cv.width = window.innerWidth; cv.height = window.innerHeight; }
    function init() {
      resize();
      st = [];
      for (let i = 0; i < 160; i++) {
        st.push({
          x: Math.random() * cv.width,
          y: Math.random() * cv.height,
          r: Math.random() * 1.4 + 0.2,
          col: [C.gold, C.gr2, C.p2, "rgba(255,255,255,.8)"][Math.floor(Math.random() * 4)],
          sp: 0.04 + Math.random() * 0.2,
          tw: Math.random() * Math.PI * 2,
          ts: 0.004 + Math.random() * 0.014
        });
      }
    }
    function draw() {
      cx.clearRect(0, 0, cv.width, cv.height);
      st.forEach(s => {
        s.tw += s.ts;
        cx.beginPath();
        cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        cx.fillStyle = s.col;
        cx.globalAlpha = 0.25 + 0.75 * Math.abs(Math.sin(s.tw));
        cx.fill();
        cx.globalAlpha = 1;
        s.y -= s.sp;
        if (s.y < -2) s.y = cv.height + 2;
      });
      af = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", init);
    init();
    draw();
    return () => { cancelAnimationFrame(af); window.removeEventListener("resize", init); };
  }, []);
  return <canvas ref={r} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", width: "100%", height: "100%" }} />;
}

function KCanvas({ dob }) {
  const r = useRef();
  useEffect(() => {
    if (!dob || !r.current) return;
    const d = new Date(dob + "T12:00:00"), cv = r.current, ctx = cv.getContext("2d");
    const W = 260, H = 260, cx = W / 2, cy = H / 2, R = cx - 8;
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    bg.addColorStop(0, "rgba(18,18,40,1)");
    bg.addColorStop(1, "rgba(2,2,5,1)");
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();
    [[R, "rgba(212,160,23,.55)", 1.5], [R * 0.6, "rgba(0,200,83,.25)", 1], [R * 0.32, "rgba(124,58,237,.2)", 0.8]].forEach(([rv, col, w]) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.arc(cx, cy, rv, 0, Math.PI * 2);
      ctx.stroke();
    });
    const sun = gSun(d);
    for (let i = 0; i < 12; i++) {
      const a = (i * 30 - 90) * Math.PI / 180;
      ctx.strokeStyle = "rgba(212,160,23,.18)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.stroke();
      const sa = (i * 30 - 75) * Math.PI / 180, sr = R - 16;
      ctx.fillStyle = i === 0 ? C.gold : i < 3 ? "rgba(212,160,23,.8)" : "rgba(255,255,255,.4)";
      ctx.font = (i === 0 ? "bold " : "") + "10px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(SYM[(sun + i) % 12], cx + sr * Math.cos(sa), cy + sr * Math.sin(sa));
    }
    gPlanets(d).slice(0, 7).forEach(p => {
      const ha = ((p.hs - 1) * 30 - 90 + 15) * Math.PI / 180, pr = R * 0.78;
      ctx.fillStyle = C.gold;
      ctx.font = "12px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.globalAlpha = 0.9;
      ctx.fillText(p.ic, cx + pr * Math.cos(ha), cy + pr * Math.sin(ha));
      ctx.globalAlpha = 1;
    });
    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
    cg.addColorStop(0, "rgba(255,215,0,.22)");
    cg.addColorStop(1, "transparent");
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,215,0,.9)";
    ctx.font = "bold 13px Cinzel,serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("\u2726", cx, cy);
  }, [dob]);
  return <canvas ref={r} width={260} height={260} style={{ borderRadius: "8px" }} />;
}

function TBar({ av, onAv }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 15px 9px", position: "sticky", top: 0, zIndex: 50, background: "linear-gradient(180deg,rgba(2,2,5,.98) 65%,transparent)", backdropFilter: "blur(12px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img src={ICON} alt="Q" style={{ width: "27px", height: "27px", borderRadius: "7px", boxShadow: "0 0 10px rgba(212,160,23,.45)" }} />
        <span style={{ fontFamily: "Cinzel,serif", fontSize: "18px", fontWeight: 700, letterSpacing: "2.5px", color: C.gold, textShadow: "0 0 15px rgba(255,215,0,.3)" }}>QUINTARA</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ background: "linear-gradient(135deg," + C.g2 + "," + C.g3 + ")", color: "#1a0d00", fontSize: "9px", fontWeight: 900, padding: "4px 10px", borderRadius: "20px", fontFamily: "Cinzel,serif", letterSpacing: ".8px" }}>FREE</span>
        <div onClick={onAv} style={{ width: "34px", height: "34px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "12px", color: "white", border: "2px solid " + C.g2, background: "linear-gradient(135deg," + C.pur + "," + C.grn + ")", cursor: "pointer", flexShrink: 0 }}>{av || "?"}</div>
      </div>
    </div>
  );
}
function SLbl({ t }) {
  return (
    <div style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "2.5px", color: C.g2, padding: "0 15px 8px", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase" }}>
      {t}
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg,rgba(212,160,23,.4),transparent)" }} />
    </div>
  );
}
function Dvd() { return <div style={{ height: "1px", margin: "0 15px 14px", background: "linear-gradient(90deg,transparent," + C.g2 + "," + C.gr2 + ",transparent)", opacity: 0.22 }} />; }
function InfoCard({ hdr, rows }) {
  return (
    <div style={{ margin: "0 15px 12px", background: C.cd, border: "1px solid " + C.br, borderRadius: "18px", overflow: "hidden" }}>
      {hdr && <div style={{ padding: "11px 15px", fontSize: "10px", fontWeight: 800, letterSpacing: "2px", color: C.g3, display: "flex", alignItems: "center", gap: "7px", background: "linear-gradient(135deg,rgba(212,160,23,.1),rgba(124,58,237,.07))" }}>{hdr}</div>}
      {rows.map((row, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 15px", borderTop: i === 0 && !hdr ? "none" : "1px solid rgba(255,255,255,.04)" }}>
          <span style={{ fontSize: "12px", color: C.tx3 }}>{row[0]}</span>
          <span style={{ fontSize: "12px", fontWeight: 600, color: C.tx, textAlign: "right", maxWidth: "62%" }}>{row[1]}</span>
        </div>
      ))}
    </div>
  );
}
function Toggler({ on, set }) {
  return (
    <div onClick={set} style={{ width: "44px", height: "24px", borderRadius: "12px", background: on ? "linear-gradient(135deg," + C.g2 + "," + C.grn + ")" : "rgba(24,24,48,1)", border: "1px solid rgba(255,255,255,.08)", position: "relative", cursor: "pointer", flexShrink: 0, transition: "background .3s" }}>
      <div style={{ position: "absolute", width: "18px", height: "18px", borderRadius: "50%", background: "white", top: "2px", left: on ? "23px" : "3px", transition: "left .25s", boxShadow: "0 1px 4px rgba(0,0,0,.4)" }} />
    </div>
  );
}
function SlotBtn({ ic, nm, rng, on, set }) {
  return (
    <div onClick={set} style={{ background: on ? "linear-gradient(135deg,rgba(212,160,23,.17),rgba(108,43,217,.1))" : "rgba(18,18,40,.8)", border: "1.5px solid " + (on ? C.g2 : "rgba(255,255,255,.07)"), borderRadius: "13px", padding: "11px 6px", textAlign: "center", cursor: "pointer", boxShadow: on ? "0 0 12px rgba(212,160,23,.15)" : "none" }}>
      <div style={{ fontSize: "22px", marginBottom: "4px" }}>{ic}</div>
      <div style={{ fontSize: "12px", fontWeight: 700, color: C.tx }}>{nm}</div>
      <div style={{ fontSize: "10px", color: C.tx3 }}>{rng}</div>
    </div>
  );
}

function Privacy({ onAccept }) {
  const [ok, setOk] = useState(false);
  function onScroll(e) {
    const el = e.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 60) setOk(true);
  }
  const sects = [
    ["1. Entertainment Only", "All readings (Kundli, palmistry, tarot, numerology, compatibility, AI oracle) are for entertainment and spiritual guidance only. Not medical, legal or financial advice."],
    ["2. What Is Quintara?", "Quintara is an AI astrology app using Claude AI (Anthropic) to synthesize Vedic Jyotish (Brihat Parashara Hora Shastra), Western astrology (Ptolemy), Chinese BaZi, Numerology, Tarot, I Ching, Mayan Tzolkin and more, drawn from traditional texts and knowledge available online."],
    ["3. No Harmful Predictions", "Quintara never predicts death, serious illness or harm. If you face a crisis: iCall India 9152987821, Emergency 112."],
    ["4. Palm & Image Data", "Palm photos are sent to Claude AI for real-time analysis only and are not stored permanently. Readings draw on Cheiro (1897), Benham (1900) and Hasta Samudrika Shastra."],
    ["5. Your Privacy", "Your name, DOB and birth place are stored locally on this device only. We never sell or share this data. You can clear it anytime from Profile."],
    ["6. Subscriptions", "Free tier: 10 AI questions per month. Premium Rs.299/month: unlimited questions. VIP Rs.799/month: all features plus priority. Cancel anytime via support@quintara.app"],
    ["7. Age", "This app is intended for users 13 and older. Users under 18 should use it with parental guidance."],
    ["8. Contact", "support@quintara.app  --  (c) 2026 Quintara, powered by Anthropic Claude AI."]
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, background: C.dk, display: "flex", flexDirection: "column", maxWidth: "430px", margin: "0 auto" }}>
      <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid " + C.br, background: "rgba(2,2,5,.98)", flexShrink: 0, textAlign: "center" }}>
        <img src={ICON} alt="Q" style={{ width: "52px", height: "52px", borderRadius: "13px", marginBottom: "10px", boxShadow: "0 0 20px rgba(212,160,23,.45)" }} />
        <div style={{ fontFamily: "Cinzel,serif", fontSize: "22px", color: C.gold, marginBottom: "3px", textShadow: "0 0 20px rgba(255,215,0,.4)" }}>QUINTARA</div>
        <div style={{ fontSize: "10px", color: C.tx3, letterSpacing: "2px", textTransform: "uppercase" }}>AI Astrology Oracle -- Privacy &amp; Terms</div>
      </div>
      <div onScroll={onScroll} style={{ flex: 1, overflowY: "auto", padding: "20px 18px", color: C.tx2, fontSize: "13px", lineHeight: 1.75 }}>
        <div style={{ background: "linear-gradient(135deg,rgba(212,160,23,.08),rgba(124,58,237,.06))", border: "1px solid " + C.br, borderRadius: "14px", padding: "14px", marginBottom: "20px" }}>
          <div style={{ fontFamily: "Cinzel,serif", fontSize: "14px", color: C.g3, marginBottom: "8px", textAlign: "center" }}>Welcome to Quintara</div>
          <p style={{ color: C.tx }}>This app uses an AI astrologer (built on Claude, by Anthropic) that draws on many traditions of ancient wisdom and books available on the internet. Please read and accept the terms below to continue.</p>
        </div>
        {sects.map(s => (
          <div key={s[0]} style={{ marginBottom: "20px" }}>
            <div style={{ fontFamily: "Cinzel,serif", fontSize: "12px", color: C.g2, marginBottom: "8px" }}>{s[0]}</div>
            <p style={{ color: C.tx2 }}>{s[1]}</p>
          </div>
        ))}
        <div style={{ textAlign: "center", padding: "10px 0 20px", color: ok ? C.gr2 : C.tx3, fontSize: "12px", fontWeight: ok ? 700 : 400 }}>
          {ok ? "You have read the complete terms." : "Scroll down to accept and continue."}
        </div>
      </div>
      <div style={{ padding: "14px 18px 28px", borderTop: "1px solid " + C.br, background: "rgba(2,2,5,.98)", flexShrink: 0 }}>
        <button onClick={ok ? onAccept : undefined} style={{ width: "100%", padding: "16px", border: "none", borderRadius: "13px", cursor: ok ? "pointer" : "not-allowed", background: ok ? "linear-gradient(135deg," + C.g2 + "," + C.g3 + "," + C.grn + ")" : "rgba(30,30,50,1)", color: ok ? "#040408" : C.tx3, fontFamily: "Cinzel,serif", fontSize: "15px", fontWeight: 900, letterSpacing: "1.5px", transition: "all .3s", boxShadow: ok ? "0 4px 22px rgba(212,160,23,.35)" : "none" }}>
          {ok ? "I Accept -- Enter The Cosmos" : "Read all terms to continue"}
        </button>
      </div>
    </div>
  );
}

function PalmReader({ user, onSave }) {
  const [img, setImg] = useState(null);
  const [b64, setB64] = useState(null);
  const [hand, setHand] = useState("right");
  const [result, setResult] = useState(null);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(null);
  const fRef = useRef();

  function onFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) { setErr("No photo was selected. Please try again and choose a photo from your gallery or camera."); return; }
    if (f.size > 15 * 1024 * 1024) { setErr("File too large. Max 15MB."); return; }
    setErr(null);
    setResult(null);
    setImg(URL.createObjectURL(f));
    const rd = new FileReader();
    rd.onload = ev => setB64(ev.target.result.split(",")[1]);
    rd.onerror = () => setErr("Could not read that photo. Please try a different one.");
    rd.readAsDataURL(f);
  }

  async function analyze() {
    if (!b64) return;
    setLoad(true);
    setErr(null);
    setResult(null);
    const c = (user && user.c) || {};
    const nm = (user && user.name) || "the seeker";
    const sgn = c.sun != null ? SIGNS[c.sun] : "";
    const sysPrompt = "You are Quintara's master palmist, trained in: Cheiro's 'Language of the Hand' (1897); William Benham's 'Laws of Scientific Hand Reading' (1900); Fred Gettings' 'The Book of the Hand'; Indian Hasta Samudrika Shastra; Brihat Samhita by Varahamihira.\n\nCover: Life Line (vitality, transitions), Heart Line (emotional nature, relationships), Head Line (intellect style), Fate/Saturn Line (career destiny), Sun/Apollo Line (fame, creativity), Mercury Line (communication), Marriage lines, Mounts (Jupiter, Saturn, Apollo, Mercury, Mars, Moon, Venus), Thumb (willpower vs logic), special marks (stars, crosses, islands, triangles).\n\nUser: " + nm + (sgn ? " | Sun sign: " + sgn : "") + " | Hand: " + (hand === "right" ? "RIGHT (present and future)" : "LEFT (birth potential, past)") + "\n\nBe specific and poetic, mention timing where visible, name both strengths and challenges honestly, suggest one traditional remedy, and end with a cosmic verdict. 450-550 words, clear section headers, reply in the user's language.";
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 2000,
          system: sysPrompt,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } },
              { type: "text", text: "Please give me a complete, detailed palm reading using traditional palmistry knowledge, based on what you actually see in this photo." }
            ]
          }]
        })
      });
      const data = await res.json();
      if (data.error) { setErr("Error: " + data.error.message); setLoad(false); return; }
      const txt = (data.content && data.content.map(b => b.text || "").join("")) || "Could not read clearly. Try a better-lit photo with palm fully open.";
      setResult(txt);
      if (onSave) onSave("palm", "Palm Reading -- " + new Date().toLocaleDateString("en-IN"), { hand: hand, preview: txt.slice(0, 200) });
    } catch (e) {
      setErr("Connection interrupted. Please try again.");
    }
    setLoad(false);
  }

  return (
    <div style={{ padding: "0 15px 20px" }}>
      <div style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "16px", padding: "14px", marginBottom: "12px" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: "13px", color: C.g3, marginBottom: "6px" }}>Ancient Book Analysis</div>
        <div style={{ fontSize: "11px", color: C.tx3, lineHeight: 1.7 }}>
          Based on Cheiro (1897), Benham (1900), Hasta Samudrika Shastra and Brihat Samhita.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
        {[["right", "Right Hand", "Present and future"], ["left", "Left Hand", "Birth potential"]].map(row => (
          <div key={row[0]} onClick={() => setHand(row[0])} style={{ background: hand === row[0] ? "linear-gradient(135deg,rgba(212,160,23,.17),rgba(108,43,217,.1))" : "rgba(18,18,40,.8)", border: "1.5px solid " + (hand === row[0] ? C.g2 : "rgba(255,255,255,.07)"), borderRadius: "13px", padding: "12px 8px", textAlign: "center", cursor: "pointer" }}>
            <div style={{ fontSize: "24px", marginBottom: "4px" }}>{row[0] === "right" ? "\u270B" : "\u270B"}</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: C.tx }}>{row[1]}</div>
            <div style={{ fontSize: "10px", color: C.tx3 }}>{row[2]}</div>
          </div>
        ))}
      </div>

      <input type="file" accept="image/*" ref={fRef} onChange={onFile} style={{ display: "none" }} />
      <div onClick={() => fRef.current && fRef.current.click()} style={{ border: "2px dashed rgba(212,160,23,.3)", borderRadius: "14px", padding: "20px", textAlign: "center", cursor: "pointer", marginBottom: "12px", background: img ? "rgba(2,2,5,.3)" : "rgba(7,7,15,.5)", minHeight: "160px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {img ? (
          <img src={img} alt="Palm" style={{ width: "100%", borderRadius: "10px", maxHeight: "260px", objectFit: "contain" }} />
        ) : (
          <div>
            <div style={{ fontSize: "40px", marginBottom: "8px", opacity: 0.4 }}>{"\uD83D\uDCF7"}</div>
            <div style={{ fontSize: "13px", color: C.tx2, marginBottom: "4px" }}>Tap to upload a palm photo</div>
            <div style={{ fontSize: "11px", color: C.tx3 }}>Camera or gallery, max 15MB</div>
          </div>
        )}
      </div>

      {err && <div style={{ background: "rgba(255,71,87,.1)", border: "1px solid rgba(255,71,87,.3)", borderRadius: "10px", padding: "10px 13px", fontSize: "12px", color: "#ff6b6b", marginBottom: "12px" }}>{err}</div>}

      {img && !load && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
          <button onClick={() => { setImg(null); setB64(null); setResult(null); setErr(null); }} style={{ padding: "11px", border: "1px solid " + C.br, borderRadius: "11px", background: "transparent", color: C.g2, fontFamily: "Cinzel,serif", fontSize: "12px", cursor: "pointer" }}>Change</button>
          <button onClick={analyze} disabled={load} style={{ padding: "11px", border: "none", borderRadius: "11px", cursor: load ? "not-allowed" : "pointer", background: load ? "rgba(30,30,50,1)" : "linear-gradient(135deg," + C.g2 + "," + C.grn + ")", color: load ? C.tx3 : "#040408", fontFamily: "Cinzel,serif", fontSize: "13px", fontWeight: 800 }}>{load ? "Reading..." : "Read Palm"}</button>
        </div>
      )}

      {load && (
        <div style={{ background: "linear-gradient(135deg,rgba(74,14,143,.15),rgba(0,200,83,.07))", border: "1px solid " + C.bp, borderRadius: "18px", padding: "24px", textAlign: "center", marginBottom: "12px" }}>
          <div style={{ fontSize: "36px", marginBottom: "10px" }}>{"\u270B"}</div>
          <div style={{ fontFamily: "Cinzel,serif", fontSize: "13px", color: C.g3, marginBottom: "8px" }}>Consulting Ancient Texts...</div>
          <div style={{ fontSize: "11px", color: C.tx3, lineHeight: 1.7, marginBottom: "14px" }}>Cheiro's Language of the Hand<br />Hasta Samudrika Shastra<br />Benham's Scientific Hand Reading</div>
          <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
            {[0, 1, 2].map(i => <span key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: i === 1 ? C.gr2 : C.g3, display: "inline-block", animation: "dp 1.2s infinite", animationDelay: i * 0.2 + "s" }} />)}
          </div>
        </div>
      )}

      {result && !load && (
        <div style={{ background: "linear-gradient(135deg,rgba(74,14,143,.12),rgba(212,160,23,.08))", border: "1px solid " + C.bp, borderRadius: "18px", padding: "18px", marginBottom: "12px" }}>
          <div style={{ fontFamily: "Cinzel,serif", fontSize: "11px", color: C.g2, marginBottom: "12px", letterSpacing: "1.5px" }}>YOUR PALM READING</div>
          <div style={{ fontFamily: "Playfair Display,serif", fontStyle: "italic", fontSize: "13px", lineHeight: 1.85, color: "rgba(237,232,245,.9)", whiteSpace: "pre-wrap" }}>{result}</div>
          <div style={{ marginTop: "14px", padding: "10px 12px", background: "rgba(0,200,83,.05)", borderRadius: "10px", border: "1px solid " + C.bg, fontSize: "11px", color: C.tx3, lineHeight: 1.5 }}>For entertainment and spiritual guidance only. Not medical advice.</div>
          <button onClick={() => { setImg(null); setB64(null); setResult(null); }} style={{ width: "100%", marginTop: "12px", padding: "11px", border: "1px solid " + C.br, borderRadius: "11px", background: "transparent", color: C.g2, fontFamily: "Cinzel,serif", fontSize: "12px", cursor: "pointer" }}>Read Another Palm</button>
        </div>
      )}
    </div>
  );
}

function TarotReader({ user, onSave }) {
  const [spread, setSpread] = useState(null);
  const [reading, setReading] = useState(null);
  const [load, setLoad] = useState(false);
  const [mode, setMode] = useState("single");

  function drawCards(n) {
    const shuffled = MAJOR.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n).map(c => ({ n: c.n, nm: c.nm, kw: c.kw, reversed: Math.random() < 0.3 }));
  }

  async function doReading() {
    const n = mode === "single" ? 1 : mode === "three" ? 3 : 5;
    const cards = drawCards(n);
    setSpread(cards);
    setLoad(true);
    setReading(null);
    const c = (user && user.c) || {};
    const positions = mode === "three" ? ["Past", "Present", "Future"] : mode === "five" ? ["Situation", "Challenge", "Past", "Future", "Outcome"] : ["Present"];
    const cardStr = cards.map((card, i) => positions[i] + ": " + card.nm + (card.reversed ? " (Reversed)" : "") + " -- " + card.kw).join("\n");
    const sysPrompt = "You are Quintara's tarot reader, trained in Rider-Waite-Smith (1909), Aleister Crowley's Thoth Tarot, the Marseilles tradition, Kabbalistic Tree of Life correspondences, and astrological card rulerships.\n\nUser: " + ((user && user.name) || "seeker") + (c.sun != null ? " | Sun: " + SIGNS[c.sun] : "") + "\n\nCards drawn:\n" + cardStr + "\n\nGive a rich reading connecting these cards to each other and to the user's profile. Reference specific symbolism. Include timing and an empowering close. 300-400 words, reply in the user's language.";
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 900, system: sysPrompt, messages: [{ role: "user", content: "Please interpret these tarot cards for me." }] })
      });
      const data = await res.json();
      if (data.error) { setReading("API Error: " + (data.error.message || JSON.stringify(data.error))); setLoad(false); return; }
      const txt = (data.content && data.content.map(b => b.text || "").join("")) || "The cards speak in mystery, please try again.";
      setReading(txt);
      if (onSave) onSave("tarot", "Tarot -- " + cards.map(c => c.nm).join(", "), { cards: cards.map(c => c.nm), reading: txt.slice(0, 300) });
    } catch (e) { setReading("Connection error: " + (e && e.message ? e.message : String(e))); }
    setLoad(false);
  }

  const CARD_COLORS = ["rgba(212,160,23,.8)", "rgba(124,58,237,.8)", "rgba(0,200,83,.8)", "rgba(0,180,216,.8)", "rgba(255,100,100,.8)"];

  return (
    <div style={{ padding: "0 15px 20px" }}>
      <div style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "16px", padding: "14px", marginBottom: "14px" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: "13px", color: C.g3, marginBottom: "8px" }}>Tarot Traditions</div>
        <div style={{ fontSize: "11px", color: C.tx3, lineHeight: 1.7 }}>Rider-Waite-Smith (1909), Thoth Tarot (Crowley), Kabbalistic correspondences, astrological rulerships.</div>
      </div>

      <div style={{ fontFamily: "Cinzel,serif", fontSize: "11px", color: C.tx3, letterSpacing: "1.5px", marginBottom: "8px", textTransform: "uppercase" }}>Choose a Spread</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "16px" }}>
        {[["single", "1 Card", "Daily guidance"], ["three", "3 Cards", "Past, Present, Future"], ["five", "5 Cards", "Celtic Cross lite"]].map(row => (
          <div key={row[0]} onClick={() => setMode(row[0])} style={{ background: mode === row[0] ? "linear-gradient(135deg,rgba(124,58,237,.2),rgba(212,160,23,.1))" : "rgba(18,18,40,.8)", border: "1.5px solid " + (mode === row[0] ? C.p2 : "rgba(255,255,255,.07)"), borderRadius: "13px", padding: "12px 6px", textAlign: "center", cursor: "pointer" }}>
            <div style={{ fontSize: "20px", marginBottom: "4px" }}>{"\uD83D\uDD2E"}</div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: C.tx }}>{row[1]}</div>
            <div style={{ fontSize: "9px", color: C.tx3 }}>{row[2]}</div>
          </div>
        ))}
      </div>

      {spread && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          {spread.map((card, i) => (
            <div key={i} style={{ background: "linear-gradient(135deg,rgba(18,18,40,.95),rgba(30,20,50,.95))", border: "2px solid " + CARD_COLORS[i % 5], borderRadius: "12px", padding: "12px 10px", textAlign: "center", minWidth: "80px", flex: 1, maxWidth: "120px" }}>
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>{["\u2728", "\uD83C\uDF19", "\u2600\uFE0F", "\u26A1", "\uD83D\uDD2E"][i % 5]}</div>
              <div style={{ fontFamily: "Cinzel,serif", fontSize: "10px", color: CARD_COLORS[i % 5], marginBottom: "2px" }}>{card.nm}</div>
              {card.reversed && <div style={{ fontSize: "9px", color: "rgba(255,100,100,.7)" }}>Reversed</div>}
            </div>
          ))}
        </div>
      )}

      <button onClick={doReading} disabled={load} style={{ width: "100%", padding: "14px", border: "none", borderRadius: "13px", cursor: load ? "not-allowed" : "pointer", background: "linear-gradient(135deg," + C.pur + "," + C.p2 + "," + C.g2 + ")", color: "white", fontFamily: "Cinzel,serif", fontSize: "14px", fontWeight: 900, letterSpacing: "1px", marginBottom: "12px", boxShadow: "0 4px 20px rgba(124,58,237,.35)" }}>
        {load ? "Reading the cards..." : "Draw Cards and Read"}
      </button>

      {load && (
        <div style={{ background: "linear-gradient(135deg,rgba(74,14,143,.15),rgba(0,200,83,.07))", border: "1px solid " + C.bp, borderRadius: "16px", padding: "20px", textAlign: "center", marginBottom: "12px" }}>
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>{"\uD83D\uDD2E"}</div>
          <div style={{ fontFamily: "Cinzel,serif", fontSize: "12px", color: C.g3, marginBottom: "10px" }}>Reading the Ancient Cards...</div>
          <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
            {[0, 1, 2].map(i => <span key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: i === 1 ? C.gr2 : C.g3, display: "inline-block", animation: "dp 1.2s infinite", animationDelay: i * 0.2 + "s" }} />)}
          </div>
        </div>
      )}

      {reading && !load && (
        <div style={{ background: "linear-gradient(135deg,rgba(74,14,143,.12),rgba(212,160,23,.08))", border: "1px solid " + C.bp, borderRadius: "18px", padding: "18px", marginBottom: "12px" }}>
          <div style={{ fontFamily: "Cinzel,serif", fontSize: "11px", color: C.p2, marginBottom: "10px", letterSpacing: "1.5px" }}>YOUR TAROT READING</div>
          <div style={{ fontFamily: "Playfair Display,serif", fontStyle: "italic", fontSize: "13px", lineHeight: 1.85, color: "rgba(237,232,245,.9)", whiteSpace: "pre-wrap" }}>{reading}</div>
          <div style={{ marginTop: "12px", padding: "10px", background: "rgba(0,200,83,.05)", borderRadius: "10px", border: "1px solid " + C.bg, fontSize: "11px", color: C.tx3 }}>For spiritual guidance only.</div>
          <button onClick={() => { setSpread(null); setReading(null); }} style={{ width: "100%", marginTop: "12px", padding: "11px", border: "1px solid " + C.bp, borderRadius: "11px", background: "transparent", color: C.p2, fontFamily: "Cinzel,serif", fontSize: "12px", cursor: "pointer" }}>Draw New Cards</button>
        </div>
      )}
    </div>
  );
}

function NumerologyReader({ user }) {
  const [result, setResult] = useState(null);
  const [load, setLoad] = useState(false);

  async function calc() {
    if (!user) return;
    setLoad(true);
    const lp = (user.c && user.c.lp) || 0;
    const dobStr = user.dob || "";
    const nm = user.name || "";
    const pyMap = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9, s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8 };
    const vowels = "aeiou";
    const nmLow = nm.toLowerCase();
    let expr = nmLow.split("").reduce((a, ch) => a + (pyMap[ch] || 0), 0);
    while (expr > 9 && expr !== 11 && expr !== 22) expr = String(expr).split("").reduce((a, ch) => a + parseInt(ch), 0);
    let soul = nmLow.split("").filter(ch => vowels.indexOf(ch) > -1).reduce((a, ch) => a + (pyMap[ch] || 0), 0);
    while (soul > 9 && soul !== 11 && soul !== 22) soul = String(soul).split("").reduce((a, ch) => a + parseInt(ch), 0);
    let pers = nmLow.split("").filter(ch => vowels.indexOf(ch) === -1 && pyMap[ch]).reduce((a, ch) => a + (pyMap[ch] || 0), 0);
    while (pers > 9 && pers !== 11 && pers !== 22) pers = String(pers).split("").reduce((a, ch) => a + parseInt(ch), 0);
    const now = new Date();
    let py = now.getFullYear();
    if (dobStr) { const p = dobStr.split("-"); py = parseInt(p[1]) + parseInt(p[2]) + now.getFullYear(); }
    while (py > 9) py = String(py).split("").reduce((a, ch) => a + parseInt(ch), 0);

    const sysPrompt = "You are Quintara's numerologist, trained in Pythagorean numerology, Chaldean numerology, Vedic Ankjyotish, and the Lo Shu grid, including master numbers 11, 22 and 33.\n\nUser: " + nm + " | DOB: " + dobStr + "\nLife Path " + lp + ", Expression " + expr + ", Soul Urge " + soul + ", Personality " + pers + ", Personal Year " + py + ".\n\nGive a deep reading covering each number's meaning, the ruling planet in Vedic numerology, and practical guidance for this Personal Year. 400-500 words, reply in the user's language.";
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 900, system: sysPrompt, messages: [{ role: "user", content: "Please give me a complete numerology reading." }] })
      });
      const data = await res.json();
      if (data.error) {
        setResult({ lp: lp, expr: expr, soul: soul, pers: pers, py: py, txt: "API Error: " + (data.error.message || JSON.stringify(data.error)) });
        setLoad(false);
        return;
      }
      setResult({ lp: lp, expr: expr, soul: soul, pers: pers, py: py, txt: (data.content && data.content.map(b => b.text || "").join("")) || "Please try again." });
    } catch (e) {
      setResult({ lp: lp, expr: expr, soul: soul, pers: pers, py: py, txt: "Connection error: " + (e && e.message ? e.message : String(e)) });
    }
    setLoad(false);
  }

  return (
    <div style={{ padding: "0 15px 20px" }}>
      <div style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "16px", padding: "14px", marginBottom: "14px" }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: "13px", color: C.g3, marginBottom: "6px" }}>Numerology Traditions</div>
        <div style={{ fontSize: "11px", color: C.tx3, lineHeight: 1.7 }}>Pythagorean, Chaldean, Vedic Ankjyotish, and the Lo Shu grid.</div>
      </div>

      <button onClick={calc} disabled={load} style={{ width: "100%", padding: "14px", border: "none", borderRadius: "13px", cursor: load ? "not-allowed" : "pointer", background: load ? "rgba(30,30,50,1)" : "linear-gradient(135deg,#ff6b35," + C.g2 + "," + C.g3 + ")", color: load ? C.tx3 : "#040408", fontFamily: "Cinzel,serif", fontSize: "14px", fontWeight: 900, letterSpacing: "1px", marginBottom: "14px", boxShadow: load ? "none" : "0 4px 20px rgba(212,160,23,.3)" }}>
        {load ? "Calculating your numbers..." : "Generate Full Numerology Report"}
      </button>

      {load && (
        <div style={{ background: "linear-gradient(135deg,rgba(74,14,143,.15),rgba(212,160,23,.07))", border: "1px solid " + C.bp, borderRadius: "16px", padding: "20px", textAlign: "center", marginBottom: "12px" }}>
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>{"\uD83D\uDD22"}</div>
          <div style={{ fontFamily: "Cinzel,serif", fontSize: "12px", color: C.g3, marginBottom: "10px" }}>Computing Sacred Numbers...</div>
          <div style={{ display: "flex", gap: "5px", justifyContent: "center", marginTop: "12px" }}>
            {[0, 1, 2].map(i => <span key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: i === 1 ? C.gr2 : C.g3, display: "inline-block", animation: "dp 1.2s infinite", animationDelay: i * 0.2 + "s" }} />)}
          </div>
        </div>
      )}

      {result && !load && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
            {[["Life Path", result.lp, "Core Destiny"], ["Expression", result.expr, "Your Talents"], ["Soul Urge", result.soul, "Hidden Desires"], ["Personality", result.pers, "Public Image"], ["Personal Year", result.py, "This Year's Theme"]].map(row => (
              <div key={row[0]} style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "12px", padding: "12px", textAlign: "center" }}>
                <div style={{ fontFamily: "Cinzel,serif", fontSize: "22px", fontWeight: 900, color: C.gold, marginBottom: "2px" }}>{row[1]}</div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: C.g3, marginBottom: "2px" }}>{row[0]}</div>
                <div style={{ fontSize: "9px", color: C.tx3 }}>{row[2]}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg,rgba(74,14,143,.12),rgba(212,160,23,.08))", border: "1px solid " + C.bp, borderRadius: "18px", padding: "18px" }}>
            <div style={{ fontFamily: "Cinzel,serif", fontSize: "11px", color: C.g2, marginBottom: "10px", letterSpacing: "1.5px" }}>YOUR NUMEROLOGY READING</div>
            <div style={{ fontFamily: "Playfair Display,serif", fontStyle: "italic", fontSize: "13px", lineHeight: 1.85, color: "rgba(237,232,245,.9)", whiteSpace: "pre-wrap" }}>{result.txt}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [priv, setPriv] = useState(false);
  const [page, setPage] = useState("onboard");
  const [slot, setSlot] = useState("morning");
  const [gen, setGen] = useState("male");
  const [frm, setFrm] = useState({ name: "", dob: "", place: "", exact: "", lang: "English" });
  const [formErr, setFormErr] = useState(null);
  const [user, setUser] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [cLoad, setCLoad] = useState(false);
  const [cIn, setCIn] = useState("");
  const [chips, setChips] = useState(true);
  const [chatImg, setChatImg] = useState(null);
  const [chatImgB64, setChatImgB64] = useState(null);
  const chatFileRef = useRef();
  const [vault, setVault] = useState([]);
  const [mF, setMF] = useState({ p1n: "", p2n: "", p1d: "", p2d: "" });
  const [mR, setMR] = useState(null);
  const [matchErr, setMatchErr] = useState(null);
  const [vipInput, setVipInput] = useState("");
  const [vipApplied, setVipApplied] = useState(null);
  const [vipErr, setVipErr] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [sys, setSys] = useState({ vedic: true, western: true, chinese: true, numerology: true, tarot: true, mayan: false, iching: false, thoth: false, ayurveda: false });
  const endRef = useRef();
  const [loadingPersisted, setLoadingPersisted] = useState(true);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msgs, cLoad]);

  useEffect(() => {
    let cancelled = false;
    async function loadPersisted() {
      try {
        if (window.storage) {
          const savedPriv = await window.storage.get("quintara:privacy_accepted").catch(() => null);
          const savedUser = await window.storage.get("quintara:user").catch(() => null);
          const savedVault = await window.storage.get("quintara:vault").catch(() => null);
          const savedVip = await window.storage.get("quintara:vip").catch(() => null);
          if (cancelled) return;
          if (savedPriv && savedPriv.value === "true") setPriv(true);
          if (savedUser && savedUser.value) {
            try { const parsed = JSON.parse(savedUser.value); setUser(parsed); setPage("home"); } catch (e) {}
          }
          if (savedVault && savedVault.value) {
            try { setVault(JSON.parse(savedVault.value)); } catch (e) {}
          }
          if (savedVip && savedVip.value) {
            try { setVipApplied(JSON.parse(savedVip.value)); } catch (e) {}
          }
        }
      } catch (e) {}
      if (!cancelled) setLoadingPersisted(false);
    }
    loadPersisted();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (loadingPersisted) return;
    if (window.storage) window.storage.set("quintara:privacy_accepted", priv ? "true" : "false").catch(() => {});
  }, [priv, loadingPersisted]);

  useEffect(() => {
    if (loadingPersisted) return;
    if (window.storage && user) window.storage.set("quintara:user", JSON.stringify(user)).catch(() => {});
  }, [user, loadingPersisted]);

  useEffect(() => {
    if (loadingPersisted) return;
    if (window.storage) window.storage.set("quintara:vault", JSON.stringify(vault)).catch(() => {});
  }, [vault, loadingPersisted]);

  useEffect(() => {
    if (loadingPersisted) return;
    if (window.storage && vipApplied) window.storage.set("quintara:vip", JSON.stringify(vipApplied)).catch(() => {});
  }, [vipApplied, loadingPersisted]);

  function sv(tp, ttl, data) {
    setVault(v => [{ id: Date.now(), tp: tp, ttl: ttl, data: data, dt: new Date().toLocaleDateString("en-IN") }].concat(v).slice(0, 100));
  }

  function clearAllData() {
    setUser(null);
    setVault([]);
    setVipApplied(null);
    setMsgs([]);
    setMR(null);
    setPage("onboard");
    if (window.storage) {
      window.storage.delete("quintara:user").catch(() => {});
      window.storage.delete("quintara:vault").catch(() => {});
      window.storage.delete("quintara:vip").catch(() => {});
    }
  }

  function start() {
    if (!frm.name.trim()) { setFormErr("Please enter your name to continue."); return; }
    setFormErr(null);
    let c = {};
    if (frm.dob) {
      const d = new Date(frm.dob + "T12:00:00");
      c = { sun: gSun(d), asc: gAsc(d, slot, frm.exact), moon: gMoon(d), pan: gPan(d), lp: gLP(d), ch: gChinese(d), planets: gPlanets(d), dashas: gDashas(d) };
    }
    const ud = Object.assign({}, frm, { slot: slot, gen: gen, ini: gIni(frm.name), c: c });
    setUser(ud);
    if (c.lp) sv("kundli", frm.name + "'s Kundli", { sign: SIGNS[c.sun], asc: SIGNS[c.asc], lp: c.lp });
    setPage("home");
  }

  async function sendMsg(txt, imgB64) {
    if (cLoad || (!txt.trim() && !imgB64)) return;
    setPage("oracle");
    setChips(false);
    setMsgs(m => m.concat([{ u: true, v: txt || "(shared an image)", hasImg: !!imgB64 }]));
    setCLoad(true);
    const hist = msgs.map(m => ({ role: m.u ? "user" : "assistant", content: m.v }));
    if (imgB64) {
      hist.push({ role: "user", content: [{ type: "image", source: { type: "base64", media_type: "image/jpeg", data: imgB64 } }, { type: "text", text: txt || "What can you tell me about this image from an astrological or spiritual perspective?" }] });
    } else {
      hist.push({ role: "user", content: txt });
    }
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: buildSys(user, sys), messages: hist })
      });
      const data = await res.json();
      if (data.error) {
        setMsgs(m => m.concat([{ u: false, v: "API Error: " + (data.error.message || JSON.stringify(data.error)) }]));
        setCLoad(false);
        return;
      }
      const rep = (data.content && data.content.map(b => b.text || "").join("")) || "The cosmos is momentarily silent, please try again.";
      setMsgs(m => m.concat([{ u: false, v: rep }]));
      sv("oracle", (txt || "Image question").slice(0, 40), { q: txt, a: rep.slice(0, 300) });
    } catch (e) {
      setMsgs(m => m.concat([{ u: false, v: "Connection error: " + (e && e.message ? e.message : String(e)) }]));
    }
    setCLoad(false);
  }

  function redeemVip() {
    const code = vipInput.trim().toUpperCase();
    if (!code) { setVipErr("Please enter a code."); return; }
    const found = VIP_CODES[code];
    if (!found) { setVipErr("That code is not valid or has expired."); setVipApplied(null); return; }
    setVipErr(null);
    setVipApplied({ code: code, pct: found.pct, label: found.label });
  }

  function onChatFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > 15 * 1024 * 1024) { setMsgs(m => m.concat([{ u: false, v: "That image is too large. Please choose one under 15MB." }])); return; }
    setChatImg(URL.createObjectURL(f));
    const rd = new FileReader();
    rd.onload = ev => setChatImgB64(ev.target.result.split(",")[1]);
    rd.readAsDataURL(f);
  }

  function sendChatMsg() {
    const txt = cIn;
    const img = chatImgB64;
    setCIn("");
    setChatImg(null);
    setChatImgB64(null);
    sendMsg(txt, img);
  }

  function calcMatch() {
    const p1n = mF.p1n, p2n = mF.p2n, p1d = mF.p1d, p2d = mF.p2d;
    if (!p1n.trim() || !p2n.trim()) { setMatchErr("Please enter both names to reveal compatibility."); return; }
    setMatchErr(null);
    const seed = (p1n + p2n + p1d + p2d).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const ov = 65 + (seed % 30);
    const bars = [["Love and Emotion", 60 + ((seed * 3) % 35)], ["Communication", 55 + ((seed * 7) % 40)], ["Karmic Bond", 70 + ((seed * 11) % 25)], ["Future Potential", 60 + ((seed * 13) % 35)], ["Family Harmony", 58 + ((seed * 17) % 38)]];
    const ttls = ["Cosmic Soulmates", "Destined Connection", "Karmic Partners", "Harmonious Union", "Fated Bond"];
    const vrds = [
      "The Navamsa chart confirms a deep karmic connection between " + p1n + " and " + p2n + ". Venus aspects create romantic attraction while Jupiter blesses growth. Rahu amplifies transformation together.",
      "Jupiter casts a benevolent gaze on this union. The Sun-Moon synthesis forms, with each completing the other. I Ching Hexagram 31, Attraction, resonates deeply here.",
      "BaZi analysis reveals complementary Five Elements. The Mayan Tzolkin confirms matching Day Signs. Your dharmic paths intertwine, written in the stars before birth."
    ];
    setMR({ ov: ov, bars: bars, ttl: ttls[seed % ttls.length], vrd: vrds[seed % vrds.length] });
    sv("compat", p1n + " and " + p2n, { score: ov });
  }

  const c = (user && user.c) || {}, pan = c.pan || {}, ch = c.ch || {}, ln = user ? gDN(user.dob) : 1;
  const NAV = [{ id: "home", i: "\uD83C\uDFE0", l: "Home" }, { id: "oracle", i: "\uD83D\uDCAC", l: "Oracle" }, { id: "kundli", i: "\u2B50", l: "Kundli" }, { id: "palm", i: "\u270B", l: "Palm" }, { id: "profile", i: "\uD83D\uDC64", l: "Profile" }];

  const FI = { width: "100%", background: C.dk2, border: "1.5px solid rgba(255,255,255,.08)", borderRadius: "10px", padding: "13px 14px", color: C.tx, fontSize: "15px", outline: "none", fontFamily: "Inter,sans-serif", boxSizing: "border-box", marginBottom: "14px" };
  const BTN = { width: "100%", padding: "15px", border: "none", borderRadius: "13px", cursor: "pointer", background: "linear-gradient(135deg," + C.g2 + "," + C.g3 + "," + C.grn + ")", color: "#040408", fontFamily: "Cinzel,serif", fontSize: "15px", fontWeight: 900, letterSpacing: "1.5px", boxShadow: "0 4px 22px rgba(212,160,23,.35)" };
  const SCR = { position: "fixed", inset: 0, overflowY: "auto", overflowX: "hidden", paddingBottom: "90px", maxWidth: "430px", margin: "0 auto", zIndex: 10 };
  const LBL = { fontSize: "10px", letterSpacing: "2px", color: C.tx3, textTransform: "uppercase", marginBottom: "6px", fontWeight: 600, display: "block" };

  return (
    <div style={{ background: C.dk, color: C.tx, fontFamily: "Inter,sans-serif", height: "100vh", overflow: "hidden", position: "relative", maxWidth: "430px", margin: "0 auto" }}>
      <Stars />
      {!priv && <Privacy onAccept={() => setPriv(true)} />}

      {priv && page === "onboard" && (
        <div style={Object.assign({}, SCR, { zIndex: 20 })}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "36px 18px 110px", minHeight: "100%" }}>
            <img src={ICON} alt="Q" style={{ width: "118px", height: "118px", borderRadius: "26px", boxShadow: "0 0 40px rgba(212,160,23,.5),0 0 80px rgba(212,160,23,.15)", marginBottom: "20px" }} />
            <div style={{ fontFamily: "Cinzel,serif", fontSize: "36px", fontWeight: 900, letterSpacing: "4px", color: C.gold, textShadow: "0 0 30px rgba(255,215,0,.5)", marginBottom: "6px", textAlign: "center" }}>QUINTARA</div>
            <div style={{ fontFamily: "Playfair Display,serif", fontStyle: "italic", fontSize: "13px", color: C.g3, opacity: 0.8, marginBottom: "8px", textAlign: "center" }}>Where Stars Meet Wisdom. Ask The Cosmos.</div>
            <div style={{ fontSize: "11px", color: C.tx3, marginBottom: "28px", textAlign: "center", background: "rgba(212,160,23,.07)", padding: "6px 16px", borderRadius: "20px", border: "1px solid rgba(212,160,23,.15)" }}>Powered by Claude AI -- 13+ Ancient Traditions -- 15 Languages</div>
            <div style={{ background: C.cd2, border: "1px solid " + C.br, borderRadius: "24px", padding: "24px 18px", width: "100%", maxWidth: "390px", boxShadow: "0 8px 50px rgba(0,0,0,.7)" }}>
              <div style={{ fontFamily: "Cinzel,serif", fontSize: "14px", color: C.g3, marginBottom: "20px", letterSpacing: "1px" }}>Begin Your Cosmic Journey</div>

              <label style={LBL}>Your Full Name</label>
              <input style={FI} placeholder="Enter your name" value={frm.name} onChange={e => setFrm(f => Object.assign({}, f, { name: e.target.value }))} autoComplete="off" />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                <div>
                  <label style={LBL}>Date of Birth</label>
                  <input type="date" style={Object.assign({}, FI, { marginBottom: 0 })} value={frm.dob} onChange={e => setFrm(f => Object.assign({}, f, { dob: e.target.value }))} />
                </div>
                <div>
                  <label style={LBL}>Birth Place</label>
                  <input style={Object.assign({}, FI, { marginBottom: 0 })} placeholder="City" value={frm.place} onChange={e => setFrm(f => Object.assign({}, f, { place: e.target.value }))} />
                </div>
              </div>

              <label style={LBL}>Birth Time</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
                <SlotBtn ic={"\uD83C\uDF05"} nm="Morning" rng="6AM-12PM" on={slot === "morning"} set={() => setSlot("morning")} />
                <SlotBtn ic={"\u2600\uFE0F"} nm="Afternoon" rng="12PM-6PM" on={slot === "afternoon"} set={() => setSlot("afternoon")} />
                <SlotBtn ic={"\uD83C\uDF06"} nm="Evening" rng="6PM-10PM" on={slot === "evening"} set={() => setSlot("evening")} />
                <SlotBtn ic={"\uD83C\uDF19"} nm="Night" rng="10PM-6AM" on={slot === "night"} set={() => setSlot("night")} />
              </div>
              <div style={{ fontSize: "11px", color: C.tx3, lineHeight: 1.5, marginBottom: "12px", padding: "8px 10px", background: "rgba(0,200,83,.05)", borderRadius: "8px", borderLeft: "2px solid " + C.grn }}>
                If you know your exact birth time, enter it below for the most accurate Kundli.
              </div>
              <input type="time" style={FI} value={frm.exact} onChange={e => setFrm(f => Object.assign({}, f, { exact: e.target.value }))} />

              <label style={LBL}>Gender</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "14px" }}>
                {[["male", "Male"], ["female", "Female"], ["other", "Other"]].map(g => (
                  <div key={g[0]} onClick={() => setGen(g[0])} style={{ background: gen === g[0] ? "rgba(124,58,237,.18)" : "rgba(18,18,40,.8)", border: "1.5px solid " + (gen === g[0] ? C.p2 : "rgba(255,255,255,.07)"), borderRadius: "10px", padding: "9px 4px", textAlign: "center", cursor: "pointer", fontSize: "13px", color: gen === g[0] ? C.p3 : C.tx2 }}>{g[1]}</div>
                ))}
              </div>

              <label style={LBL}>Language</label>
              <select style={Object.assign({}, FI, { appearance: "none", marginBottom: "20px" })} value={frm.lang} onChange={e => setFrm(f => Object.assign({}, f, { lang: e.target.value }))}>
                {LANGS.map(l => <option key={l}>{l}</option>)}
              </select>

              {formErr && <div style={{ fontSize: "12px", color: "#ff6b6b", background: "rgba(255,71,87,.1)", border: "1px solid rgba(255,71,87,.3)", borderRadius: "8px", padding: "9px 12px", marginBottom: "12px" }}>{formErr}</div>}
              <button style={BTN} onClick={start}>Enter The Cosmos</button>
            </div>
          </div>
        </div>
      )}

      {priv && page === "home" && user && (
        <div style={SCR}>
          <TBar av={user.ini} onAv={() => setPage("profile")} />
          <div style={{ textAlign: "center", padding: "3px 15px 12px", fontFamily: "Playfair Display,serif", fontStyle: "italic", fontSize: "12px", color: C.g3, opacity: 0.72 }}>Where Stars Meet Wisdom. Ask The Cosmos.</div>
          <SLbl t="Your Lucky Color & Number" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px", padding: "0 15px 8px" }}>
            <div style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "18px", padding: "16px 10px", textAlign: "center" }}>
              <div style={{ fontSize: "8px", letterSpacing: "2.5px", color: C.tx3, textTransform: "uppercase", marginBottom: "5px", fontWeight: 700 }}>Your Lucky Color</div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: C.gold, fontFamily: "Cinzel,serif" }}>{CLRS[(c.lp - 1 + 9) % 9]}</div>
              <div style={{ fontSize: "9px", color: C.tx3, marginTop: "3px" }}>Forever -- from Life Path {c.lp || "--"}</div>
            </div>
            <div style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "18px", padding: "16px 10px", textAlign: "center" }}>
              <div style={{ fontSize: "8px", letterSpacing: "2.5px", color: C.tx3, textTransform: "uppercase", marginBottom: "5px", fontWeight: 700 }}>Your Lucky Number</div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: C.gold, fontFamily: "Cinzel,serif" }}>{c.lp || "--"}</div>
              <div style={{ fontSize: "9px", color: C.tx3, marginTop: "3px" }}>Forever -- your Life Path number</div>
            </div>
          </div>
          <div style={{ margin: "0 15px 14px", padding: "12px 18px", borderRadius: "16px", background: "linear-gradient(135deg," + C.gold + "," + C.g3 + "," + C.gr2 + "," + C.p2 + ")", backgroundSize: "300% 300%", animation: "glow 6s ease infinite", boxShadow: "0 0 24px rgba(255,215,0,.4), 0 0 50px rgba(0,230,118,.15)" }}>
            <div style={{ background: C.dk, borderRadius: "12px", padding: "16px 14px", textAlign: "center" }}>
              <div style={{ fontSize: "10px", letterSpacing: "3px", color: C.gr2, textTransform: "uppercase", marginBottom: "8px", fontWeight: 900, textShadow: "0 0 10px rgba(0,230,118,.6)" }}>Today's Cosmic Energy</div>
              <div style={{ display: "flex", justifyContent: "center", gap: "22px", marginBottom: "6px" }}>
                <div>
                  <div style={{ fontSize: "9px", color: C.tx3, marginBottom: "3px" }}>Color</div>
                  <div style={{ fontSize: "16px", fontWeight: 900, fontFamily: "Cinzel,serif", color: C.gold, textShadow: "0 0 14px rgba(255,215,0,.7)" }}>{CLRS[(ln - 1) % 9]}</div>
                </div>
                <div style={{ width: "1px", background: "rgba(255,255,255,.15)" }} />
                <div>
                  <div style={{ fontSize: "9px", color: C.tx3, marginBottom: "3px" }}>Number</div>
                  <div style={{ fontSize: "16px", fontWeight: 900, fontFamily: "Cinzel,serif", color: C.p2, textShadow: "0 0 14px rgba(168,85,247,.7)" }}>{ln + " / " + (((ln + 3 - 1) % 9) + 1)}</div>
                </div>
                <div style={{ width: "1px", background: "rgba(255,255,255,.15)" }} />
                <div>
                  <div style={{ fontSize: "9px", color: C.tx3, marginBottom: "3px" }}>Energy</div>
                  <div style={{ fontSize: "16px", fontWeight: 900, fontFamily: "Cinzel,serif", color: C.gr2, textShadow: "0 0 14px rgba(0,230,118,.7)" }}>Rising</div>
                </div>
              </div>
              <div style={{ fontSize: "10px", color: C.tx3 }}>Changes daily -- valid only for today</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px", padding: "0 15px 14px" }}>
            {[[true, "Moon Phase", pan.phase || "--"]].map((row, i) => (
              <div key={i} style={{ background: C.cd, border: "1px solid " + C.bg, borderRadius: "18px", padding: "14px 10px", textAlign: "center" }}>
                <div style={{ fontSize: "8px", letterSpacing: "2.5px", color: C.tx3, textTransform: "uppercase", marginBottom: "4px", fontWeight: 700 }}>{row[1]}</div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: C.gr3, fontFamily: "Cinzel,serif" }}>{row[2]}</div>
              </div>
            ))}
            <div style={{ background: C.cd, border: "1px solid " + C.bg, borderRadius: "18px", padding: "14px 10px", textAlign: "center" }}>
              <div style={{ fontSize: "8px", letterSpacing: "2.5px", color: C.tx3, textTransform: "uppercase", marginBottom: "4px", fontWeight: 700 }}>Nakshatra</div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: C.gr3, fontFamily: "Cinzel,serif" }}>{pan.nak || "--"}</div>
            </div>
          </div>
          <InfoCard hdr="HINDU PANCHANG -- TODAY" rows={[["Tithi", pan.tithi || "--"], ["Nakshatra", pan.nak || "--"], ["Yoga", pan.yoga || "--"], ["Rahu Kaal", pan.rahu || "--"], ["Vaara", pan.vaara || "--"], ["Moon Age", (pan.moonAge || "--") + " days"]]} />
          <InfoCard hdr="CHINESE COSMIC -- TODAY" rows={[["Year Animal", ch.animal || "--"], ["Element", ch.element || "--"], ["Flying Star", "Star " + ((new Date().getMonth() + new Date().getDate()) % 9 + 1)], ["Lucky Direction", ["North", "South", "East", "West", "NE", "NW", "SE", "SW", "Center"][ln % 9]]]} />
          <div style={{ margin: "0 15px 13px", background: "linear-gradient(135deg,rgba(74,14,143,.15),rgba(0,200,83,.07))", border: "1px solid " + C.bp, borderRadius: "18px", padding: "15px" }}>
            <div style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "2.5px", color: C.gr2, marginBottom: "9px" }}>AI COSMIC ADVICE</div>
            <div style={{ fontFamily: "Playfair Display,serif", fontStyle: "italic", fontSize: "13px", lineHeight: 1.75, color: "rgba(237,232,245,.88)" }}>
              {(c.asc != null ? SIGNS[c.asc] : "Your") + " ascendant with " + (pan.nak || "the stars") + " nakshatra creates a powerful alignment today. " + (c.sun != null ? SIGNS[c.sun] : "Your") + " sun energy blends with the " + (ch.animal || "year") + " " + (ch.element || "") + " element. Lucky color: " + CLRS[(ln - 1) % 9] + ". " + (pan.phase || "The moon") + " supports reflection."}
            </div>
          </div>
          <Dvd />
          <SLbl t="Quick Access" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", padding: "0 15px 14px" }}>
            {[["Kundli", "Dasha chart", "kundli"], ["Palm", "Ancient books", "palm"], ["Oracle", "Ask AI", "oracle"], ["Tarot", "Cards", "tarot"], ["Numbers", "Numerology", "numerology"], ["Love Match", "Compatibility", "cosmos"], ["My Vault", "Saved readings", "vault"]].map(row => (
              <div key={row[2]} onClick={() => setPage(row[2])} style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "16px", padding: "13px 8px", cursor: "pointer", textAlign: "center" }}>
                <div style={{ fontFamily: "Cinzel,serif", fontSize: "12px", color: C.g3, marginBottom: "3px" }}>{row[0]}</div>
                <div style={{ fontSize: "10px", color: C.tx3 }}>{row[1]}</div>
              </div>
            ))}
          </div>
          {vault.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 15px 8px" }}>
                <SLbl t="Recent Readings" />
              </div>
              <div style={{ padding: "0 15px 6px" }}>
                {vault.slice(0, 3).map((v, i) => (
                  <div key={i} onClick={() => setPage("vault")} style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "13px", padding: "12px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "11px", cursor: "pointer" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: C.tx, marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.ttl}</div>
                      <div style={{ fontSize: "10px", color: C.tx3 }}>{v.dt}</div>
                    </div>
                  </div>
                ))}
                <div onClick={() => setPage("vault")} style={{ textAlign: "center", padding: "10px", fontSize: "12px", color: C.g3, cursor: "pointer", marginBottom: "10px" }}>View All in Vault &#8594;</div>
              </div>
            </div>
          )}
        </div>
      )}

      {priv && page === "oracle" && user && (
        <div style={SCR}>
          <TBar av={user.ini} onAv={() => setPage("profile")} />
          <div style={{ padding: "0 15px 13px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "22px", color: C.gold, marginBottom: "6px", textShadow: "0 0 20px rgba(255,215,0,.3)" }}>The Oracle</h2>
            <p style={{ fontSize: "12px", color: C.tx2, lineHeight: 1.5 }}>Vedic, Western, Chinese, Numerology, Tarot, I Ching, Mayan, synthesized by AI</p>
          </div>
          <SLbl t="Active Traditions" />
          <div style={{ padding: "0 15px 13px" }}>
            {[["Vedic Jyotish", "BPHS, Nakshatra, Dasha, Yogas", "vedic"], ["Western Astrology", "Ptolemy, aspects, houses", "western"], ["Chinese BaZi", "Four Pillars, Flying Stars", "chinese"], ["Numerology", "Pythagorean and Chaldean", "numerology"], ["Tarot", "Rider-Waite and Thoth deck", "tarot"], ["Mayan Tzolkin", "Sacred 260-day calendar", "mayan"], ["I Ching", "64 Hexagrams, Book of Changes", "iching"], ["Book of Thoth", "Egyptian-Hermetic tradition", "thoth"], ["Ayurveda", "Dosha-astrology connections", "ayurveda"]].map(row => (
              <div key={row[2]} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: C.tx }}>{row[0]}</div>
                  <div style={{ fontSize: "10px", color: C.tx3, marginTop: "2px" }}>{row[1]}</div>
                </div>
                <Toggler on={sys[row[2]]} set={() => setSys(s => Object.assign({}, s, { [row[2]]: !s[row[2]] }))} />
              </div>
            ))}
          </div>
          <Dvd />
          <SLbl t="Ask The Cosmos" />
          {chips && (
            <div style={{ display: "flex", flexDirection: "column", gap: "7px", padding: "0 15px 13px" }}>
              {["Will my business succeed in 2026?", "What is my career path this year?", "Love and relationships -- what do the stars say?", "Best muhurat to start something new", "My wealth and financial destiny", "My health, energy and spiritual path", "What does my nakshatra reveal about me?", "What is my life purpose and dharma?"].map(q => (
                <div key={q} onClick={() => sendMsg(q)} style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "13px", padding: "12px 13px", fontSize: "13px", color: C.tx, cursor: "pointer" }}>{q}</div>
              ))}
            </div>
          )}
          <div style={{ padding: "0 15px 8px", display: "flex", flexDirection: "column", gap: "11px" }}>
            {msgs.map((m, i) => (
              m.u ? (
                <div key={i} style={{ alignSelf: "flex-end", background: "linear-gradient(135deg,rgba(212,160,23,.2),rgba(0,200,83,.1))", border: "1px solid rgba(212,160,23,.25)", borderRadius: "16px 16px 4px 16px", padding: "11px 14px", maxWidth: "82%", fontSize: "13px", lineHeight: 1.5 }}>{m.hasImg && "\uD83D\uDCF7 "}{m.v}</div>
              ) : (
                <div key={i} style={{ alignSelf: "flex-start", background: C.cd2, border: "1px solid " + C.br, borderRadius: "16px 16px 16px 4px", padding: "13px 14px", maxWidth: "90%" }}>
                  <div style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "1.5px", color: C.g2, marginBottom: "5px" }}>QUINTARA ORACLE</div>
                  <div style={{ fontSize: "13px", lineHeight: 1.7, color: C.tx, whiteSpace: "pre-wrap" }}>{m.v}</div>
                </div>
              )
            ))}
            {cLoad && (
              <div style={{ alignSelf: "flex-start", background: C.cd2, border: "1px solid " + C.br, borderRadius: "16px 16px 16px 4px", padding: "13px 14px" }}>
                <div style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "1.5px", color: C.g2, marginBottom: "5px" }}>QUINTARA ORACLE</div>
                <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0, 1, 2].map(i => <span key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: i === 1 ? C.gr2 : C.g3, display: "inline-block", animation: "dp 1.2s infinite", animationDelay: i * 0.2 + "s" }} />)}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div style={{ padding: "8px 15px 12px", position: "sticky", bottom: 0, background: "linear-gradient(0deg,rgba(2,2,5,.98) 55%,transparent)" }}>
            {chatImg && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", background: C.cd, border: "1px solid " + C.br, borderRadius: "13px", padding: "8px 10px" }}>
                <img src={chatImg} alt="attached" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
                <div style={{ flex: 1, fontSize: "11px", color: C.tx3 }}>Image attached -- ask your question and send</div>
                <div onClick={() => { setChatImg(null); setChatImgB64(null); }} style={{ cursor: "pointer", color: C.tx3, fontSize: "16px", padding: "0 4px" }}>{"\u2715"}</div>
              </div>
            )}
            <input type="file" accept="image/*" ref={chatFileRef} onChange={onChatFile} style={{ display: "none" }} />
            <div style={{ display: "flex", gap: "7px", alignItems: "center", background: C.cd, border: "1px solid " + C.br, borderRadius: "28px", padding: "7px 7px 7px 10px" }}>
              <div onClick={() => chatFileRef.current && chatFileRef.current.click()} style={{ width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.g3, fontSize: "18px", flexShrink: 0 }}>{"\uD83D\uDCCE"}</div>
              <input style={{ flex: 1, background: "none", border: "none", outline: "none", color: C.tx, fontSize: "14px", fontFamily: "Inter,sans-serif" }} placeholder="Ask anything, or attach a photo..." value={cIn} onChange={e => setCIn(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !cLoad) sendChatMsg(); }} disabled={cLoad} />
              <button onClick={sendChatMsg} disabled={cLoad} style={{ width: "38px", height: "38px", borderRadius: "50%", border: "none", cursor: cLoad ? "not-allowed" : "pointer", background: cLoad ? "rgba(40,40,60,1)" : "linear-gradient(135deg," + C.g2 + "," + C.grn + ")", color: cLoad ? C.tx3 : "#040408", fontWeight: 900, fontSize: "16px", opacity: cLoad ? 0.6 : 1 }}>{"\u2726"}</button>
            </div>
          </div>
        </div>
      )}

      {priv && page === "kundli" && user && (
        <div style={SCR}>
          <TBar av={user.ini} onAv={() => setPage("profile")} />
          <div style={{ padding: "0 15px 13px" }}>
            <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "20px", color: C.gold, marginBottom: "3px" }}>Your Kundli</h2>
            <p style={{ fontSize: "12px", color: C.tx3 }}>Vedic birth chart, nine planets, Vimshottari Dasha</p>
          </div>
          <div style={{ padding: "0 15px 15px" }}>
            <div style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "18px", padding: "18px", marginBottom: "13px", display: "flex", justifyContent: "center" }}>
              <KCanvas dob={user.dob} />
            </div>
            <SLbl t="Planetary Positions" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
              {(c.planets || []).map((p, i) => (
                <div key={i} style={{ background: "rgba(18,18,40,.8)", border: "1px solid rgba(255,255,255,.06)", borderRadius: "10px", padding: "10px 11px", display: "flex", alignItems: "center", gap: "9px" }}>
                  <div style={{ fontSize: "18px", width: "26px", textAlign: "center" }}>{p.ic}</div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: C.tx2 }}>{p.nm}</div>
                    <div style={{ fontSize: "11px", color: C.g3, fontWeight: 600 }}>{p.sg + " " + p.dg + "\u00B0"}</div>
                  </div>
                </div>
              ))}
            </div>
            <SLbl t="Vimshottari Dasha" />
            {(c.dashas || []).slice(0, 5).map((d, i) => {
              const now = new Date().getFullYear(), act = now >= d.s && now < d.e, pct = act ? Math.round(((now - d.s) / d.y) * 100) : 0;
              return (
                <div key={i} style={{ background: act ? "linear-gradient(135deg,rgba(212,160,23,.08),rgba(0,200,83,.05))" : C.cd, border: "1px solid " + (act ? C.g2 : C.br), borderRadius: "10px", padding: "11px 13px", marginBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ fontFamily: "Cinzel,serif", fontSize: "13px", color: act ? C.gold : C.g3 }}>
                      {d.l + " Dasha"}{act && <span style={{ color: C.gr2, fontSize: "10px", marginLeft: "6px", fontFamily: "Inter,sans-serif" }}>ACTIVE</span>}
                    </div>
                    <div style={{ fontSize: "10px", color: C.tx3 }}>{d.s + "-" + d.e + " (" + d.y + "yr)"}</div>
                  </div>
                  <div style={{ height: "4px", background: "rgba(24,24,48,1)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: pct + "%", borderRadius: "2px", background: "linear-gradient(90deg," + C.g2 + "," + C.grn + ")" }} />
                  </div>
                </div>
              );
            })}
            <SLbl t="Birth Details" />
            <InfoCard hdr="" rows={[
              ["Ascendant", c.asc != null ? SIGNS[c.asc] + " " + SYM[c.asc] : "--"],
              ["Moon Sign", c.moon != null ? SIGNS[c.moon] + " " + SYM[c.moon] : "--"],
              ["Sun Sign", c.sun != null ? SIGNS[c.sun] + " " + SYM[c.sun] : "--"],
              ["Nakshatra", pan.nak || "--"],
              ["Tithi", pan.tithi || "--"],
              ["Yoga", pan.yoga || "--"],
              ["Moon Phase", pan.phase || "--"],
              ["Chinese", (ch.animal || "") + " " + (ch.element || "")],
              ["Life Path", c.lp ? String(c.lp) + (c.lp === 11 || c.lp === 22 ? " (Master)" : "") : "--"],
              ["Lucky Number", String(ln)]
            ]} />
          </div>
        </div>
      )}

      {priv && page === "palm" && user && (
        <div style={SCR}>
          <TBar av={user.ini} onAv={() => setPage("profile")} />
          <div style={{ padding: "0 15px 13px" }}>
            <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "20px", color: C.gold, marginBottom: "3px" }}>Palm Reading</h2>
            <p style={{ fontSize: "12px", color: C.tx3 }}>Hasta Samudrika, Cheiro, Benham, AI Vision</p>
          </div>
          <PalmReader user={user} onSave={sv} />
        </div>
      )}

      {priv && page === "tarot" && user && (
        <div style={SCR}>
          <TBar av={user.ini} onAv={() => setPage("profile")} />
          <div style={{ padding: "0 15px 13px" }}>
            <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "20px", color: C.gold, marginBottom: "3px" }}>Tarot Reading</h2>
            <p style={{ fontSize: "12px", color: C.tx3 }}>Rider-Waite, Thoth, Marseilles, Kabbalistic</p>
          </div>
          <TarotReader user={user} onSave={sv} />
        </div>
      )}

      {priv && page === "numerology" && user && (
        <div style={SCR}>
          <TBar av={user.ini} onAv={() => setPage("profile")} />
          <div style={{ padding: "0 15px 13px" }}>
            <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "20px", color: C.gold, marginBottom: "3px" }}>Numerology</h2>
            <p style={{ fontSize: "12px", color: C.tx3 }}>Pythagorean, Chaldean, Vedic, Lo Shu Grid</p>
          </div>
          <NumerologyReader user={user} />
        </div>
      )}

      {priv && page === "cosmos" && user && (
        <div style={SCR}>
          <TBar av={user.ini} onAv={() => setPage("profile")} />
          <div style={{ padding: "0 15px 13px" }}>
            <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "20px", color: C.gold, marginBottom: "3px" }}>Cosmic Tools</h2>
            <p style={{ fontSize: "12px", color: C.tx3 }}>All traditions, all tools</p>
          </div>
          <div style={{ padding: "0 15px" }}>
            {[["Kundli Chart", "Full Vedic chart, 12 houses, 9 planets, Dasha", "kundli"], ["Palm Reading", "AI plus Cheiro and Hasta Samudrika Shastra", "palm"], ["Tarot Oracle", "Major Arcana cosmic guidance", "tarot"], ["Numerology", "Pythagorean and Chaldean analysis", "numerology"]].map(row => (
              <div key={row[2]} onClick={() => setPage(row[2])} style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "18px", padding: "15px", marginBottom: "11px", cursor: "pointer" }}>
                <div style={{ fontFamily: "Cinzel,serif", fontSize: "13px", color: C.g3, marginBottom: "3px" }}>{row[0]}</div>
                <div style={{ fontSize: "11px", color: C.tx3, lineHeight: 1.4 }}>{row[1]}</div>
              </div>
            ))}
          </div>
          <SLbl t="Love Compatibility" />
          <div style={{ padding: "0 15px 14px" }}>
            <div style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "18px", padding: "16px", marginBottom: "12px" }}>
              <div style={{ fontFamily: "Cinzel,serif", fontSize: "13px", color: C.g3, marginBottom: "13px" }}>Cosmic Compatibility Match</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px", marginBottom: "12px" }}>
                {[["p1n", "Your Name", "text"], ["p2n", "Their Name", "text"], ["p1d", "Your DOB", "date"], ["p2d", "Their DOB", "date"]].map(row => (
                  <div key={row[0]}>
                    <div style={{ fontSize: "9px", letterSpacing: "2px", color: C.tx3, textTransform: "uppercase", marginBottom: "5px", fontWeight: 600 }}>{row[1]}</div>
                    <input type={row[2]} style={{ width: "100%", background: C.dk2, border: "1.5px solid rgba(255,255,255,.07)", borderRadius: "10px", padding: "11px 12px", color: C.tx, fontSize: "14px", fontFamily: "Inter,sans-serif", outline: "none" }} value={mF[row[0]]} onChange={e => setMF(f => Object.assign({}, f, { [row[0]]: e.target.value }))} />
                  </div>
                ))}
              </div>
              {matchErr && <div style={{ fontSize: "12px", color: "#ff6b6b", background: "rgba(255,71,87,.1)", border: "1px solid rgba(255,71,87,.3)", borderRadius: "8px", padding: "9px 12px", marginBottom: "10px" }}>{matchErr}</div>}
              <button style={Object.assign({}, BTN, { padding: "13px", fontSize: "13px" })} onClick={calcMatch}>Reveal Compatibility</button>
            </div>
            {mR && (
              <div style={{ background: "linear-gradient(135deg,rgba(74,14,143,.15),rgba(212,160,23,.09))", border: "1px solid " + C.bp, borderRadius: "18px", padding: "17px" }}>
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                  <div style={{ fontFamily: "Cinzel,serif", fontSize: "58px", fontWeight: 900, color: C.gold, lineHeight: 1 }}>{mR.ov + "%"}</div>
                  <div style={{ fontSize: "12px", color: C.tx3, marginTop: "3px" }}>Cosmic Compatibility</div>
                  <div style={{ fontFamily: "Cinzel,serif", fontSize: "16px", color: C.g3, marginTop: "8px" }}>{mR.ttl}</div>
                </div>
                {mR.bars.map(row => (
                  <div key={row[0]} style={{ marginBottom: "9px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px", color: C.tx2 }}><span>{row[0]}</span><span>{row[1] + "%"}</span></div>
                    <div style={{ height: "5px", background: "rgba(24,24,48,1)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: row[1] + "%", borderRadius: "3px", background: "linear-gradient(90deg," + C.g2 + "," + C.grn + ")" }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: "12px", padding: "12px", background: "rgba(0,200,83,.05)", borderRadius: "11px", border: "1px solid " + C.bg }}>
                  <div style={{ fontSize: "9px", letterSpacing: "2px", color: C.gr2, marginBottom: "5px", fontWeight: 800 }}>AI COSMIC VERDICT</div>
                  <div style={{ fontFamily: "Playfair Display,serif", fontStyle: "italic", fontSize: "12px", lineHeight: 1.65, color: C.tx }}>{mR.vrd}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {priv && page === "vault" && user && (
        <div style={SCR}>
          <TBar av={user.ini} onAv={() => setPage("profile")} />
          <div style={{ padding: "0 15px 13px" }}>
            <h2 style={{ fontFamily: "Cinzel,serif", fontSize: "20px", color: C.gold, marginBottom: "3px" }}>Cosmic Vault</h2>
            <p style={{ fontSize: "12px", color: C.tx3 }}>All your saved readings and AI conversations</p>
          </div>
          <div style={{ padding: "0 15px" }}>
            {vault.length === 0 ? (
              <div style={{ textAlign: "center", padding: "50px 20px" }}>
                <div style={{ fontFamily: "Cinzel,serif", fontSize: "14px", color: C.g3, marginBottom: "8px" }}>Your Vault is Empty</div>
                <div style={{ fontSize: "12px", color: C.tx3, lineHeight: 1.6 }}>Readings and AI chats are saved here automatically as you use the app.</div>
              </div>
            ) : (
              vault.map((v, i) => (
                <div key={i} style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "14px", padding: "13px", marginBottom: "9px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: C.tx, marginBottom: "3px" }}>{v.ttl}</div>
                  <div style={{ fontSize: "11px", color: C.tx3 }}>{v.tp + " -- " + v.dt}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {priv && page === "profile" && user && (
        <div style={SCR}>
          <TBar av={user.ini} onAv={() => {}} />
          <div style={{ padding: "0 15px" }}>
            <div style={{ textAlign: "center", padding: "10px 0 20px" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 800, color: "white", border: "3px solid " + C.g2, background: "linear-gradient(135deg," + C.pur + "," + C.grn + ")" }}>{user.ini}</div>
              <div style={{ fontFamily: "Cinzel,serif", fontSize: "20px", color: C.gold, marginBottom: "4px" }}>{user.name}</div>
              <div style={{ fontSize: "12px", color: C.tx3 }}>{(c.sun != null ? SYM[c.sun] + " " + SIGNS[c.sun] : "") + (c.moon != null ? " / " + SYM[c.moon] + " Moon" : "") + (c.asc != null ? " / " + SYM[c.asc] + " Rising" : "")}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "17px" }}>
              {[[c.lp || "--", "Life Path"], [ln, "Today's Number"], [c.lp ? Math.min(99, Math.round((c.lp / 9) * 78 + 18)) + "%" : "--", "Cosmic %"]].map(row => (
                <div key={row[1]} style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "13px", padding: "12px 7px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Cinzel,serif", fontSize: "18px", fontWeight: 700, color: C.gold, marginBottom: "2px" }}>{row[0]}</div>
                  <div style={{ fontSize: "9px", color: C.tx3, letterSpacing: "1px", textTransform: "uppercase" }}>{row[1]}</div>
                </div>
              ))}
            </div>
            <Dvd />
            {[["Name", user.name], ["Date of Birth", user.dob || "Not set"], ["Birth Time", user.exact ? user.exact + " (Exact)" : ({ morning: "Morning 6AM-12PM", afternoon: "Afternoon 12-6PM", evening: "Evening 6-10PM", night: "Night 10PM-6AM" })[user.slot] || "Not set"], ["Birth Place", user.place || "Not set"], ["Gender", user.gen || "Not set"], ["Language", user.lang], ["Subscription", vipApplied ? (vipApplied.pct === 100 ? "VIP -- Free (code applied)" : "Free Tier -- " + vipApplied.pct + "% off ready") : "Free Tier"]].map(row => (
              <div key={row[0]} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                <div>
                  <div style={{ fontSize: "13px", color: C.tx }}>{row[0]}</div>
                  <div style={{ fontSize: "11px", color: C.tx3, marginTop: "2px" }}>{row[1]}</div>
                </div>
              </div>
            ))}
            <div style={{ height: "6px" }} />
            <div style={{ background: C.cd, border: "1px solid " + C.br, borderRadius: "16px", padding: "15px", marginBottom: "14px" }}>
              <div style={{ fontFamily: "Cinzel,serif", fontSize: "13px", color: C.g3, marginBottom: "10px" }}>VIP / Discount Code</div>
              {vipApplied ? (
                <div style={{ background: "rgba(0,200,83,.08)", border: "1px solid " + C.bg, borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "13px", color: C.gr2, fontWeight: 700 }}>{vipApplied.code}</div>
                    <div style={{ fontSize: "11px", color: C.tx3, marginTop: "2px" }}>{vipApplied.label}</div>
                  </div>
                  <div style={{ fontFamily: "Cinzel,serif", fontSize: "20px", color: C.gr2, fontWeight: 900 }}>{vipApplied.pct + "%"}</div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", gap: "8px", marginBottom: vipErr ? "8px" : "0" }}>
                    <input style={{ flex: 1, background: C.dk2, border: "1.5px solid rgba(255,255,255,.08)", borderRadius: "10px", padding: "11px 12px", color: C.tx, fontSize: "13px", outline: "none", fontFamily: "Inter,sans-serif", textTransform: "uppercase" }} placeholder="Enter code" value={vipInput} onChange={e => setVipInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") redeemVip(); }} />
                    <button onClick={redeemVip} style={{ padding: "11px 16px", border: "none", borderRadius: "10px", cursor: "pointer", background: "linear-gradient(135deg," + C.g2 + "," + C.grn + ")", color: "#040408", fontFamily: "Cinzel,serif", fontSize: "12px", fontWeight: 800, whiteSpace: "nowrap" }}>Redeem</button>
                  </div>
                  {vipErr && <div style={{ fontSize: "11px", color: "#ff6b6b" }}>{vipErr}</div>}
                </div>
              )}
            </div>
            <div style={{ height: "8px" }} />
            <div style={{ background: "linear-gradient(135deg,rgba(124,58,237,.18),rgba(212,160,23,.1))", border: "1px solid " + C.bp, borderRadius: "18px", padding: "17px", marginBottom: "14px" }}>
              <div style={{ fontFamily: "Cinzel,serif", fontSize: "14px", color: C.p3, marginBottom: "8px" }}>Upgrade to Premium</div>
              <div style={{ fontSize: "12px", color: C.tx3, lineHeight: 1.6, marginBottom: "13px" }}>Unlimited AI, full Kundli, compatibility, vault and priority processing.</div>
              {vipApplied ? (
                vipApplied.pct === 100 ? (
                  <div style={{ textAlign: "center", padding: "13px", borderRadius: "13px", background: "rgba(0,200,83,.12)", border: "1px solid " + C.bg, color: C.gr2, fontFamily: "Cinzel,serif", fontSize: "14px", fontWeight: 800 }}>Unlocked Free with {vipApplied.code}</div>
                ) : (
                  <button style={Object.assign({}, BTN, { padding: "13px", fontSize: "13px", background: "linear-gradient(135deg," + C.g2 + "," + C.g3 + ")" })}>
                    {"Upgrade -- Rs." + Math.round(299 * (1 - vipApplied.pct / 100)) + " / month (was Rs.299)"}
                  </button>
                )
              ) : (
                <button style={Object.assign({}, BTN, { padding: "13px", fontSize: "13px", background: "linear-gradient(135deg," + C.g2 + "," + C.g3 + ")" })}>Upgrade Rs.299 / month</button>
              )}
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: "16px", marginBottom: "10px" }}>
              {!confirmClear ? (
                <div onClick={() => setConfirmClear(true)} style={{ textAlign: "center", fontSize: "12px", color: C.tx3, cursor: "pointer", padding: "8px" }}>Clear All My Data</div>
              ) : (
                <div style={{ background: "rgba(255,71,87,.08)", border: "1px solid rgba(255,71,87,.3)", borderRadius: "12px", padding: "13px" }}>
                  <div style={{ fontSize: "12px", color: "#ff6b6b", marginBottom: "10px", lineHeight: 1.5 }}>This will permanently delete your profile, vault, and applied codes from this device. This cannot be undone.</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <button onClick={() => setConfirmClear(false)} style={{ padding: "10px", border: "1px solid rgba(255,255,255,.1)", borderRadius: "10px", background: "transparent", color: C.tx2, fontSize: "12px", cursor: "pointer" }}>Cancel</button>
                    <button onClick={clearAllData} style={{ padding: "10px", border: "none", borderRadius: "10px", background: "#ff4757", color: "white", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>Yes, Delete Everything</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {priv && user && page !== "onboard" && (
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "430px", background: "rgba(2,2,5,.97)", borderTop: "1px solid " + C.br, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "7px 0 13px", zIndex: 100, backdropFilter: "blur(14px)" }}>
          {NAV.map(n => (
            <div key={n.id} onClick={() => setPage(n.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", cursor: "pointer", padding: "3px 0" }}>
              <div style={{ fontSize: "21px" }}>{n.i}</div>
              <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: ".5px", textTransform: "uppercase", color: page === n.id ? C.g3 : C.tx3 }}>{n.l}</div>
            </div>
          ))}
        </div>
      )}

      <style>{"@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;1,400;1,600&display=swap'); * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; } ::-webkit-scrollbar { display: none; } input[type=date]::-webkit-calendar-picker-indicator { filter: invert(.6); } select option { background: #07070f; } @keyframes dp { 0%, 80%, 100% { opacity: .3; transform: scale(.7); } 40% { opacity: 1; transform: scale(1); } } @keyframes glow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }"}</style>
    </div>
  );
}
