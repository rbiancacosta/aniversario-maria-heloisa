
const intro = document.getElementById('intro');
const enter = document.getElementById('enter');

enter.addEventListener('click', () => {
  intro.classList.add('hidden');
  document.body.classList.remove('no-scroll');
  setTimeout(() => intro.remove(), 700);
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const target = new Date('2027-05-15T13:00:00-03:00').getTime();

function updateCountdown() {
  const distance = target - Date.now();

  if (distance <= 0) {
    document.querySelector('.countdown').innerHTML =
      '<div class="timebox" style="grid-column:1/-1"><span class="number">É hoje! 🎉</span></div>';
    return;
  }

  document.getElementById('days').textContent = Math.floor(distance / 86400000);
  document.getElementById('hours').textContent = Math.floor((distance % 86400000) / 3600000);
  document.getElementById('minutes').textContent = Math.floor((distance % 3600000) / 60000);
  document.getElementById('seconds').textContent = Math.floor((distance % 60000) / 1000);
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.querySelectorAll('.gift-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const group = button.closest('.gift-group');
    const content = group.querySelector('.gift-items');
    const isOpen = group.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
    content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0px';
  });
});

const shareButton = document.getElementById('shareButton');
shareButton.addEventListener('click', async () => {
  const data = {
    title: '1º aniversário da Maria Heloísa',
    text: 'Jardim dos Morangos da Maria Heloísa',
    url: window.location.href
  };

  if (navigator.share) {
    try { await navigator.share(data); } catch (error) {}
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copiado!');
    } catch (error) {
      window.prompt('Copie o link:', window.location.href);
    }
  }
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.photo img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});

document.getElementById('closeLightbox').addEventListener('click', () => {
  lightbox.classList.remove('open');
});

lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.classList.remove('open');
});
