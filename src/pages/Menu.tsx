import { useState } from 'react';
import { PRODUCTS, CATEGORY_LABELS } from '../data/products';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';
import './Menu.css';

type Category = Product['category'] | 'todos';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'rolls', label: CATEGORY_LABELS.rolls },
  { value: 'nigiris', label: CATEGORY_LABELS.nigiris },
  { value: 'temakis', label: CATEGORY_LABELS.temakis },
  { value: 'combos', label: CATEGORY_LABELS.combos },
  { value: 'bebidas', label: CATEGORY_LABELS.bebidas },
];

export default function Menu() {
  const [category, setCategory] = useState<Category>('todos');
  const [search, setSearch] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = category === 'todos' || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchAvail = !onlyAvailable || p.available;
    return matchCat && matchSearch && matchAvail;
  });

  return (
    <main className="menu-page">
      <div className="container">
        <h1 className="page-title">Nuestro Menú</h1>
        <p className="page-subtitle">
          Elige entre {PRODUCTS.length} preparaciones frescas y auténticas
        </p>

        {/* Filtros */}
        <div className="menu-filters">
          <input
            type="text"
            placeholder="Buscar producto…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="menu-filters__search"
          />

          <div className="menu-filters__cats">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                className={`menu-filters__cat-btn ${category === c.value ? 'active' : ''}`}
                onClick={() => setCategory(c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <label className="menu-filters__available">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
            />
            Solo disponibles
          </label>
        </div>

        {/* Resultados */}
        {filtered.length === 0 ? (
          <div className="menu-empty">
            <p>No se encontraron productos con ese filtro.</p>
            <button className="btn btn-outline" onClick={() => { setSearch(''); setCategory('todos'); }}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="menu-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
