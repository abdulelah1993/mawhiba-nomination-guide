# دليل تنفيذ مقياس موهبة التجريبي – عن بُعد

نسخة مستقلة مطابقة للموقع الأصلي، دون تغيير نصوص الخطوات والصور أو تصميم الدليل.

## محتوى النسخة

- الصفحة الرئيسية: `index.html`.
- خطوات الدخول وأداء المقياس في صفحة واحدة: `mawhiba-remote-trial-assessment.html`.
- متطلبات ما قبل الاختبار: `before.html`.
- الأسئلة والمساعدة والدعم: `help.html`.
- الروابط السابقة `login.html` و`setup.html` و`verify.html` و`exam.html` و`steps.html` تحيل إلى القسم المناسب من الدليل المصور.
- الخطوات الإرشادية الـ21 وصورها المضمنة ضمن مجلد `assets/`، مع البحث والتكبير.
- لا يظهر خيار «أنجزت هذه الخطوة»؛ حُذف كما طلب صاحب المشروع.

## التشغيل المحلي

```bash
node build.js
python -m http.server 8000 -d dist
```

## النسخة الجديدة على Render

- اسم الخدمة الجديدة: `mawhiba-remote-trial-assessment`.
- الفرع المخصص لها: `mawhiba-remote-trial-assessment`.
- أمر البناء: `node build.js`.
- مسار النشر: `dist`.
- ملف Blueprint: `render.yaml`.
- رابط النشر: https://render.com/deploy?repo=https://github.com/abdulelah1993/mawhiba-nomination-guide/tree/mawhiba-remote-trial-assessment

**مهم:** خدمة الموقع القديم تظهر في Render باسم الخدمة الجديدة في إحدى لقطات الشاشة، لكن نطاقها بقي `mawhiba-olympiad-guide.onrender.com`. قبل إنشاء الخدمة الجديدة، غيّر **اسم الخدمة القديمة فقط** في Render إلى `mawhiba-olympiad-guide` حتى لا يحدث تعارض في أسماء الخدمات. لا تحذف الخدمة القديمة؛ فهي تحتوي على تحويل ذكي إلى الموقع الجديد عندما يصبح متاحًا.

لا يُنشئ تعديل GitHub وحده خدمة Render جديدة. يجب تأكيد إنشاء Blueprint داخل حساب Render.

هذا المشروع دليل إرشادي وليس منصة لتنفيذ الاختبار نفسه، ولم يُعدّل مستودع `main` أو الموقع الأصلي للترشيح.
