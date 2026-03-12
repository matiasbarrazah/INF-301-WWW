import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const featured = PRODUCTS.filter((p) => p.featured && p.available).slice(0, 3);

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="container hero__content">
          <h1>El mejor sushi de Maipú,<br /><span>ahora a domicilio</span></h1>
          <p>
            Rolls, nigiris y temakis preparados con ingredientes frescos,
            entregados en tu puerta en menos de 45 minutos.
          </p>
          <div className="hero__actions d-flex flex-wrap gap-3">
            <Link to="/menu" className="btn btn-primary btn-lg">Ver menú completo</Link>
            <Link to="/register" className="btn btn-outline-light btn-lg">Crear cuenta</Link>
          </div>
        </div>
        <div className="hero__img" aria-hidden="true">🍣</div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
        <div className="col-12 col-md-6 col-xl-3">
        <div className="benefit-card card border-0 shadow-sm h-100">
          <span>🏍️</span>
          <h3>Despacho gratuito</h3>
          <p>Dentro de un radio de 3 km de nuestro local en Maipú.</p>
        </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
        <div className="benefit-card card border-0 shadow-sm h-100">
          <span>⏱️</span>
          <h3>Entrega rápida</h3>
          <p>Pedidos preparados y despachados en menos de 45 minutos.</p>
        </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
        <div className="benefit-card card border-0 shadow-sm h-100">
          <span>🔒</span>
          <h3>Pago seguro</h3>
          <p>Aceptamos Servipag y depósito bancario con confirmación inmediata.</p>
        </div>
        </div>
        <div className="col-12 col-md-6 col-xl-3">
        <div className="benefit-card card border-0 shadow-sm h-100">
          <span>🎁</span>
          <h3>Ofertas exclusivas</h3>
          <p>Promociones y descuentos solo para clientes registrados.</p>
        </div>
        </div>
        </div>
      </section>

      <section className="featured container py-4 py-lg-5">
        <h2 className="page-title">Más pedidos</h2>
        <p className="page-subtitle">Los favoritos de nuestros clientes</p>
        <div className="row g-4">
          {featured.map((p) => (
            <div key={p.id} className="col-12 col-md-6 col-xl-4 d-flex">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/menu" className="btn btn-secondary btn-lg">Ver todo el menú →</Link>
        </div>
      </section>

      <section className="cta-register">
        <div className="container cta-register__inner d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between gap-4 py-5">
          <div>
            <h2>¿Eres cliente nuevo?</h2>
            <p>Regístrate y recibe tu primera entrega con 10% de descuento.</p>
          </div>
          <Link to="/register" className="btn btn-light btn-lg text-primary">Registrarme gratis</Link>
        </div>
      </section>
    </main>
  );
}
