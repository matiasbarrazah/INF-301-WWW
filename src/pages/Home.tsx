import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const featured = PRODUCTS.filter((p) => p.featured && p.available).slice(0, 3);

export default function Home() {
  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container hero__content">
          <h1>El mejor sushi de Maipú,<br /><span>ahora a domicilio</span></h1>
          <p>
            Rolls, nigiris y temakis preparados con ingredientes frescos,
            entregados en tu puerta en menos de 45 minutos.
          </p>
          <div className="hero__actions">
            <Link to="/menu" className="btn btn-primary">Ver menú completo</Link>
            <Link to="/register" className="btn btn-outline">Crear cuenta</Link>
          </div>
        </div>
        <div className="hero__img" aria-hidden="true">🍣</div>
      </section>

      {/* Beneficios */}
      <section className="benefits container">
        <div className="benefit-card">
          <span>🏍️</span>
          <h3>Despacho gratuito</h3>
          <p>Dentro de un radio de 3 km de nuestro local en Maipú.</p>
        </div>
        <div className="benefit-card">
          <span>⏱️</span>
          <h3>Entrega rápida</h3>
          <p>Pedidos preparados y despachados en menos de 45 minutos.</p>
        </div>
        <div className="benefit-card">
          <span>🔒</span>
          <h3>Pago seguro</h3>
          <p>Aceptamos Servipag y depósito bancario con confirmación inmediata.</p>
        </div>
        <div className="benefit-card">
          <span>🎁</span>
          <h3>Ofertas exclusivas</h3>
          <p>Promociones y descuentos solo para clientes registrados.</p>
        </div>
      </section>

      {/* Destacados */}
      <section className="featured container">
        <h2 className="page-title">Más pedidos</h2>
        <p className="page-subtitle">Los favoritos de nuestros clientes</p>
        <div className="featured__grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/menu" className="btn btn-secondary">Ver todo el menú →</Link>
        </div>
      </section>

      {/* CTA Registro */}
      <section className="cta-register">
        <div className="container cta-register__inner">
          <div>
            <h2>¿Eres cliente nuevo?</h2>
            <p>Regístrate y recibe tu primera entrega con 10% de descuento.</p>
          </div>
          <Link to="/register" className="btn btn-primary">Registrarme gratis</Link>
        </div>
      </section>
    </main>
  );
}
