// Fade-in on scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(s => s.classList.add('fade-in'));
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
  
  sections.forEach(s => observer.observe(s));
  
  // Animate KPI numbers
  const kpis = document.querySelectorAll('.kpis strong');
  const nums = [1000, 500000, 5, 12];
  const prefixes = ['über ', 'über ', 'über ', 'über '];
  const suffixes = ['', '€', '', ''];
  
  let animated = false;
  const kpiObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      kpis.forEach((el, i) => {
        let start = 0;
        const end = nums[i];
        const duration = 2000;
        const startTime = performance.now();
        
        function tick(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * end);
          
          if (end >= 1000) {
            el.textContent = prefixes[i] + current.toLocaleString('de-DE') + suffixes[i];
          } else {
            el.textContent = prefixes[i] + current + suffixes[i];
          }
          
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }
  }, { threshold: 0.5 });
  
  if (kpis.length) kpiObserver.observe(kpis[0].parentElement);
});

// Form handler
function handleForm(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = data.get('name');
  alert('Vielen Dank ' + name + '! Wir melden uns innerhalb von 24 Stunden bei Ihnen.');
  e.target.reset();
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
