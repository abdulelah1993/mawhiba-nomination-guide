const steps=[
{id:1,part:1,title:'الدخول إلى لوحة التحكم',description:'افتح رابط لوحة التحكم، ثم أدخل رقم الهوية. إذا لم يكن لديك حساب، اختر «تسجيل جديد».',caption:'صفحة تسجيل الدخول',hint:'يمكنك الدخول من رابط لوحة التحكم المعتمد في الدليل.',link:'https://admin.mawhiba.sa/'},
{id:2,part:1,title:'التحقق من الحساب',description:'أدخل رمز التحقق المرسل إلى رقم جوالك، ثم أكمل تسجيل الدخول.',caption:'نافذة إدخال رمز التحقق',hint:'استخدم رمز التحقق الذي يصلك عند تسجيل الدخول.'},
{id:3,part:2,title:'فتح البرنامج الوطني للكشف عن الموهوبين',description:'من الصفحة الرئيسية للوحة التحكم، اختر «البرنامج الوطني للكشف عن الموهوبين».',caption:'الصفحة الرئيسية للوحة التحكم',hint:'تظهر بطاقة البرنامج بعد الدخول إلى حسابك.'},
{id:4,part:2,title:'الانتقال إلى صفحة ترشيح الطلاب',description:'من القائمة الجانبية، انقر على «مسؤول الدعم»، ثم اختر «ترشيح الطلاب» للانتقال إلى صفحة الترشيح.',caption:'القائمة الجانبية للبرنامج',hint:'اختر مسار الترشيح من القائمة الجانبية داخل البرنامج.'},
{id:5,part:2,title:'إدخال بيانات الترشيح',description:'اختر الصف الدراسي، ثم أدخل أرقام هويات الطلبة في الحقل المخصص، واضغط «إضافة».',caption:'صفحة إضافة الترشيحات',hint:'تحقق من اختيار الصف الدراسي وإدخال الهويات في الحقل الصحيح قبل الإضافة.'},
{id:6,part:2,title:'مراجعة نتيجة الترشيح',description:'راجع النتائج التي تظهر بعد الإضافة، وتحقق من حالة ترشيح كل طالب.',caption:'نتائج إضافة الترشيحات',hint:'ظهور النتائج بعد الإضافة لا يغني عن مراجعة حالة كل ترشيح.'},
{id:7,part:3,title:'عرض تقرير الترشيحات وتصديره',description:'من القائمة، افتح «تقرير الترشيحات» للاطلاع على بيانات الطلبة وحالاتهم. ولتنزيل البيانات، اضغط «تصدير لإكسل».',caption:'تقرير الترشيحات وخيار التصدير',hint:'استفد من خيار التصدير عند الحاجة إلى مراجعة بيانات الترشيحات في Excel.'},
{id:8,part:3,title:'البحث عن طالب وحذف ترشيحه',description:'أدخل رقم هوية الطالب، ثم اضغط «بحث». ولحذف ترشيحه، اختر «حذف» من خيار الحذف.',caption:'البحث عن الطالب في تقرير الترشيحات',hint:'راجع نتائج البحث بعناية للتأكد من الطالب المقصود قبل تنفيذ الحذف.'},
{id:9,part:3,title:'تأكيد حذف الترشيح',description:'راجع رسالة التأكيد، وتحقق من اختيار الطالب الصحيح قبل الموافقة على الحذف.',caption:'رسالة تأكيد حذف الترشيح',hint:'الحذف إجراء مؤثر؛ لا توافق على رسالة التأكيد قبل التأكد من بيانات الطالب.'},
{id:10,part:3,title:'التحقق من اكتمال الحذف',description:'تأكد من ظهور رسالة نجاح الحذف واختفاء الترشيح من القائمة.',caption:'رسالة نجاح حذف الترشيح',hint:'اكتمال العملية يظهر من رسالة النجاح وعدم بقاء الترشيح في القائمة.'}];
const parts={1:{label:'الجزء الأول | تسجيل الدخول',short:'المرحلة الأولى'},2:{label:'الجزء الثاني | ترشيح الطلاب',short:'المرحلة الثانية'},3:{label:'الجزء الثالث | متابعة الترشيحات والحذف',short:'المرحلة الثالثة'}};

const byId = id => document.getElementById(id);
const pic = id => "assets/step-" + String(id).padStart(2,"0") + ".webp";
const allSteps = byId("allSteps");
let focusedImage=1;
let zoom=1;

try {
  const savedTheme=localStorage.getItem("mawhiba-guide-theme");
  if (savedTheme==="light" || savedTheme==="dark") document.body.dataset.theme=savedTheme;
} catch(e) {}

function syncTheme(){
 const dark=document.body.dataset.theme==="dark";
 byId("themeIcon").textContent=dark?"☀":"☾";
 byId("themeToggle").setAttribute("aria-label",dark?"التبديل إلى الوضع الفاتح":"التبديل إلى الوضع الليلي");
}
byId("themeToggle").addEventListener("click",()=>{
 const next=document.body.dataset.theme==="dark"?"light":"dark";
 document.body.dataset.theme=next;
 try {localStorage.setItem("mawhiba-guide-theme",next);}catch(e){}
 syncTheme();
});
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
 image.src=pic(s.id);
 image.alt=s.caption+" — الخطوة "+s.id;
 const imageCaption=make("span","all-step-image-caption","⤢ اضغط على الصورة لتكبيرها");
 imageButton.append(image,imageCaption);
 imageButton.onclick=()=>openImage(s.id);
 const note=make("div","all-step-note");
 const noteTitle=make("strong","","ملاحظة إرشادية");
 const noteBody=make("p","",s.hint);
 note.append(noteTitle,noteBody);
 content.append(desc,imageButton,note);
 if(s.link){
  const link=make("a","inline-portal","فتح لوحة التحكم ↗");
  link.href=s.link;link.target="_blank";link.rel="noopener noreferrer";
  content.append(link);
 }
 item.append(heading,content);
 return item;
}
steps.forEach(s=>allSteps.append(createStep(s)));
byId("expandAll").onclick=()=>document.querySelectorAll("details.all-step-card").forEach(el=>el.open=true);
byId("collapseAll").onclick=()=>document.querySelectorAll("details.all-step-card").forEach(el=>el.open=false);
byId("searchSteps").addEventListener("input",e=>{
 const q=e.target.value.trim().toLowerCase();
 document.querySelectorAll("details.all-step-card").forEach((el,i)=>{
  const s=steps[i];el.hidden=!!q&&!((s.title+" "+s.description+" "+s.caption+" "+s.hint).toLowerCase().includes(q));
  if(q&&!el.hidden)el.open=true;
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
 im.src=pic(focusedImage);
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
syncTheme();
