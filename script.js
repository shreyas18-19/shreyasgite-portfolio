// Smooth scroll for nav links and buttons (works for anchors & custom buttons)
document.querySelectorAll('.nav-link, .btn-ghost, .btn-cta, .btn-detail, a[href^="#"]').forEach(el => {
  el.addEventListener('click', (e) => {
    const href = el.getAttribute('href') || el.dataset.target;
    // If it's a hash link or data-target -> smooth scroll to element
    if (href && (href.startsWith('#') || el.classList.contains('btn-detail') || el.dataset.target)) {
      e.preventDefault();
      const id = href.startsWith('#') ? href.slice(1) : (el.dataset.target || href);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// When project "View Details" buttons clicked (they have data-target) also smooth scroll
document.querySelectorAll('.btn-detail').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const targetId = btn.dataset.target;
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // small focus for accessibility
      setTimeout(()=> target.querySelector('h2')?.focus?.(), 600);
    }
  });
});

// IntersectionObserver for fade-up animations
const obs = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if (ent.isIntersecting) ent.target.classList.add('in-view');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
document.querySelectorAll('.project-card').forEach(el => obs.observe(el));

// Contact form -> open WhatsApp with message
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = encodeURIComponent(document.getElementById('name').value.trim());
  const email = encodeURIComponent(document.getElementById('email').value.trim());
  const msg = encodeURIComponent(document.getElementById('message').value.trim());
  const full = `Hello Shreyas, I'm ${name} (${email}). ${msg}`;
  const phone = '918485801092'; // your number with country code
  const url = `https://wa.me/${phone}?text=${full}`;
  window.open(url, '_blank');
});

// footer year
document.getElementById('year').textContent = new Date().getFullYear();

// --- animate skill bars when in view ---
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.skill-bar span').forEach(span => {
          // read width from inline style or from dataset
          const w = span.style.width || span.getAttribute('data-width') || '70%';
          span.style.width = w;
        });
        skillObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });
  skillObserver.observe(skillsSection);
}
// ===== Initialize AOS (Animate On Scroll) =====
AOS.init({
  duration: 1000, // Animation duration in milliseconds
  easing: 'ease-in-out',
  once: true,     // Animate only once per section
  offset: 120,    // How early animation should trigger
});