/* ══════════════════════════════════════
   Ritik ❤️ Simran — Main JavaScript
   ══════════════════════════════════════ */

// ─── FALLING ROSES (Canvas) ───────────────────────────────
const canvas = document.getElementById('roses-canvas');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

const EMOJIS = ['🌹', '🌸', '🌺', '💐', '🌷'];

const PETALS = Array.from({ length: 30 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight - window.innerHeight,
  size: 14 + Math.random() * 16,
  speed: 0.6 + Math.random() * 1.2,
  swing: Math.random() * 2 * Math.PI,
  swingSpeed: 0.008 + Math.random() * 0.012,
  swingAmt: 40 + Math.random() * 60,
  rot: Math.random() * Math.PI * 2,
  rotSpeed: (Math.random() - 0.5) * 0.03,
  emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
}));

function drawPetals() {
  ctx.clearRect(0, 0, W, H);
  PETALS.forEach(p => {
    p.y += p.speed;
    p.swing += p.swingSpeed;
    p.rot += p.rotSpeed;
    const drawX = p.x + Math.sin(p.swing) * p.swingAmt;
    if (p.y > H + 40) { p.y = -40; p.x = Math.random() * W; }
    ctx.save();
    ctx.translate(drawX, p.y);
    ctx.rotate(p.rot);
    ctx.font = `${p.size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.65;
    ctx.fillText(p.emoji, 0, 0);
    ctx.restore();
  });
  requestAnimationFrame(drawPetals);
}
drawPetals();


// ─── RELATIONSHIP COUNTER ─────────────────────────────────
function updateCounter() {
  const start = new Date('2023-05-06T00:00:00');
  const now = new Date();
  const diff = now - start;

  const totalDays = Math.floor(diff / 86400000);
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;
  const hours = Math.floor((diff % 86400000) / 3600000);

  document.getElementById('cnt-years').textContent = years;
  document.getElementById('cnt-months').textContent = months;
  document.getElementById('cnt-days').textContent = days;
  document.getElementById('cnt-hours').textContent = hours;
}

updateCounter();
setInterval(updateCounter, 60000);


// ─── BIRTHDAY COUNTDOWNS ──────────────────────────────────
function daysUntil(month, day) {
  const now = new Date();
  let next = new Date(now.getFullYear(), month - 1, day);
  if (next <= now) next.setFullYear(next.getFullYear() + 1);
  return Math.ceil((next - now) / 86400000);
}

document.getElementById('ritik-days').textContent = daysUntil(3, 8);
document.getElementById('simran-days').textContent = daysUntil(8, 14);


// ─── I LOVE YOU BUTTON ────────────────────────────────────
const loveMessages = [
  "Tum meri duniya ho! 🌍",
  "Pyaar karta hoon tumse! ❤️",
  "Aaj bhi, kal bhi, hamesha! 💕",
  "Sirf tumhara hoon! 🌹",
  "Tum meri muskaan ho! 😊",
  "Jaan hoon meri, Simran! 💝",
];
let loveIdx = 0;

function sendLove() {
  const msg = document.getElementById('love-msg');
  msg.textContent = loveMessages[loveIdx++ % loveMessages.length];
  msg.style.opacity = 1;
  setTimeout(() => msg.style.opacity = 0, 2500);

  // Burst floating hearts
  for (let i = 0; i < 8; i++) {
    const h = document.createElement('div');
    h.textContent = '❤️';
    const rise = 150 + Math.random() * 200;
    h.style.cssText = `
      position: fixed;
      font-size: ${20 + Math.random() * 20}px;
      left: ${30 + Math.random() * 40}%;
      top: 60%;
      pointer-events: none;
      z-index: 10000;
      transition: transform ${1 + Math.random() * 0.4}s ease, opacity 1.2s ease;
      opacity: 1;
    `;
    document.body.appendChild(h);
    requestAnimationFrame(() => {
      h.style.transform = `translateY(-${rise}px) scale(0)`;
      h.style.opacity = '0';
    });
    setTimeout(() => h.remove(), 1400);
  }
}


// ─── GALLERY SLIDER ───────────────────────────────────────
let galleryIdx = 0;
const slides = document.querySelectorAll('.gallery-slide');
const track = document.getElementById('gallery-track');
const dotsContainer = document.getElementById('gallery-dots');

slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'gallery-dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', `Slide ${i + 1}`);
  d.onclick = () => goToSlide(i);
  dotsContainer.appendChild(d);
});

function goToSlide(n) {
  galleryIdx = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${galleryIdx * 100}%)`;
  document.querySelectorAll('.gallery-dot').forEach((d, i) =>
    d.classList.toggle('active', i === galleryIdx)
  );
}

function galleryMove(dir) { goToSlide(galleryIdx + dir); }
setInterval(() => galleryMove(1), 4000);


// ─── MUSIC PLAYER ─────────────────────────────────────────
let musicPlaying = false;

function toggleMusic() {
  musicPlaying = !musicPlaying;
  document.getElementById('music-disc').classList.toggle('playing', musicPlaying);
  document.getElementById('music-btn').textContent = musicPlaying ? '⏸ Rok Do' : '▶ Play Karo';
}


// ─── SECRET PAGE ──────────────────────────────────────────
// Password: 06052023  (anniversary date — DDMMYYYY)

function openSecret() {
  document.getElementById('secret-overlay').classList.add('open');
}

function closeSecret() {
  document.getElementById('secret-overlay').classList.remove('open');
  document.getElementById('secret-pass').value = '';
  document.getElementById('secret-err').textContent = '';
  document.getElementById('secret-lock-screen').style.display = 'block';
  document.getElementById('secret-content').classList.remove('revealed');
}

function checkSecret() {
  const pass = document.getElementById('secret-pass').value.trim();
  if (pass === '06052023') {
    document.getElementById('secret-lock-screen').style.display = 'none';
    document.getElementById('secret-content').classList.add('revealed');
  } else {
    const err = document.getElementById('secret-err');
    err.textContent = 'Galat password, Simran! 😄 Phir try karo...';
    document.getElementById('secret-pass').value = '';
    setTimeout(() => err.textContent = '', 2500);
  }
}

// Allow Enter key in password field
document.addEventListener('DOMContentLoaded', () => {
  const passInput = document.getElementById('secret-pass');
  if (passInput) {
    passInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') checkSecret();
    });
  }
});


// ─── SCROLL REVEAL ────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });

revealEls.forEach(el => obs.observe(el));
