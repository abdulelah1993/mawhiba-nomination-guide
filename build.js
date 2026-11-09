
const fs = require("fs");
const path = require("path");

const output = path.join(__dirname, "dist");
fs.mkdirSync(output, { recursive: true });

const pages = [
  { id: "home", file: "index.html", title: "الرئيسية", icon: "⌂" },
  { id: "before", file: "before.html", title: "قبل الاختبار", icon: "▣" },
  { id: "login", file: "login.html", title: "تسجيل الدخول", icon: "↪" },
  { id: "setup", file: "setup.html", title: "تهيئة الجهاز", icon: "⚙" },
  { id: "verify", file: "verify.html", title: "التحقق من الطالب", icon: "✓" },
  { id: "exam", file: "exam.html", title: "أداء الاختبار", icon: "☷" },
  { id: "help", file: "help.html", title: "المساعدة والدعم", icon: "?" }
];

const stages = {
  login: {
    title: "تسجيل الدخول",
    label: "المرحلة الأولى",
    description: "من فتح المنصة والتحقق من الهوية إلى اختيار اللغة.",
    range: "1–7"
  },
  setup: {
    title: "تهيئة الجهاز والأذونات",
    label: "المرحلة الثانية",
    description: "مشاركة الشاشة والسماح باستخدام الكاميرا والميكروفون.",
    range: "8–13"
  },
  verify: {
    title: "التحقق من الطالب",
    label: "المرحلة الثالثة",
    description: "فحص الصوت والاتصال والتحقق من صورة الوجه.",
    range: "14–18"
  },
  exam: {
    title: "أداء الاختبار وتسليمه",
    label: "المرحلة الرابعة",
    description: "بدء الإجابة والتعامل مع تنبيهات الشاشة والتسليم.",
    range: "19–21"
  }
};

// البيانات مأخوذة من الدليل الإرشادي المرفق.
// اسم الصورة يطابق الملف الموجود داخل assets.
const steps = [
  [1, "فتح منصة الاختبار",
    "افتح منصة الاختبار واضغط «تسجيل الدخول بحساب موهبة».",
    "page-06-image-01", "login"],

  [2, "التحقق من الهوية",
    "أدخل رقم الهوية ثم اضغط «تحقق».",
    "page-06-image-01", "login"],

  [3, "إدخال رمز التحقق",
    "أدخل رمز التحقق المرسل إلى جوالك ثم اضغط «دخول».",
    "page-07-image-01", "login"],

  [4, "اختيار الاختبار",
    "اختر الاختبار المطلوب بحسب التخصص.",
    "page-07-image-01", "login"],

  [5, "بدء الاختبار",
    "اضغط «بدء الاختبار» (Start Exam) عند ظهوره.",
    "page-08-image-01", "login"],

  [6, "فتح خيارات اللغة",
    "افتح خيارات تغيير لغة النظام.",
    "page-08-image-01", "login"],

  [7, "اختيار اللغة",
    "اختر اللغة المناسبة قبل المتابعة.",
    "page-08-image-01", "login"],

  [8, "الموافقة على مشاركة الشاشة",
    "وافق على الطلب واضغط «مشاركة الشاشة» (Share Screen).",
    "page-09-image-01", "setup"],

  [9, "اختيار الشاشة كاملة",
    "حدد الشاشة كاملة ثم اضغط «مشاركة» (Share).",
    "page-10-image-01", "setup"],

  [10, "السماح باستخدام الكاميرا",
    "اضغط «سماح» (Allow) عند ظهور طلب الكاميرا.",
    "page-11-image-01", "setup"],

  [11, "تحديد الكاميرا المستخدمة",
    "اختر الكاميرا الصحيحة ثم تابع الإعداد.",
    "page-11-image-02", "setup"],

  [12, "السماح باستخدام الميكروفون",
    "اضغط «سماح» (Allow) وتأكد من عدم حظر الميكروفون.",
    "page-12-image-01", "setup"],

  [13, "تحديد الميكروفون وتأكيده",
    "اختر الميكروفون واضغط زر الموافقة.",
    "page-12-image-02", "setup"],

  [14, "فحص الصوت",
    "انطق اسمك الثلاثي بصوت واضح وانتظر اكتمال التحقق.",
    "page-13-image-01", "verify"],

  [15, "نجاح التحقق الصوتي",
    "انتظر رسالة نجاح تعرف النظام على صوت الطالب.",
    "page-14-image-01", "verify"],

  [16, "التحقق من اتصال الإنترنت",
    "انتظر اكتمال فحص استقرار الاتصال.",
    "page-14-image-01", "verify"],

  [17, "التحقق من صورة الوجه",
    "اجعل وجهك داخل الإطار واضغط «التقاط صورة» (Capture Image).",
    "page-15-image-01", "verify"],

  [18, "إكمال التحقق من الوجه",
    "بعد نجاح التقاط الصورة اضغط «التالي».",
    "page-16-image-01", "verify"],

  [19, "بدء الإجابة على الأسئلة",
    "تظهر صفحة الاختبار وصورة كاميرا الطالب في زاوية الشاشة.",
    "page-16-image-02", "exam"],

  [20, "إخفاء رسالة مشاركة الشاشة",
    "إذا أعاقت الرسالة عرض الشاشة اضغط «إخفاء» (Hide). إخفاؤها لا يوقف مشاركة الشاشة.",
    "page-17-image-01", "exam"],

  [21, "تأكيد التسليم النهائي",
    "راجع إجاباتك، ثم اضغط «إرسال» للتسليم أو «إلغاء» للعودة.",
    "page-18-image-02", "exam"]
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700;800;900&display=swap');
:root {
  --navy: #083077;
  --blue: #205bc3;
  --purple: #7a5df5;
  --teal: #168b8b;
  --bg: #f6f8fc;
  --text: #18354b;
  --muted: #718295;
  --border: #e4e9f0;
  --shadow: 0 12px 36px rgba(8,48,119,.06);
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  direction: rtl;
  font-family: "Tajawal", Tahoma, "Segoe UI", Arial, sans-serif;
  font-size: 17px;
  background: var(--bg);
  color: var(--text);
  line-height: 1.9;
}
a { color: inherit; text-decoration: none; }
button, input { font: inherit; }
button { cursor: pointer; }
button:focus-visible, a:focus-visible, input:focus-visible {
  outline: 3px solid #f5bd19;
  outline-offset: 2px;
}
header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
  border-bottom: 1px solid var(--border);
}
.header-inner {
  max-width: 1400px;
  margin: auto;
  padding: 13px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 13px;
  color: var(--navy);
  font-weight: bold;
}
.brand img {
  width: 176px;
  height: 62px;
  max-width: 176px;
  max-height: 62px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}
.brand small {
  display: block;
  color: var(--muted);
  font-weight: normal;
  font-size: 12px;
}
.layout {
  max-width: 1400px;
  margin: auto;
  padding: 28px 24px;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 26px;
}
aside {
  position: sticky;
  top: 102px;
  align-self: start;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: white;
  padding: 17px;
  box-shadow: var(--shadow);
}
.nav-label {
  font-size: 13px;
  color: var(--muted);
  margin: 4px 11px 12px;
}
.nav-link {
  display: flex;
  gap: 13px;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  margin-bottom: 5px;
}
.nav-link:hover { background: #f1f5fc; }
.nav-link { font-size: 15px; }
.nav-link.active {
  color: var(--navy);
  background: #eaf0ff;
  font-weight: bold;
}
.icon {
  color: var(--blue);
  font-size: 21px;
  min-width: 24px;
  text-align: center;
}
main { min-width: 0; }
.hero {
  padding: 33px;
  background: linear-gradient(120deg, white 55%, #e8f0ff);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
  margin-bottom: 23px;
}
.eyebrow {
  font-size: 13px;
  color: var(--purple);
  font-weight: bold;
}
h1 {
  color: var(--navy);
  font-size: clamp(25px, 3vw, 36px);
  line-height: 1.5;
  margin: 7px 0;
}
h2 { color: var(--navy); font-size: 21px; }
p { color: var(--muted); }
.brand-partners {
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:clamp(24px,4vw,58px);
  align-items:center;
  background:#fff;
  border:1px solid var(--border);
  border-radius:18px;
  margin-bottom:24px;
  padding:23px clamp(18px,4vw,50px);
}
.brand-partners img {
  width:100%;
  max-width:100%;
  height:78px;
  object-fit:contain;
  display:block;
  justify-self:center;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}
.card, .step, .faq {
  background: white;
  border: 1px solid var(--border);
  border-radius: 19px;
  box-shadow: var(--shadow);
}
.card {
  padding: 23px;
  transition: transform .2s;
}
.card:hover { transform: translateY(-3px); }
.card .symbol {
  width: 49px;
  height: 49px;
  border-radius: 14px;
  background: #edf2ff;
  color: var(--blue);
  display: grid;
  place-items: center;
  font-size: 24px;
}
.card h2 { margin-bottom: 4px; }
.card p { margin: 0 0 12px; }
.range { color: var(--teal); font-size: 13px; font-weight: bold; }
.steps { display: grid; gap: 19px; }
.step {
  padding: 23px;
  display: grid;
  grid-template-columns: 1fr .9fr;
  gap: 23px;
  scroll-margin-top: 115px;
}
.step-text {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.number {
  font-size: 13px;
  color: var(--teal);
  background: #e6f7f5;
  border-radius: 24px;
  padding: 4px 12px;
  font-weight: bold;
}
.step h2 { margin: 12px 0 7px; }
.step p { margin-top: 0; color: #41586b; font-size: 17px; line-height: 1.9; }
.step h2 { font-size: 23px; }
.image-button {
  border: 1px solid var(--border);
  background: #f8fafc;
  border-radius: 14px;
  padding: 12px;
  width: 100%;
  position: relative;
}
.image-button img {
  width: 100%;
  max-height: 365px;
  object-fit: contain;
  display: block;
}
.zoom {
  position: absolute;
  left: 12px;
  bottom: 12px;
  background: white;
  border-radius: 9px;
  padding: 3px 12px;
  color: var(--blue);
  font-size: 12px;
}
.done {
  margin-top: auto;
  padding: 9px 12px;
  border-radius: 12px;
  background: #f3f8fa;
  font-size: 13px;
}
.done input {
  width: 18px;
  height: 18px;
  accent-color: var(--teal);
  vertical-align: middle;
}
.progress {
  height: 9px;
  border-radius: 15px;
  background: #e5eaf1;
  overflow: hidden;
  margin-top: 12px;
}
.progress span {
  display: block;
  background: linear-gradient(90deg, #205bc3, #22aaa3);
  height: 100%;
  width: 0;
  transition: width .25s;
}
.notice {
  margin-top: 22px;
  padding: 19px;
  background: #fffaee;
  border: 1px solid #f4e1a7;
  border-radius: 15px;
}
.faq { margin-bottom: 14px; }
.faq summary {
  padding: 16px 20px;
  font-weight: bold;
  cursor: pointer;
}
.faq p { margin: 0; padding: 0 20px 18px; }
.btn {
  display: inline-block;
  padding: 10px 18px;
  border: 1px solid var(--border);
  background: white;
  color: var(--navy);
  border-radius: 12px;
  font-weight: bold;
}
.btn.primary { background: var(--blue); color: white; }
.pager {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 27px;
}
.search input {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px;
  width: 220px;
}
.search { position: relative; }
.results {
  display: none;
  position: absolute;
  left: 0;
  top: 52px;
  z-index: 100;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 35px #0002;
  width: 340px;
  max-height: 300px;
  overflow: auto;
}
.results a {
  display: block;
  padding: 10px;
  border-bottom: 1px solid var(--border);
}
dialog {
  border: none;
  border-radius: 17px;
  width: min(1050px, 95vw);
  max-height: 90vh;
}
dialog::backdrop { background: #12283bcc; }
dialog img {
  max-width: 100%;
  max-height: 74vh;
  object-fit: contain;
  display: block;
  margin: auto;
}
dialog button {
  float: left;
  padding: 7px 14px;
}
footer {
  text-align: center;
  font-size: 13px;
  color: var(--muted);
  margin: 40px 0 10px;
}

/* Live support-message composer */
.support-wizard{margin:28px 0 16px;background:#fff;border:1px solid var(--border);border-radius:22px;box-shadow:var(--shadow);padding:clamp(17px,3vw,29px)}
.support-wizard-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:23px}
.support-wizard-heading h2{font-size:clamp(21px,2.4vw,27px);line-height:1.5;margin:5px 0 7px}
.support-wizard-heading p{margin:0;color:#53687c;font-size:15px;line-height:1.8;max-width:750px}
.support-eyebrow{font-size:13px;font-weight:800;color:var(--purple)}
.support-heading-icon{width:51px;height:51px;flex:0 0 51px;display:grid;place-items:center;background:#ecf0ff;color:var(--navy);border-radius:15px;font-size:25px}
.support-wizard-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:19px;align-items:start}
.support-fields,.support-preview{min-width:0}
.support-fields{display:grid;gap:15px}
.support-field{display:grid;gap:7px;color:var(--navy);font-size:15px;font-weight:800}
.support-field input,.support-field select,.support-field textarea{width:100%;min-width:0;box-sizing:border-box;border:1px solid #cbd8e8;background:#fff;color:#18354b;border-radius:11px;font:inherit;font-weight:500;font-size:16px;line-height:1.7;padding:11px 13px;outline-offset:2px;transition:border-color .18s,box-shadow .18s}
.support-field input:focus,.support-field select:focus,.support-field textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(32,91,195,.11);outline:none}
.support-field input::placeholder,.support-field textarea::placeholder{color:#7d8c9d;font-weight:400}
.support-field select{cursor:pointer}
.support-field textarea{resize:vertical;min-height:113px}
.support-privacy-note{font-size:12px;color:#687c8d;margin:0;line-height:1.7}
.support-preview{background:#f5f8ff;border:1px solid #dbe5f5;border-radius:17px;padding:20px;position:sticky;top:95px}
.support-preview-heading{display:flex;align-items:center;gap:9px;color:var(--navy);margin-bottom:12px;font-weight:800}
.support-preview-heading h3{font-size:18px;margin:0}
.support-preview-heading span{font-size:23px;color:var(--blue)}
#support-message{font-family:inherit;white-space:pre-wrap;overflow-wrap:anywhere;font-size:15px;line-height:2;color:#213c52;background:#fff;border:1px solid #dce5f1;border-radius:12px;padding:16px;margin:0 0 15px;min-height:270px;user-select:text}
.support-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.support-copy-btn{min-width:140px}
#support-copy-status{color:#176e61;font-size:13px;font-weight:700}
.support-email{border-top:1px solid #dce5f1;margin-top:18px;padding-top:12px;font-size:13px;color:#53687c;overflow-wrap:anywhere}
.support-email a{display:inline-block;font-weight:800;color:var(--blue);direction:ltr}
.support-attach-reminder{margin-top:18px;background:#fff9e9;border:1px solid #f1d48c;border-radius:13px;padding:16px 18px;display:grid;gap:3px;line-height:1.8;color:#704d18}
.support-attach-reminder strong{font-size:15px}
.support-attach-reminder span{font-size:13px}
@media(max-width:920px){.support-wizard-grid{grid-template-columns:1fr}.support-preview{position:static}}
@media(max-width:650px){.support-wizard-heading{gap:9px}.support-heading-icon{width:42px;height:42px;flex-basis:42px}.support-wizard{padding:16px}.support-preview{padding:14px}#support-message{padding:12px;font-size:14px}}


/* Saudi-time trial & actual assessment countdowns in the guide sidebar */
aside { max-height:calc(100dvh - 118px);overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin }
.countdown-panel{border-top:1px solid var(--border);margin-top:19px;padding-top:16px;display:grid;gap:13px}
.countdown-panel-head{display:flex;align-items:center;justify-content:space-between;gap:8px}
.countdown-panel-head h2{margin:0;font-size:16px;color:var(--navy);line-height:1.4}
.countdown-panel-head small{color:var(--muted);font-size:11px;white-space:nowrap}
.countdown-card{padding:14px 11px;border:1px solid #dce7f4;border-radius:14px;background:#f8faff;min-width:0}
.countdown-card-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;margin-bottom:8px}
.countdown-tag{font-size:11px;color:#205bc3;background:#e4ecff;padding:3px 8px;border-radius:999px;font-weight:800}
.countdown-tag--actual{color:#7150c7;background:#efeaff}
.countdown-status{font-size:11px;color:#566d83;font-weight:800}
.countdown-card h3{font-size:13px;margin:0 0 4px;color:var(--navy);line-height:1.55}
.countdown-card p{font-size:12px;line-height:1.6;color:#566d83;margin:0}
.countdown-card p.countdown-window{font-weight:700;color:#305a83;margin-top:2px}
.countdown-units{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin-top:12px}
.countdown-units>div{padding:9px 2px 6px;background:#fff;border:1px solid #e3ebf5;border-radius:10px;min-width:0;text-align:center}
.countdown-units strong{font-size:17px;font-weight:900;color:var(--navy);line-height:1.1;display:block;font-variant-numeric:tabular-nums;direction:ltr}
.countdown-units span{display:block;font-size:10px;color:#73849a;margin-top:5px}
.countdown-card.is-live{border-color:#94d3b9;background:#f3fcf7}
.countdown-card.is-live .countdown-status{color:#0b8658}
.countdown-card.is-ended{background:#f7f8fa}
.countdown-card.is-ended .countdown-status{color:#786047}
@media(max-width:980px){aside{max-height:none;overflow:visible}aside nav{max-width:100%;min-width:0;overflow-x:auto}}
@media(max-width:650px){.countdown-units{gap:8px}.countdown-units>div{padding:10px 4px}.countdown-panel{margin-top:14px}}

@media (max-width: 980px) {
  .layout { grid-template-columns: 1fr; }
  aside { position: static; overflow-x: auto; }
  nav { display: flex; min-width: max-content; }
  .nav-label, .sidebar-progress { display: none; }
}
@media (max-width: 650px) {
  .layout { padding: 15px; }
  .header-inner { padding: 10px; }
  .brand img { width: 112px; max-width:31vw; height:50px; }
  .brand-partners { grid-template-columns:1fr; gap:19px; padding:20px; }
  .brand-partners img { height:68px; width:min(100%, 290px); }
  .brand span { font-size: 12px; }
  .search input { width: 125px; }
  .hero { padding: 22px; }
  .grid, .step { grid-template-columns: 1fr; }
  .step { padding: 17px; }
  .pager { flex-wrap: wrap; }
}
`;

function hero(label, title, description) {
  return `
    <section class="hero">
      <span class="eyebrow">${label}</span>
      <h1>${title}</h1>
      <p>${description}</p>
    </section>`;
}

function renderStep(step) {
  const [n, title, description, image] = step;
  return `
    <article class="step" id="step-${n}">
      <div class="step-text">
        <span class="number">الخطوة ${n} من 21</span>
        <h2>${title}</h2>
        <p>${description}</p>
        ${n === 1 ? '<a class="btn primary" href="https://mawhiba.classera.com/" target="_blank" rel="noopener noreferrer" style="margin-top:10px;display:inline-flex;align-items:center;gap:8px">فتح منصة مقياس موهبة ↗</a>' : ""}
      </div>
      <button class="image-button" data-image="${image}"
        data-caption="الخطوة ${n}: ${title}"
        aria-label="تكبير صورة الخطوة ${n}">
        <img loading="lazy"
          src="assets/${image}.webp"
          alt="صورة الخطوة ${n}">
        <span class="zoom">تكبير الصورة ⤢</span>
      </button>
    </article>`;
}

function pageContent(id) {
  if (stages[id]) {
    const stage = stages[id];
    return `
      ${hero(stage.label, stage.title, stage.description)}
      <div class="steps">
        ${steps.filter(s => s[4] === id).map(renderStep).join("")}
      </div>`;
  }

  if (id === "before") {
    const requirements = [
      ["الجهاز", "كمبيوتر مكتبي أو محمول بنظام ويندوز أو ماك، وذاكرة 4 جيجابايت وفق الدليل."],
      ["المتصفح", "استخدم متصفح Google Chrome."],
      ["الكاميرا والميكروفون", "تأكد من سلامة عمل الكاميرا والميكروفون."],
      ["الإنترنت", "اتصال مستقر، مع مراعاة متطلبات السرعة الواردة في الدليل."]
    ];
    return `
      ${hero("الاستعداد", "قبل الاختبار", "تأكد من تجهيز جهازك قبل بدء المقياس.")}
      <div class="grid">
        ${requirements.map(x => `
          <article class="card">
            <h2>${x[0]}</h2><p>${x[1]}</p>
          </article>`).join("")}
      </div>
      <div class="notice">
        تجنب استخدام الجوال والسماعات والآلة الحاسبة،
        والانتقال إلى تطبيقات أخرى أثناء الاختبار.
        لا تحجب الكاميرا أو تغلق الميكروفون.
      </div>`;
  }

  if (id === "help") {
    const faqs = [
      ["تعذر العثور على الكاميرا", "راجع أذونات الكاميرا ثم أعد تشغيل المتصفح."],
      ["مشكلة الميكروفون", "تحقق من إعدادات الصوت وعدم كتم الميكروفون."],
      ["مشكلة مشاركة الشاشة", "أعد تحميل الصفحة واختر مشاركة الشاشة كاملة."],
      ["رفض الأذونات", "راجع أذونات المتصفح وأعد فتح الصفحة."],
      ["انقطاع الإنترنت", "أعد الاتصال وسجل الدخول مجددًا. إذا تعذر الاستئناف فتواصل مع الدعم."]
    ];
    return `
      ${hero("المساعدة", "حلول المشكلات الشائعة", "إرشادات سريعة للتعامل مع المشكلات التقنية.")}
      ${faqs.map(x => `
        <details class="faq">
          <summary>${x[0]}</summary>
          <p>${x[1]}</p>
        </details>`).join("")}
      <section class="support-wizard" id="support-request" aria-labelledby="support-request-title">
        <div class="support-wizard-heading">
          <div><span class="support-eyebrow">نموذج الدعم الفني</span>
            <h2 id="support-request-title">نموذج استقبال مشكلات مقياس موهبة التجريبي – عن بُعد</h2>
            <p>عبّئ البيانات واختر نوع الصعوبة. سيتم تجهيز الرسالة تلقائيًا لتتمكن من نسخها وإرسالها إلى الدعم الفني.</p>
          </div>
          <span class="support-heading-icon" aria-hidden="true">✉</span>
        </div>
        <div class="support-wizard-grid">
          <div class="support-fields" role="group" aria-label="بيانات المشكلة">
            <label class="support-field"><span>اسم الطالب/ـة</span>
              <input type="text" id="support-student-name" maxlength="120" autocomplete="off" placeholder="اكتب اسم الطالب أو الطالبة">
            </label>
            <label class="support-field"><span>رقم الهوية</span>
              <input type="text" inputmode="numeric" id="support-id-number" maxlength="10" autocomplete="off" placeholder="أدخل رقم الهوية">
            </label>
            <label class="support-field"><span>نوع الصعوبة</span>
              <select id="support-problem-type">
                <option value="">اختر نوع الصعوبة من القائمة</option>
                <option>تعذر تسجيل الدخول إلى منصة كلاسيرا.</option>
                <option>اسم المستخدم أو كلمة المرور غير صحيحة.</option>
                <option>المقياس لا يظهر في حساب الطالب.</option>
                <option>مشكلة في أذونات الكاميرا أو الميكروفون.</option>
                <option>تعذر التحقق من هوية الطالب أو تهيئة الجهاز.</option>
                <option>تعذر بدء المقياس أو توقفه أثناء الأداء.</option>
                <option>أخرى.</option>
              </select>
            </label>
            <label class="support-field"><span>وصف الصعوبة</span>
              <textarea id="support-description" rows="5" maxlength="1400" placeholder="اشرح المشكلة ومتى ظهرت، وأي رسالة خطأ ظهرت لك"></textarea>
            </label>
            <p class="support-privacy-note">البيانات تُستخدم لتجهيز النص داخل المتصفح فقط، ولا يتم حفظها أو إرسالها آليًا من هذه الصفحة.</p>
          </div>
          <div class="support-preview" aria-label="معاينة الرسالة">
            <div class="support-preview-heading"><span aria-hidden="true">▤</span><h3>النص الجاهز للإرسال</h3></div>
            <pre dir="rtl" id="support-message" tabindex="0"></pre>
            <div class="support-actions">
              <button type="button" class="btn primary support-copy-btn" id="support-copy">نسخ النص</button>
              <span role="status" aria-live="polite" id="support-copy-status"></span>
            </div>
            <div class="support-email">إرساله إلى البريد الفني:
              <a href="mailto:gig@mawhiba.org.sa">gig@mawhiba.org.sa</a>
            </div>
          </div>
        </div>
        <div class="support-attach-reminder" role="note">
          <strong>مهم: ضرورة إرفاق صورة واضحة توضح الإشكالية عند إرسال الرسالة.</strong>
          <span>بعد نسخ النص، أرفق لقطة الشاشة أو صورة الخطأ مع طلب الدعم.</span>
        </div>
      </section>`;
  }

  return `
    ${hero(
      "الدليل الإرشادي",
      "دليلك لأداء مقياس موهبة التجريبي",
      "خطوات واضحة بصورها من تسجيل الدخول حتى التسليم النهائي."
    )}
    <div class="brand-partners" aria-label="شعارات الجهات">
      <img src="assets/program-logo.webp" alt="شعار البرنامج الوطني للكشف عن الموهوبين">
      <img src="assets/ministry-logo.webp" alt="شعار وزارة التعليم">
      <img src="assets/etec-logo.webp" alt="شعار هيئة تقويم التعليم والتدريب">
    </div>
    <div class="grid">
      ${pages.slice(1).map(p => `
        <a class="card" href="${p.file}">
          <span class="symbol">${p.icon}</span>
          <h2>${p.title}</h2>
          <p>${stages[p.id]?.description ||
            (p.id === "before"
              ? "تجهيز الجهاز ومتطلبات الاختبار"
              : "حلول المشكلات الشائعة والدعم الفني")}</p>
          ${stages[p.id]
            ? `<span class="range">الخطوات ${stages[p.id].range}</span>`
            : ""}
        </a>`).join("")}
    </div>
    <div class="notice">
      يحتوي الدليل على 21 خطوة موزعة على 4 مراحل،
      مع إمكانية تكبير الصور وحفظ تقدمك.
    </div>`;
}

const browserScript = `
const KEY = "mawhiba-trial-guide-progress";
const allSteps = ${JSON.stringify(steps.map(s => ({
  n: s[0], title: s[1], description: s[2],
  url: pages.find(p => p.id === s[4]).file + "#step-" + s[0]
})))};

let completed = [];
try {
  completed = JSON.parse(localStorage.getItem(KEY) || "[]");
} catch {}
if (!Array.isArray(completed)) completed = [];
completed = [...new Set(completed.filter(
  n => Number.isInteger(n) && n >= 1 && n <= 21
))];

function updateProgress() {
  document.querySelectorAll("[data-step]").forEach(input => {
    input.checked = completed.includes(Number(input.dataset.step));
  });
  document.getElementById("progress-count").textContent =
    completed.length + "/21";
  document.getElementById("progress-bar").style.width =
    (completed.length / 21 * 100) + "%";
}

document.querySelectorAll("[data-step]").forEach(input => {
  input.addEventListener("change", () => {
    const n = Number(input.dataset.step);
    completed = input.checked
      ? [...new Set([...completed, n])]
      : completed.filter(x => x !== n);
    try { localStorage.setItem(KEY, JSON.stringify(completed)); }
    catch {}
    updateProgress();
  });
});
updateProgress();

const dialog = document.getElementById("lightbox");
document.querySelectorAll("[data-image]").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("large-image").src =
      "assets/" + button.dataset.image + ".webp";
    document.getElementById("caption").textContent =
      button.dataset.caption;
    dialog.showModal();
  });
});
document.getElementById("close-image").onclick = () => dialog.close();


// Build an email-ready message locally; do not transmit or save student data.
(function initSupportRequest(){
  const output = document.getElementById("support-message");
  if(!output) return;
  const fields = ["support-student-name","support-id-number","support-problem-type","support-description"];
  const el = id => document.getElementById(id);
  const read = id => el(id).value.trim() || "—";
  const status = el("support-copy-status");
  function refresh(){
    output.textContent = [
      "نموذج استقبال مشكلات مقياس موهبة التجريبي – عن بُعد",
      "",
      "اسم الطالب/ـة: " + read(fields[0]),
      "رقم الهوية: " + read(fields[1]),
      "نوع الصعوبة: " + read(fields[2]),
      "وصف الصعوبة: " + read(fields[3]),
      "",
      "ملاحظة: يرجى إرفاق صورة واضحة توضح الإشكالية."
    ].join("\\n");
    status.textContent = "";
  }
  fields.forEach(id => {
    el(id).addEventListener("input",refresh);
    el(id).addEventListener("change",refresh);
  });
  el("support-copy").addEventListener("click", async () => {
    try{
      if(navigator.clipboard && window.isSecureContext){
        await navigator.clipboard.writeText(output.textContent);
      } else {
        const temp = document.createElement("textarea");
        temp.value = output.textContent;
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.select();
        const copied = document.execCommand("copy");
        temp.remove();
        if(!copied) throw new Error("Copy unavailable");
      }
      status.textContent = "تم نسخ الرسالة. أرفق صورة الإشكالية عند الإرسال.";
    }catch(e){
      status.textContent = "تعذر النسخ التلقائي؛ حدّد النص الموجود بالأعلى وانسخه يدويًا.";
    }
  });
  refresh();
})();


/* Countdown to the start; while running, countdown to the end. Time is fixed to Saudi UTC+03. */
(function initTrialCountdowns(){
  const cards = [...document.querySelectorAll("[data-countdown]")];
  if(!cards.length) return;
  const pad = n => String(n).padStart(2,"0");
  function tick(){
    const now = Date.now();
    cards.forEach(card=>{
      const start = Date.parse(card.dataset.start);
      const end = Date.parse(card.dataset.end);
      const live = now >= start && now < end;
      const ended = now >= end;
      const remaining = ended ? 0 : Math.max(0,(live?end:start)-now);
      const total = Math.floor(remaining/1000);
      const units = {
        days:Math.floor(total/86400),
        hours:Math.floor(total%86400/3600),
        minutes:Math.floor(total%3600/60),
        seconds:total%60
      };
      Object.entries(units).forEach(([name,value])=>{
        const target=card.querySelector('[data-unit="'+name+'"]');
        if(target) target.textContent=pad(value);
      });
      const status=card.querySelector(".countdown-status");
      if(status) status.textContent=ended?"انتهى الموعد":live?"المقياس قائم الآن":"متبقي على البداية";
      card.classList.toggle("is-live",live);
      card.classList.toggle("is-ended",ended);
    });
  }
  tick();
  window.setInterval(tick,1000);
})();

const search = document.getElementById("search");
const results = document.getElementById("results");
search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  const matches = q ? allSteps.filter(s =>
    (s.title + " " + s.description + " " + s.n)
      .toLowerCase().includes(q)
  ) : [];

  results.replaceChildren();
  matches.slice(0, 12).forEach(s => {
    const a = document.createElement("a");
    a.href = s.url;
    a.textContent = "الخطوة " + s.n + " — " + s.title;
    results.appendChild(a);
  });
  if (q && !matches.length) {
    const item = document.createElement("div");
    item.style.padding = "12px";
    item.textContent = "لا توجد نتائج";
    results.appendChild(item);
  }
  results.style.display = q ? "block" : "none";
});
document.addEventListener("click", event => {
  if (!event.target.closest(".search"))
    results.style.display = "none";
});
`;

function renderPage(page, index) {
  const prev = pages[index - 1];
  const next = pages[index + 1];

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title} | دليل موهبة التجريبي</title>
<style>${css}</style>
</head>
<body>
<header>
  <div class="header-inner">
    <a href="index.html" class="brand">
      <img src="assets/program-logo.webp" alt="شعار البرنامج الوطني للكشف عن الموهوبين">
      <span>دليل مقياس موهبة التجريبي
        <small>الخطوات الإرشادية للطالب</small>
      </span>
    </a>
    <div class="search">
      <input id="search" type="search" placeholder="البحث في الدليل..." aria-label="البحث في الخطوات">
      <div class="results" id="results"></div>
    </div>
  </div>
</header>

<div class="layout">
  <aside>
    <div class="nav-label">أقسام الدليل</div>
    <nav aria-label="صفحات الدليل">
      ${pages.map(p => `
        <a class="nav-link ${page.id === p.id ? "active" : ""}"
           href="${p.file}"
           ${page.id === p.id ? 'aria-current="page"' : ""}>
          <span class="icon">${p.icon}</span>
          <span>${p.title}</span>
        </a>`).join("")}
    </nav>
    <div class="sidebar-progress">
      <hr style="border:0;border-top:1px solid #e4e9f0">
      <div>تقدمك: <strong id="progress-count">0/21</strong></div>
      <div class="progress"><span id="progress-bar"></span></div>
    </div>

    <section class="countdown-panel" aria-label="مواعيد مقياس موهبة التجريبي عن بُعد">
      <div class="countdown-panel-head">
        <h2>مواعيد المقياس</h2>
        <small>بتوقيت السعودية</small>
      </div>
      <article class="countdown-card" data-countdown="trial"
        data-start="2026-11-09T19:30:00+03:00" data-end="2026-11-09T20:30:00+03:00">
        <div class="countdown-card-head"><span class="countdown-tag">الاختبار التجريبي</span><span class="countdown-status" role="status">جارٍ الحساب</span></div>
        <h3>مقياس موهبة التجريبي</h3>
        <p>الاثنين 9 نوفمبر 2026</p>
        <p class="countdown-window">7:30 – 8:30 مساءً</p>
        <div class="countdown-units" aria-label="الوقت المتبقي">
          <div><strong data-unit="days">00</strong><span>يوم</span></div>
          <div><strong data-unit="hours">00</strong><span>ساعة</span></div>
          <div><strong data-unit="minutes">00</strong><span>دقيقة</span></div>
          <div><strong data-unit="seconds">00</strong><span>ثانية</span></div>
        </div>
      </article>
      <article class="countdown-card" data-countdown="actual"
        data-start="2026-11-11T19:30:00+03:00" data-end="2026-11-11T23:30:00+03:00">
        <div class="countdown-card-head"><span class="countdown-tag countdown-tag--actual">الاختبار الفعلي</span><span class="countdown-status" role="status">جارٍ الحساب</span></div>
        <h3>مقياس موهبة التجريبي</h3>
        <p>الأربعاء 11 نوفمبر 2026</p>
        <p class="countdown-window">7:30 – 11:30 مساءً</p>
        <div class="countdown-units" aria-label="الوقت المتبقي">
          <div><strong data-unit="days">00</strong><span>يوم</span></div>
          <div><strong data-unit="hours">00</strong><span>ساعة</span></div>
          <div><strong data-unit="minutes">00</strong><span>دقيقة</span></div>
          <div><strong data-unit="seconds">00</strong><span>ثانية</span></div>
        </div>
      </article>
    </section>
  </aside>

  <main>
    ${pageContent(page.id)}
    <div class="pager">
      ${prev ? `<a class="btn" href="${prev.file}">السابق: ${prev.title}</a>` : "<span></span>"}
      ${next ? `<a class="btn primary" href="${next.file}">التالي: ${next.title} ←</a>` : ""}
    </div>
    <footer>الدليل الإرشادي لمقياس موهبة التجريبي</footer>
  </main>
</div>

<dialog id="lightbox">
  <button id="close-image" type="button">إغلاق ×</button>
  <h3 id="caption"></h3>
  <img id="large-image" alt="صورة الخطوة مكبرة">
</dialog>
<script>${browserScript}</script>
</body>
</html>`;
}

pages.forEach((page, index) => {
  fs.writeFileSync(
    path.join(output, page.file),
    renderPage(page, index),
    "utf8"
  );
});

const assetsSource = path.join(__dirname, "assets");
if (fs.existsSync(assetsSource)) {
  fs.cpSync(assetsSource, path.join(output, "assets"), {
    recursive: true
  });
} else {
  console.warn(
    "مجلد assets غير موجود. أضف إليه صور الدليل الأصلية."
  );
}

console.log("تم إنشاء الصفحات السبع داخل dist/");
;(function mergeStages() {
  const unifiedPages=[
    {id:"home",file:"index.html",title:"الرئيسية",icon:"⌂"},
    {id:"before",file:"before.html",title:"قبل الاختبار",icon:"▣"},
    {id:"steps",file:"steps.html",title:"خطوات الدخول وأداء المقياس",icon:"↪"},
    {id:"help",file:"help.html",title:"المساعدة والدعم",icon:"?"}
  ];
  pages.splice(0,pages.length,...unifiedPages);
  const journey=Object.entries(stages);
  const stageCards=(prefix="")=>`<nav class="stage-index" id="stage-top" aria-label="الانتقال بين مراحل المقياس">${journey.map(([id,stage],i)=>`<a class="stage-jump" href="${prefix}#${id}"><span class="stage-jump-num">0${i+1}</span><span class="stage-jump-title">${stage.title}</span><small>الخطوات ${stage.range}</small></a>`).join("")}</nav>`;
  const fullJourney=`<section class="hero"><span class="eyebrow">الدليل المصور · ٢١ خطوة</span><h1>خطوات الدخول وأداء مقياس موهبة التجريبي</h1><p>كل المراحل الأربع في صفحة واحدة، من تسجيل الدخول حتى التسليم النهائي.</p></section>${stageCards()}<div class="all-stages">${journey.map(([id,stage],i)=>`<section class="stage-section" id="${id}" aria-labelledby="title-${id}"><div class="stage-heading"><span class="stage-number">0${i+1}</span><div><span class="eyebrow">${stage.label} · الخطوات ${stage.range}</span><h2 id="title-${id}">${stage.title}</h2><p>${stage.description}</p></div><a href="#stage-top" class="back-to-stages">العودة للمراحل ↑</a></div><div class="steps">${steps.filter(s=>s[4]===id).map(renderStep).join("")}</div></section>`).join("")}</div>`;
  const unifiedStyle=`
.stage-index{min-width:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:22px 0 28px;scroll-margin-top:100px}
.stage-jump{border:1px solid var(--border);background:#fff;border-radius:17px;padding:17px 15px;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:4px;min-width:0;transition:border-color .2s,transform .2s}
.stage-jump:hover,.stage-jump:focus-visible{border-color:var(--blue);transform:translateY(-2px)}
.stage-jump-num{color:var(--blue);font-weight:800;background:#eaf1ff;font-size:13px;width:37px;height:32px;border-radius:10px;display:grid;place-items:center}
.stage-jump-title{color:var(--navy);font-size:16px;font-weight:800;line-height:1.45;margin-top:7px}
.stage-jump small{color:var(--teal);font-size:13px;font-weight:700}
.stage-section{margin:38px 0 50px;scroll-margin-top:105px}
.stage-heading{display:flex;align-items:center;gap:18px;border:1px solid #dde7f3;border-right:5px solid var(--blue);background:#fff;padding:19px 23px;border-radius:18px;margin-bottom:18px}
.stage-heading h2{font-size:25px;margin:2px 0}.stage-heading p{margin:0;color:#5d7383;font-size:15px}
.stage-number{display:grid;place-items:center;border-radius:17px;flex:0 0 59px;height:59px;background:linear-gradient(135deg,var(--navy),var(--blue));color:#fff;font-size:22px;font-weight:900}
.back-to-stages{margin-right:auto;white-space:nowrap;font-size:13px;color:var(--blue);font-weight:700;border:1px solid #dbe6f4;border-radius:12px;padding:8px 11px}
.home-stages{margin-top:30px}.home-stages h2{margin:0 0 4px}.home-stages>p{margin:0}
.stage-section .step p{font-size:17px;color:#435a6c;line-height:1.9}.stage-section .step h2{font-size:23px}.stage-section .image-button img{max-height:365px}
@media(max-width:1080px){.stage-index{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:650px){.stage-index{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.stage-jump{padding:12px}.stage-jump-title{font-size:14px}.stage-heading{gap:11px;flex-wrap:wrap;padding:15px}.stage-number{flex-basis:45px;height:45px;font-size:18px}.stage-heading h2{font-size:20px}.stage-heading p{font-size:14px}.back-to-stages{margin-right:0}.stage-section{margin:28px 0 40px}}
`;
  for(const [i,p] of unifiedPages.entries()){
    let html=renderPage(p,i);
    if(p.id==="steps"){
      const start=html.indexOf('<section class="hero">');
      const end=html.indexOf('<div class="pager">',start);
      if(start<0||end<0)throw new Error("Missing guide content slot");
      html=html.slice(0,start)+fullJourney+html.slice(end);
    }
    if(p.id==="home"){
      html=html.replace('<div class="notice">',`<section class="home-stages"><h2>مراحل أداء المقياس</h2><p>اضغط على المرحلة للانتقال إليها داخل صفحة الخطوات الموحّدة.</p>${stageCards("steps.html")}<a class="btn primary" href="steps.html">عرض الخطوات كاملة ←</a></section><div class="notice">`);
      html=html.replace('يحتوي الدليل على 21 خطوة موزعة على 4 مراحل،','يحتوي الدليل على 21 خطوة موزعة على 4 مراحل في صفحة واحدة،');
      html=html.replace('حلول المشكلات الشائعة والدعم الفني','٢١ خطوة مصوّرة من تسجيل الدخول حتى التسليم');
    }
    html=html.replace(/(login|setup|verify|exam)\.html#step-/g,'steps.html#step-');
    html=html.replace('</style>',unifiedStyle+'\n</style>');
    fs.writeFileSync(path.join(output,p.file),html,'utf8');
  }
  for(const [id] of journey){
    const destination='steps.html#'+id;
    const redirect=`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${destination}"><title>الانتقال إلى خطوات المقياس</title><script>location.replace('steps.html'+(location.hash||'#${id}'));</script></head><body><a href="${destination}">الانتقال إلى خطوات المقياس</a></body></html>`;
    fs.writeFileSync(path.join(output,id+'.html'),redirect,'utf8');
  }
  console.log("النسخة الموحدة جاهزة: ٢١ خطوة في steps.html مع تحويل روابط المراحل السابقة");
})();


// English canonical guide link: Mawhiba Remote Trial Assessment.
// Keep previous URLs working for existing students.
{
  const canonical = "mawhiba-remote-trial-assessment.html";
  const oldFile = "steps.html";
  const guidePath = path.join(output, oldFile);
  const canonicalPath = path.join(output, canonical);
  if (!fs.existsSync(guidePath)) throw new Error("Unified steps page missing");
  const original = fs.readFileSync(guidePath, "utf8");
  fs.writeFileSync(canonicalPath, original.replaceAll(oldFile, canonical), "utf8");
  for (const pageName of ["index.html", "before.html", "help.html", "login.html", "setup.html", "verify.html", "exam.html"]) {
    const p = path.join(output, pageName);
    if (!fs.existsSync(p)) continue;
    fs.writeFileSync(p, fs.readFileSync(p, "utf8").replaceAll(oldFile, canonical), "utf8");
  }
  const fallback = '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=' + canonical + '"><title>الانتقال إلى دليل المقياس</title><script>location.replace("' + canonical + '" + location.hash);</script></head><body><a href="' + canonical + '">الانتقال إلى دليل مقياس موهبة التجريبي عن بعد</a></body></html>';
  fs.writeFileSync(guidePath, fallback, "utf8");
  console.log("English canonical guide: /" + canonical);
}

;(function addIntroductoryMeeting() {
  // Paste a shared Google Drive video link in this single setting when available.
  const INTRO_VIDEO_DRIVE_URL = "https://drive.google.com/file/d/1y6ClOvbhChatR57BwfY95gOVhzIfuQLM/view?usp=sharing";
  const introFilename = "intro.html";
  const homeFilename = "index.html";
  const helpFilename = "help.html";
  const targets = [homeFilename, "before.html", "mawhiba-remote-trial-assessment.html", helpFilename];
  let driveId = "";
  if (INTRO_VIDEO_DRIVE_URL.trim()) {
    const u = new URL(INTRO_VIDEO_DRIVE_URL.trim());
    if (!["drive.google.com", "docs.google.com"].includes(u.hostname)) throw Error("Expected a Google Drive video URL");
    const pathMatch = u.pathname.match(/\/file\/d\/([A-Za-z0-9_-]{10,})(?:\/|$)/);
    const rawId = pathMatch ? pathMatch[1] : u.searchParams.get("id");
    if (!rawId || !/^[A-Za-z0-9_-]{10,}$/.test(rawId)) throw Error("Invalid Google Drive file ID");
    driveId = rawId;
  }
  const player = driveId
    ? `<iframe src="https://drive.google.com/file/d/${driveId}/preview" title="تسجيل اللقاء التعريفي لمقياس موهبة التجريبي" allow="autoplay; fullscreen" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`
    : `<div class="intro-waiting" role="status"><span class="intro-play-symbol" aria-hidden="true">▶</span><h2>سيُتاح تسجيل اللقاء التعريفي هنا</h2><p>هذه الصفحة مخصصة لمشاهدة التسجيل، وسيظهر الفيديو عند ربطه.</p></div>`;
  const videoLink = driveId
    ? `<a class="btn intro-watch-btn" href="https://drive.google.com/file/d/${driveId}/view" target="_blank" rel="noopener noreferrer">فتح الفيديو على Google Drive ↗</a>`
    : `<span class="intro-video-note">لم يُربط فيديو اللقاء بعد.</span>`;
  const introMain = `<main>
    <section class="hero">
      <span class="eyebrow">تسجيل اللقاء التعريفي</span>
      <h1>اللقاء التعريفي لمقياس موهبة التجريبي – عن بُعد</h1>
      <p>شاهد تسجيل اللقاء للتعرّف على الاستعداد للمقياس وخطوات الدخول، وتهيئة الجهاز، وأداء الاختبار.</p>
    </section>
    <section class="intro-section" id="intro-video" aria-labelledby="intro-heading">
      <div class="intro-section-head">
        <div><span class="intro-kicker">المشاهدة داخل الدليل</span>
          <h2 id="intro-heading">فيديو اللقاء التعريفي</h2>
          <p>مشاهدة مباشرة من Google Drive دون الحاجة إلى مغادرة دليل موهبة.</p>
        </div>
        <span class="intro-source-tag">Google Drive</span>
      </div>
      <div class="intro-frame">${player}</div>
      <div class="intro-video-footer">${videoLink}
        <span>إذا لم يظهر الفيديو داخل الصفحة بعد ربطه، افتحه من Google Drive.</span>
      </div>
    </section>
    <section class="intro-next-section" aria-label="بعد مشاهدة الفيديو">
      <h2>بعد مشاهدة اللقاء</h2>
      <p>راجع متطلبات الجهاز ثم تابع الخطوات المصوّرة من تسجيل الدخول حتى التسليم النهائي.</p>
      <div class="intro-next-links">
        <a class="btn" href="before.html">متطلبات ما قبل الاختبار</a>
        <a class="btn intro-platform-btn" href="https://mawhiba.classera.com/" target="_blank" rel="noopener noreferrer">الدخول إلى منصة المقياس ↗</a>
        <a class="btn primary" href="mawhiba-remote-trial-assessment.html">خطوات الدخول وأداء المقياس ←</a>
      </div>
    </section>
    <div class="pager">
      <a class="btn" href="index.html">العودة للرئيسية</a>
      <a class="btn primary" href="mawhiba-remote-trial-assessment.html">متابعة الخطوات المصوّرة ←</a>
    </div>
    <footer>الدليل الإرشادي لمقياس موهبة التجريبي</footer>
  </main>`;
  const navEntry = `
        <a class="nav-link " href="${introFilename}">
          <span class="icon" aria-hidden="true">▶</span>
          <span>اللقاء التعريفي</span>
        </a>
        <a class="nav-link intro-platform-nav" href="https://mawhiba.classera.com/" target="_blank" rel="noopener noreferrer"><span class="icon" aria-hidden="true">↗</span><span>الدخول إلى المقياس</span></a>
`;
  const introStyles = `
/* Introductory meeting video section */
.intro-section{margin:22px 0;background:#fff;border:1px solid #dfe7f2;border-radius:20px;box-shadow:var(--shadow);padding:clamp(18px,3vw,28px)}
.intro-section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px;margin-bottom:20px}
.intro-section-head h2{font-size:clamp(21px,2.7vw,26px);margin:5px 0 3px;line-height:1.5}
.intro-section-head p{font-size:14px;color:#587083;margin:0}
.intro-kicker{color:#7759ce;font-weight:800;font-size:13px}
.intro-source-tag{white-space:nowrap;border-radius:22px;padding:7px 12px;color:#2453a3;background:#edf3ff;font-weight:800;font-size:12px}
.intro-frame{width:100%;aspect-ratio:16/9;background:linear-gradient(135deg,#172d5a,#342d77);border-radius:17px;overflow:hidden;position:relative}
.intro-frame iframe{display:block;width:100%;height:100%;border:0;background:#101c33}
.intro-waiting{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:10px;padding:22px;color:#fff}
.intro-play-symbol{display:grid;place-items:center;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.32);height:65px;width:65px;border-radius:50%;font-size:25px;padding-right:3px}
.intro-waiting h2{color:#fff;font-size:clamp(19px,3vw,27px);margin:5px 0}
.intro-waiting p{color:#dfe5f7;font-size:15px;max-width:430px;margin:0}
.intro-video-footer{display:flex;justify-content:space-between;align-items:center;gap:13px;flex-wrap:wrap;margin-top:16px;color:#536d83;font-size:13px}
.intro-video-note{font-weight:800;color:#695eb0;background:#f3f0ff;padding:7px 12px;border-radius:10px}
.intro-watch-btn{color:#205bc3;border-color:#c9d6ef}
.intro-next-section{border:1px solid #e1e8f1;border-radius:17px;background:#fff;padding:21px 24px;margin-top:20px}
.intro-next-section h2{margin:0 0 4px}
.intro-next-section p{margin:0 0 14px}
.intro-next-links{display:flex;flex-wrap:wrap;gap:10px}
.intro-home-card{border-color:#d5d7f4;background:linear-gradient(125deg,#fff,#f5f3ff)}
.intro-platform-nav{color:var(--blue);font-weight:800}
.intro-platform-btn{border-color:#aec6e7;background:#f0f6ff;color:var(--blue)}
@media(max-width:650px){.intro-section-head{flex-direction:column}.intro-section{padding:15px}.intro-waiting{gap:6px;padding:12px}.intro-play-symbol{width:48px;height:48px}.intro-waiting p{font-size:12px}.intro-next-section{padding:17px}}
`;
  const read = name => {
    const p = path.join(output, name);
    if (!fs.existsSync(p)) throw Error("Missing generated page: " + name);
    return fs.readFileSync(p, "utf8");
  };
  function decorate(html, isHome) {
    const sidebarNavEnd = "    </nav>";
    if (!html.includes(sidebarNavEnd)) throw Error("Sidebar nav insertion point missing");
    html = html.replace(sidebarNavEnd, navEntry + sidebarNavEnd);
    if (!html.includes("</style>")) throw Error("CSS closing tag missing");
    html = html.replace("</style>", introStyles + "\n</style>");
    if (isHome) {
      const target = '<a class="card" href="help.html">';
      if (!html.includes(target)) throw Error("Home cards insertion point missing");
      const feature = `<a class="card intro-home-card" href="${introFilename}">
        <span class="symbol" aria-hidden="true">▶</span>
        <h2>اللقاء التعريفي</h2>
        <p>تسجيل اللقاء التعريفي لمقياس موهبة التجريبي – عن بُعد، للمشاهدة داخل الموقع.</p>
        <span class="range">${driveId ? "مشاهدة التسجيل" : "سيُتاح التسجيل قريبًا"}</span>
      </a>`;
      html = html.replace(target, feature + "\n        " + target);
    }
    return html;
  }
  for (const name of targets) {
    const updated = decorate(read(name), name === homeFilename);
    fs.writeFileSync(path.join(output, name), updated, "utf8");
  }
  let intro = read(helpFilename);
  intro = intro
    .replace(/<title>[^<]*<\/title>/, "<title>اللقاء التعريفي | دليل مقياس موهبة التجريبي</title>")
    .replace(/<main>[\s\S]*?<\/main>/, introMain)
    .replace(/<a class="nav-link active"[\s\S]*?<\/a>/, match =>
      match.replace('class="nav-link active"', 'class="nav-link "').replace('aria-current="page"', ""))
    .replace(`<a class="nav-link " href="${introFilename}">`, `<a class="nav-link active" href="${introFilename}" aria-current="page">`);
  if (!intro.includes('id="intro-video"') || !intro.includes('aria-current="page"')) throw Error("Failed generating intro page");
  fs.writeFileSync(path.join(output, introFilename), intro, "utf8");
  console.log("Introductory meeting section generated: /intro.html", driveId ? "(video configured)" : "(awaiting Drive video link)");
})();

;(function addDocumentGuideTab(){
 const name="الدليل الارشادي لمقياس موهبة التجريبي", filename="manual.html";
 const nav=`<a class="nav-link manual-nav-link" href="${filename}" title="${name}.pdf"><span class="icon" aria-hidden="true">▤</span><span>${name}</span></a>`;
 const styles=`
.manual-nav-link span:last-child{white-space:normal;line-height:1.7}
.manual-pane{background:#fff;border:1px solid var(--border);border-radius:18px;box-shadow:var(--shadow);padding:clamp(16px,3vw,28px);margin:23px 0}
.manual-pane h2{font-size:23px;margin:0 0 12px}.manual-pane p,.manual-pane li{font-size:16px;line-height:1.9}
.manual-summary{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.manual-summary>div{border:1px solid #dde7f4;background:#f8faff;border-radius:13px;padding:16px}
.manual-summary strong{font-size:17px;color:var(--navy)}
.manual-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:15px}
.manual-tags a{border:1px solid #dce5f3;background:#eef3fe;padding:8px 12px;border-radius:11px;font-size:13px;font-weight:800}
.manual-block{scroll-margin-top:95px}
.manual-steps .step{margin:14px 0}
.manual-pane .manual-source{font-size:13px;color:#557185;font-weight:800}
@media(max-width:700px){.manual-summary{grid-template-columns:1fr}.manual-pane{padding:16px}}
`;
 const grouped=[
  ["تسجيل الدخول",1,7],["تهيئة الجهاز والأذونات",8,13],
  ["فحص الصوت والتحقق من الطالب",14,18],["أداء المقياس والتسليم",19,21]
 ];
 const requirements=[
  ["الجهاز","كمبيوتر بنظام ويندوز أو ماك، وذاكرة 4 جيجابايت"],
  ["المتصفح","Google Chrome"],
  ["الكاميرا والميكروفون","كاميرا ويب وميكروفون يعملان بشكل سليم"],
  ["الإنترنت","اتصال مستقر، والحد الأدنى للسرعة 1 ميجابايت في الثانية حسب الدليل"]
 ];
 const rules=["عدم استخدام الجوال","عدم استخدام سماعات الرأس أو الآلة الحاسبة","عدم فتح نوافذ أو تطبيقات أخرى أثناء الاختبار","عدم حجب الكاميرا أو الخروج من نطاقها أو إغلاق الميكروفون","عدم الاستعانة بأشخاص أو تقنيات للإجابة"];
 const contents=`<main>
 <section class="hero"><span class="eyebrow">نسخة إلكترونية من الدليل المرفق</span><h1>${name}</h1>
 <p>استعرض التعليمات والتهيئة والمخالفات وخطوات الدخول والأداء الـ21 بصورها، كما وردت في الملف الإرشادي.</p></section>
 <div class="manual-tags"><a href="#manual-overview">نظرة عامة</a><a href="#manual-requirements">المتطلبات</a><a href="#manual-rules">المخالفات</a><a href="#manual-faq">حل المشكلات</a><a href="#manual-steps">الخطوات المصورة</a></div>
 <section id="manual-overview" class="manual-pane manual-block"><div class="manual-source">الصفحتان 1–2 من الملف</div>
 <h2>مسار الطالب من البداية إلى التسليم</h2>
 <div class="manual-summary"><div><strong>1. جهّز جهازك</strong><p>تأكد من جاهزية الجهاز والكاميرا والميكروفون وChrome والإنترنت.</p></div>
 <div><strong>2. سجّل الدخول</strong><p>افتح المنصة، وتحقق من الهوية، واختر الاختبار بحسب التخصص.</p></div>
 <div><strong>3. أكمل التحقق</strong><p>فعّل مشاركة الشاشة والكاميرا والميكروفون، وأكمل الفحص.</p></div>
 <div><strong>4. أدِّ المقياس</strong><p>أجب عن الأسئلة وراجع الإجابات ثم أكّد التسليم.</p></div></div></section>
 <section id="manual-requirements" class="manual-pane manual-block"><div class="manual-source">الصفحتان 3–4 من الملف</div><h2>متطلبات الاختبار والأذونات</h2>
 <div class="manual-summary">${requirements.map(p=>`<div><strong>${p[0]}</strong><p>${p[1]}</p></div>`).join("")}</div>
 <p>فعّل مشاركة الشاشة كاملة، وامنح أذونات الكاميرا والميكروفون، وأكمل فحص الصوت قبل أداء المقياس.</p></section>
 <section id="manual-rules" class="manual-pane manual-block"><div class="manual-source">الصفحة 5 من الملف</div><h2>المخالفات التي قد تستوجب حجب النتيجة</h2><ul>${rules.map(v=>`<li>${v}</li>`).join("")}</ul></section>
 <section id="manual-faq" class="manual-pane manual-block"><div class="manual-source">الصفحات 6–8 من الملف</div><h2>حل المشكلات والدعم الفني</h2>
 <p>عند مواجهة مشكلة بالكاميرا أو الميكروفون، راجع أذونات المتصفح وأعد تشغيله. وإذا انقطع الإنترنت، أعد الاتصال وسجّل الدخول مجددًا.</p>
 <p>للدعم الفني: <a href="mailto:gig@mawhiba.org.sa">gig@mawhiba.org.sa</a> — أرفق الاسم والهوية ووصف المشكلة وصورتها.</p>
 <a class="btn primary" href="help.html#support-request">فتح نموذج الدعم الفني</a></section>
 <section id="manual-steps" class="manual-pane manual-block"><div class="manual-source">الصفحات 9–27 من الملف</div><h2>خطوات الدخول وأداء المقياس</h2>
 <p>الخطوات الـ21 وصورها التوضيحية من الدليل.</p>
 ${grouped.map(group=>`<section class="manual-block"><h2>${group[0]}: ${group[1]}–${group[2]}</h2>
 <div class="manual-steps">${steps.filter(step=>step[0]>=group[1]&&step[0]<=group[2]).map(renderStep).join("")}</div></section>`).join("")}
 <p class="manual-source">نسخة ويب مقروءة من محتوى الملف المرفق، وليست ملف PDF الأصلي بتنسيق صفحاته.</p></section>
 <div class="pager"><a class="btn" href="index.html">الرئيسية</a><a class="btn primary" href="mawhiba-remote-trial-assessment.html">خطوات المقياس ←</a></div>
 <footer>الدليل الإرشادي لمقياس موهبة التجريبي</footer></main>`;
 const names=["index.html","before.html","mawhiba-remote-trial-assessment.html","intro.html","help.html"];
 const source=path.join(output,"intro.html");
 if(!fs.existsSync(source))throw Error("Intro page missing");
 const activeIntro=`<a class="nav-link active" href="intro.html" aria-current="page">`;
 let base=fs.readFileSync(source,"utf8");
 const navPattern=/(<a class="nav-link[^"]*" href="intro\.html"[^>]*>[\s\S]*?<\/a>)/;
 if(!navPattern.test(base))throw Error("Intro nav not found");
 for(const n of names){
  const dest=path.join(output,n);
  if(!fs.existsSync(dest))throw Error("Missing page "+n);
  let h=fs.readFileSync(dest,"utf8");
  if(!navPattern.test(h))throw Error("Missing nav on "+n);
  h=h.replace(navPattern,m=>m+"\n"+nav).replace("</style>",styles+"\n</style>");
  if(n==="index.html"){
   const anchor='<a class="card intro-home-card" href="intro.html">';
   if(!h.includes(anchor))throw Error("Home cards anchor missing");
   h=h.replace(anchor,`<a class="card" href="${filename}"><span class="symbol">▤</span><h2>${name}</h2><p>المتطلبات والخطوات الـ21 كما وردت في الملف الإرشادي.</p><span class="range">عرض الدليل</span></a>\n`+anchor);
  }
  fs.writeFileSync(dest,h,"utf8");
 }
 let doc=fs.readFileSync(source,"utf8");
 if(!doc.includes(activeIntro))throw Error("Active intro nav missing");
 doc=doc.replace(activeIntro,'<a class="nav-link " href="intro.html">');
 doc=doc.replace(`<a class="nav-link manual-nav-link" href="${filename}"`, `<a class="nav-link manual-nav-link active" aria-current="page" href="${filename}"`);
 doc=doc.replace(/<main>[\s\S]*?<\/main>/,contents).replace(/<title>[^<]*<\/title>/,`<title>${name} | موهبة</title>`);
 if(!doc.includes('id="step-21"'))throw Error("No steps in manual");
 fs.writeFileSync(path.join(output,filename),doc,"utf8");
 console.log("New manual tab: "+filename);
})();

;(function installOriginalPdfReader() {
  const filename="manual.html";
  const target=path.join(output,filename);
  if(!fs.existsSync(target)) throw new Error("Expected manual tab not generated");
  const original=fs.readFileSync(target,"utf8");
  const pdfName="الدليل الارشادي لمقياس موهبة التجريبي.pdf";
  const pdfAssetPath="assets/"+pdfName;
  const hasPublishedPdf=fs.existsSync(path.join(__dirname,"assets",pdfName));
  const title="الدليل الارشادي لمقياس موهبة التجريبي";
  const main=`<main class="pdf-page-main">
    <section class="hero">
      <span class="eyebrow">الدليل الأصلي</span>
      <h1>${title}</h1>
      <p>استعرض صفحات الملف الأصلي كما هي، وانتقل بين الصفحات، وكبّر العرض، ثم نزّل ملف PDF عند الحاجة.</p>
    </section>
    <section class="pdf-reader-card" aria-label="استعراض الدليل الأصلي">
      <div class="pdf-reader-toolbar">
        <div class="pdf-reader-meta"><strong>${title}</strong><span>ملف PDF • ٢٧ صفحة</span></div>
        <div class="pdf-reader-actions">
          <a class="btn pdf-download" id="manual-pdf-download" href="#" download="${pdfName}" hidden>تنزيل PDF <span aria-hidden="true">↓</span></a>
          <a class="btn pdf-open" id="manual-pdf-open" href="#" target="_blank" rel="noopener noreferrer" hidden>فتح الملف ↗</a>
        </div>
      </div>
      <div id="pdf-reader-loading" class="pdf-reader-loading" role="status">جارٍ تجهيز عارض الملف…</div>
      <div class="pdf-reader-controls" id="pdf-reader-controls" hidden>
        <div class="pdf-page-controls">
          <button type="button" class="btn" id="pdf-prev" aria-label="الصفحة السابقة">السابق</button>
          <label class="pdf-page-counter">صفحة <input id="pdf-current-page" type="number" min="1" value="1" inputmode="numeric" aria-label="رقم الصفحة"> من <span id="pdf-total-pages">٢٧</span></label>
          <button type="button" class="btn" id="pdf-next" aria-label="الصفحة التالية">التالي</button>
        </div>
        <div class="pdf-zoom-controls">
          <button type="button" class="btn" id="pdf-zoom-out" aria-label="تصغير">−</button>
          <span id="pdf-zoom-value" aria-live="polite">100%</span>
          <button type="button" class="btn" id="pdf-zoom-in" aria-label="تكبير">+</button>
        </div>
      </div>
      <div class="pdf-reader-stage" id="pdf-reader-stage">
        <div class="pdf-reader-placeholder" id="pdf-reader-placeholder" ${hasPublishedPdf?"hidden":""}>
          <span class="pdf-placeholder-icon" aria-hidden="true">▤</span>
          <h2>استعراض ملف PDF الأصلي</h2>
          <p>ملف الدليل لم يُنشر بعد ضمن ملفات الموقع. تقدر تختاره من جهازك لتصفحه هنا مباشرة دون رفعه أو إرسال بياناته.</p>
          <label class="btn primary pdf-file-picker">اختيار الملف من الجهاز <input type="file" id="manual-local-pdf" accept=".pdf,application/pdf" hidden></label>
          <p class="pdf-privacy-note">المعاينة محلية داخل متصفحك؛ ولا يتم رفع الملف للموقع.</p>
        </div>
        <canvas id="pdf-reader-canvas" aria-label="صفحة من الدليل" hidden></canvas>
        <iframe id="pdf-reader-fallback" title="استعراض الدليل PDF" hidden></iframe>
      </div>
      <div class="pdf-reader-footnote">
        <span>يُعرض ملف PDF دون إعادة صياغة أو تعديل الصفحات.</span>
        <span id="pdf-reader-error" role="alert"></span>
      </div>
    </section>
    <div class="pager"><a class="btn" href="index.html">الرئيسية</a><a class="btn primary" href="mawhiba-remote-trial-assessment.html">الخطوات المصوّرة ←</a></div>
    <footer>الدليل الإرشادي لمقياس موهبة التجريبي</footer>
  </main>`;
  const style=`
/* Original PDF manual viewer */
.pdf-page-main{min-width:0}
.pdf-reader-card{background:#fff;border:1px solid #dce6f3;border-radius:20px;padding:clamp(12px,2.3vw,24px);margin:24px 0;box-shadow:var(--shadow)}
.pdf-reader-toolbar,.pdf-reader-controls,.pdf-reader-actions,.pdf-page-controls,.pdf-zoom-controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.pdf-reader-toolbar{justify-content:space-between;padding-bottom:15px;border-bottom:1px solid #e2eaf4}
.pdf-reader-meta{display:grid;gap:4px}.pdf-reader-meta strong{font-size:16px;color:var(--navy)}.pdf-reader-meta span{font-size:13px;color:var(--muted)}
.pdf-reader-controls{justify-content:space-between;padding:14px 2px}
.pdf-page-counter{display:flex;align-items:center;gap:7px;font-weight:700;font-size:13px}
.pdf-page-counter input{width:64px;text-align:center;padding:7px 3px;border:1px solid #cbd8e8;border-radius:9px;font:inherit;color:var(--navy)}
.pdf-zoom-controls{gap:7px}.pdf-zoom-controls span{font-size:13px;color:var(--navy);font-weight:800;min-width:45px;text-align:center}
.pdf-reader-stage{background:#e9eef7;border:1px solid #dce6f3;border-radius:15px;min-height:540px;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:20px}
#pdf-reader-canvas{display:block;max-width:none;background:#fff;box-shadow:0 8px 28px rgba(10,35,69,.2)}
#pdf-reader-canvas[hidden],#pdf-reader-fallback[hidden],.pdf-reader-placeholder[hidden],.pdf-reader-controls[hidden]{display:none}
#pdf-reader-fallback{width:100%;height:76vh;border:0;background:#fff}
.pdf-reader-placeholder{align-self:center;max-width:540px;text-align:center;padding:35px 15px;color:#4a647d}
.pdf-reader-placeholder h2{font-size:23px;margin:10px 0}.pdf-reader-placeholder p{font-size:15px;line-height:1.9}
.pdf-placeholder-icon{display:inline-grid;place-items:center;width:76px;height:76px;background:#dfe8fc;border-radius:20px;color:#205bc3;font-size:34px}
.pdf-file-picker{cursor:pointer;display:inline-flex;margin:8px}
.pdf-privacy-note{color:#667a90;font-size:12px!important}
.pdf-reader-loading{color:#5a6d82;font-size:13px;padding:9px 0}
.pdf-reader-loading[hidden]{display:none}
.pdf-reader-footnote{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;margin-top:12px;font-size:12px;color:#637b90}
#pdf-reader-error{color:#a12f3e}
@media(max-width:650px){.pdf-reader-toolbar,.pdf-reader-controls{align-items:stretch;flex-direction:column}.pdf-reader-stage{min-height:360px;padding:8px}.pdf-page-controls{justify-content:center}.pdf-zoom-controls{justify-content:center}#pdf-reader-fallback{height:65vh}}
`;
  const script=String.raw`
<script type="module">
const assetUrl = "__PDF_ASSET_URL__";
const $ = id => document.getElementById(id);
const els = {
  canvas:$("pdf-reader-canvas"), fallback:$("pdf-reader-fallback"),placeholder:$("pdf-reader-placeholder"),
  controls:$("pdf-reader-controls"), loading:$("pdf-reader-loading"),error:$("pdf-reader-error"),
  page:$("pdf-current-page"),pages:$("pdf-total-pages"),zoom:$("pdf-zoom-value"),
  download:$("manual-pdf-download"),open:$("manual-pdf-open")
};
let pdfLib=null, documentRef=null,activeUrl="",localObjectUrl="",pageNumber=1,zoomLevel=1, renderToken=0;
const pdfName="الدليل الارشادي لمقياس موهبة التجريبي.pdf";
function displayLoading(message){els.loading.hidden=!message;els.loading.textContent=message||"";}
async function showPage(){
  if(!documentRef||!pdfLib)return;
  const token=++renderToken;
  els.error.textContent="";
  displayLoading("جارٍ عرض الصفحة " + pageNumber + "…");
  try{
    const page=await documentRef.getPage(pageNumber);
    if(token!==renderToken)return;
    const desiredWidth=Math.max(270,Math.min(900,els.canvas.parentElement.clientWidth-30));
    const initial=page.getViewport({scale:1});
    const scale=(desiredWidth/initial.width)*zoomLevel;
    const pixelRatio=Math.min(window.devicePixelRatio||1,2);
    const viewport=page.getViewport({scale});
    els.canvas.width=Math.round(viewport.width*pixelRatio);
    els.canvas.height=Math.round(viewport.height*pixelRatio);
    els.canvas.style.width=Math.round(viewport.width)+"px";
    els.canvas.style.height=Math.round(viewport.height)+"px";
    const ctx=els.canvas.getContext("2d");
    await page.render({canvasContext:ctx,viewport,transform:pixelRatio===1?undefined:[pixelRatio,0,0,pixelRatio,0,0]}).promise;
    if(token!==renderToken)return;
    els.page.value=pageNumber;
    els.zoom.textContent=Math.round(zoomLevel*100)+"%";
    $("pdf-prev").disabled=pageNumber<=1;
    $("pdf-next").disabled=pageNumber>=documentRef.numPages;
    els.canvas.hidden=false;
    els.fallback.hidden=true;
  }catch(err){els.error.textContent="تعذر عرض الصفحة. افتح ملف PDF من الزر أعلاه.";}
  finally{if(token===renderToken)displayLoading("");}
}
async function openPDF(source,fileUrl,isLocal=false){
  els.error.textContent="";
  displayLoading("جارٍ تحميل ملف الدليل…");
  activeUrl=fileUrl;
  try{
    if(!pdfLib)pdfLib=await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.mjs");
    pdfLib.GlobalWorkerOptions.workerSrc="https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.mjs";
    documentRef=await pdfLib.getDocument(source).promise;
    pageNumber=1;zoomLevel=1;
    els.pages.textContent=String(documentRef.numPages);
    els.controls.hidden=false;
    els.placeholder.hidden=true;
    els.download.hidden=false;
    els.download.href=fileUrl;
    els.download.download=pdfName;
    els.open.hidden=false;
    els.open.href=fileUrl;
    await showPage();
  }catch(err){
    els.controls.hidden=true;els.canvas.hidden=true;
    if(fileUrl){els.placeholder.hidden=true;els.fallback.hidden=false;els.fallback.src=fileUrl;els.download.hidden=false;els.download.href=fileUrl;els.download.download=pdfName;els.open.hidden=false;els.open.href=fileUrl;}
    els.error.textContent="قد لا يدعم متصفحك التصفح المصور؛ استخدم «فتح الملف» أو «تنزيل PDF».";
  }finally{displayLoading("");}
}
$("pdf-prev").addEventListener("click",()=>{if(pageNumber>1){pageNumber--;showPage();}});
$("pdf-next").addEventListener("click",()=>{if(documentRef&&pageNumber<documentRef.numPages){pageNumber++;showPage();}});
els.page.addEventListener("change",()=>{if(!documentRef)return;pageNumber=Math.max(1,Math.min(documentRef.numPages,Number(els.page.value)||1));showPage();});
$("pdf-zoom-out").addEventListener("click",()=>{zoomLevel=Math.max(.55,Math.round((zoomLevel-.15)*100)/100);showPage();});
$("pdf-zoom-in").addEventListener("click",()=>{zoomLevel=Math.min(2.5,Math.round((zoomLevel+.15)*100)/100);showPage();});
$("manual-local-pdf").addEventListener("change",event=>{
  const file=event.target.files?.[0];if(!file)return;
  if(file.type!=="application/pdf"&&!file.name.toLowerCase().endsWith(".pdf")){els.error.textContent="اختر ملفًا بصيغة PDF.";return;}
  if(localObjectUrl)URL.revokeObjectURL(localObjectUrl);
  localObjectUrl=URL.createObjectURL(file);
  openPDF(localObjectUrl,localObjectUrl,true);
});
if(assetUrl){openPDF(assetUrl,assetUrl,false);}else{displayLoading("");}
</script>
`.replace("__PDF_ASSET_URL__",hasPublishedPdf?pdfAssetPath:"");
  const doc=original.replace(/<main>[\s\S]*?<\/main>/,main).replace("</style>",style+"\n</style>").replace("</body>",script+"\n</body>");
  if(doc===original||!doc.includes('id="pdf-reader-canvas"'))throw Error("PDF reader generation failed");
  if(doc.includes("manual-summary") && doc.includes("الصفحتان 1–2 من الملف"))throw Error("Old manual content was not removed");
  fs.writeFileSync(target,doc,"utf8");
  console.log("PDF-only manual tab generated; binary hosted:",hasPublishedPdf);
})();
