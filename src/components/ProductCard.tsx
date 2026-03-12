import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { CATEGORY_LABELS } from '../data/products';
import './ProductCard.css';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addItem(product);
  };

  return (
    <article className={`card border-0 shadow-sm product-card ${!product.available ? 'product-card--unavailable' : ''}`}>
      <div className="product-card__img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="tag badge rounded-pill text-bg-light">{CATEGORY_LABELS[product.category]}</span>
        {!product.available && (
          <div className="product-card__overlay">No disponible</div>
        )}
      </div>

      <div className="card-body d-flex flex-column product-card__body">
        <h3 className="card-title product-card__name">{product.name}</h3>
        <p className="card-text product-card__desc">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">
            ${product.price.toLocaleString('es-CL')}
          </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAdd}
            disabled={!product.available}
          >
            {product.available ? '+ Agregar' : 'Agotado'}
          </button>
        </div>
      </div>
    </article>
  );
}
