
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
  max-width: 92px;
  max-height: 55px;
  object-fit: contain;
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
.brand-partners { display:flex; gap:18px; justify-content:center; align-items:center; flex-wrap:wrap; background:white; border:1px solid var(--border); border-radius:18px; margin-bottom:24px; padding:16px; }
.brand-partners img { width:auto; height:57px; max-width:31%; object-fit:contain; }
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
@media (max-width: 980px) {
  .layout { grid-template-columns: 1fr; }
  aside { position: static; overflow-x: auto; }
  nav { display: flex; min-width: max-content; }
  .nav-label, .sidebar-progress { display: none; }
}
@media (max-width: 650px) {
  .layout { padding: 15px; }
  .header-inner { padding: 10px; }
  .brand img { width: 55px; }
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
        <label class="done">
          <input type="checkbox" data-step="${n}">
          أنجزت هذه الخطوة
        </label>
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
      <div class="notice">
        <strong>الدعم الفني</strong>
        <p>اذكر اسم الاختبار والتخصص ووصف المشكلة، وأرفق صورة إن أمكن.</p>
        <a href="mailto:gig@mawhiba.org.sa">gig@mawhiba.org.sa</a>
      </div>`;
  }

  return `
    ${hero(
      "الدليل الإرشادي",
      "دليلك لأداء مقياس موهبة التجريبي",
      "خطوات واضحة بصورها من تسجيل الدخول حتى التسليم النهائي."
    )}
    <div class="brand-partners" aria-label="شعارات الجهات">
      <img src="assets/page-01-image-01.png" alt="شعار موهبة">
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
      <img src="assets/page-01-image-01.png" alt="شعار موهبة">
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