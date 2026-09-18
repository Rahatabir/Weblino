/* =========================================================
   WEBLINO — script.js
   Loader, nav, scroll reveal, template store, modal, form
========================================================= */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = matchMedia('(pointer: coarse)').matches;

  /* ---------- Loader ---------- */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(function () {
      loader.classList.add('hidden');
    }, prefersReducedMotion ? 0 : 550);
  });

  /* ---------- Navbar scroll state ---------- */
  var navbar = document.getElementById('navbar');
  function onScrollNav() {
    if (window.scrollY > 12) navbar.classList.add('is-scrolled');
    else navbar.classList.remove('is-scrolled');
  }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', function () {
    var open = mobileMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  var navAnchors = document.querySelectorAll('a[data-nav]');
  var sections = Array.prototype.map.call(navAnchors, function (a) {
    var id = a.getAttribute('href').replace('#', '');
    return document.getElementById(id);
  }).filter(Boolean);

  function updateActiveNav() {
    var scrollPos = window.scrollY + 140;
    var current = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    navAnchors.forEach(function (a) {
      var id = a.getAttribute('href').replace('#', '');
      a.classList.toggle('is-active', current && current.id === id);
    });
  }
  updateActiveNav();
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ---------- Smooth scroll for data-scroll links ---------- */
  document.querySelectorAll('[data-scroll]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Hero orb: mouse-follow (desktop only) ---------- */
  var heroVisual = document.getElementById('heroVisual');
  if (heroVisual && !isTouch && !prefersReducedMotion) {
    var heroSection = document.getElementById('hero');
    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      heroVisual.style.transform = 'translate(' + (x * 14) + 'px,' + (y * 14) + 'px)';
    });
    heroSection.addEventListener('mouseleave', function () {
      heroVisual.style.transform = 'translate(0,0)';
    });
  }

  /* ---------- Magnetic buttons (desktop only) ---------- */
  if (!isTouch && !prefersReducedMotion) {
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.18) + 'px,' + (y * 0.3) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ---------- Custom cursor (desktop only) ---------- */
  var cursorDot = document.getElementById('cursorDot');
  if (cursorDot && !isTouch && !prefersReducedMotion) {
    document.addEventListener('mousemove', function (e) {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      cursorDot.classList.add('is-active');
    });
    document.querySelectorAll('a, button, .service-card, .template-card, .price-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursorDot.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function () { cursorDot.classList.remove('is-hover'); });
    });
  }

  /* =========================================================
     Template Store data
  ========================================================= */
  var templates = [
    {
      id: 'fashion', demo: 'templates/fashion.html', thumb: 'image/previews/fashion-thumb.jpg', full: 'image/previews/fashion-full.jpg', name: 'Fashion Store', category: 'fashion', catLabel: 'Fashion',
      tag: 'NOIR / 01', line: 'Everyday, elevated.', previewClass: 'p-fashion',
      desc: 'A minimal, editorial storefront that lets clothing and styling photography carry the brand.',
      features: ['Lookbook-style product grid', 'Size and color variant selection', 'Editorial homepage sections'],
      suited: 'Clothing brands and boutique fashion labels'
    },
    {
      id: 'sneaker', demo: 'templates/sneaker.html', thumb: 'image/previews/sneaker-thumb.jpg', full: 'image/previews/sneaker-full.jpg', name: 'Sneaker / Shoe E-commerce', category: 'ecommerce', catLabel: 'E-commerce',
      tag: 'STEP / 02', line: 'Built for drops.', previewClass: 'p-sneaker',
      desc: 'A bold storefront tuned for limited releases, quick browsing and fast checkout.',
      features: ['Release countdown module', 'Size-run product cards', 'Fast, mobile checkout flow'],
      suited: 'Sneaker stores and footwear e-commerce'
    },
    {
      id: 'restaurant', demo: 'templates/restaurant.html', thumb: 'image/previews/restaurant-thumb.svg', name: 'Restaurant', category: 'restaurant', catLabel: 'Restaurant',
      tag: 'TABLE / 03', line: 'Menu, mood, location.', previewClass: 'p-restaurant',
      desc: 'A warm, appetite-first layout that puts the menu and reservations within one tap.',
      features: ['Digital menu with categories', 'Reservation and location block', 'Social proof and gallery'],
      suited: 'Restaurants, cafés and local eateries'
    },
    {
      id: 'beauty', demo: 'templates/beauty.html', thumb: 'image/previews/beauty-thumb.svg', name: 'Beauty / Skincare', category: 'beauty', catLabel: 'Beauty',
      tag: 'GLOW / 04', line: 'Soft, premium, trusted.', previewClass: 'p-beauty',
      desc: 'A soft editorial design that builds trust for skincare and beauty product lines.',
      features: ['Ingredient/benefit storytelling', 'Routine-based product bundles', 'Before/after style gallery'],
      suited: 'Skincare, cosmetics and beauty brands'
    },
    {
      id: 'car', demo: 'templates/car.html', thumb: 'image/previews/car-thumb.svg', name: 'Luxury Car Store', category: 'ecommerce', catLabel: 'E-commerce',
      tag: 'DRIVE / 05', line: 'Confidence at a glance.', previewClass: 'p-car',
      desc: 'A spacious, high-contrast layout that showcases premium vehicles and builds buyer trust.',
      features: ['Large vehicle gallery', 'Spec comparison table', 'Inquiry and test-drive form'],
      suited: 'Car dealerships and luxury vehicle sellers'
    },
    {
      id: 'business', demo: 'templates/business.html', thumb: 'image/previews/business-thumb.svg', name: 'Business / Corporate', category: 'business', catLabel: 'Business',
      tag: 'CORE / 06', line: 'Clear, credible, direct.', previewClass: 'p-business',
      desc: 'A structured, professional layout built to establish credibility for service businesses.',
      features: ['Services and process sections', 'Client logo and case study strip', 'Direct contact / quote form'],
      suited: 'Agencies, consultancies and corporate sites'
    },
    {
      id: 'personal', demo: 'templates/personal.html', thumb: 'image/previews/personal-thumb.svg', name: 'Personal Brand', category: 'personal', catLabel: 'Personal Brand',
      tag: 'SELF / 07', line: 'One page, one story.', previewClass: 'p-personal',
      desc: 'A focused single-page site that introduces a person, their work and how to reach them.',
      features: ['Bio and highlights section', 'Portfolio / work showcase', 'Simple contact and social links'],
      suited: 'Freelancers, creators and public figures'
    },
    {
      id: 'landing', demo: 'templates/landing.html', thumb: 'image/previews/landing-thumb.svg', name: 'Product Landing Page', category: 'landing', catLabel: 'Landing Page',
      tag: 'LAUNCH / 08', line: 'One product, one goal.', previewClass: 'p-landing',
      desc: 'A tightly scoped page built around a single product and a single conversion goal.',
      features: ['Feature and benefit sections', 'Pricing and FAQ blocks', 'Single, focused call to action'],
      suited: 'Product launches and single-offer campaigns'
    }
  ];

  var templateGrid = document.getElementById('templateGrid');

  function renderTemplates() {
    templateGrid.innerHTML = templates.map(function (t) {
      return (
        '<article class="template-card reveal is-visible" data-category="' + t.category + '">' +
          '<a class="tpl-preview tpl-shot ' + t.previewClass + '" href="' + t.demo + '" target="_blank" rel="noopener" aria-label="Open the ' + t.name + ' demo in a new tab">' +
            '<img src="' + t.thumb + '" alt="' + t.name + ' template preview" loading="lazy" decoding="async">' +
            '<span class="tpl-live">Live demo ↗</span>' +
          '</a>' +
          '<div class="tpl-body">' +
            '<p class="tpl-cat">' + t.catLabel + '</p>' +
            '<h3>' + t.name + '</h3>' +
            '<p>' + t.line + '</p>' +
            '<div class="tpl-actions">' +
              '<a class="is-primary" href="' + t.demo + '" target="_blank" rel="noopener">Live Demo</a>' +
              '<button type="button" data-view="' + t.id + '">Details</button>' +
              '<a href="#contact" data-scroll data-request="' + t.id + '">Request</a>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    attachTemplateEvents();
  }

  function attachTemplateEvents() {
    templateGrid.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openModal(btn.getAttribute('data-view'));
      });
    });
    templateGrid.querySelectorAll('[data-scroll]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });
  }

  renderTemplates();

  /* ---------- Filters ---------- */
  var filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      filterChips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var filter = chip.getAttribute('data-filter');
      templateGrid.querySelectorAll('.template-card').forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* =========================================================
     Template preview modal
  ========================================================= */
  var modal = document.getElementById('templateModal');
  var modalPreview = document.getElementById('modalPreview');
  var modalCat = document.getElementById('modalCat');
  var modalTitle = document.getElementById('modalTitle');
  var modalDesc = document.getElementById('modalDesc');
  var modalFeatures = document.getElementById('modalFeatures');
  var modalSuit = document.getElementById('modalSuit');
  var lastFocusedEl = null;

  function openModal(id) {
    var t = templates.filter(function (item) { return item.id === id; })[0];
    if (!t) return;

    modalPreview.className = 'modal-preview tpl-shot is-modal ' + t.previewClass;
    modalPreview.innerHTML = '<img src="' + (t.full || t.thumb) + '" alt="' + t.name + ' template preview" loading="lazy">';
    var demoLink = document.getElementById('modalDemo');
    if (demoLink) demoLink.href = t.demo;
    modalCat.textContent = t.catLabel;
    modalTitle.textContent = t.name;
    modalDesc.textContent = t.desc;
    modalFeatures.innerHTML = t.features.map(function (f) { return '<li>' + f + '</li>'; }).join('');
    modalSuit.textContent = t.suited;

    lastFocusedEl = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(function () { modal.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    document.getElementById('modalClose').focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { modal.hidden = true; }, prefersReducedMotion ? 0 : 300);
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
  document.getElementById('modalRequest').addEventListener('click', function (e) {
    e.preventDefault();
    closeModal();
    setTimeout(function () {
      var target = document.getElementById('contact');
      var top = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }, prefersReducedMotion ? 0 : 260);
  });

  /* =========================================================
     Contact form validation + fake submit state
  ========================================================= */
  var form = document.getElementById('projectForm');
  var formSuccess = document.getElementById('formSuccess');

  function validateField(field) {
    var input = field.querySelector('input, textarea');
    if (!input) return true;
    var valid = input.checkValidity();
    field.classList.toggle('is-invalid', !valid);
    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var requiredFields = form.querySelectorAll('.field');
    var allValid = true;
    requiredFields.forEach(function (field) {
      var input = field.querySelector('input[required], textarea[required]');
      if (input && !validateField(field)) allValid = false;
    });
    if (!allValid) return;

    var submitBtn = form.querySelector('.form-submit');
    submitBtn.classList.add('btn-submit-loading');
    submitBtn.disabled = true;

    setTimeout(function () {
      submitBtn.classList.remove('btn-submit-loading');
      submitBtn.disabled = false;
      formSuccess.classList.add('is-visible');
      form.reset();
    }, 900);
  });

  form.querySelectorAll('input[required], textarea[required]').forEach(function (input) {
    input.addEventListener('blur', function () {
      validateField(input.closest('.field'));
    });
  });
})();
