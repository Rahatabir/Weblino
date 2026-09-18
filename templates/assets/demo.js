/* =========================================================
   WEBLINO — Demo template shared script
   Art library (inline SVG, no photos needed), cart, nav,
   reveal, filters, accordion, form handling, toast.
========================================================= */
window.WB = (function () {
  'use strict';

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- SVG art library ---------------- */
  function wrap(inner) {
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + '</svg>';
  }
  var art = {
    tshirt: wrap('<path d="M35 18 L20 26 L14 42 L26 47 L26 84 H74 V47 L86 42 L80 26 L65 18 Q50 30 35 18Z" fill="currentColor" opacity=".85"/>'),
    hoodie: wrap('<path d="M36 16 L18 26 L12 46 L25 51 V86 H75 V51 L88 46 L82 26 L64 16 Q50 26 36 16Z" fill="currentColor" opacity=".85"/><path d="M38 16 Q50 30 62 16 Q50 8 38 16Z" fill="currentColor" opacity=".5"/><rect x="38" y="62" width="24" height="12" rx="4" fill="currentColor" opacity=".35"/>'),
    jacket: wrap('<path d="M34 16 L18 25 L14 48 L25 52 V86 H75 V52 L86 48 L82 25 L66 16 L50 30Z" fill="currentColor" opacity=".85"/><rect x="47" y="30" width="6" height="56" fill="currentColor" opacity=".35"/>'),
    dress: wrap('<path d="M38 16 L28 24 L34 40 L22 86 H78 L66 40 L72 24 L62 16 Q50 26 38 16Z" fill="currentColor" opacity=".85"/>'),
    pants: wrap('<path d="M30 14 H70 L74 86 H58 L50 46 L42 86 H26Z" fill="currentColor" opacity=".85"/>'),
    sneaker: wrap('<path d="M12 68 Q12 58 22 56 L36 52 L46 40 L56 44 L58 54 Q72 58 84 62 Q92 65 92 72 V78 H12Z" fill="currentColor" opacity=".85"/><rect x="10" y="76" width="82" height="9" rx="4" fill="currentColor" opacity=".45"/><path d="M40 52 L52 58 M46 46 L58 52" stroke="currentColor" stroke-width="3" opacity=".4" fill="none"/>'),
    bag: wrap('<path d="M24 38 H76 L82 86 H18Z" fill="currentColor" opacity=".85"/><path d="M36 38 V30 Q36 16 50 16 Q64 16 64 30 V38" stroke="currentColor" stroke-width="5" fill="none" opacity=".5"/>'),
    cap: wrap('<path d="M20 60 Q20 28 50 28 Q80 28 80 60Z" fill="currentColor" opacity=".85"/><path d="M18 60 H88 Q92 68 84 70 H18Z" fill="currentColor" opacity=".5"/>'),
    glasses: wrap('<rect x="10" y="38" width="34" height="22" rx="8" fill="currentColor" opacity=".8"/><rect x="56" y="38" width="34" height="22" rx="8" fill="currentColor" opacity=".8"/><path d="M44 46 Q50 42 56 46" stroke="currentColor" stroke-width="4" fill="none" opacity=".6"/>'),
    watch: wrap('<circle cx="50" cy="50" r="20" fill="currentColor" opacity=".85"/><rect x="42" y="12" width="16" height="22" rx="5" fill="currentColor" opacity=".45"/><rect x="42" y="66" width="16" height="22" rx="5" fill="currentColor" opacity=".45"/><path d="M50 42 V52 H58" stroke="#fff" stroke-width="3" fill="none" opacity=".75"/>'),
    /* beauty */
    bottle: wrap('<rect x="42" y="12" width="16" height="12" rx="3" fill="currentColor" opacity=".5"/><path d="M34 30 Q34 24 42 24 H58 Q66 24 66 30 V80 Q66 88 58 88 H42 Q34 88 34 80Z" fill="currentColor" opacity=".85"/><rect x="42" y="46" width="16" height="20" rx="3" fill="#fff" opacity=".35"/>'),
    jar: wrap('<rect x="26" y="20" width="48" height="12" rx="5" fill="currentColor" opacity=".5"/><path d="M28 36 H72 V76 Q72 86 62 86 H38 Q28 86 28 76Z" fill="currentColor" opacity=".85"/><ellipse cx="50" cy="52" rx="14" ry="8" fill="#fff" opacity=".3"/>'),
    dropper: wrap('<rect x="44" y="8" width="12" height="18" rx="4" fill="currentColor" opacity=".5"/><rect x="36" y="26" width="28" height="8" rx="3" fill="currentColor" opacity=".6"/><path d="M34 36 H66 V82 Q66 90 58 90 H42 Q34 90 34 82Z" fill="currentColor" opacity=".85"/><rect x="44" y="50" width="12" height="26" rx="4" fill="#fff" opacity=".3"/>'),
    tube: wrap('<path d="M38 22 H62 L58 82 Q58 90 50 90 Q42 90 42 82Z" fill="currentColor" opacity=".85"/><rect x="34" y="12" width="32" height="10" rx="4" fill="currentColor" opacity=".5"/>'),
    /* food */
    plate: wrap('<circle cx="50" cy="52" r="34" fill="currentColor" opacity=".25"/><circle cx="50" cy="52" r="22" fill="currentColor" opacity=".8"/><circle cx="43" cy="46" r="5" fill="#fff" opacity=".45"/><circle cx="57" cy="56" r="4" fill="#fff" opacity=".3"/>'),
    bowl: wrap('<path d="M16 46 H84 Q84 82 50 82 Q16 82 16 46Z" fill="currentColor" opacity=".85"/><ellipse cx="50" cy="46" rx="34" ry="9" fill="currentColor" opacity=".45"/><path d="M36 30 Q40 22 36 16 M50 28 Q54 20 50 14 M64 30 Q68 22 64 16" stroke="currentColor" stroke-width="3" fill="none" opacity=".35"/>'),
    burger: wrap('<path d="M18 40 Q18 18 50 18 Q82 18 82 40Z" fill="currentColor" opacity=".8"/><rect x="16" y="44" width="68" height="9" rx="4" fill="currentColor" opacity=".5"/><rect x="16" y="56" width="68" height="10" rx="4" fill="currentColor" opacity=".7"/><path d="M18 70 H82 Q82 86 50 86 Q18 86 18 70Z" fill="currentColor" opacity=".8"/>'),
    coffee: wrap('<path d="M24 34 H70 V64 Q70 80 54 80 H40 Q24 80 24 64Z" fill="currentColor" opacity=".85"/><path d="M70 42 H80 Q88 42 88 52 Q88 62 78 62 H70" stroke="currentColor" stroke-width="5" fill="none" opacity=".5"/><path d="M38 24 Q42 16 38 10 M52 24 Q56 16 52 10" stroke="currentColor" stroke-width="3" fill="none" opacity=".35"/>'),
    cake: wrap('<path d="M22 46 H78 V78 Q78 84 72 84 H28 Q22 84 22 78Z" fill="currentColor" opacity=".85"/><path d="M22 46 Q34 36 50 46 Q66 56 78 46 V56 H22Z" fill="currentColor" opacity=".5"/><rect x="48" y="24" width="4" height="16" rx="2" fill="currentColor" opacity=".6"/>'),
    /* misc */
    car: wrap('<path d="M12 62 L22 44 Q26 36 38 36 H62 Q74 36 80 46 L90 60 Q92 64 88 66 H14 Q10 66 12 62Z" fill="currentColor" opacity=".85"/><circle cx="30" cy="68" r="9" fill="currentColor" opacity=".55"/><circle cx="72" cy="68" r="9" fill="currentColor" opacity=".55"/><path d="M30 46 H62 L70 56 H26Z" fill="#fff" opacity=".28"/>'),
    screen: wrap('<rect x="14" y="22" width="72" height="48" rx="6" fill="currentColor" opacity=".85"/><rect x="22" y="30" width="30" height="6" rx="3" fill="#fff" opacity=".5"/><rect x="22" y="42" width="52" height="4" rx="2" fill="#fff" opacity=".25"/><rect x="22" y="52" width="40" height="4" rx="2" fill="#fff" opacity=".2"/><rect x="34" y="76" width="32" height="6" rx="3" fill="currentColor" opacity=".5"/>'),
    spark: wrap('<path d="M50 12 L58 42 L88 50 L58 58 L50 88 L42 58 L12 50 L42 42Z" fill="currentColor" opacity=".8"/>'),
    shield: wrap('<path d="M50 12 L82 24 V50 Q82 74 50 88 Q18 74 18 50 V24Z" fill="currentColor" opacity=".8"/><path d="M38 50 L47 60 L64 40" stroke="#fff" stroke-width="6" fill="none" opacity=".8" stroke-linecap="round"/>'),
    truck: wrap('<rect x="10" y="34" width="46" height="30" rx="4" fill="currentColor" opacity=".85"/><path d="M56 42 H72 L86 54 V64 H56Z" fill="currentColor" opacity=".6"/><circle cx="28" cy="70" r="8" fill="currentColor" opacity=".5"/><circle cx="72" cy="70" r="8" fill="currentColor" opacity=".5"/>'),
    chart: wrap('<rect x="16" y="56" width="14" height="28" rx="4" fill="currentColor" opacity=".5"/><rect x="36" y="40" width="14" height="44" rx="4" fill="currentColor" opacity=".7"/><rect x="56" y="24" width="14" height="60" rx="4" fill="currentColor" opacity=".85"/><rect x="76" y="46" width="10" height="38" rx="4" fill="currentColor" opacity=".4"/>'),
    person: wrap('<circle cx="50" cy="36" r="17" fill="currentColor" opacity=".8"/><path d="M18 88 Q18 58 50 58 Q82 58 82 88Z" fill="currentColor" opacity=".8"/>'),
    house: wrap('<path d="M50 14 L88 46 H76 V84 H24 V46 H12Z" fill="currentColor" opacity=".8"/><rect x="42" y="58" width="16" height="26" rx="3" fill="#fff" opacity=".35"/>')
  };

  function paint(root) {
    (root || document).querySelectorAll('[data-art]').forEach(function (el) {
      if (el.dataset.painted) return;
      var key = el.getAttribute('data-art');
      el.innerHTML = art[key] || art.spark;
      el.dataset.painted = '1';
    });
  }

  /* ---------------- toast ---------------- */
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(function () { toastEl.classList.add('is-on'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2200);
  }

  /* ---------------- header / nav ---------------- */
  function nav() {
    var burger = document.querySelector('[data-burger]');
    var menu = document.querySelector('[data-mobilenav]');
    if (burger && menu) {
      burger.addEventListener('click', function () {
        var open = menu.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { menu.classList.remove('is-open'); });
      });
    }
  }

  /* ---------------- reveal ---------------- */
  function reveal() {
    var els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window) || reduced) {
      els.forEach(function (el) { el.classList.add('on'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { threshold: .12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- cart ---------------- */
  function money(n, cur, dec) {
    var v = dec === 0 ? Math.round(n).toLocaleString('en-US') : n.toFixed(dec === undefined ? 2 : dec);
    return (cur || '$') + v;
  }

  function cart(opts) {
    opts = opts || {};
    var cur = opts.currency || '$';
    var dec = opts.decimals === undefined ? 2 : opts.decimals;
    var items = [];
    var drawer = document.querySelector('[data-drawer]');
    var bg = document.querySelector('[data-drawer-bg]');
    var body = document.querySelector('[data-cart-body]');
    var totalEl = document.querySelector('[data-cart-total]');
    var countEls = document.querySelectorAll('[data-cart-count]');
    if (!drawer) return null;

    function open() { drawer.classList.add('is-open'); bg.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    function close() { drawer.classList.remove('is-open'); bg.classList.remove('is-open'); document.body.style.overflow = ''; }

    function render() {
      var count = items.reduce(function (s, i) { return s + i.qty; }, 0);
      var total = items.reduce(function (s, i) { return s + i.qty * i.price; }, 0);
      countEls.forEach(function (el) { el.textContent = count; el.style.display = count ? '' : 'none'; });
      if (totalEl) totalEl.textContent = money(total, cur, dec);
      if (!items.length) {
        body.innerHTML = '<p class="cart-empty">Your bag is empty. Add something you like.</p>';
        return;
      }
      body.innerHTML = items.map(function (i, idx) {
        return '<div class="cart-row">' +
          '<div class="thumb" data-art="' + i.art + '"></div>' +
          '<div style="flex:1">' +
            '<h4>' + i.name + '</h4>' +
            '<p class="meta">' + (i.variant || '') + '</p>' +
            '<div class="qty">' +
              '<button type="button" data-dec="' + idx + '" aria-label="Decrease quantity">−</button>' +
              '<span>' + i.qty + '</span>' +
              '<button type="button" data-inc="' + idx + '" aria-label="Increase quantity">+</button>' +
              '<button type="button" data-del="' + idx + '" style="margin-left:auto;border:none;opacity:.6" aria-label="Remove">✕</button>' +
            '</div>' +
          '</div>' +
          '<strong style="font-size:.88rem">' + money(i.price * i.qty, cur, dec) + '</strong>' +
        '</div>';
      }).join('');
      paint(body);
      body.querySelectorAll('[data-inc]').forEach(function (b) {
        b.addEventListener('click', function () { items[+b.dataset.inc].qty++; render(); });
      });
      body.querySelectorAll('[data-dec]').forEach(function (b) {
        b.addEventListener('click', function () {
          var i = +b.dataset.dec;
          items[i].qty--; if (items[i].qty < 1) items.splice(i, 1);
          render();
        });
      });
      body.querySelectorAll('[data-del]').forEach(function (b) {
        b.addEventListener('click', function () { items.splice(+b.dataset.del, 1); render(); });
      });
    }

    function add(item) {
      var found = items.filter(function (i) { return i.name === item.name && i.variant === item.variant; })[0];
      if (found) found.qty += item.qty || 1;
      else items.push({ name: item.name, price: item.price, art: item.art || 'spark', variant: item.variant || '', qty: item.qty || 1 });
      render();
      toast(item.name + ' added to bag');
    }

    document.querySelectorAll('[data-open-cart]').forEach(function (b) {
      b.addEventListener('click', function () { open(); });
    });
    document.querySelectorAll('[data-close-cart]').forEach(function (b) {
      b.addEventListener('click', close);
    });
    if (bg) bg.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    document.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        add({
          name: btn.dataset.name,
          price: parseFloat(btn.dataset.price),
          art: btn.dataset.artkey,
          variant: btn.dataset.variant || ''
        });
      });
    });

    var checkout = document.querySelector('[data-checkout]');
    if (checkout) {
      checkout.addEventListener('click', function () {
        if (!items.length) { toast('Your bag is empty'); return; }
        toast('Demo only — checkout is not connected');
      });
    }

    render();
    return { add: add, open: open, close: close, items: items };
  }

  /* ---------------- filter tabs ---------------- */
  function filters() {
    document.querySelectorAll('[data-filterbar]').forEach(function (bar) {
      var targetSel = bar.getAttribute('data-filterbar');
      var chips = bar.querySelectorAll('[data-filter]');
      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          chips.forEach(function (c) { c.classList.remove('is-on'); c.setAttribute('aria-selected', 'false'); });
          chip.classList.add('is-on'); chip.setAttribute('aria-selected', 'true');
          var f = chip.getAttribute('data-filter');
          document.querySelectorAll(targetSel + ' [data-cat]').forEach(function (item) {
            var show = f === 'all' || item.getAttribute('data-cat') === f;
            item.style.display = show ? '' : 'none';
          });
        });
      });
    });
  }

  /* ---------------- accordion ---------------- */
  function accordion() {
    document.querySelectorAll('[data-acc] > [data-acc-item]').forEach(function (item) {
      var btn = item.querySelector('[data-acc-btn]');
      var panel = item.querySelector('[data-acc-panel]');
      if (!btn || !panel) return;
      panel.style.maxHeight = '0px';
      btn.addEventListener('click', function () {
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
      });
    });
  }

  /* ---------------- counters ---------------- */
  function counters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    var run = function (el) {
      var end = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduced) { el.textContent = end + suffix; return; }
      var t0 = performance.now(), dur = 1200;
      (function tick(now) {
        var p = Math.min((now - t0) / dur, 1);
        var v = end * (1 - Math.pow(1 - p, 3));
        el.textContent = (end % 1 ? v.toFixed(1) : Math.round(v)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    };
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: .5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- forms ---------------- */
  function forms() {
    document.querySelectorAll('[data-demoform]').forEach(function (form) {
      var ok = form.querySelector('.form-ok');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;
        form.querySelectorAll('.field').forEach(function (field) {
          var input = field.querySelector('input,select,textarea');
          if (!input || !input.hasAttribute('required')) return;
          var good = input.checkValidity();
          field.classList.toggle('is-bad', !good);
          if (!good) valid = false;
        });
        if (!valid) { toast('Please check the highlighted fields'); return; }
        var btn = form.querySelector('[type=submit]');
        var label = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
        setTimeout(function () {
          if (btn) { btn.disabled = false; btn.textContent = label; }
          if (ok) ok.classList.add('is-on');
          form.reset();
          toast(form.getAttribute('data-demoform') || 'Sent — this is a demo, nothing was stored');
        }, 700);
      });
      form.querySelectorAll('.field input,.field select,.field textarea').forEach(function (input) {
        input.addEventListener('blur', function () {
          if (!input.hasAttribute('required')) return;
          input.closest('.field').classList.toggle('is-bad', !input.checkValidity());
        });
      });
    });
  }

  /* ---------------- option pickers (size / color) ---------------- */
  function pickers() {
    document.querySelectorAll('[data-picker]').forEach(function (group) {
      group.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          group.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-on'); });
          b.classList.add('is-on');
          group.dataset.value = b.dataset.value || b.textContent.trim();
        });
      });
    });
  }

  function init(opts) {
    paint();
    nav(); reveal(); filters(); accordion(); counters(); forms(); pickers();
    var c = cart(opts || {});
    return { cart: c, toast: toast, paint: paint };
  }

  return { init: init, art: art, paint: paint, toast: toast };
})();
