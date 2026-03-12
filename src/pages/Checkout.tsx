import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const PAYMENT_METHODS = [
  { value: 'servipag', label: '💳 Servipag' },
  { value: 'transferencia', label: '🏦 Transferencia bancaria' },
];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState(user?.address ?? '');
  const [payment, setPayment] = useState('servipag');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId] = useState(() => Math.floor(Math.random() * 90000) + 10000);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!address) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    clearCart();
    setTimeout(() => navigate('/orders'), 2000);
  };

  if (success) {
    return (
      <main className="checkout-page container">
        <div className="checkout-success card border-0 shadow-sm">
          <span>✅</span>
          <h2>¡Pedido #FKS-{orderId} recibido!</h2>
          <p>Te enviaremos la boleta a <strong>{user?.email}</strong>.</p>
          <p>Redirigiendo a tus pedidos…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page container">
      <h1 className="page-title">Confirmar pedido</h1>

      <div className="checkout-layout">
        <form className="checkout-form card border-0 shadow-sm" onSubmit={handleSubmit}>
          <h2>Datos de entrega</h2>

          <div className="mb-3">
            <label className="form-label">Nombre del receptor</label>
            <input className="form-control" value={user?.fullName ?? ''} readOnly />
          </div>

          <div className="mb-3">
            <label className="form-label">Dirección de despacho</label>
            <input
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Av. Pajaritos 1234, Dpto 5B, Maipú"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico (boleta)</label>
            <input className="form-control" value={user?.email ?? ''} readOnly />
          </div>

          <hr className="divider" />
          <h2>Método de pago</h2>

          <div className="checkout-payments">
            {PAYMENT_METHODS.map((m) => (
              <label key={m.value} className={`payment-option form-check ${payment === m.value ? 'selected' : ''}`}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  value={m.value}
                  checked={payment === m.value}
                  onChange={() => setPayment(m.value)}
                />
                <span className="form-check-label">{m.label}</span>
              </label>
            ))}
          </div>

          <button className="btn btn-primary checkout-submit w-100" type="submit" disabled={loading}>
            {loading ? 'Procesando pago…' : `Pagar $${totalPrice.toLocaleString('es-CL')}`}
          </button>
        </form>

        <aside className="checkout-summary card border-0 shadow-sm">
          <h2>Resumen</h2>
          <hr className="divider" />
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="checkout-summary__line">
              <span>{product.name} × {quantity}</span>
              <span>${(product.price * quantity).toLocaleString('es-CL')}</span>
            </div>
          ))}
          <hr className="divider" />
          <div className="checkout-summary__total">
            <span>Total a pagar</span>
            <span>${totalPrice.toLocaleString('es-CL')}</span>
          </div>
          <div className="checkout-summary__shipping">🏍️ Despacho gratuito (radio 3 km)</div>
        </aside>
      </div>
    </main>
  );
}
