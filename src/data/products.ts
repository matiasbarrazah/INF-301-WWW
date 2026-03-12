import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ── Rolls ──────────────────────────────────────────────
  {
    id: 1,
    name: 'California Roll',
    description: 'Cangrejo, aguacate y pepino envuelto en nori y arroz.',
    price: 4990,
    category: 'rolls',
    image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80',
    available: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Spicy Tuna Roll',
    description: 'Atún fresco con mayonesa picante y pepino crocante.',
    price: 5490,
    category: 'rolls',
    image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80',
    available: true,
  },
  {
    id: 3,
    name: 'Dragon Roll',
    description: 'Camarón tempura cubierto con láminas de aguacate y salsa eel.',
    price: 6490,
    category: 'rolls',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&q=80',
    available: true,
    featured: true,
  },
  {
    id: 4,
    name: 'Rainbow Roll',
    description: 'California roll cubierto con variedad de pescados y mariscos.',
    price: 6990,
    category: 'rolls',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    available: false,
  },

  // ── Nigiris ────────────────────────────────────────────
  {
    id: 5,
    name: 'Nigiri Salmón',
    description: 'Arroz prensado con lámina de salmón fresco.',
    price: 2490,
    category: 'nigiris',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&q=80',
    available: true,
    featured: true,
  },
  {
    id: 6,
    name: 'Nigiri Atún',
    description: 'Arroz prensado con lámina de atún rojo fresco.',
    price: 2990,
    category: 'nigiris',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&q=80',
    available: true,
  },

  // ── Temakis ────────────────────────────────────────────
  {
    id: 7,
    name: 'Temaki Salmón',
    description: 'Cono de alga nori relleno de salmón, arroz y aguacate.',
    price: 3990,
    category: 'temakis',
    image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80',
    available: true,
  },
  {
    id: 8,
    name: 'Temaki Camarón',
    description: 'Cono de alga nori con camarón tempura y mayonesa.',
    price: 4290,
    category: 'temakis',
    image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80',
    available: true,
  },

  // ── Combos ─────────────────────────────────────────────
  {
    id: 9,
    name: 'Combo Familiar',
    description: '3 rolls a elección + 6 nigiris + miso soup para 2.',
    price: 18990,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80',
    available: true,
    featured: true,
  },
  {
    id: 10,
    name: 'Combo Individual',
    description: '1 roll a elección + 3 nigiris + bebida.',
    price: 9490,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80',
    available: true,
  },

  // ── Bebidas ────────────────────────────────────────────
  {
    id: 11,
    name: 'Té Verde',
    description: 'Té verde japonés caliente o frío.',
    price: 990,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    available: true,
  },
  {
    id: 12,
    name: 'Agua Mineral',
    description: 'Botella 500 ml.',
    price: 790,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80',
    available: true,
  },
];

export const CATEGORY_LABELS: Record<Product['category'], string> = {
  rolls: 'Rolls',
  nigiris: 'Nigiris',
  temakis: 'Temakis',
  combos: 'Combos',
  bebidas: 'Bebidas',
};
