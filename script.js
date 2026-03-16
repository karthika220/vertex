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

function getVisibleCount() {
  const w = window.innerWidth;
  if (w < 640) return 1;  // Mobile: 1 card
  if (w < 960) return 2;  // Tablet: 2 cards
  return 3;                // Desktop: 3 cards
}

function slideReviews(dir) {
  const track = document.getElementById('reviewsTrack');
  const wrapper = track.closest('.reviews-slider-wrap');
  const cards = track.querySelectorAll('.review-card');
  if (!cards.length || !wrapper) return;

  const visibleCount = getVisibleCount();
  
  // Calculate max slide: can slide until the last visibleCount cards are shown
  // For 3 cards visible, maxSlide allows showing cards 7, 8, 9 (if we have 9 cards)
  const maxSlide = Math.max(0, cards.length - visibleCount);

  currentSlide += dir;

  if (currentSlide < 0) currentSlide = 0;
  if (currentSlide > maxSlide) currentSlide = maxSlide;

  // Get card width from actual rendered size
  const cardWidth = cards[0].offsetWidth || cards[0].getBoundingClientRect().width;
  const gap = 20;
  const wrapperWidth = wrapper.offsetWidth;

  // Calculate translate position
  let translate = currentSlide * (cardWidth + gap);

  // When at max slide, ensure last cards align perfectly with wrapper edge
  if (currentSlide === maxSlide) {
    const lastCardIndex = cards.length - 1;
    const lastCardRightEdge = (lastCardIndex * (cardWidth + gap)) + cardWidth;
    // Position so last card's right edge aligns with wrapper's right edge
    translate = Math.max(0, lastCardRightEdge - wrapperWidth);
  }

  track.style.transform = `translateX(-${translate}px)`;
  track.style.transition = 'transform 0.45s ease';

  updateSliderArrows();
}

function updateSliderArrows() {
  const track = document.getElementById('reviewsTrack');
  const cards = track.querySelectorAll('.review-card');
  if (!cards.length) return;
  
  const visibleCount = getVisibleCount();
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
  const track = document.getElementById('reviewsTrack');
  if (track) {
    const cards = track.querySelectorAll('.review-card');
    if (cards.length) {
      const visibleCount = getVisibleCount();
      const maxSlide = Math.max(0, cards.length - visibleCount);
      
      // If current slide exceeds new max, reset to max
      if (currentSlide > maxSlide) {
        currentSlide = maxSlide;
      }
      
      // Recalculate card widths and positions
      setTimeout(() => {
        setCardWidths();
        slideReviews(0); // Recalculate positions after resize
        updateSliderArrows();
      }, 100);
    }
  }
});

// Initialize slider arrows on page load and set card widths
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for layout to settle
  setTimeout(() => {
    setCardWidths();
    currentSlide = 0;
    slideReviews(0);
    updateSliderArrows();
  }, 100);
});

// Set card widths based on wrapper width
function setCardWidths() {
  const wrapper = document.querySelector('.reviews-slider-wrap');
  const cards = document.querySelectorAll('.review-card');
  if (!wrapper || !cards.length) return;

  const visibleCount = getVisibleCount();
  const wrapperWidth = wrapper.offsetWidth;
  const gap = 20;
  
  // Calculate card width based on wrapper width
  const cardWidth = (wrapperWidth - (gap * (visibleCount - 1))) / visibleCount;
  
  // Apply width to all cards
  cards.forEach(card => {
    card.style.width = `${cardWidth}px`;
    card.style.minWidth = `${cardWidth}px`;
    card.style.maxWidth = `${cardWidth}px`;
  });
  
  // Reset slider position after setting widths
  const track = document.getElementById('reviewsTrack');
  if (track) {
    track.style.transform = 'translateX(0)';
  }
}

// Update card widths on resize
window.addEventListener('resize', () => {
  const track = document.getElementById('reviewsTrack');
  if (track) {
    const cards = track.querySelectorAll('.review-card');
    if (cards.length) {
      const visibleCount = getVisibleCount();
      const maxSlide = Math.max(0, cards.length - visibleCount);
      
      // If current slide exceeds new max, reset to max
      if (currentSlide > maxSlide) {
        currentSlide = maxSlide;
      }
      
      // Recalculate card widths and positions
      setTimeout(() => {
        setCardWidths();
        slideReviews(0); // Recalculate positions after resize
        updateSliderArrows();
      }, 100);
    }
  }
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
