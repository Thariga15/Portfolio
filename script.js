/* =========================================================
   THARIGA SRI R - DATA ANALYST & BUSINESS ANALYST PORTFOLIO
   Clean Interactive Engine
   ========================================================= */

// Configuration
const SITE_CONFIG = {
  email: "tharigasri15@gmail.com",
};

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initProjectFilters();
  initEmailCopy();
  initContactForm();
  initScrollSpy();
});

/* ---------------------------------------------------------
   1. Navbar & Mobile Menu Toggle
--------------------------------------------------------- */
function initNavbar() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll(".nav__link, .btn").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   2. Project Category Filtering
--------------------------------------------------------- */
function initProjectFilters() {
  const chips = document.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll(".p-card");
  if (!chips.length || !cards.length) return;

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const filter = chip.getAttribute("data-filter");

      cards.forEach((card) => {
        const cat = card.getAttribute("data-category") || "";
        const shouldShow = filter === "all" || cat.includes(filter);
        
        if (shouldShow) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });
}

/* ---------------------------------------------------------
   3. One-Click Copy Email with Toast
--------------------------------------------------------- */
function initEmailCopy() {
  const copyBtn = document.getElementById("copyEmailBtn");
  const toast = document.getElementById("globalToast");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    const email = copyBtn.getAttribute("data-email") || SITE_CONFIG.email;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => showToast(toast, "Email copied to clipboard! (tharigasri15@gmail.com)"));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast(toast, "Email copied to clipboard! (tharigasri15@gmail.com)");
    }
  });
}

function showToast(toastEl, message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  setTimeout(() => {
    toastEl.classList.remove("show");
  }, 3000);
}

/* ---------------------------------------------------------
   4. Contact Form Logic
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("formToast");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject ? form.subject.value.trim() : "Portfolio Inquiry";
    const message = form.message.value.trim();

    const encodedSubject = encodeURIComponent(`Portfolio Message: ${subject} (from ${name})`);
    const encodedBody = encodeURIComponent(
      `Hello Thariga,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}`
    );

    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${encodedSubject}&body=${encodedBody}`;

    if (toast) {
      toast.textContent = "Opening your email app to send the message...";
      setTimeout(() => { toast.textContent = ""; }, 5000);
    }
  });
}

/* ---------------------------------------------------------
   5. Scroll-Spy Navigation Highlighting
--------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach((s) => observer.observe(s));
}
