const steps=[
  {
    "id": 1,
    "part": 1,
    "imageId": 1,
    "title": "الدخول إلى لوحة التحكم",
    "description": "افتح رابط لوحة التحكم، ثم أدخل رقم الهوية وتابع تسجيل الدخول إلى الحساب.",
    "caption": "صفحة تسجيل الدخول",
    "link": "https://admin.mawhiba.sa/"
  },
  {
    "id": 2,
    "part": 1,
    "imageId": 2,
    "title": "التحقق من الحساب",
    "description": "أدخل رمز التحقق المرسل إلى رقم جوالك، ثم أكمل تسجيل الدخول.",
    "caption": "نافذة إدخال رمز التحقق"
  },
  {
    "id": 3,
    "part": 1,
    "imageId": 3,
    "title": "فتح البرنامج الوطني للكشف عن الموهوبين",
    "description": "من الصفحة الرئيسية للوحة التحكم، اختر «البرنامج الوطني للكشف عن الموهوبين».",
    "caption": "الصفحة الرئيسية للوحة التحكم"
  },
  {
    "id": 4,
    "part": 1,
    "imageId": 4,
    "title": "الوصول إلى خيار ترشيح الطلاب",
    "description": "من القائمة الجانبية، اختر «مسؤول الدعم»، ثم «ترشيح الطلاب» للوصول إلى صفحة الترشيح.",
    "caption": "القائمة الجانبية للبرنامج"
  },
  {
    "id": 5,
    "part": 2,
    "imageId": 5,
    "title": "إدخال بيانات الترشيح",
    "description": "اختر الصف الدراسي، ثم أدخل أرقام هويات الطلبة في الحقل المخصص، واضغط «إضافة».",
    "caption": "صفحة إضافة الترشيحات"
  },
  {
    "id": 6,
    "part": 2,
    "imageId": 6,
    "title": "مراجعة نتيجة الترشيح",
    "description": "راجع النتائج التي تظهر بعد الإضافة، وتحقق من حالة ترشيح كل طالب.",
    "caption": "نتائج إضافة الترشيحات"
  },
  {
    "id": 7,
    "part": 2,
    "imageId": 8,
    "title": "البحث عن طالب وحذف ترشيحه",
    "description": "في حال الرغبة بحذف ترشيح أحد الطلبة، افتح تقرير الترشيحات وأدخل رقم هوية الطالب، ثم اضغط «بحث» واختر «حذف» للطالب المقصود.",
    "caption": "البحث عن الطالب في تقرير الترشيحات"
  },
  {
    "id": 8,
    "part": 2,
    "imageId": 9,
    "title": "تأكيد حذف الترشيح",
    "description": "راجع رسالة التأكيد، وتحقق من اختيار الطالب الصحيح قبل الموافقة على الحذف.",
    "caption": "رسالة تأكيد حذف الترشيح"
  },
  {
    "id": 9,
    "part": 2,
    "imageId": 10,
    "title": "التحقق من اكتمال الحذف",
    "description": "تأكد من ظهور رسالة نجاح الحذف واختفاء الترشيح من القائمة.",
    "caption": "رسالة نجاح حذف الترشيح"
  },
  {
    "id": 10,
    "part": 3,
    "imageId": 7,
    "title": "عرض تقرير الترشيحات وتصديره",
    "description": "من القائمة، افتح «تقرير الترشيحات» للاطلاع على بيانات الطلبة وحالاتهم. ولتنزيل البيانات، اضغط «تصدير لإكسل».",
    "caption": "تقرير الترشيحات وخيار التصدير"
  }
];
const parts={
  "1": {
    "label": "المرحلة الأولى | الوصول إلى صفحة مسؤول الدعم",
    "title": "الوصول إلى صفحة مسؤول الدعم",
    "description": "الدخول إلى لوحة التحكم، والتحقق من الحساب، ثم الانتقال إلى خيار ترشيح الطلاب."
  },
  "2": {
    "label": "المرحلة الثانية | من الترشيح إلى الحذف",
    "title": "ترشيح الطلبة وحذف الترشيحات",
    "description": "إضافة الترشيحات ومراجعة النتائج، ثم إجراءات الحذف عند الحاجة."
  },
  "3": {
    "label": "المرحلة الثالثة | التقارير الإدارية",
    "title": "التقارير الإدارية",
    "description": "الاطلاع على تقرير الترشيحات وتصدير بياناته للمراجعة."
  }
};

const byId = id => document.getElementById(id);
const pic = id => "assets/step-" + String(id).padStart(2,"0") + ".webp";
const allSteps = byId("allSteps");
let focusedImage=1;
let zoom=1;


function make(tag,className,text){
 const el=document.createElement(tag);
 if(className)el.className=className;
 if(text!==undefined)el.textContent=text;
 return el;
}
function createStep(s){
 const item=make("details","all-step-card");
 item.id="step-"+String(s.id).padStart(2,"0");
 item.dataset.part=String(s.part);
 item.open=true;
 const heading=make("summary","all-step-header");
 const badge=make("span","all-step-number",String(s.id).padStart(2,"0"));
 const labels=make("span","all-step-labels");
 const phase=make("span","all-step-phase",parts[s.part].label);
 const title=make("strong","all-step-title",s.title);
 labels.append(phase,title);
 heading.append(badge,labels,make("span","all-step-chevron","⌄"));
 const content=make("div","all-step-body");
 const desc=make("p","all-step-description",s.description);
 const imageButton=make("button","all-step-image");
 imageButton.type="button";
 imageButton.setAttribute("aria-label","تكبير صورة "+s.caption);
 const image=make("img");
 image.loading=s.id<3?"eager":"lazy";
 image.src=pic(s.imageId);
 image.alt=s.caption+" — الخطوة "+s.id;
 const imageCaption=make("span","all-step-image-caption","⤢ اضغط على الصورة لتكبيرها");
 imageButton.append(image,imageCaption);
 imageButton.onclick=()=>openImage(s.id);
 content.append(desc,imageButton);
 if(s.link){
  const link=make("a","inline-portal","فتح لوحة التحكم ↗");
  link.href=s.link;link.target="_blank";link.rel="noopener noreferrer";
  content.append(link);
 }
 item.append(heading,content);
 return item;
}

function stageNote(type,title,body){
  const box=make("div","stage-note "+type);
  box.append(make("strong","",title),make("p","",body));
  return box;
}
for(const part of [1,2,3]){
  const info=parts[part];
  const group=make("section","guide-stage");
  group.id="phase-"+part;
  group.dataset.part=String(part);
  const head=make("div","guide-stage-heading");
  const number=make("span","guide-stage-number",String(part).padStart(2,"0"));
  const copy=make("div","guide-stage-copy");
  copy.append(make("div","overline",info.label),make("h3","",info.title),make("p","",info.description));
  head.append(number,copy);
  group.append(head);
  for(const s of steps.filter(x=>x.part===part)){
    group.append(createStep(s));
    if(s.id===6)group.append(stageNote("registration-note","مسؤولية التسجيل بعد الترشيح","بعد إتمام ترشيح الطالب، تقع مسؤولية التسجيل في مقياس موهبة وحجز الموعد على الطالب أو ولي أمره، وليس على مسؤول الدعم."));
    if(s.id===9)group.append(stageNote("delete-note","في حال الرغبة بالحذف","يمكن لمسؤول الدعم البحث عن الطالب برقم الهوية داخل تقرير الترشيحات، ثم اختيار «حذف». يجب التأكد من الطالب الصحيح قبل الموافقة على الحذف ومراجعة رسالة نجاح العملية."));
  }
  allSteps.append(group);
}

byId("expandAll").onclick=()=>document.querySelectorAll("details.all-step-card").forEach(el=>el.open=true);
byId("collapseAll").onclick=()=>document.querySelectorAll("details.all-step-card").forEach(el=>el.open=false);
byId("searchSteps").addEventListener("input",e=>{
 const q=e.target.value.trim().toLowerCase();
 document.querySelectorAll("details.all-step-card").forEach((el,i)=>{
  const s=steps[i];el.hidden=!!q&&!((s.title+" "+s.description+" "+s.caption).toLowerCase().includes(q));
  if(q&&!el.hidden)el.open=true;
 });
 document.querySelectorAll(".guide-stage").forEach(group=>{
   group.hidden=!!q&&![...group.querySelectorAll(".all-step-card")].some(step=>!step.hidden);
 });
});
function openImage(id){
 focusedImage=id;zoom=1;
 const dialog=byId("imageDialog");
 if(!dialog.open)dialog.showModal();
 refreshImage();
}
function refreshImage(){
 const s=steps[focusedImage-1];
 const im=byId("lightboxImage");
 im.src=pic(s.imageId);
 im.alt=s.caption;
 byId("lightboxTitle").textContent=s.title+" — "+s.caption;
 byId("modalCounter").textContent=focusedImage+" / "+steps.length;
 applyZoom();
}
function applyZoom(){
 const img=byId("lightboxImage");
 img.style.width="";
 img.style.maxWidth="100%";
 img.style.maxHeight="100%";
 img.style.transform="scale("+zoom+")";
 byId("zoomLevel").textContent=Math.round(zoom*100)+"%";
}
byId("zoomIn").onclick=()=>{zoom=Math.min(3,zoom+.25);applyZoom()};
byId("zoomOut").onclick=()=>{zoom=Math.max(.75,zoom-.25);applyZoom()};
byId("zoomReset").onclick=()=>{zoom=1;applyZoom()};
byId("modalPrev").onclick=()=>{focusedImage=focusedImage===1?steps.length:focusedImage-1;zoom=1;refreshImage()};
byId("modalNext").onclick=()=>{focusedImage=focusedImage===steps.length?1:focusedImage+1;zoom=1;refreshImage()};
byId("lightboxClose").onclick=()=>byId("imageDialog").close();
byId("imageDialog").addEventListener("click",e=>{if(e.target===byId("imageDialog"))byId("imageDialog").close()});
document.addEventListener("keydown",e=>{
 if(!byId("imageDialog").open)return;
 if(e.key==="ArrowLeft"){e.preventDefault();byId("modalNext").click();}
 if(e.key==="ArrowRight"){e.preventDefault();byId("modalPrev").click();}
});
byId("printButton").onclick=()=>window.print();
let wasOpen=[];
window.addEventListener("beforeprint",()=>{
 wasOpen=[...document.querySelectorAll("details.all-step-card")].map(el=>el.open);
 document.querySelectorAll("details.all-step-card").forEach(el=>{el.open=true;el.hidden=false;});
});
window.addEventListener("afterprint",()=>{
 document.querySelectorAll("details.all-step-card").forEach((el,i)=>el.open=wasOpen[i]??true);
 byId("searchSteps").dispatchEvent(new Event("input"));
});
