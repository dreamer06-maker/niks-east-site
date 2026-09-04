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
