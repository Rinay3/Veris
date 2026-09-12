/* ============================================================
   VÉRIS — Global Application JavaScript
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

  getProducts() {
    return (typeof PRODUCTS !== 'undefined') ? PRODUCTS : [
      { id: 1, name: 'The Aura Ring', sub: '2.5 CT CVD Solitaire', price: 2400, tag: 'Solitaire', img: 'assets/aura-ring.jpg', href: 'product.html?id=1' },
      { id: 2, name: 'Eternal Strand', sub: '5.0 CT Tennis Bracelet', price: 4850, tag: 'Bracelet', img: 'assets/eternal-strand.jpg', href: 'product.html?id=2' },
      { id: 3, name: 'Lumière Pendant', sub: '1.0 CT Halo Drop', price: 1150, tag: 'Pendant', img: 'assets/lumiere-pendant.jpg', href: 'product.html?id=3' },
      { id: 4, name: 'Stella Studs', sub: '2.0 CT TW Round Cut', price: 1800, tag: 'Earrings', img: 'assets/stella-studs.jpg', href: 'product.html?id=4' },
      { id: 5, name: 'Soleil Bangle', sub: '3.2 CT Pavé Eternity', price: 3200, tag: 'Bracelet', img: 'assets/soleil-bangle.jpg', href: 'product.html?id=5' },
      { id: 6, name: 'Arc Cuff', sub: '1.8 CT Halo Bangle', price: 2100, tag: 'Cuff', img: 'assets/arc-cuff.jpg', href: 'product.html?id=6' },
    ];
  },

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
      if (e.key === 'Escape') {
        this.close();
        WishlistDrawer.close();
        SizeGuideModal.close();
        PolicyModals.close();
      }
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
    this.renderResults(this.getProducts().slice(0, 4));
  },

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (this.input) this.input.value = '';
  },

  search(query) {
    const list = this.getProducts();
    if (!query.trim()) { this.renderResults(list.slice(0, 4)); return; }
    const q = query.toLowerCase();
    const filtered = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.sub && p.sub.toLowerCase().includes(q)) ||
      (p.tag && p.tag.toLowerCase().includes(q)) ||
      (p.cat && p.cat.toLowerCase().includes(q))
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
  save(ids) {
    localStorage.setItem(this._key, JSON.stringify(ids));
    this._broadcast();
  },
  toggle(id, productName) {
    const list = this.get();
    const numId = parseInt(id, 10);
    const idx = list.indexOf(numId);
    let added = false;
    if (idx === -1) {
      list.push(numId);
      Toast.show(`${productName || 'Piece'} saved to wishlist`, 'favorite');
      added = true;
    } else {
      list.splice(idx, 1);
      Toast.show(`Removed from wishlist`, 'heart_minus');
      added = false;
    }
    this.save(list);
    return added;
  },
  has(id) {
    const numId = parseInt(id, 10);
    return this.get().includes(numId);
  },
  _broadcast() {
    window.dispatchEvent(new CustomEvent('wishlist:update'));
  }
};

function updateWishlistBadges() {
  const count = Wishlist.get().length;
  document.querySelectorAll('.wishlist-badge').forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  });
}

// ─── Wishlist Slide-Out Drawer ─────────────────────────────
const WishlistDrawer = {
  overlay: null,

  init() {
    this.overlay = document.getElementById('wishlist-drawer-overlay');
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.id = 'wishlist-drawer-overlay';
      this.overlay.className = 'wishlist-drawer-overlay';
      this.overlay.innerHTML = `
        <div class="wishlist-drawer" role="dialog" aria-label="Your Curated Wishlist">
          <div class="wishlist-drawer-header">
            <div class="wishlist-drawer-title">Curated Wishlist</div>
            <button class="wishlist-drawer-close" aria-label="Close Wishlist">Close ✕</button>
          </div>
          <div class="wishlist-drawer-body" id="wishlist-drawer-items"></div>
        </div>
      `;
      document.body.appendChild(this.overlay);
    }

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });
    this.overlay.querySelector('.wishlist-drawer-close')?.addEventListener('click', () => this.close());

    document.querySelectorAll('[data-wishlist-open]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    window.addEventListener('wishlist:update', () => {
      updateWishlistBadges();
      if (this.overlay && this.overlay.classList.contains('open')) {
        this.render();
      }
    });
  },

  open() {
    if (!this.overlay) this.init();
    this.render();
    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  render() {
    const listEl = document.getElementById('wishlist-drawer-items');
    if (!listEl) return;
    const ids = Wishlist.get();
    const allProducts = (typeof PRODUCTS !== 'undefined') ? PRODUCTS : Search.getProducts();

    if (ids.length === 0) {
      listEl.innerHTML = `
        <div class="wishlist-empty">
          <span class="wishlist-empty-icon">favorite_border</span>
          <div style="font-family:var(--font-serif);font-size:1.25rem;font-weight:300">Your wishlist is empty</div>
          <p style="font-family:var(--font-sans);font-size:0.6875rem;color:var(--secondary);max-width:240px;line-height:1.6">Save your favorite diamond creations to review or commission later.</p>
          <a href="collections.html" class="btn btn-primary btn-sm" onclick="WishlistDrawer.close()" style="margin-top:var(--space-2)">Explore Boutique</a>
        </div>
      `;
      return;
    }

    const savedProducts = ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean);

    listEl.innerHTML = savedProducts.map(p => `
      <div class="wishlist-item" data-id="${p.id}">
        <a href="product.html?id=${p.id}" onclick="WishlistDrawer.close()" class="wishlist-item-thumb">
          <img src="${p.img}" alt="${p.name}" />
        </a>
        <div class="wishlist-item-info">
          <a href="product.html?id=${p.id}" onclick="WishlistDrawer.close()" class="wishlist-item-name">${p.name}</a>
          <div class="wishlist-item-sub">${p.sub}</div>
          <div class="wishlist-item-price">$${p.price.toLocaleString()}</div>
          <div class="wishlist-item-actions">
            <button class="wishlist-move-btn" onclick="WishlistDrawer.moveToCart(${p.id})">Move to Cart</button>
            <button class="wishlist-del-btn" onclick="WishlistDrawer.remove(${p.id}, '${p.name.replace(/'/g, "\\'")}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  },

  moveToCart(id) {
    const allProducts = (typeof PRODUCTS !== 'undefined') ? PRODUCTS : Search.getProducts();
    const product = allProducts.find(p => p.id === id);
    if (!product) return;
    Cart.add({
      id: product.id,
      name: product.name,
      variant: product.sub,
      price: product.price,
      qty: 1,
      img: product.img,
      href: `product.html?id=${product.id}`
    });
    Wishlist.toggle(id, product.name);
    this.render();
  },

  remove(id, name) {
    Wishlist.toggle(id, name);
    this.render();
  }
};

// ─── Sizing Guide Modal ────────────────────────────────────
const SizeGuideModal = {
  overlay: null,

  init() {
    this.overlay = document.getElementById('sizeguide-modal-overlay');
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.id = 'sizeguide-modal-overlay';
      this.overlay.className = 'info-modal-overlay';
      this.overlay.innerHTML = `
        <div class="info-modal-panel" role="dialog" aria-label="Ring & Jewelry Sizing Guide">
          <div class="info-modal-header">
            <div>
              <div class="section-eyebrow" style="margin-bottom:2px">Bespoke Fit</div>
              <h3 style="font-family:var(--font-serif);font-size:1.5rem;font-weight:300">Ring & Sizing Guide</h3>
            </div>
            <button class="wishlist-drawer-close" onclick="SizeGuideModal.close()" aria-label="Close Guide">Close ✕</button>
          </div>
          <div class="info-modal-body">
            <p style="font-family:var(--font-sans);font-size:0.75rem;color:var(--secondary);line-height:1.7">Every Véris ring includes one complimentary resizing within 30 days of delivery. Refer to our international standard sizing chart below:</p>
            
            <table class="sizing-table">
              <thead>
                <tr>
                  <th>US / Canada</th>
                  <th>UK / AU</th>
                  <th>EU / ISO</th>
                  <th>Diameter (mm)</th>
                  <th>Circumference (mm)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>4</strong></td><td>H ½</td><td>47</td><td>14.9 mm</td><td>46.8 mm</td></tr>
                <tr><td><strong>5</strong></td><td>J ½</td><td>49</td><td>15.7 mm</td><td>49.3 mm</td></tr>
                <tr><td><strong>6</strong></td><td>L ½</td><td>52</td><td>16.5 mm</td><td>51.9 mm</td></tr>
                <tr><td><strong>7</strong></td><td>N ½</td><td>54</td><td>17.3 mm</td><td>54.4 mm</td></tr>
                <tr><td><strong>8</strong></td><td>P ½</td><td>57</td><td>18.1 mm</td><td>57.0 mm</td></tr>
                <tr><td><strong>9</strong></td><td>R ½</td><td>59</td><td>19.0 mm</td><td>59.5 mm</td></tr>
                <tr><td><strong>10</strong></td><td>T ½</td><td>62</td><td>19.8 mm</td><td>62.1 mm</td></tr>
              </tbody>
            </table>

            <div style="background:var(--surface-low);padding:var(--space-6);display:flex;flex-direction:column;gap:var(--space-2)">
              <div style="font-family:var(--font-sans);font-size:0.5625rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary)">How to Measure at Home</div>
              <p style="font-family:var(--font-sans);font-size:0.75rem;color:var(--secondary);line-height:1.6">Wrap a non-stretches string or strip of paper snugly around your knuckle and ring finger base. Mark the overlap point with a pen, measure against a millimeter ruler, and match with the circumference table above.</p>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(this.overlay);
    }

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    document.querySelectorAll('[data-sizeguide-open]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
  },

  open() {
    if (!this.overlay) this.init();
    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// ─── Information & Policy Modals ───────────────────────────
const PolicyModals = {
  overlay: null,

  data: {
    shipping: {
      eyebrow: 'Worldwide Delivery',
      title: 'Complimentary Insured Shipping',
      content: `
        <p style="font-family:var(--font-sans);font-size:0.8125rem;color:var(--secondary);line-height:1.8">All Véris creations are handcrafted to order in our Surat atelier and shipped worldwide via insured armored couriers (Ferrari Group / Malca-Amit / FedEx Priority).</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-top:var(--space-4)">
          <div style="background:var(--surface-low);padding:var(--space-4)">
            <div style="font-family:var(--font-sans);font-size:0.5625rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary)">Express Atelier (Free)</div>
            <p style="font-family:var(--font-sans);font-size:0.6875rem;color:var(--secondary);margin-top:4px">7–14 business days worldwide. 100% insured up to point of delivery signature.</p>
          </div>
          <div style="background:var(--surface-low);padding:var(--space-4)">
            <div style="font-family:var(--font-sans);font-size:0.5625rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary)">White Glove Priority ($95)</div>
            <p style="font-family:var(--font-sans);font-size:0.6875rem;color:var(--secondary);margin-top:4px">3–5 business days expedited with personal appointment handover in major metro areas.</p>
          </div>
        </div>
      `
    },
    returns: {
      eyebrow: 'Atelier Guarantee',
      title: '30-Day Returns & Lifetime Warranty',
      content: `
        <p style="font-family:var(--font-sans);font-size:0.8125rem;color:var(--secondary);line-height:1.8">We stand behind every optical facet we grow. If your piece does not exceed your expectations, return it in pristine unworn condition within 30 days for a full refund or exchange.</p>
        <ul style="font-family:var(--font-sans);font-size:0.75rem;color:var(--secondary);line-height:1.8;padding-left:var(--space-4);list-style:disc;margin-top:var(--space-2)">
          <li>Free return shipping with prepaid insured labels.</li>
          <li>Complimentary resizing within 30 days of receipt.</li>
          <li>Lifetime warranty against manufacturing defects on all gold and platinum settings.</li>
          <li>Annual complimentary ultrasonic cleaning and prong inspection.</li>
        </ul>
      `
    },
    contact: {
      eyebrow: 'Private Concierge',
      title: 'Connect with our Surat Atelier',
      content: `
        <p style="font-family:var(--font-sans);font-size:0.8125rem;color:var(--secondary);line-height:1.8">Speak directly with our gemologists and diamond engineers for bespoke commissions, custom sizing, or certification inquiries.</p>
        <div style="background:var(--surface-low);padding:var(--space-6);margin-top:var(--space-4);display:flex;flex-direction:column;gap:var(--space-3);font-family:var(--font-sans);font-size:0.75rem">
          <div><strong>Atelier Location:</strong> Diamond Research and Mercantile City, Surat, Gujarat, India</div>
          <div><strong>Direct Concierge:</strong> +91 (261) 880-9900</div>
          <div><strong>Email:</strong> atelier@verisdiamonds.com</div>
          <div><strong>Hours:</strong> Mon – Sat, 9:00 AM – 7:00 PM IST (Worldwide Appointments Available)</div>
        </div>
      `
    }
  },

  init() {
    this.overlay = document.getElementById('policy-modal-overlay');
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.id = 'policy-modal-overlay';
      this.overlay.className = 'info-modal-overlay';
      this.overlay.innerHTML = `
        <div class="info-modal-panel" role="dialog">
          <div class="info-modal-header">
            <div>
              <div class="section-eyebrow" id="policy-eyebrow" style="margin-bottom:2px"></div>
              <h3 id="policy-title" style="font-family:var(--font-serif);font-size:1.5rem;font-weight:300"></h3>
            </div>
            <button class="wishlist-drawer-close" onclick="PolicyModals.close()" aria-label="Close">Close ✕</button>
          </div>
          <div class="info-modal-body" id="policy-content"></div>
        </div>
      `;
      document.body.appendChild(this.overlay);
    }

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    document.querySelectorAll('[data-policy]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const type = btn.dataset.policy;
        this.open(type);
      });
    });
  },

  open(type) {
    if (!this.overlay) this.init();
    const item = this.data[type] || this.data.shipping;
    document.getElementById('policy-eyebrow').textContent = item.eyebrow;
    document.getElementById('policy-title').textContent = item.title;
    document.getElementById('policy-content').innerHTML = item.content;
    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// ─── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Toast.init();
  Search.init();
  QuickView.init();
  WishlistDrawer.init();
  SizeGuideModal.init();
  PolicyModals.init();
  initNav();
  initReveal();
  initCounters();
  initAccordions();
  initParallax();
  initNewsletter();
  setMobileNavActive();
  updateCartBadges();
  updateWishlistBadges();
  window.addEventListener('cart:update', updateCartBadges);
  window.addEventListener('wishlist:update', updateWishlistBadges);
});

