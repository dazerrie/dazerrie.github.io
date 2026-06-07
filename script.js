// FILM GRAIN
const canvas = document.getElementById('grain');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function renderGrain() {
  const w = canvas.width;
  const h = canvas.height;
  const img = ctx.createImageData(w, h);
  const d = img.data;

  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() * 255;
    d[i] = v;
    d[i + 1] = v;
    d[i + 2] = v;
    d[i + 3] = 255;
  }

  ctx.putImageData(img, 0, 0);
}

resize();
window.addEventListener('resize', resize);
setInterval(renderGrain, 80);

// SCROLL REVEAL
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, i) {
    if (entry.isIntersecting) {
      setTimeout(function() {
        entry.target.classList.add('visible');
      }, i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function(el) {
  observer.observe(el);
});
