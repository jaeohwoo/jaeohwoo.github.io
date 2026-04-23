document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.getElementById('nav');
  const btn=document.getElementById('menuBtn');
  const links=document.getElementById('navLinks');

  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));
  btn.addEventListener('click',()=>{links.classList.toggle('open');btn.classList.toggle('active')});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');btn.classList.remove('active')}));

  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.r-card,.w-card,.pub,.about-body,.contact-desc').forEach(el=>{el.classList.add('reveal');io.observe(el)});
});
