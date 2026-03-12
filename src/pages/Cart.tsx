import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

export default function Cart() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (totalItems === 0) {
    return (
      <main className="cart-page container">
        <h1 className="page-title">Tu carrito</h1>
        <div className="cart-empty">
          <span>🛒</span>
          <p>Tu carrito está vacío</p>
          <Link to="/menu" className="btn btn-primary">Ver menú</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page container">
      <h1 className="page-title">Tu carrito</h1>

      <div className="cart-layout">
        {/* Ítems */}
        <section className="cart-items">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item card">
              <img src={product.image} alt={product.name} />
              <div className="cart-item__info">
                <h3>{product.name}</h3>
                <p className="cart-item__price">
                  ${product.price.toLocaleString('es-CL')} c/u
                </p>
              </div>
              <div className="cart-item__qty">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                >−</button>
                <span>{quantity}</span>
                <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
              </div>
              <p className="cart-item__subtotal">
                ${(product.price * quantity).toLocaleString('es-CL')}
              </p>
              <button
                className="cart-item__remove"
                onClick={() => removeItem(product.id)}
                aria-label="Eliminar"
              >
                ✕
              </button>
            </div>
          ))}

          <button className="btn btn-outline cart-clear" onClick={clearCart}>
            Vaciar carrito
          </button>
        </section>

        {/* Resumen */}
        <aside className="cart-summary card">
          <h2>Resumen del pedido</h2>
          <hr className="divider" />

          {items.map(({ product, quantity }) => (
            <div key={product.id} className="cart-summary__line">
              <span>{product.name} × {quantity}</span>
              <span>${(product.price * quantity).toLocaleString('es-CL')}</span>
            </div>
          ))}

          <hr className="divider" />
          <div className="cart-summary__line cart-summary__line--total">
            <span>Total</span>
            <span>${totalPrice.toLocaleString('es-CL')}</span>
          </div>
          <div className="cart-summary__shipping">
            <span>🏍️ Despacho</span>
            <span className="tag">Gratis</span>
          </div>

          {isAuthenticated ? (
            <Link to="/checkout" className="btn btn-primary cart-summary__cta">
              Proceder al pago →
            </Link>
          ) : (
            <Link to="/login" className="btn btn-secondary cart-summary__cta">
              Inicia sesión para continuar
            </Link>
          )}
        </aside>
      </div>
    </main>
  );
}
