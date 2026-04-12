// ── Smooth scroll for nav links ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Active nav link highlight on scroll ──
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#7c6af7';
    }
  });
});

// ── Contact form toast notification ──
const contactBtn = document.querySelector('.contact-btn');
const toast = document.getElementById('toast');

if (contactBtn && toast) {
  contactBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.contact-input');
    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = '#f85149';
        setTimeout(() => { input.style.borderColor = ''; }, 2000);
      }
    });

    if (allFilled) {
      toast.classList.add('show');
      inputs.forEach(input => { input.value = ''; });
      setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }
  });
}

// ── Bot card tag click filter ──
const tags = document.querySelectorAll('.tag');
const botCards = document.querySelectorAll('.bot-card');

tags.forEach(tag => {
  tag.style.cursor = 'pointer';
  tag.addEventListener('click', () => {
    const selected = tag.textContent.trim();

    botCards.forEach(card => {
      const cardTags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.trim());
      if (cardTags.includes(selected)) {
        card.style.opacity = '1';
        card.style.borderColor = '#7c6af7';
      } else {
        card.style.opacity = '0.35';
        card.style.borderColor = '';
      }
    });

    // click again to reset
    tag.dataset.active = tag.dataset.active === 'true' ? 'false' : 'true';
    if (tag.dataset.active === 'false') {
      botCards.forEach(card => {
        card.style.opacity = '1';
        card.style.borderColor = '';
      });
    }
  });
});

// ── Scroll reveal animation ──
const revealElements = document.querySelectorAll('.bot-card, .plan-card, .contact-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
