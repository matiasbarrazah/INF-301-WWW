import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { CATEGORY_LABELS } from '../data/products';
import type { Product } from '../types';
import './Admin.css';

type Tab = 'productos' | 'usuarios' | 'reportes';

export default function Admin() {
  const [tab, setTab] = useState<Tab>('productos');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editId, setEditId] = useState<number | null>(null);

  const toggleAvailability = (id: number) => {
    setProducts((ps) =>
      ps.map((p) => (p.id === id ? { ...p, available: !p.available } : p))
    );
  };

  return (
    <main className="admin-page container">
      <h1 className="page-title">Panel de administración</h1>

      <div className="admin-tabs nav nav-tabs border-0">
        {(['productos', 'usuarios', 'reportes'] as Tab[]).map((t) => (
          <button
            key={t}
            className={`admin-tab nav-link ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {{ productos: '🍱 Productos', usuarios: '👥 Usuarios', reportes: '📊 Reportes' }[t]}
          </button>
        ))}
      </div>

      {tab === 'productos' && (
        <section className="admin-section">
          <div className="admin-section__header">
            <h2>Gestión de productos</h2>
            <button className="btn btn-primary">+ Nuevo producto</button>
          </div>

          <div className="admin-table-wrap card border-0 shadow-sm">
            <table className="admin-table table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Disponible</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className={editId === p.id ? 'editing' : ''}>
                    <td>
                      <div className="admin-product-name">
                        <img src={p.image} alt={p.name} />
                        {p.name}
                      </div>
                    </td>
                    <td><span className="tag">{CATEGORY_LABELS[p.category]}</span></td>
                    <td>${p.price.toLocaleString('es-CL')}</td>
                    <td>
                      <button
                        className={`admin-toggle badge border-0 ${p.available ? 'text-bg-success' : 'text-bg-danger'}`}
                        onClick={() => toggleAvailability(p.id)}
                      >
                        {p.available ? 'Disponible' : 'No disponible'}
                      </button>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn-outline-primary btn-sm" onClick={() => setEditId(editId === p.id ? null : p.id)}>
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Usuarios ── */}
      {tab === 'usuarios' && (
        <section className="admin-section">
          <div className="admin-section__header">
            <h2>Gestión de usuarios</h2>
            <button className="btn btn-primary">+ Nuevo usuario</button>
          </div>
          <div className="admin-placeholder card border-0 shadow-sm">
            <span>👥</span>
            <p>Lista de usuarios del sistema.</p>
            <p className="hint">Este módulo se conectará al backend en la siguiente unidad.</p>
          </div>
        </section>
      )}

      {tab === 'reportes' && (
        <section className="admin-section">
          <h2>Reporte de ventas</h2>

          <div className="report-filters card border-0 shadow-sm">
            <div>
              <label className="form-label">Desde</label>
              <input className="form-control" type="date" defaultValue="2026-03-01" />
            </div>
            <div>
              <label className="form-label">Hasta</label>
              <input className="form-control" type="date" defaultValue="2026-03-12" />
            </div>
            <button className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>
              Buscar
            </button>
          </div>

          <div className="report-summary">
            <div className="report-kpi card border-0 shadow-sm">
              <span>Ventas totales</span>
              <strong>$187.430</strong>
            </div>
            <div className="report-kpi card border-0 shadow-sm">
              <span>Pedidos</span>
              <strong>24</strong>
            </div>
            <div className="report-kpi card border-0 shadow-sm">
              <span>Ticket promedio</span>
              <strong>$7.810</strong>
            </div>
          </div>

          <div className="admin-placeholder card border-0 shadow-sm" style={{ marginTop: '1.5rem' }}>
            <span>📊</span>
            <p className="hint">La tabla detallada de ventas se conectará al backend.</p>
          </div>
        </section>
      )}
    </main>
  );
}
