/* ============================================================
   ZENVÉ — Global Application JavaScript
   Cart state, search overlay, nav, utils
   ============================================================ */

// ─── Cart State (LocalStorage) ─────────────────────────────
const Cart = {
  _key: 'veris_cart',
  
  get() {
    try { return JSON.parse(localStorage.getItem(this._key)) || []; }
    catch { return []; }
  },

  save(items) {
    localStorage.setItem(this._key, JSON.stringify(items));
    this._broadcast();
  },

  add(product) {
    const items = this.get();
    const existing = items.find(i => i.id === product.id && i.variant === product.variant);
    if (existing) {
      existing.qty += (product.qty || 1);
    } else {
      items.push({ ...product, qty: product.qty || 1 });
    }
    this.save(items);
    Toast.show(`${product.name} added to cart`, 'shopping_bag');
  },

  remove(id, variant) {
    const items = this.get().filter(i => !(i.id == id && i.variant === variant));
    this.save(items);
  },

  updateQty(id, variant, qty) {
    const items = this.get();
    const item = items.find(i => i.id == id && i.variant === variant);
    if (item) {
      if (qty <= 0) { this.remove(id, variant); return; }
      item.qty = qty;
      this.save(items);
    }
  },

  total() {
    return this.get().reduce((sum, i) => sum + (i.price * i.qty), 0);
  },

  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },

  clear() {
    this.save([]);
  },

  _broadcast() {
    window.dispatchEvent(new CustomEvent('cart:update'));
  }
};

// ─── Toast Notifications ───────────────────────────────────
const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, icon = 'check_circle', duration = 3500) {
    if (!this.container) this.init();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon material-icon">${icon}</span>
      <span>${message}</span>
    `;
    this.container.appendChild(toast);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }
};

// ─── Cart Badge Update ─────────────────────────────────────
function updateCartBadges() {
  const count = Cart.count();
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  });
}

// ─── Search Overlay ────────────────────────────────────────
const Search = {
  overlay: null,
  input: null,
  results: null,

  products: [
    { id: 1, name: 'The Aura Ring', sub: '2.5 CT CVD Solitaire', price: 2400, tag: 'Solitaire', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80&auto=format', href: 'product.html?id=1' },
    { id: 2, name: 'Eternal Strand', sub: '5.0 CT Tennis Bracelet', price: 4850, tag: 'Bracelet', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80&auto=format', href: 'product.html?id=2' },
    { id: 3, name: 'Lumière Pendant', sub: '1.0 CT Halo Drop', price: 1150, tag: 'Pendant', img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1400&q=80&auto=format', href: 'product.html?id=3' },
    { id: 4, name: 'Stella Studs', sub: '2.0 CT TW Round Cut', price: 1800, tag: 'Earrings', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=80&auto=format', href: 'product.html?id=4' },
    { id: 5, name: 'Soleil Bangle', sub: '3.2 CT Pavé Eternity', price: 3200, tag: 'Bracelet', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80&auto=format', href: 'product.html?id=5' },
    { id: 6, name: 'Arc Cuff', sub: '1.8 CT Halo Bangle', price: 2100, tag: 'Cuff', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80&auto=format', href: 'product.html?id=6' },
  ],

  init() {
    this.overlay = document.getElementById('search-overlay');
    this.input = document.getElementById('search-input');
    this.results = document.getElementById('search-results');
    if (!this.overlay) return;

    document.querySelectorAll('[data-search-open]').forEach(btn => {
      btn.addEventListener('click', () => this.open());
    });
    document.querySelectorAll('[data-search-close]').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); this.open(); }
    });
    if (this.input) {
      this.input.addEventListener('input', () => this.search(this.input.value));
    }
  },

  open() {
    if (!this.overlay) return;
    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.input?.focus(), 100);
    this.renderResults(this.products.slice(0, 4));
  },

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (this.input) this.input.value = '';
  },

  search(query) {
    if (!query.trim()) { this.renderResults(this.products.slice(0, 4)); return; }
    const q = query.toLowerCase();
    const filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sub.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q)
    );
    this.renderResults(filtered);
  },

  renderResults(products) {
    if (!this.results) return;
    if (products.length === 0) {
      this.results.innerHTML = `<div style="grid-column:1/-1;padding:32px;text-align:center;font-family:var(--font-sans);font-size:0.625rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--secondary)">No results found</div>`;
      return;
    }
    this.results.innerHTML = products.map(p => `
      <a href="${p.href}" class="search-result-card" onclick="Search.close()">
        <div class="search-result-thumb"><img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover"></div>
        <div>
          <div class="search-result-name">${p.name}</div>
          <div class="search-result-price">${p.sub}</div>
          <div style="font-family:var(--font-sans);font-size:0.5rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--secondary);margin-top:2px">from $${p.price.toLocaleString()}</div>
        </div>
      </a>
    `).join('');
  }
};

// ─── Navigation Scroll Behavior ───────────────────────────
function initNav() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─── Scroll Reveal ─────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

// ─── Animated Counters ─────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.counter);
      const isFloat = String(target).includes('.');
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1800;
      const start = performance.now();
      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = target * eased;
        el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.floor(val).toLocaleString()) + suffix;
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });
  counters.forEach(c => observer.observe(c));
}

// ─── Accordion ─────────────────────────────────────────────
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ─── Quick View Modal ──────────────────────────────────────
const QuickView = {
  overlay: null,

  init() {
    this.overlay = document.getElementById('quickview-overlay');
    if (!this.overlay) return;
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    document.querySelectorAll('[data-quickview-close]').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });
  },

  open(product) {
    if (!this.overlay) return;
    document.getElementById('qv-name').textContent = product.name;
    document.getElementById('qv-sub').textContent = product.sub;
    document.getElementById('qv-price').textContent = `From $${product.price.toLocaleString()}`;
    document.getElementById('qv-desc').textContent = product.desc || 'Handcrafted in Surat with IGI-certified CVD diamonds. Available in multiple metal options.';
    document.getElementById('qv-img').src = product.img;
    document.getElementById('qv-link').href = product.href;
    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// ─── Hero Parallax ─────────────────────────────────────────
function initParallax() {
  const img = document.querySelector('.hero-parallax-img');
  if (!img) return;
  const onScroll = () => {
    const scrolled = window.scrollY;
    img.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ─── Newsletter ────────────────────────────────────────────
function initNewsletter() {
  document.querySelectorAll('[data-newsletter-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value) return;
      Toast.show('Welcome to the circle of curated elegance.', 'favorite');
      input.value = '';
    });
  });
}

// ─── Mobile Nav Active State ───────────────────────────────
function setMobileNavActive() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    item.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
  });
  // Same for desktop nav
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
  });
}

// ─── Wishlist ──────────────────────────────────────────────
const Wishlist = {
  _key: 'veris_wishlist',
  get() { try { return JSON.parse(localStorage.getItem(this._key)) || []; } catch { return []; } },
  save(ids) { localStorage.setItem(this._key, JSON.stringify(ids)); },
  toggle(id, productName) {
    const list = this.get();
    const idx = list.indexOf(id);
    if (idx === -1) {
      list.push(id);
      Toast.show(`${productName} saved to wishlist`, 'favorite');
    } else {
      list.splice(idx, 1);
      Toast.show(`Removed from wishlist`, 'heart_minus');
    }
    this.save(list);
    return idx === -1;
  },
  has(id) { return this.get().includes(id); }
};

// ─── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Toast.init();
  Search.init();
  QuickView.init();
  initNav();
  initReveal();
  initCounters();
  initAccordions();
  initParallax();
  initNewsletter();
  setMobileNavActive();
  updateCartBadges();
  window.addEventListener('cart:update', updateCartBadges);
});
