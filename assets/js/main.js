/* =========================================
   BIEKIE BOS — MAIN.JS
   ========================================= */

/* ---- CONFIG (update here only) ---- */
const CONFIG = {
  restaurantPhone: '+27163631602',
  restaurantPhoneDisplay: '016 363 1602',
  eventsPhone: '+27832680984',
  eventsPhoneDisplay: '083 268 0984',
  email: 'info@biekiebos.co.za',
  facebook: 'https://www.facebook.com/BiekieBos/',
  address: 'Donald Rd, Glen Donald AH, Meyerton, 1929, South Africa',
};

/* ---- MOBILE MENU ---- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---- ACTIVE NAV ---- */
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---- FAQ ACCORDION ---- */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ---- REVIEW EXPAND ---- */
function initReviewExpand() {
  document.querySelectorAll('.review-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.review-card');
      const full = card.querySelector('.review-full');
      const preview = card.querySelector('.review-preview');
      const isExpanded = full.style.display === 'inline';
      full.style.display = isExpanded ? 'none' : 'inline';
      if (preview) preview.style.display = isExpanded ? 'inline' : 'none';
      btn.textContent = isExpanded ? 'Read more' : 'Show less';
    });
  });
}

/* ---- PARTY ENQUIRY FORM ---- */
function initPartyForm() {
  const form = document.getElementById('partyEnquiryForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const date = form.querySelector('[name="date"]').value;
    const kids = form.querySelector('[name="kids"]').value;
    const adults = form.querySelector('[name="adults"]').value;
    const notes = form.querySelector('[name="notes"]').value;
    const subject = encodeURIComponent(`Party Enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nPreferred Date: ${date}\nNumber of Kids: ${kids}\nNumber of Adults: ${adults}\nNotes: ${notes}`
    );
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  });
}

/* ---- MENU PDF FALLBACK ---- */
function initMenuFallback() {
  const pdfObj = document.querySelector('.menu-pdf-object');
  const fallback = document.querySelector('.menu-fallback');
  if (!pdfObj || !fallback) return;
  // If object fails to load (browser can't show PDF inline), show fallback
  pdfObj.addEventListener('error', () => {
    pdfObj.style.display = 'none';
    fallback.style.display = 'block';
  });
  // Also trigger on load — if height is 0, assume fail
  pdfObj.addEventListener('load', () => {
    if (pdfObj.clientHeight < 10) {
      pdfObj.style.display = 'none';
      fallback.style.display = 'block';
    }
  });
}

/* ---- SCROLL ANIMATIONS ---- */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.card, .review-card, .step, .value-card, .faq-item');
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNav();
  initFAQ();
  initReviewExpand();
  initPartyForm();
  initMenuFallback();
  initScrollAnimations();
});

// ===============================
// Gallery Lightbox (Vanilla JS)
// Works for: .gallery-full-grid and .gallery-grid
// ===============================
(function () {
  function initLightbox(selector) {
    const container = document.querySelector(selector);
    if (!container) return;

    const images = Array.from(container.querySelectorAll("img"));
    if (!images.length) return;

    // Build overlay once
    let overlay = document.getElementById("bb-lightbox");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "bb-lightbox";
      overlay.innerHTML = `
        <div class="bb-lb-backdrop" data-close="true"></div>
        <div class="bb-lb-dialog" role="dialog" aria-modal="true" aria-label="Image viewer">
          <button class="bb-lb-btn bb-lb-close" type="button" aria-label="Close (Esc)" data-close="true">×</button>
          <button class="bb-lb-btn bb-lb-prev" type="button" aria-label="Previous image" data-prev="true">‹</button>
          <figure class="bb-lb-figure">
            <img class="bb-lb-img" alt="">
            <figcaption class="bb-lb-cap"></figcaption>
          </figure>
          <button class="bb-lb-btn bb-lb-next" type="button" aria-label="Next image" data-next="true">›</button>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    const lbImg = overlay.querySelector(".bb-lb-img");
    const lbCap = overlay.querySelector(".bb-lb-cap");
    const btnPrev = overlay.querySelector("[data-prev]");
    const btnNext = overlay.querySelector("[data-next]");

    let index = 0;
    let startX = 0;
    let startY = 0;

    function open(i) {
      index = i;
      const img = images[index];
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || "Gallery image";
      lbCap.textContent = img.alt || "";
      overlay.classList.add("is-open");
      document.documentElement.classList.add("bb-lb-lock");
    }

    function close() {
      overlay.classList.remove("is-open");
      document.documentElement.classList.remove("bb-lb-lock");
      // prevent "flash" of previous image while closing/opening fast
      lbImg.src = "";
      lbCap.textContent = "";
    }

    function prev() {
      index = (index - 1 + images.length) % images.length;
      open(index);
    }

    function next() {
      index = (index + 1) % images.length;
      open(index);
    }

    // Click image to open
    images.forEach((img, i) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", (e) => {
        e.preventDefault();
        open(i);
      });
    });

    // Overlay controls
    overlay.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.getAttribute && t.getAttribute("data-close") === "true") close();
      if (t && t.getAttribute && t.getAttribute("data-prev") === "true") prev();
      if (t && t.getAttribute && t.getAttribute("data-next") === "true") next();
    });

    // Keyboard
    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    });

    // Touch swipe (mobile)
    overlay.addEventListener(
      "touchstart",
      (e) => {
        if (!overlay.classList.contains("is-open")) return;
        const t = e.touches[0];
        startX = t.clientX;
        startY = t.clientY;
      },
      { passive: true }
    );

    overlay.addEventListener(
      "touchend",
      (e) => {
        if (!overlay.classList.contains("is-open")) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;

        // horizontal swipe threshold
        if (Math.abs(dx) > 50 && Math.abs(dy) < 80) {
          if (dx > 0) prev();
          else next();
        }
      },
      { passive: true }
    );

    // Expose close when clicking backdrop image area
    overlay._bbClose = close;
  }

  // Init on full gallery page + preview grid (if present)
  initLightbox(".gallery-full-grid");
  initLightbox(".gallery-grid");
})();
