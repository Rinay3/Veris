/* ============================================================
   VÉRIS DIAMONDS — Master Product Catalog
   Single Source of Truth for Catalog, Search, PDP, and Cart
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: 'The Aura Ring',
    sub: '2.5 CT CVD Solitaire',
    cat: 'rings',
    tag: 'Solitaire',
    badge: 'Bestseller',
    price: 2400,
    metals: ['18K Yellow Gold', '18K White Gold', '18K Rose Gold', 'Platinum'],
    carats: [
      { label: '1.5 CT', value: 1.5, bucket: '1-2', price: 1850 },
      { label: '2.0 CT', value: 2.0, bucket: '1-2', price: 2150 },
      { label: '2.5 CT', value: 2.5, bucket: '2-3', price: 2400 },
      { label: '3.0 CT', value: 3.0, bucket: '2-3', price: 3100 },
      { label: '4.0 CT', value: 4.0, bucket: 'over-3', price: 4200 }
    ],
    defaultCarat: 2.5,
    shapes: ['round', 'oval', 'cushion'],
    primaryShape: 'round',
    rating: 4.9,
    reviewsCount: 38,
    img: 'assets/aura-ring.jpg',
    images: [
      'assets/aura-ring.jpg',
      'assets/banner-rings.jpg',
      'assets/diamond-inspection.jpg'
    ],
    href: 'product.html?id=1',
    description: 'An architectural four-prong solitaire celebrating pure refraction. Crafted with an optically pristine Type IIa CVD diamond grown in Surat, India. Every angle is hand-finished with knife-edge shank precision.',
    specs: {
      type: 'Type IIa CVD Lab-Grown',
      certification: 'IGI Certified Diamond',
      cut: 'Ideal / Excellent',
      color: 'E–F (Colorless)',
      clarity: 'VVS2–VS1',
      setting: 'Four-Prong Architectural Cathedral',
      origin: 'Surat Atelier, Gujarat'
    }
  },
  {
    id: 2,
    name: 'Eternal Strand',
    sub: '5.0 CT Tennis Bracelet',
    cat: 'bracelets',
    tag: 'Bracelet',
    badge: 'Iconic',
    price: 4850,
    metals: ['18K White Gold', '18K Yellow Gold', 'Platinum'],
    carats: [
      { label: '3.0 CT', value: 3.0, bucket: '2-3', price: 3400 },
      { label: '5.0 CT', value: 5.0, bucket: 'over-3', price: 4850 },
      { label: '7.0 CT', value: 7.0, bucket: 'over-3', price: 6200 }
    ],
    defaultCarat: 5.0,
    shapes: ['round'],
    primaryShape: 'round',
    rating: 5.0,
    reviewsCount: 24,
    img: 'assets/eternal-strand.jpg',
    images: [
      'assets/eternal-strand.jpg',
      'assets/banner-bracelets.jpg',
      'assets/soleil-bangle.jpg'
    ],
    href: 'product.html?id=2',
    description: 'Fifty-two calibrated round brilliant lab-grown diamonds set in low-profile four-prong basket links. Features an integrated safety box clasp engineered for daily wearing and seamless fluid movement.',
    specs: {
      type: 'Type IIa CVD Lab-Grown',
      certification: 'IGI Certified Diamond Suite',
      cut: 'Excellent Symmetry',
      color: 'E–F (Colorless)',
      clarity: 'VS1',
      setting: 'Articulated Four-Prong Box Clasp',
      origin: 'Surat Atelier, Gujarat'
    }
  },
  {
    id: 3,
    name: 'Lumière Pendant',
    sub: '1.0 CT Halo Drop',
    cat: 'necklaces',
    tag: 'Pendant',
    badge: 'Popular',
    price: 1150,
    metals: ['18K Yellow Gold', '18K White Gold', '18K Rose Gold'],
    carats: [
      { label: '0.75 CT', value: 0.75, bucket: 'under-1', price: 920 },
      { label: '1.0 CT', value: 1.0, bucket: '1-2', price: 1150 },
      { label: '1.5 CT', value: 1.5, bucket: '1-2', price: 1550 }
    ],
    defaultCarat: 1.0,
    shapes: ['round', 'oval'],
    primaryShape: 'round',
    rating: 4.8,
    reviewsCount: 19,
    img: 'assets/lumiere-pendant.jpg',
    images: [
      'assets/lumiere-pendant.jpg',
      'assets/banner-pendants.jpg',
      'assets/verve-choker.jpg'
    ],
    href: 'product.html?id=3',
    description: 'Suspended like a dewdrop of crystallized light. A 1.0 CT brilliant-cut center surrounded by micro-pavé halo refraction. Comes with an adjustable 16-18 inch delicate diamond-cut cable chain.',
    specs: {
      type: 'Type IIa CVD Lab-Grown',
      certification: 'IGI Certified Diamond',
      cut: 'Very Good to Excellent',
      color: 'F (Colorless)',
      clarity: 'VS1',
      setting: 'Micro-Pavé Halo Pendant',
      origin: 'Surat Atelier, Gujarat'
    }
  },
  {
    id: 4,
    name: 'Stella Studs',
    sub: '2.0 CT TW Round Cut',
    cat: 'earrings',
    tag: 'Earrings',
    badge: 'Essential',
    price: 1800,
    metals: ['18K White Gold', '18K Yellow Gold', 'Platinum'],
    carats: [
      { label: '1.0 CT TW', value: 1.0, bucket: '1-2', price: 1100 },
      { label: '2.0 CT TW', value: 2.0, bucket: '1-2', price: 1800 },
      { label: '3.0 CT TW', value: 3.0, bucket: '2-3', price: 2650 }
    ],
    defaultCarat: 2.0,
    shapes: ['round'],
    primaryShape: 'round',
    rating: 4.9,
    reviewsCount: 42,
    img: 'assets/stella-studs.jpg',
    images: [
      'assets/stella-studs.jpg',
      'assets/orion-hoops.jpg',
      'assets/cascade-drop.jpg'
    ],
    href: 'product.html?id=4',
    description: 'The definitive daily luxury. A matched pair of 1.0 CT each CVD diamonds mounted in low-basket martini three-prong mountings that sit flush against the earlobe. Secured with screw-back closures.',
    specs: {
      type: 'Type IIa CVD Lab-Grown Pair',
      certification: 'Dual IGI Certificates',
      cut: 'Hearts & Arrows Ideal Cut',
      color: 'E–F (Colorless)',
      clarity: 'VVS2',
      setting: 'Three-Prong Martini Setting',
      origin: 'Surat Atelier, Gujarat'
    }
  },
  {
    id: 5,
    name: 'Soleil Bangle',
    sub: '3.2 CT Pavé Eternity',
    cat: 'bracelets',
    tag: 'NEW',
    badge: 'New',
    price: 3200,
    metals: ['18K Yellow Gold', '18K White Gold', '18K Rose Gold'],
    carats: [
      { label: '2.5 CT', value: 2.5, bucket: '2-3', price: 2750 },
      { label: '3.2 CT', value: 3.2, bucket: 'over-3', price: 3200 },
      { label: '4.5 CT', value: 4.5, bucket: 'over-3', price: 4100 }
    ],
    defaultCarat: 3.2,
    shapes: ['round'],
    primaryShape: 'round',
    rating: 4.7,
    reviewsCount: 11,
    img: 'assets/soleil-bangle.jpg',
    images: [
      'assets/soleil-bangle.jpg',
      'assets/banner-bracelets.jpg',
      'assets/eternal-strand.jpg'
    ],
    href: 'product.html?id=5',
    description: 'A structural oval hinged bangle channel-paved with scintillating brilliant-cut lab diamonds. Contoured for natural wrist ergonomics with a satisfying tactile click closure.',
    specs: {
      type: 'Type IIa CVD Lab-Grown',
      certification: 'IGI Certified Diamond Suite',
      cut: 'Brilliant Pavé',
      color: 'F',
      clarity: 'VS1',
      setting: 'Micro-Channel Pavé Hinged Bangle',
      origin: 'Surat Atelier, Gujarat'
    }
  },
  {
    id: 6,
    name: 'Arc Cuff',
    sub: '1.8 CT Geometric Halo',
    cat: 'rings',
    tag: 'Ring',
    badge: 'Architectural',
    price: 2100,
    metals: ['18K White Gold', '18K Yellow Gold', 'Platinum'],
    carats: [
      { label: '1.2 CT', value: 1.2, bucket: '1-2', price: 1650 },
      { label: '1.8 CT', value: 1.8, bucket: '1-2', price: 2100 },
      { label: '2.4 CT', value: 2.4, bucket: '2-3', price: 2800 }
    ],
    defaultCarat: 1.8,
    shapes: ['princess', 'round'],
    primaryShape: 'princess',
    rating: 4.8,
    reviewsCount: 16,
    img: 'assets/arc-cuff.jpg',
    images: [
      'assets/arc-cuff.jpg',
      'assets/sovereign-signet.jpg',
      'assets/banner-rings.jpg'
    ],
    href: 'product.html?id=6',
    description: 'Drawing inspiration from brutalist geometry and clean architectural cantilevers. A bezel-set square princess cut suspended between open parallel gold arcs.',
    specs: {
      type: 'Type IIa CVD Lab-Grown',
      certification: 'IGI Certified',
      cut: 'Princess Brilliant',
      color: 'E',
      clarity: 'VVS2',
      setting: 'Tension Arc Setting',
      origin: 'Surat Atelier, Gujarat'
    }
  },
  {
    id: 7,
    name: 'Cascade Drop',
    sub: '1.5 CT Waterfall Earrings',
    cat: 'earrings',
    tag: 'Earrings',
    badge: 'Editorial',
    price: 1650,
    metals: ['18K White Gold', '18K Yellow Gold'],
    carats: [
      { label: '1.0 CT', value: 1.0, bucket: '1-2', price: 1250 },
      { label: '1.5 CT', value: 1.5, bucket: '1-2', price: 1650 },
      { label: '2.2 CT', value: 2.2, bucket: '2-3', price: 2350 }
    ],
    defaultCarat: 1.5,
    shapes: ['round', 'oval'],
    primaryShape: 'oval',
    rating: 4.7,
    reviewsCount: 14,
    img: 'assets/cascade-drop.jpg',
    images: [
      'assets/cascade-drop.jpg',
      'assets/stella-studs.jpg',
      'assets/orion-hoops.jpg'
    ],
    href: 'product.html?id=7',
    description: 'Graceful graduated cascade of bezel-set CVD diamonds that catch light with every head movement. Featherweight construction engineered for evening comfort.',
    specs: {
      type: 'Type IIa CVD Lab-Grown',
      certification: 'IGI Certified Suite',
      cut: 'Graduated Brilliant',
      color: 'E–F',
      clarity: 'VS1',
      setting: 'Articulated Drop Links',
      origin: 'Surat Atelier, Gujarat'
    }
  },
  {
    id: 8,
    name: 'Apex Solitaire',
    sub: '3.0 CT Princess Cut',
    cat: 'rings',
    tag: 'Solitaire',
    badge: 'Signature',
    price: 3800,
    metals: ['Platinum', '18K White Gold', '18K Yellow Gold'],
    carats: [
      { label: '2.0 CT', value: 2.0, bucket: '1-2', price: 2600 },
      { label: '3.0 CT', value: 3.0, bucket: '2-3', price: 3800 },
      { label: '4.0 CT', value: 4.0, bucket: 'over-3', price: 5100 }
    ],
    defaultCarat: 3.0,
    shapes: ['princess'],
    primaryShape: 'princess',
    rating: 5.0,
    reviewsCount: 29,
    img: 'assets/apex-solitaire.jpg',
    images: [
      'assets/apex-solitaire.jpg',
      'assets/aura-ring.jpg',
      'assets/banner-rings.jpg'
    ],
    href: 'product.html?id=8',
    description: 'A monument to modern geometry. Sharp 90-degree chevron prongs embrace an immaculate 3.0 CT square princess cut CVD diamond with razor-sharp light return.',
    specs: {
      type: 'Type IIa CVD Lab-Grown',
      certification: 'IGI Certified Diamond',
      cut: 'Princess Ideal Cut',
      color: 'D–E (Exceptional White)',
      clarity: 'VVS1',
      setting: 'V-Prong Architectural Cathedral',
      origin: 'Surat Atelier, Gujarat'
    }
  },
  {
    id: 9,
    name: 'Verve Choker',
    sub: '4.0 CT Pavé Collar',
    cat: 'necklaces',
    tag: 'Pendant',
    badge: 'Statement',
    price: 2850,
    metals: ['18K Yellow Gold', '18K White Gold', '18K Rose Gold'],
    carats: [
      { label: '2.5 CT', value: 2.5, bucket: '2-3', price: 2100 },
      { label: '4.0 CT', value: 4.0, bucket: 'over-3', price: 2850 },
      { label: '5.5 CT', value: 5.5, bucket: 'over-3', price: 3800 }
    ],
    defaultCarat: 4.0,
    shapes: ['round'],
    primaryShape: 'round',
    rating: 4.9,
    reviewsCount: 22,
    img: 'assets/verve-choker.jpg',
    images: [
      'assets/verve-choker.jpg',
      'assets/banner-pendants.jpg',
      'assets/lumiere-pendant.jpg'
    ],
    href: 'product.html?id=9',
    description: 'Contemporary sleek collar choker set with rows of brilliant-cut pavé diamonds. Designed to frame the neck with an unbroken ribbon of architectural brilliance.',
    specs: {
      type: 'Type IIa CVD Lab-Grown',
      certification: 'IGI Certified Diamond Suite',
      cut: 'Brilliant Pavé',
      color: 'F (Colorless)',
      clarity: 'VS1',
      setting: 'Pavé Collar Choker',
      origin: 'Surat Atelier, Gujarat'
    }
  },
  {
    id: 10,
    name: 'Orion Hoops',
    sub: '2.8 CT Inside-Out Hoops',
    cat: 'earrings',
    tag: 'Earrings',
    badge: 'Trending',
    price: 1890,
    metals: ['18K White Gold', '18K Yellow Gold'],
    carats: [
      { label: '1.5 CT TW', value: 1.5, bucket: '1-2', price: 1390 },
      { label: '2.8 CT TW', value: 2.8, bucket: '2-3', price: 1890 },
      { label: '4.0 CT TW', value: 4.0, bucket: 'over-3', price: 2650 }
    ],
    defaultCarat: 2.8,
    shapes: ['round'],
    primaryShape: 'round',
    rating: 4.9,
    reviewsCount: 31,
    img: 'assets/orion-hoops.jpg',
    images: [
      'assets/orion-hoops.jpg',
      'assets/stella-studs.jpg',
      'assets/cascade-drop.jpg'
    ],
    href: 'product.html?id=10',
    description: 'Inside-out diamond hoops designed so brilliant facets face forward from every angle. 22mm diameter offers balanced proportion between daily wear and gala statements.',
    specs: {
      type: 'Type IIa CVD Lab-Grown Suite',
      certification: 'IGI Certified',
      cut: 'Round Micro-Pavé',
      color: 'E–F',
      clarity: 'VS1',
      setting: 'Inside-Out Prong Shared Basket',
      origin: 'Surat Atelier, Gujarat'
    }
  },
  {
    id: 11,
    name: 'Sovereign Signet',
    sub: '2.2 CT Emerald Cut',
    cat: 'rings',
    tag: 'Ring',
    badge: 'Iconic',
    price: 3100,
    metals: ['18K Yellow Gold', 'Platinum'],
    carats: [
      { label: '1.5 CT', value: 1.5, bucket: '1-2', price: 2400 },
      { label: '2.2 CT', value: 2.2, bucket: '2-3', price: 3100 },
      { label: '3.5 CT', value: 3.5, bucket: 'over-3', price: 4400 }
    ],
    defaultCarat: 2.2,
    shapes: ['emerald'],
    primaryShape: 'emerald',
    rating: 5.0,
    reviewsCount: 18,
    img: 'assets/sovereign-signet.jpg',
    images: [
      'assets/sovereign-signet.jpg',
      'assets/arc-cuff.jpg',
      'assets/banner-rings.jpg'
    ],
    href: 'product.html?id=11',
    description: 'A modern unisex statement piece. A substantial 2.2 CT emerald-cut lab diamond flush-mounted into a heavy brushed satin gold signet band with beveled edges.',
    specs: {
      type: 'Type IIa CVD Lab-Grown',
      certification: 'IGI Master Certificate',
      cut: 'Emerald Step Cut',
      color: 'D–E',
      clarity: 'VVS1',
      setting: 'Flush Bevel Signet Setting',
      origin: 'Surat Atelier, Gujarat'
    }
  },
  {
    id: 12,
    name: 'Elysian Band',
    sub: '1.2 CT Curved Contour',
    cat: 'rings',
    tag: 'Ring',
    badge: 'Artisanal',
    price: 1750,
    metals: ['18K Rose Gold', '18K Yellow Gold', '18K White Gold', 'Platinum'],
    carats: [
      { label: '0.8 CT', value: 0.8, bucket: 'under-1', price: 1350 },
      { label: '1.2 CT', value: 1.2, bucket: '1-2', price: 1750 },
      { label: '1.8 CT', value: 1.8, bucket: '1-2', price: 2300 }
    ],
    defaultCarat: 1.2,
    shapes: ['round'],
    primaryShape: 'round',
    rating: 4.8,
    reviewsCount: 15,
    img: 'assets/elysian-band.jpg',
    images: [
      'assets/elysian-band.jpg',
      'assets/aura-ring.jpg',
      'assets/banner-rings.jpg'
    ],
    href: 'product.html?id=12',
    description: 'A sculptural curved chevron eternity band set with brilliant micro-pavé lab diamonds. Contoured to nestle flush against any solitaire engagement ring.',
    specs: {
      type: 'Type IIa CVD Lab-Grown',
      certification: 'IGI Certified Diamond Suite',
      cut: 'Round Brilliant Pavé',
      color: 'F',
      clarity: 'VS1',
      setting: 'Contour Pavé Chevron',
      origin: 'Surat Atelier, Gujarat'
    }
  }
];

// Helper functions for easy lookup
function getProductById(id) {
  const numId = parseInt(id, 10);
  return PRODUCTS.find(p => p.id === numId) || PRODUCTS[0];
}

if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
  window.getProductById = getProductById;
}
