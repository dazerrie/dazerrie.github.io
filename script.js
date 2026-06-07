// BACKGROUND AUDIO — plays on first interaction
const audio = document.getElementById('bg-audio');

function startAudio() {
  audio.play().then(function() {
    document.removeEventListener('click', startAudio);
    document.removeEventListener('scroll', startAudio);
    document.removeEventListener('touchstart', startAudio);
  }).catch(function() {});
}

audio.play().catch(function() {
  document.addEventListener('click', startAudio, { once: true });
  document.addEventListener('scroll', startAudio, { once: true });
  document.addEventListener('touchstart', startAudio, { once: true });
});

// FILM GRAIN
const canvas = document.getElementById('grain');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function renderGrain() {
  const w = canvas.width, h = canvas.height;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() * 255;
    d[i] = d[i+1] = d[i+2] = v;
    d[i+3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

resize();
window.addEventListener('resize', resize);
setInterval(renderGrain, 80);

// NAV: darken on scroll
const nav = document.getElementById('site-nav');
window.addEventListener('scroll', function() {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// NAV: hamburger toggle
const burger = document.getElementById('nav-burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', function() {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// NAV: active section highlight
const sections = document.querySelectorAll('section[id], footer[id]');
const navAnchors = document.querySelectorAll('.nav-links a[data-section]');

const sectionObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      navAnchors.forEach(function(a) {
        a.classList.toggle('active', a.dataset.section === entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(function(s) { sectionObserver.observe(s); });

// SCROLL REVEAL
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, i) {
    if (entry.isIntersecting) {
      setTimeout(function() {
        entry.target.classList.add('visible');
      }, i * 110);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(function(el) {
  revealObserver.observe(el);
});
