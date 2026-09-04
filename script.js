const setText=(selector,value)=>{const element=document.querySelector(selector);if(element&&value!==undefined)element.textContent=value};
const setAttr=(selector,name,value)=>{const element=document.querySelector(selector);if(element&&value)element.setAttribute(name,value)};
const setVideo=(selector,source,poster)=>{const video=document.querySelector(selector);if(!video)return;if(poster)video.poster=poster;const sourceElement=video.querySelector('source');if(sourceElement&&source)sourceElement.src=source;if(source)video.load()};

async function loadEditableContent(){
  try{
    const response=await fetch('content/site.json',{cache:'no-cache'});
    if(!response.ok)return;
    const data=await response.json();
    if(data.seo){document.title=data.seo.title||document.title;setAttr('meta[name="description"]','content',data.seo.description)}
    if(data.hero){setText('.hero-role',data.hero.role);setText('.hero-intro',data.hero.intro);setText('.availability',data.hero.availability);setAttr('.hero-image img','src',data.hero.image);setAttr('.hero-image img','alt',data.hero.image_alt)}
    if(data.showreel){setText('.showreel-note p:first-child',data.showreel.description);setText('.showreel-note p:last-child',data.showreel.credits);setVideo('.showreel-player video',data.showreel.video,data.showreel.poster)}
    (data.projects||[]).slice(0,3).forEach((item,index)=>{const card=document.querySelectorAll('.project')[index];if(!card)return;const text=(selector,value)=>{const el=card.querySelector(selector);if(el&&value!==undefined)el.textContent=value};text('.project-index',item.index);text('h3',item.title);text('.project-en',item.subtitle);text('dd:nth-of-type(1)',item.type);const dds=card.querySelectorAll('dd');if(dds[1])dds[1].textContent=item.role;text('.project-info > p:not([class])',item.description);text('.credit-note',item.credits);setAttrIn(card,'img','src',item.poster);setAttrIn(card,'img','alt',item.image_alt);const video=card.querySelector('video');if(video){video.poster=item.poster||video.poster;const source=video.querySelector('source');if(source&&item.video)source.src=item.video;video.load()}});
    if(data.studies){setText('.studies-intro p',data.studies.introduction);(data.studies.items||[]).slice(0,3).forEach((item,index)=>{const card=document.querySelectorAll('.study')[index];if(!card)return;const set=(selector,value)=>{const el=card.querySelector(selector);if(el&&value!==undefined)el.textContent=value};set('.study-index',item.index);set('h3',item.title);set('.study-subtitle',item.subtitle);const dds=card.querySelectorAll('dd');[item.role,item.device,item.tool].forEach((value,i)=>{if(dds[i])dds[i].textContent=value});const video=card.querySelector('video');if(video){video.poster=item.poster||video.poster;const source=video.querySelector('source');if(source&&item.video)source.src=item.video;video.load()}})}
    if(data.about){const paragraphs=document.querySelectorAll('.about-copy p');[data.about.lead,data.about.paragraph_1,data.about.paragraph_2].forEach((value,index)=>{if(paragraphs[index]&&value!==undefined)paragraphs[index].textContent=value});setAttr('.about-portrait img','src',data.about.portrait);setText('.about-video-heading p:last-child',data.about.video_description);setVideo('.about-video video',data.about.video,data.about.video_poster)}
    if(data.contact){setText('.contact-grid > div:nth-child(1) strong',data.contact.name);const email=document.querySelector('.contact-grid > div:nth-child(2) a');if(email&&data.contact.email){email.textContent=data.contact.email;email.href=`mailto:${data.contact.email}`};const wechat=document.querySelector('.contact-grid > div:nth-child(3) button');if(wechat&&data.contact.wechat){wechat.dataset.copy=data.contact.wechat;wechat.firstChild.textContent=`${data.contact.wechat} `};const social=document.querySelector('.contact-grid > div:nth-child(4) button');if(social&&data.contact.social_account){social.dataset.copy=data.contact.social_account;social.firstChild.textContent=`${data.contact.social_account} `}}
  }catch(error){console.warn('Editable content could not be loaded.',error)}
}
function setAttrIn(root,selector,name,value){const element=root.querySelector(selector);if(element&&value)element.setAttribute(name,value)}
loadEditableContent();

const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false')}));

document.querySelectorAll('[data-video-card]').forEach(card=>{const button=card.querySelector('.media-play');const video=card.querySelector('video');button?.addEventListener('click',()=>{card.classList.add('is-playing');video?.play().catch(()=>{})})});

const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals=document.querySelectorAll('[data-reveal]');
if(reduced||!('IntersectionObserver'in window)){reveals.forEach(el=>el.classList.add('is-visible'))}else{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -5%'});reveals.forEach(el=>observer.observe(el))}

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.site-nav a')];
if('IntersectionObserver'in window){const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -55%'});sections.forEach(section=>sectionObserver.observe(section))}

const toast=document.querySelector('[data-toast]');
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const value=button.dataset.copy;try{await navigator.clipboard.writeText(value)}catch{const area=document.createElement('textarea');area.value=value;document.body.append(area);area.select();document.execCommand('copy');area.remove()}if(toast)toast.textContent=`${button.dataset.copyLabel||'内容'}已复制`;toast?.classList.add('show');setTimeout(()=>toast?.classList.remove('show'),1800)}));

const hero=document.querySelector('.hero');
const heroImage=document.querySelector('.hero-image');
if(hero&&!reduced){hero.addEventListener('pointermove',event=>{const rect=hero.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;hero.style.setProperty('--star-x',`${x*14}px`);hero.style.setProperty('--star-y',`${y*14}px`);heroImage?.style.setProperty('--image-x',`${(x+.5)*100}%`);heroImage?.style.setProperty('--image-y',`${(y+.5)*100}%`)});hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--star-x','0px');hero.style.setProperty('--star-y','0px');heroImage?.style.removeProperty('--image-x');heroImage?.style.removeProperty('--image-y')})}

const progressBar=document.querySelector('.cosmic-progress i');
const updateOrbitProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;const ratio=max>0?Math.min(1,Math.max(0,scrollY/max)):0;document.documentElement.style.setProperty('--orbit-progress',`${ratio*100}%`);progressBar?.style.setProperty('--progress',ratio)};
updateOrbitProgress();
addEventListener('scroll',updateOrbitProgress,{passive:true});
addEventListener('resize',updateOrbitProgress);

if(!reduced&&matchMedia('(pointer:fine)').matches){
  const cursor=document.querySelector('.cosmic-cursor');let cursorX=-100,cursorY=-100,frame=0;
  addEventListener('pointermove',event=>{cursorX=event.clientX;cursorY=event.clientY;if(!frame)frame=requestAnimationFrame(()=>{cursor?.style.setProperty('--cursor-x',`${cursorX}px`);cursor?.style.setProperty('--cursor-y',`${cursorY}px`);frame=0})},{passive:true});
  document.querySelectorAll('a,button,.project-media,.study').forEach(item=>{item.addEventListener('pointerenter',()=>cursor?.classList.add('is-active'));item.addEventListener('pointerleave',()=>cursor?.classList.remove('is-active'))});
  document.querySelectorAll('.project-media,.study').forEach(card=>{card.classList.add('interactive-card');card.addEventListener('pointermove',event=>{const rect=card.getBoundingClientRect();const rx=((event.clientY-rect.top)/rect.height-.5)*-3;const ry=((event.clientX-rect.left)/rect.width-.5)*4;card.style.setProperty('--tilt-x',`${rx}deg`);card.style.setProperty('--tilt-y',`${ry}deg`)});card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')})});
  addEventListener('pointerdown',event=>{const spark=document.createElement('span');spark.className='cosmic-spark';spark.style.left=`${event.clientX}px`;spark.style.top=`${event.clientY}px`;document.body.append(spark);spark.addEventListener('animationend',()=>spark.remove(),{once:true})});
}
