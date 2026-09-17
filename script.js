// ---------------------------------------------------------------
// Active nav link highlighting
// ---------------------------------------------------------------
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section, #about, #experience, #project, #skills, #contact');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.dataset.nav === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach((section) => navObserver.observe(section));

// ---------------------------------------------------------------
// Animated stat counters, run once when the stats strip scrolls in
// ---------------------------------------------------------------
const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = value.toFixed(decimals).toLocaleString() + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    }
  }
  requestAnimationFrame(tick);
}

const statsStrip = document.getElementById('stats-strip');
let statsAnimated = false;

if (statsStrip) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(animateCount);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  statsObserver.observe(statsStrip);
}

// ---------------------------------------------------------------
// Collapsible experience rows
// ---------------------------------------------------------------
document.querySelectorAll('.ledger-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const row = button.closest('.ledger-row');
    row.classList.toggle('is-open');
  });
});

// ---------------------------------------------------------------
// Contact form validation
// ---------------------------------------------------------------
// This validates in the browser only. It does not send anywhere yet.
// To make it functional, either:
//   1. Point the form at a service like Formspree or Getform, or
//   2. Replace the submit handler below with a fetch() call to your own backend.

const form = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  input.classList.toggle('invalid', Boolean(message));
  error.textContent = message || '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    successMessage.hidden = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let valid = true;

    if (!name) {
      showError('name', 'Please add your name.');
      valid = false;
    } else {
      showError('name', '');
    }

    if (!email) {
      showError('email', 'Please add an email.');
      valid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'That email does not look right.');
      valid = false;
    } else {
      showError('email', '');
    }

    if (!message) {
      showError('message', 'Add a short message.');
      valid = false;
    } else {
      showError('message', '');
    }

    if (valid) {
      successMessage.hidden = false;
      form.reset();
    }
  });
}
