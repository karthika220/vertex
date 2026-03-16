/* ============================================================
   DETAILING VERTEX — script.js
============================================================ */

/* ---- Navbar scroll shadow ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---- Hamburger / Mobile Menu ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---- Reviews Slider ---- */
let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;

function slideReviews(dir) {
  const track = document.getElementById('reviewsTrack');
  const cards = track.querySelectorAll('.review-card');
  if (!cards.length || !cards[0]) return;
  
  const visibleCount = 3; // Always show 3 cards
  const maxSlide = Math.max(0, cards.length - visibleCount);

  // Calculate new slide position
  const newSlide = currentSlide + dir;
  
  // Prevent going beyond boundaries
  if (newSlide < 0) {
    currentSlide = 0;
  } else if (newSlide > maxSlide) {
    currentSlide = maxSlide;
  } else {
    currentSlide = newSlide;
  }

  // Get actual card width from computed style
  const cardWidth = cards[0].offsetWidth;
  const gap = 20; // gap between cards
  const translateX = currentSlide * (cardWidth + gap);
  
  // Calculate maximum allowed translate (should show last 3 cards)
  const totalCardsWidth = cards.length * cardWidth + (cards.length - 1) * gap;
  const trackWidth = track.offsetWidth;
  const maxTranslate = Math.max(0, totalCardsWidth - trackWidth);
  
  // Ensure we don't go beyond the last position
  const finalTranslate = Math.min(translateX, maxTranslate);
  
  track.style.transform = `translateX(-${finalTranslate}px)`;
  track.style.transition = 'transform 0.45s ease';
  
  // Update arrow button states
  updateSliderArrows();
}

function updateSliderArrows() {
  const track = document.getElementById('reviewsTrack');
  const cards = track.querySelectorAll('.review-card');
  if (!cards.length) return;
  
  const visibleCount = 3;
  const maxSlide = Math.max(0, cards.length - visibleCount);
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  
  if (prevBtn) {
    prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '0.6';
    prevBtn.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
  }
  if (nextBtn) {
    nextBtn.style.opacity = currentSlide >= maxSlide ? '0.3' : '0.6';
    nextBtn.style.pointerEvents = currentSlide >= maxSlide ? 'none' : 'auto';
  }
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next
      slideReviews(1);
    } else {
      // Swipe right - previous
      slideReviews(-1);
    }
  }
}

// Touch/Swipe handlers - Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const reviewsTrack = document.getElementById('reviewsTrack');
  if (reviewsTrack) {
    reviewsTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    reviewsTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
});

window.addEventListener('resize', () => {
  currentSlide = 0;
  const track = document.getElementById('reviewsTrack');
  if (track) {
    track.style.transform = 'translateX(0)';
    setTimeout(() => {
      updateSliderArrows();
    }, 100);
  }
});

// Initialize slider arrows on page load
document.addEventListener('DOMContentLoaded', () => {
  updateSliderArrows();
});

/* ---- FAQ Accordion ---- */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const allItems = document.querySelectorAll('.faq-item');

  // Close all others
  allItems.forEach(i => {
    if (i !== item) {
      i.querySelector('.faq-question').classList.remove('open');
      i.querySelector('.faq-answer').classList.remove('open');
    }
  });

  btn.classList.toggle('open');
  answer.classList.toggle('open');
}

/* ---- Hero Form Handler ---- */
function handleHeroForm() {
  const name = document.getElementById('hName').value.trim();
  const phone = document.getElementById('hPhone').value.trim();
  const service = document.getElementById('hService').value;

  if (!name) { alert('Please enter your name.'); return; }
  if (!phone || phone.length < 10) { alert('Please enter a valid phone number.'); return; }
  if (!service) { alert('Please select a service.'); return; }

  // Send WhatsApp message
  const msg = encodeURIComponent(`Hi! I'd like to book an appointment.\nName: ${name}\nPhone: ${phone}\nService: ${service}`);
  window.open(`https://wa.me/918008647733?text=${msg}`, '_blank');
  
  // Redirect to thank you page
  window.location.href = 'thank-you.html';
}

/* ---- Contact Form Handler ---- */
function handleContactForm() {
  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const service = document.getElementById('cService').value;

  if (!name) { alert('Please enter your name.'); return; }
  if (!phone || phone.length < 10) { alert('Please enter a valid phone number.'); return; }
  if (!service) { alert('Please select a service.'); return; }

  // Send WhatsApp message
  const msg = encodeURIComponent(`Hi! I'd like to enquire about your services.\nName: ${name}\nPhone: ${phone}\nService: ${service}`);
  window.open(`https://wa.me/918008647733?text=${msg}`, '_blank');
  
  // Redirect to thank you page
  window.location.href = 'thank-you.html';
}

/* ---- Scroll Reveal Animation ---- */
const revealEls = document.querySelectorAll(
  '.service-card, .about-feature, .stat-item, .review-card, .faq-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ease ${(i % 4) * 0.1}s, transform 0.55s ease ${(i % 4) * 0.1}s`;
  revealObserver.observe(el);
});
