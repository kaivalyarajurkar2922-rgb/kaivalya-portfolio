document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('[id^="year"]').forEach(el=>el.textContent=new Date().getFullYear());
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? 'none' : 'flex';
    });
  }
  document.querySelectorAll('.nav-link').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      if(window.innerWidth < 900 && nav){ nav.style.display='none'; navToggle.setAttribute('aria-expanded','false'); }
    });
  });
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const status = document.getElementById('form-status');
      if(name.length < 2){ status.textContent='Please enter your name (2+ chars).'; status.style.color='salmon'; return; }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){ status.textContent='Please enter a valid email.'; status.style.color='salmon'; return; }
      if(message.length < 10){ status.textContent='Message should be at least 10 characters.'; status.style.color='salmon'; return; }
      const subject = encodeURIComponent('Portfolio contact from ' + name);
      const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = `mailto:kaivalyarajurkar2922@gmail.com?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your mail client — thanks!'; status.style.color='lightgreen';
      form.reset();
    });
  }
});
