import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import './Checkout.css';

const PAYMENT_METHODS = [
  { value: 'tarjeta', label: '💳 Tarjeta crédito/débito' },
  { value: 'servipag', label: '💳 Servipag' },
  { value: 'transferencia', label: '🏦 Transferencia bancaria' },
] as const;

type PaymentMethod = typeof PAYMENT_METHODS[number]['value'];
type CardBrand = 'visa' | 'mastercard' | 'amex' | 'unknown';

const detectCardBrand = (number: string): CardBrand => {
  const digits = number.replace(/\D/g, '');
  if (/^4/.test(digits)) return 'visa';
  if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  return 'unknown';
};

const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const [address, setAddress] = useState(user?.address ?? '');
  const [payment, setPayment] = useState<PaymentMethod>('tarjeta');
  const [card, setCard] = useState({
    holder: '',
    number: '',
    expiry: '',
    cvv: '',
  });
  const [cardError, setCardError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId] = useState(() => Math.floor(Math.random() * 90000) + 10000);

  const detectedBrand = detectCardBrand(card.number);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!address || !user || items.length === 0) return;

    if (payment === 'tarjeta') {
      const cardDigits = card.number.replace(/\D/g, '');
      const expOk = /^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry);
      const cvvOk = /^\d{3,4}$/.test(card.cvv);
      if (!card.holder || cardDigits.length < 15 || !expOk || !cvvOk) {
        setCardError('Completa correctamente los datos de la tarjeta.');
        return;
      }
    }

    setCardError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    createOrder({
      userId: user.id,
      items,
      total: totalPrice,
      address,
    });
    setLoading(false);
    setSuccess(true);
    clearCart();
    setTimeout(() => navigate('/orders'), 2000);
  };

  if (items.length === 0) {
    return (
      <main className="checkout-page container">
        <div className="checkout-success card border-0 shadow-sm">
          <span>🛒</span>
          <h2>No hay productos para pagar</h2>
          <p>Primero arma un pedido desde el menú.</p>
          <button className="btn btn-primary" onClick={() => navigate('/menu')}>
            Ir al menú
          </button>
        </div>
      </main>
    );
  }

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
                  onChange={() => setPayment(m.value as PaymentMethod)}
                />
                <span className="form-check-label">{m.label}</span>
              </label>
            ))}
          </div>

          {payment === 'tarjeta' && (
            <div className="checkout-card-box">
              <div className="checkout-card-brands" aria-label="Marcas disponibles">
                <span className={`brand-pill ${detectedBrand === 'visa' ? 'active' : ''}`}>VISA</span>
                <span className={`brand-pill ${detectedBrand === 'mastercard' ? 'active' : ''}`}>Mastercard</span>
                <span className={`brand-pill ${detectedBrand === 'amex' ? 'active' : ''}`}>Amex</span>
              </div>

              <div className="mb-3">
                <label className="form-label">Nombre titular</label>
                <input
                  className="form-control"
                  placeholder="Como aparece en la tarjeta"
                  value={card.holder}
                  onChange={(e) => setCard((prev) => ({ ...prev, holder: e.target.value }))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Número de tarjeta</label>
                <input
                  className="form-control"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={card.number}
                  onChange={(e) => setCard((prev) => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                />
              </div>

              <div className="row g-3">
                <div className="col-7">
                  <label className="form-label">Vencimiento</label>
                  <input
                    className="form-control"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={(e) => setCard((prev) => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                  />
                </div>
                <div className="col-5">
                  <label className="form-label">CVV</label>
                  <input
                    className="form-control"
                    inputMode="numeric"
                    placeholder="123"
                    value={card.cvv}
                    onChange={(e) => setCard((prev) => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                  />
                </div>
              </div>

              {cardError && <div className="alert alert-danger mt-3 mb-0">{cardError}</div>}
              <p className="checkout-card-note">Modo demo: estos datos no se almacenan ni procesan.</p>
            </div>
          )}

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
