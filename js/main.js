/**
 * FORGEX INDUSTRIES — PREMIUM INDUSTRIAL HARDWARE JAVASCRIPT
 * High-performance, accessible vanilla JavaScript architecture.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initHeader();
  initMobileNav();
  initStatsCounter();
  initProductCatalog();
  initCapabilitiesModals();
  initStoryModal();
  initQuoteForm();
  initContactActions();
  initBackToTop();
  initDynamicYear();
  initStorytellingMode();
  initMobileBottomDock();
  initMobileViewport();
});

/* --------------------------------------------------------------------------
   1. CUSTOM INDUSTRIAL DESKTOP CURSOR
   -------------------------------------------------------------------------- */
function initCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Add hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, input, select, textarea, .capability-card, .industry-card, .product-card');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hovered'));
  });
}

/* --------------------------------------------------------------------------
   2. STICKY HEADER & ACTIVE SECTION HIGHLIGHT
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Active section indicator via IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION MENU
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const links = document.querySelectorAll('.nav-link, .nav-cta-btn, .story-mode-nav-btn');

  if (!toggleBtn || !nav) return;

  function toggleMenu() {
    const isOpen = nav.classList.toggle('open');
    toggleBtn.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    nav.classList.remove('open');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', toggleMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   4. ANIMATED METRICS / STATISTICS COUNTER
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach((el) => {
          const target = parseInt(el.getAttribute('data-target'), 10) || 0;
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 45));
          const duration = 1200;
          const interval = duration / (target / step);

          const counter = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target;
              clearInterval(counter);
            } else {
              el.textContent = current;
            }
          }, interval);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   5. PRODUCTS CATALOG (DATA, FILTERING, SEARCH, MODAL)
   -------------------------------------------------------------------------- */
const PRODUCTS_DATA = [
  {
    id: 'fx-bt-001',
    code: 'FX-BT-001',
    name: 'Hex Bolt High-Tensile',
    category: 'Bolts & Nuts',
    material: 'Grade 8.8 / 10.9 Alloy Steel',
    finish: 'Zinc Plated / Black Oxide',
    dimensions: 'M6 to M36 (Lengths 20mm – 300mm)',
    standard: 'DIN 933 / ISO 4017',
    description: 'Precision forged high-tensile hexagon head bolts engineered for heavy industrial framing, machinery anchoring, and structural bolted joints.',
    image: 'assets/images/prod_bolt.jpg',
    tolerances: 'ISO 965-1 Class 6g',
    tensileStrength: '800 – 1040 MPa',
    cadRef: 'CAD-FX-BT01-REV3'
  },
  {
    id: 'fx-nt-002',
    code: 'FX-NT-002',
    name: 'Stainless Steel Hex Nut',
    category: 'Bolts & Nuts',
    material: 'SS 304 / SS 316 (A2 / A4)',
    finish: 'Passivated Clean Finish',
    dimensions: 'M4 to M30 (Pitch 0.7mm – 3.5mm)',
    standard: 'DIN 934 / ISO 4032',
    description: 'Corrosion-resistant precision threaded metric hex nuts built for maritime, petrochemical, chemical processing, and sanitary machinery.',
    image: 'assets/images/prod_nut.jpg',
    tolerances: 'ISO 965-1 Class 6H',
    tensileStrength: '700 – 800 MPa',
    cadRef: 'CAD-FX-NT02-REV1'
  },
  {
    id: 'fx-sc-003',
    code: 'FX-SC-003',
    name: 'High-Torque Socket Cap Screw',
    category: 'Screws & Fasteners',
    material: 'Alloy Steel Class 12.9',
    finish: 'Thermal Black Phosphate / Oiled',
    dimensions: 'M3 to M24 (Drive: Hex Key / Allen)',
    standard: 'ISO 4762 / DIN 912',
    description: 'Ultra-high strength socket head cap screws designed for machine tool assemblies, die sets, and high-vibration power transmissions.',
    image: 'assets/images/prod_screw.jpg',
    tolerances: 'ISO 965 Class 5g6g',
    tensileStrength: '1220 MPa min.',
    cadRef: 'CAD-FX-SC03-REV4'
  },
  {
    id: 'fx-ws-004',
    code: 'FX-WS-004',
    name: 'Heavy Duty Spring Lock Washer',
    category: 'Washers',
    material: 'Spring Steel 65Mn / SS 301',
    finish: 'Zinc Trivalent / Mechanically Plated',
    dimensions: 'Nominal sizes 4mm – 36mm',
    standard: 'DIN 127B / ASME B18.21.1',
    description: 'Hardened split lock washers delivering sustained spring reactive tension to counter bolt loosening caused by vibration and thermal expansion.',
    image: 'assets/images/prod_washer.jpg',
    tolerances: 'DIN 267 Part 26',
    tensileStrength: 'Hardness 44 – 51 HRC',
    cadRef: 'CAD-FX-WS04-REV2'
  },
  {
    id: 'fx-ms-005',
    code: 'FX-MS-005',
    name: 'Precision CNC Machined Shaft',
    category: 'Precision Metal Parts',
    material: 'AISI 4140 Chromoly / 1045 Carbon Steel',
    finish: 'Induction Hardened & Precision Ground',
    dimensions: 'Ø15mm – Ø120mm, Lengths up to 1200mm',
    standard: 'Custom Customer Specification',
    description: 'Precision ground keyed and splined drive shafts with bearing journals machined to micrometer tolerances for industrial gearboxes and robotics.',
    image: 'assets/images/prod_shaft.jpg',
    tolerances: 'Runout ≤ 0.005mm (h6 / g6)',
    tensileStrength: '950 – 1100 MPa',
    cadRef: 'CAD-FX-MS05-REV5'
  },
  {
    id: 'fx-br-006',
    code: 'FX-BR-006',
    name: 'Structural Laser-Cut Bracket',
    category: 'Industrial Brackets',
    material: 'High-Yield Steel S355JR / Corten',
    finish: 'Hot-Dip Galvanized / Powder Coated',
    dimensions: 'Plate thickness 4.0mm – 16.0mm',
    standard: 'EN 10025-2 / ISO 13920',
    description: 'High-tonnage CNC press-brake formed bracketry designed for modular heavy chassis, agricultural equipment, and structural girder connections.',
    image: 'assets/images/prod_bracket.jpg',
    tolerances: '±0.25mm Laser Contour, ±0.5° Bend',
    tensileStrength: 'Yield Strength ≥ 355 MPa',
    cadRef: 'CAD-FX-BR06-REV2'
  },
  {
    id: 'fx-cm-007',
    code: 'FX-CM-007',
    name: 'Custom 5-Axis Milled Manifold',
    category: 'Custom Fabricated Components',
    material: 'Aircraft Aluminum 6061-T6 / Brass CW614N',
    finish: 'Type III Hard Anodized (50µm)',
    dimensions: 'Up to 500mm x 400mm x 350mm envelope',
    standard: 'AS9100 / ISO 2768-mK Equivalent',
    description: 'Intricately ported hydraulic and pneumatic fluid manifolds CNC milled on 5-axis machining centers with pressure-tested sealing ports.',
    image: 'assets/images/cap_custom.jpg',
    tolerances: 'True Position ≤ 0.008mm',
    tensileStrength: '310 MPa Proof Test',
    cadRef: 'CAD-FX-CM07-REV4'
  },
  {
    id: 'fx-br-008',
    code: 'FX-BR-008',
    name: 'Heavy Duty Pillow Block Flange Bracket',
    category: 'Industrial Brackets',
    material: 'Ductile Cast Iron GGG-40 / Cast Steel',
    finish: 'Electrophoretic E-Coat Charcoal',
    dimensions: 'Flange footprint 180mm x 140mm',
    standard: 'ISO 3228 / DIN 736',
    description: 'Rigid vibration-dampening bearing housing brackets engineered for heavy conveyor pulleys, blowers, and crushing plant vibrators.',
    image: 'assets/images/prod_bracket.jpg',
    tolerances: 'Bore H7 (+0.030/-0.000mm)',
    tensileStrength: 'Tensile 400 MPa min.',
    cadRef: 'CAD-FX-BR08-REV1'
  },
  {
    id: 'fx-cs-009',
    code: 'FX-CS-009',
    name: 'Precision Bushing & Sleeve Assembly',
    category: 'Custom Fabricated Components',
    material: 'Phosphor Bronze CuSn8 / Bearing Bronze',
    finish: 'Micro-Finished ID with Oil Grooves',
    dimensions: 'OD 40mm – 160mm, ID Custom',
    standard: 'Custom OEM Drawing',
    description: 'Self-lubricating wear-resistant sliding guide sleeves and bushings tailored for heavy construction hydraulic cylinders and pivot hinges.',
    image: 'assets/images/cap_custom.jpg',
    tolerances: 'Surface Roughness Ra 0.2µm',
    tensileStrength: 'Yield 260 MPa, Hardness 120 HB',
    cadRef: 'CAD-FX-CS09-REV3'
  }
];

function initProductCatalog() {
  const grid = document.querySelector('.products-grid');
  const emptyState = document.querySelector('.products-empty-state');
  const searchInput = document.querySelector('.product-search-input');
  const searchClearBtn = document.querySelector('.search-clear-btn');
  const categoryBtns = document.querySelectorAll('.category-filter-btn');
  const modalOverlay = document.querySelector('#product-modal');
  const modalCloseBtn = modalOverlay ? modalOverlay.querySelector('.modal-close-btn') : null;

  if (!grid) return;

  let activeCategory = 'All';
  let searchQuery = '';

  function renderProducts() {
    const filtered = PRODUCTS_DATA.filter((item) => {
      const matchesCategory = (activeCategory === 'All') || (item.category === activeCategory);
      const matchesSearch = !searchQuery || (
        item.name.toLowerCase().includes(searchQuery) ||
        item.code.toLowerCase().includes(searchQuery) ||
        item.material.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery)
      );
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      grid.style.display = 'grid';
      if (emptyState) emptyState.style.display = 'none';

      grid.innerHTML = filtered.map((p) => `
        <article class="product-card" data-id="${p.id}">
          <div class="product-thumb-wrap">
            <img class="product-thumb-img" src="${p.image}" alt="${p.name} - ${p.code}" loading="lazy" />
            <span class="product-code-pill">${p.code}</span>
            <span class="product-cad-badge">CAD 3D</span>
          </div>
          <div class="product-body">
            <span class="product-category-tag">${p.category}</span>
            <h3 class="product-name">${p.name}</h3>
            <p class="product-desc">${p.description}</p>
            <div class="product-spec-pills">
              <span class="spec-chip">MAT: ${p.material.split('/')[0]}</span>
              <span class="spec-chip">FIN: ${p.finish.split('/')[0]}</span>
            </div>
            <div class="product-actions-bar">
              <button type="button" class="btn btn-secondary btn-sm view-details-btn" data-id="${p.id}">
                VIEW DETAILS
              </button>
              <button type="button" class="btn btn-primary btn-sm request-quote-btn" data-id="${p.id}" data-name="${p.name}" data-code="${p.code}">
                QUOTE ITEM
              </button>
            </div>
          </div>
        </article>
      `).join('');

      // Attach event listeners to buttons
      grid.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          openProductModal(id);
        });
      });

      grid.querySelectorAll('.request-quote-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const name = btn.getAttribute('data-name');
          const code = btn.getAttribute('data-code');
          prefillQuoteForm(`${name} [${code}]`);
        });
      });
    }
  }

  // Initial render
  renderProducts();

  // Category filter handlers
  categoryBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // Reset filters handler
  const resetFiltersBtn = document.querySelector('.reset-filters-btn');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      activeCategory = 'All';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      categoryBtns.forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('.category-filter-btn[data-category="All"]');
      if (allBtn) allBtn.classList.add('active');
      renderProducts();
    });
  }

  // Modal open function
  function openProductModal(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product || !modalOverlay) return;

    const modalBody = modalOverlay.querySelector('.modal-content-wrap');
    modalBody.innerHTML = `
      <div class="product-modal-grid">
        <div class="modal-product-img-wrap">
          <img class="modal-product-img" src="${product.image}" alt="${product.name}" />
          <div class="technical-corner-box"></div>
        </div>
        <div class="modal-product-meta">
          <div class="tech-label">${product.category} // ${product.code}</div>
          <h2 style="font-size: 1.6rem; color: #FFF; margin-bottom: 0.5rem; text-transform: uppercase;">${product.name}</h2>
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-orange); margin-bottom: 1rem;">
            [DRAWING REF: ${product.cadRef}] • <span class="placeholder-pill">SAMPLE SPECIFICATIONS</span>
          </div>
          <p style="font-size: 0.9rem; color: var(--color-silver); line-height: 1.6; margin-bottom: 1rem;">${product.description}</p>
          
          <table class="modal-specs-table">
            <tbody>
              <tr>
                <td>Material Grade</td>
                <td>${product.material}</td>
              </tr>
              <tr>
                <td>Surface Treatment</td>
                <td>${product.finish}</td>
              </tr>
              <tr>
                <td>Manufacturing Standards</td>
                <td>${product.standard}</td>
              </tr>
              <tr>
                <td>Dimensional Range</td>
                <td>${product.dimensions}</td>
              </tr>
              <tr>
                <td>Geometric Tolerance</td>
                <td>${product.tolerances}</td>
              </tr>
              <tr>
                <td>Tensile / Hardness</td>
                <td>${product.tensileStrength}</td>
              </tr>
            </tbody>
          </table>

          <div style="display: flex; gap: 1rem; margin-top: 1.25rem;">
            <button type="button" class="btn btn-primary modal-quote-trigger" data-part="${product.name} [${product.code}]">
              INQUIRE ABOUT THIS PART
            </button>
            <button type="button" class="btn btn-secondary modal-close-trigger">
              CLOSE
            </button>
          </div>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Quote button inside modal
    const quoteBtn = modalBody.querySelector('.modal-quote-trigger');
    if (quoteBtn) {
      quoteBtn.addEventListener('click', () => {
        const partName = quoteBtn.getAttribute('data-part');
        closeProductModal();
        prefillQuoteForm(partName);
      });
    }

    // Close button inside content
    const innerCloseBtn = modalBody.querySelector('.modal-close-trigger');
    if (innerCloseBtn) {
      innerCloseBtn.addEventListener('click', closeProductModal);
    }
  }

  function closeProductModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProductModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProductModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProductModal();
    }
  });
}

// Helper to prefill quote form
function prefillQuoteForm(partString) {
  const productInput = document.querySelector('#quote-product');
  const quoteSection = document.querySelector('#quote');
  if (productInput) {
    productInput.value = partString;
    productInput.classList.add('highlight-prefilled');
    setTimeout(() => productInput.classList.remove('highlight-prefilled'), 1500);
  }
  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: 'smooth' });
    const qtyInput = document.querySelector('#quote-qty');
    if (qtyInput) setTimeout(() => qtyInput.focus(), 600);
  }
}

/* --------------------------------------------------------------------------
   6. CAPABILITIES DETAIL MODAL
   -------------------------------------------------------------------------- */
const CAPABILITIES_DATA = {
  'cnc-machining': {
    title: 'CNC Precision Machining',
    badge: 'CAPABILITY 01 // HIGH PRECISION',
    desc: 'Multi-axis CNC milling, turning, and multi-tasking lathe operations delivering micro-tolerance components across stainless steel, titanium, aerospace aluminum, and engineering alloys.',
    specs: [
      { label: 'Machining Axes', val: '3-Axis, 4-Axis, and Continuous 5-Axis Centers' },
      { label: 'Work Envelope', val: 'Up to 1500mm x 800mm x 700mm (Milling)' },
      { label: 'Turning Diameter', val: 'Ø5mm up to Ø450mm' },
      { label: 'Achievable Tolerance', val: '±0.005mm (5 Microns)' },
      { label: 'Surface Finish', val: 'Ra 0.4µm to Ra 0.2µm ground' },
      { label: 'Metrology', val: 'Bridge CMM & Optical Laser Probes' }
    ]
  },
  'metal-fabrication': {
    title: 'Industrial Metal Fabrication',
    badge: 'CAPABILITY 02 // HEAVY & STRUCTURAL',
    desc: 'End-to-end metal preparation, high-precision fiber laser cutting, high-tonnage CNC bending, robotic TIG/MIG welding, and sub-assembly manufacturing.',
    specs: [
      { label: 'Fiber Laser Cutting', val: '12kW Laser bed 4000mm x 2000mm' },
      { label: 'Max Cutting Thickness', val: 'Mild Steel: 30mm, SS: 25mm, Al: 20mm' },
      { label: 'Bending Capacity', val: '250 Ton 8-Axis CNC Press Brake' },
      { label: 'Welding Standards', val: 'AWS D1.1 / ISO 3834-2 Certified' },
      { label: 'Fabrication Envelope', val: 'Up to 10-ton structural weldments' },
      { label: 'Surface Preparation', val: 'Shot blasting (SA 2.5) & Wet Spray' }
    ]
  },
  'fastener-production': {
    title: 'Precision Fastener Production',
    badge: 'CAPABILITY 03 // COLD FORMING & THREAD ROLLING',
    desc: 'High-speed cold forging, heading, thread rolling, and heat treatment for standard and custom industrial fasteners conforming to DIN, ISO, ASME, and ASTM.',
    specs: [
      { label: 'Forming Process', val: 'Multi-station Cold & Hot Heading' },
      { label: 'Thread Method', val: 'Precision Cylindrical & Flat Die Thread Rolling' },
      { label: 'Diameter Range', val: 'M3 through M48 (1/8” to 2” UNC/UNF)' },
      { label: 'Strength Grades', val: '4.8, 8.8, 10.9, 12.9, ASTM A193 B7' },
      { label: 'Corrosion Finishes', val: 'Geomet, Dacromet, Zinc Flake, Cadmium, Black' },
      { label: 'Batch Volume', val: 'From 500 Prototype units to 500,000+ Production runs' }
    ]
  },
  'custom-components': {
    title: 'Custom Made-To-Print Engineering',
    badge: 'CAPABILITY 04 // ENGINEERED-TO-SPEC',
    desc: 'Turnkey manufacturing of proprietary engineering components from client 2D blueprints, 3D STEP models, or physical reverse-engineering samples.',
    specs: [
      { label: 'CAD/CAM Ingestion', val: 'STEP, IGES, DXF, SolidWorks, CATIA' },
      { label: 'DFM Engineering', val: 'Design-For-Manufacture Cost Optimization' },
      { label: 'Material Sourcing', val: 'Full Mill Test Report (MTR) 3.1 Traceability' },
      { label: 'Prototyping Lead Time', val: 'Rapid sample batches in 5–10 business days' },
      { label: 'Production Scaling', val: 'Pilot lot verification through scheduled mass runs' },
      { label: 'Custom Packaging', val: 'VCI anti-corrosion barrier, kitting & barcoding' }
    ]
  }
};

function initCapabilitiesModals() {
  const cards = document.querySelectorAll('.capability-card');
  const modalOverlay = document.querySelector('#capability-modal');
  if (!modalOverlay) return;
  const modalCloseBtn = modalOverlay.querySelector('.modal-close-btn');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const capKey = card.getAttribute('data-cap');
      const data = CAPABILITIES_DATA[capKey];
      if (!data) return;

      const contentWrap = modalOverlay.querySelector('.modal-content-wrap');
      contentWrap.innerHTML = `
        <div class="tech-label">${data.badge}</div>
        <h2 style="font-size: 1.85rem; color: #FFF; margin-bottom: 0.75rem; text-transform: uppercase;">${data.title}</h2>
        <p style="font-size: 0.95rem; color: var(--color-silver); line-height: 1.6; margin-bottom: 1.5rem;">${data.desc}</p>
        
        <h4 style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-orange); text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 0.08em;">
          ENGINEERING SPECIFICATIONS & CAPACITY:
        </h4>
        
        <table class="modal-specs-table">
          <tbody>
            ${data.specs.map(s => `
              <tr>
                <td>${s.label}</td>
                <td>${s.val}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="display: flex; gap: 1rem; margin-top: 1.75rem;">
          <a href="#quote" class="btn btn-primary cap-modal-rfq-btn">
            DISCUSS PROJECT REQUIREMENTS
          </a>
          <button type="button" class="btn btn-secondary cap-modal-close-btn">
            CLOSE
          </button>
        </div>
      `;

      modalOverlay.classList.add('active');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const rfqBtn = contentWrap.querySelector('.cap-modal-rfq-btn');
      if (rfqBtn) {
        rfqBtn.addEventListener('click', () => {
          modalOverlay.classList.remove('active');
          document.body.style.overflow = '';
        });
      }

      const closeBtn = contentWrap.querySelector('.cap-modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          modalOverlay.classList.remove('active');
          document.body.style.overflow = '';
        });
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* --------------------------------------------------------------------------
   7. DISCOVER OUR STORY MODAL
   -------------------------------------------------------------------------- */
function initStoryModal() {
  const triggerBtn = document.querySelector('.discover-story-trigger');
  const modalOverlay = document.querySelector('#story-modal');
  if (!triggerBtn || !modalOverlay) return;
  const modalCloseBtn = modalOverlay.querySelector('.modal-close-btn');

  function openStory() {
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeStory() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggerBtn.addEventListener('click', openStory);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeStory);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeStory();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeStory();
    }
  });
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE QUOTE REQUEST FORM (VALIDATION & DEMO SUBMISSION)
   -------------------------------------------------------------------------- */
function initQuoteForm() {
  const form = document.querySelector('#rfq-form');
  const clearBtn = document.querySelector('#rfq-clear-btn');
  const fileInput = document.querySelector('#quote-file-input');
  const dropzone = document.querySelector('#quote-dropzone');
  const fileDisplay = document.querySelector('#quote-selected-file');
  const fileNameText = document.querySelector('#quote-filename-text');
  const removeFileBtn = document.querySelector('#quote-remove-file');
  const submitBtn = document.querySelector('#rfq-submit-btn');
  const successModal = document.querySelector('#demo-submit-modal');

  if (!form) return;

  // File Drag & Drop Simulation
  if (dropzone && fileInput) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length) {
        handleFileSelection(files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        handleFileSelection(fileInput.files[0]);
      }
    });
  }

  function handleFileSelection(file) {
    if (fileDisplay && fileNameText) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      fileNameText.textContent = `${file.name} (${sizeMb} MB)`;
      fileDisplay.classList.add('active');
    }
  }

  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (fileInput) fileInput.value = '';
      if (fileDisplay) fileDisplay.classList.remove('active');
    });
  }

  // Clear Form
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      form.reset();
      clearErrors();
      if (fileDisplay) fileDisplay.classList.remove('active');
    });
  }

  // Form Validation & Demo Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Fields
    const nameInput = form.querySelector('#quote-name');
    const companyInput = form.querySelector('#quote-company');
    const emailInput = form.querySelector('#quote-email');
    const phoneInput = form.querySelector('#quote-phone');
    const productInput = form.querySelector('#quote-product');
    const descInput = form.querySelector('#quote-desc');

    // Validation Rules
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please provide your full contact name.');
      isValid = false;
    }

    if (!companyInput.value.trim()) {
      showError(companyInput, 'Please specify your company or organization.');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid business email address.');
      isValid = false;
    }

    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
      showError(phoneInput, 'Please enter a valid phone number (min 7 digits).');
      isValid = false;
    }

    if (!productInput.value.trim()) {
      showError(productInput, 'Please specify the component name or category.');
      isValid = false;
    }

    if (!descInput.value.trim() || descInput.value.trim().length < 10) {
      showError(descInput, 'Please provide project details (minimum 10 characters).');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate submission loading
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner-svg" style="animation: spin 0.8s linear infinite; width: 16px; height: 16px;" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-dasharray="32" stroke-dashoffset="12"/>
        </svg>
        TRANSMITTING INQUIRY...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showSubmissionModal({
          name: nameInput.value.trim(),
          company: companyInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim(),
          product: productInput.value.trim(),
          quantity: form.querySelector('#quote-qty').value.trim() || 'Not specified',
          material: form.querySelector('#quote-material').value || 'Open for recommendation',
          date: form.querySelector('#quote-date').value || 'Standard lead time',
          description: descInput.value.trim(),
          attachment: (fileInput && fileInput.files.length) ? fileInput.files[0].name : 'No file attached'
        });
      }, 700);
    }
  });

  function showError(inputEl, msg) {
    inputEl.classList.add('is-invalid');
    const parent = inputEl.closest('.form-group');
    if (parent) {
      const errorEl = parent.querySelector('.form-error-msg');
      if (errorEl) {
        errorEl.textContent = msg;
        errorEl.classList.add('visible');
      }
    }
  }

  function clearErrors() {
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    form.querySelectorAll('.form-error-msg').forEach(el => el.classList.remove('visible'));
  }

  function showSubmissionModal(payload) {
    if (!successModal) return;
    const body = successModal.querySelector('.modal-content-wrap');
    body.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="width: 56px; height: 56px; background: rgba(255, 107, 53, 0.15); border: 2px solid var(--color-orange); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: var(--color-orange);">
          <svg style="width: 28px; height: 28px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <div class="tech-label">RFQ PROTOCOL VERIFIED // FRONTEND DEMO CONFIRMATION</div>
        <h2 style="font-size: 1.6rem; color: #FFF; text-transform: uppercase;">Inquiry Summary Generated</h2>
        <p style="font-size: 0.88rem; color: var(--color-silver); margin-top: 0.5rem; max-width: 580px; margin-left: auto; margin-right: auto;">
          <strong>Notice:</strong> This is a standalone frontend prototype. No data has been dispatched to external servers. Below is the validated inquiry payload structured for backend / API ingestion:
        </p>
      </div>

      <div class="demo-summary-box">
        <div style="color: var(--color-orange); margin-bottom: 6px; font-weight: 700;">// INQUIRY PAYLOAD DATA [JSON READY]</div>
        <div><strong>Name:</strong> ${payload.name}</div>
        <div><strong>Company:</strong> ${payload.company}</div>
        <div><strong>Email:</strong> ${payload.email}</div>
        <div><strong>Phone:</strong> ${payload.phone}</div>
        <div><strong>Component:</strong> ${payload.product}</div>
        <div><strong>Est. Quantity:</strong> ${payload.quantity}</div>
        <div><strong>Material Preference:</strong> ${payload.material}</div>
        <div><strong>Target Date:</strong> ${payload.date}</div>
        <div><strong>Attachment:</strong> ${payload.attachment}</div>
        <div><strong>Notes:</strong> ${payload.description}</div>
      </div>

      <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
        <button type="button" class="btn btn-primary" id="copy-payload-btn">
          COPY JSON TO CLIPBOARD
        </button>
        <button type="button" class="btn btn-secondary" id="close-summary-btn">
          CLOSE PREVIEW
        </button>
      </div>
    `;

    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const copyBtn = body.querySelector('#copy-payload-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(() => {
          copyBtn.textContent = 'COPIED TO CLIPBOARD!';
          setTimeout(() => { copyBtn.textContent = 'COPY JSON TO CLIPBOARD'; }, 2000);
        });
      });
    }

    const closeBtn = body.querySelector('#close-summary-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    const modalClose = successModal.querySelector('.modal-close-btn');
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }
}

/* --------------------------------------------------------------------------
   9. CONTACT ACTION BUTTONS
   -------------------------------------------------------------------------- */
function initContactActions() {
  const actionBtns = document.querySelectorAll('.contact-action-btn');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const actionType = btn.getAttribute('data-action');
      let msg = '';
      if (actionType === 'call') {
        msg = 'Phone Placeholder: In a production deployment, this triggers a direct telecommunications link to +1 (800) 555-FORGEX once verified company credentials are configured.';
      } else if (actionType === 'email') {
        msg = 'Email Placeholder: In production, this opens your mail client addressed to inquiries@forgex-industries.com once verified.';
      } else if (actionType === 'map') {
        msg = 'Navigation Placeholder: In production, this opens Google Maps navigation coordinates to the manufacturing plant campus.';
      }
      alert(msg);
    });
  });
}

/* --------------------------------------------------------------------------
   10. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   11. DYNAMIC FOOTER COPYRIGHT YEAR
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearEl = document.querySelector('#current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   12. INTERACTIVE STORYTELLING MODE ENGINE
   -------------------------------------------------------------------------- */
function initStorytellingMode() {
  const storyChapters = [
    {
      id: 0,
      title: 'Chapter 1: The Raw Ingot & Genesis',
      shortTitle: '01 // Alloy Genesis',
      badge: 'CHAPTER 01 // GENESIS',
      sectionId: 'about',
      heading: 'Certified Aerospace Metallurgy',
      narrative: 'Every machine that powers modern civilization starts with raw alloy stock. At FORGEX, certified aerospace 4140, 316 stainless, and titanium billets undergo optical spectrometer verification before ever meeting a cutting tool.',
      metric: '100% MTR Traceability',
      unit: 'Raw Ingot Bay 01',
      speech: 'Chapter One. Alloy Genesis. Every component starts with certified aerospace and industrial metallurgy, verified before cutting for complete traceability.'
    },
    {
      id: 1,
      title: 'Chapter 2: Sub-Micron 5-Axis Machining',
      shortTitle: '02 // CNC Milling',
      badge: 'CHAPTER 02 // CNC MACHINING',
      sectionId: 'capabilities',
      heading: '5-Axis Precision Sculpting',
      narrative: 'Continuous 5-axis CNC machining centers sculpt complex geometries in single setups. Delivering micro-tolerances down to ±0.005mm and mirror surface finishes down to Ra 0.2µm for mission-critical assemblies.',
      metric: '±0.005mm Tolerance',
      unit: 'Milling Cell Alpha',
      speech: 'Chapter Two. Sub-Micron 5-Axis Machining. Multi-axis CNC centers sculpt intricate geometries with five-micron precision and mirror surface finishes.'
    },
    {
      id: 2,
      title: 'Chapter 3: Cold Forged Fasteners',
      shortTitle: '03 // Fastener Fleet',
      badge: 'CHAPTER 03 // HIGH-TENSILE FASTENERS',
      sectionId: 'products',
      heading: 'High-Torque Fastener Integrity',
      narrative: 'Multi-station cold forming lines preserve continuous metallurgical grain flow in fasteners. Rated up to 1040 MPa tensile strength, engineered for extreme vibrations in maritime and heavy energy infrastructure.',
      metric: '1040 MPa Tensile',
      unit: 'Heading Fleet 03',
      speech: 'Chapter Three. Cold Forged Fasteners. Cold-formed metric and imperial bolts engineered for supreme structural strength in harsh operating environments.'
    },
    {
      id: 3,
      title: 'Chapter 4: Zeiss CMM Zero-Defect Metrology',
      shortTitle: '04 // Metrology QA',
      badge: 'CHAPTER 04 // ZERO-DEFECT QA',
      sectionId: 'quality',
      heading: 'Zero-Tolerance Verification',
      narrative: 'Climate-controlled optical metrology cleanrooms equipped with Zeiss Bridge CMMs verify 100% drawing compliance. Full PPAP Level 3 documentation and digital batch heat-treat certificates accompanying every dispatch.',
      metric: 'Zeiss Bridge CMM (0.1µm)',
      unit: 'Metrology Clean Lab',
      speech: 'Chapter Four. Zero-Defect Metrology. Climate-controlled inspection laboratories ensure absolute drawing compliance with full PPAP Level 3 documentation.'
    },
    {
      id: 4,
      title: 'Chapter 5: Rapid Ingestion & Turnkey RFQ',
      shortTitle: '05 // RFQ & Dispatch',
      badge: 'CHAPTER 05 // LOGISTICS & RFQ',
      sectionId: 'quote',
      heading: 'Blueprint To Component',
      narrative: 'Submit your 3D CAD models (STEP, IGES) or 2D technical drawings for automated DFM evaluation. Receive engineer-reviewed quotes within 24 hours and expedited pilot production within 5–10 business days.',
      metric: '24-Hour RFQ Turnaround',
      unit: 'Engineering Dispatch',
      speech: 'Chapter Five. Rapid Ingestion and Turnkey RFQ. Submit your CAD models or prints for rapid design evaluation and expedited component dispatch.'
    }
  ];

  let currentChapterIndex = 0;
  let isStoryActive = false;
  let isAutoPlaying = true;
  let isAudioEnabled = true;
  let autoPlayTimer = null;
  const CHAPTER_DURATION = 9000;

  // DOM Elements
  const hud = document.querySelector('#story-hud');
  const narrativeCard = document.querySelector('#story-narrative-card');
  const navToggleBtn = document.querySelector('#story-mode-toggle');
  const navBadge = document.querySelector('#nav-story-badge');
  const mobileQuickBtn = document.querySelector('#mobile-quick-story-btn');
  const heroLaunchBtn = document.querySelector('#hero-story-launch-btn');
  const dockStoryBtn = document.querySelector('#mobile-dock-story-btn');

  const hudTitle = document.querySelector('#story-chapter-title');
  const hudProgressFill = document.querySelector('#story-progress-fill');
  const stepDots = document.querySelectorAll('.story-step-dot');
  const prevBtn = document.querySelector('#story-prev-btn');
  const nextBtn = document.querySelector('#story-next-btn');
  const autoPlayBtn = document.querySelector('#story-autoplay-btn');
  const audioBtn = document.querySelector('#story-audio-btn');
  const exitBtn = document.querySelector('#story-exit-btn');

  // Narrative Card Elements
  const cardBadge = document.querySelector('#story-card-badge');
  const cardHeading = document.querySelector('#story-card-heading');
  const cardNarrative = document.querySelector('#story-card-narrative');
  const cardMetric = document.querySelector('#story-card-metric');
  const cardUnit = document.querySelector('#story-card-unit');
  const cardMinBtn = document.querySelector('#story-card-min-btn');
  const cardJumpNextBtn = document.querySelector('#story-jump-next-btn');

  // Web Audio Synthesizer for high-tech industrial feedback
  let audioCtx = null;
  function playIndustrialChime(frequencyMultiplier = 1) {
    if (!isAudioEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const now = audioCtx.currentTime;
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      const baseFreq = 520 * frequencyMultiplier;
      osc1.frequency.setValueAtTime(baseFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);

      osc2.frequency.setValueAtTime(baseFreq * 2, now);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 0.75, now + 0.25);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.36);
      osc2.stop(now + 0.36);
    } catch (err) {
      // AudioContext graceful fallback
    }
  }

  // SpeechSynthesis voice narration
  function speakChapter(text) {
    if (!isAudioEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.02;
      utterance.pitch = 0.95;
      utterance.volume = 0.85;
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Male')));
      if (englishVoice) utterance.voice = englishVoice;
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }

  function startStoryMode(initialChapter = 0) {
    isStoryActive = true;
    currentChapterIndex = initialChapter;
    if (hud) hud.classList.add('active');
    if (narrativeCard) narrativeCard.classList.add('active');

    if (navToggleBtn) {
      navToggleBtn.classList.add('active');
      if (navBadge) navBadge.textContent = 'LIVE';
    }
    if (mobileQuickBtn) mobileQuickBtn.classList.add('active');
    if (dockStoryBtn) dockStoryBtn.classList.add('active');

    goToChapter(currentChapterIndex);
    if (isAutoPlaying) {
      startAutoPlayTimer();
    }
  }

  function exitStoryMode() {
    isStoryActive = false;
    clearTimeout(autoPlayTimer);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    if (hud) hud.classList.remove('active');
    if (narrativeCard) narrativeCard.classList.remove('active');

    if (navToggleBtn) {
      navToggleBtn.classList.remove('active');
      if (navBadge) navBadge.textContent = 'OFF';
    }
    if (mobileQuickBtn) mobileQuickBtn.classList.remove('active');
    if (dockStoryBtn) dockStoryBtn.classList.remove('active');

    document.querySelectorAll('.story-step-section').forEach(sec => sec.classList.remove('story-active-step'));
  }

  function toggleStoryMode() {
    if (isStoryActive) {
      exitStoryMode();
    } else {
      startStoryMode(0);
    }
  }

  function goToChapter(index) {
    if (index < 0) index = 0;
    if (index >= storyChapters.length) index = storyChapters.length - 1;
    currentChapterIndex = index;
    const chapter = storyChapters[currentChapterIndex];

    playIndustrialChime(1 + (index * 0.15));
    speakChapter(chapter.speech);

    if (hudTitle) hudTitle.textContent = chapter.title;
    const progressPercent = ((currentChapterIndex + 1) / storyChapters.length) * 100;
    if (hudProgressFill) hudProgressFill.style.width = `${progressPercent}%`;

    stepDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentChapterIndex);
    });

    if (cardBadge) cardBadge.textContent = chapter.badge;
    if (cardHeading) cardHeading.textContent = chapter.heading;
    if (cardNarrative) cardNarrative.textContent = chapter.narrative;
    if (cardMetric) cardMetric.textContent = chapter.metric;
    if (cardUnit) cardUnit.textContent = chapter.unit;

    document.querySelectorAll('.story-step-section').forEach(sec => sec.classList.remove('story-active-step'));
    const targetSection = document.getElementById(chapter.sectionId);
    if (targetSection) {
      targetSection.classList.add('story-active-step');
      const headerOffset = 90;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    if (isAutoPlaying) {
      startAutoPlayTimer();
    }
  }

  function startAutoPlayTimer() {
    clearTimeout(autoPlayTimer);
    if (!isAutoPlaying || !isStoryActive) return;

    autoPlayTimer = setTimeout(() => {
      if (!isStoryActive || !isAutoPlaying) return;
      if (currentChapterIndex < storyChapters.length - 1) {
        goToChapter(currentChapterIndex + 1);
      } else {
        goToChapter(0);
      }
    }, CHAPTER_DURATION);
  }

  function toggleAutoPlay() {
    isAutoPlaying = !isAutoPlaying;
    const pauseIcon = autoPlayBtn?.querySelector('.icon-pause');
    const playIcon = autoPlayBtn?.querySelector('.icon-play');
    if (isAutoPlaying) {
      if (pauseIcon) pauseIcon.style.display = 'block';
      if (playIcon) playIcon.style.display = 'none';
      startAutoPlayTimer();
    } else {
      clearTimeout(autoPlayTimer);
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (playIcon) playIcon.style.display = 'block';
    }
  }

  function toggleAudio() {
    isAudioEnabled = !isAudioEnabled;
    const soundOn = audioBtn?.querySelector('.icon-sound-on');
    const soundOff = audioBtn?.querySelector('.icon-sound-off');
    if (isAudioEnabled) {
      if (soundOn) soundOn.style.display = 'block';
      if (soundOff) soundOff.style.display = 'none';
      playIndustrialChime(1.2);
    } else {
      if (soundOn) soundOn.style.display = 'none';
      if (soundOff) soundOff.style.display = 'block';
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  }

  if (navToggleBtn) navToggleBtn.addEventListener('click', toggleStoryMode);
  if (mobileQuickBtn) mobileQuickBtn.addEventListener('click', toggleStoryMode);
  if (heroLaunchBtn) heroLaunchBtn.addEventListener('click', () => startStoryMode(0));
  if (dockStoryBtn) dockStoryBtn.addEventListener('click', toggleStoryMode);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToChapter(currentChapterIndex > 0 ? currentChapterIndex - 1 : storyChapters.length - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToChapter((currentChapterIndex + 1) % storyChapters.length);
    });
  }

  if (cardJumpNextBtn) {
    cardJumpNextBtn.addEventListener('click', () => {
      goToChapter((currentChapterIndex + 1) % storyChapters.length);
    });
  }

  if (autoPlayBtn) autoPlayBtn.addEventListener('click', toggleAutoPlay);
  if (audioBtn) audioBtn.addEventListener('click', toggleAudio);
  if (exitBtn) exitBtn.addEventListener('click', exitStoryMode);

  if (cardMinBtn && narrativeCard) {
    cardMinBtn.addEventListener('click', () => {
      narrativeCard.classList.toggle('minimized');
    });
  }

  stepDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goToChapter(idx));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isStoryActive) {
      exitStoryMode();
    }
  });
}

/* --------------------------------------------------------------------------
   13. GLASSMORPHIC MOBILE BOTTOM NAVIGATION DOCK
   -------------------------------------------------------------------------- */
function initMobileBottomDock() {
  const dock = document.querySelector('.mobile-bottom-dock');
  const dockItems = document.querySelectorAll('.mobile-dock-item[data-dock]');
  if (!dock) return;

  const sectionIds = ['home', 'capabilities', 'products', 'quote'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  function updateActiveDock() {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    let currentId = 'home';

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.id;
      }
    });

    dockItems.forEach(item => {
      if (item.getAttribute('data-dock') === currentId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveDock, { passive: true });
  updateActiveDock();

  dockItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetHref = item.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        const targetEl = document.querySelector(targetHref);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 64;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
      if ('vibrate' in navigator) {
        try { navigator.vibrate(12); } catch (err) {}
      }
    });
  });
}

/* --------------------------------------------------------------------------
   14. MOBILE VIEWPORT HEIGHT FIX & SCROLL TUNING
   -------------------------------------------------------------------------- */
function initMobileViewport() {
  function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);
}

