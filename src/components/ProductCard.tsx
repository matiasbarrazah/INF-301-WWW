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
    <article className={`card product-card ${!product.available ? 'product-card--unavailable' : ''}`}>
      <div className="product-card__img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="tag">{CATEGORY_LABELS[product.category]}</span>
        {!product.available && (
          <div className="product-card__overlay">No disponible</div>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">
            ${product.price.toLocaleString('es-CL')}
          </span>
          <button
            className="btn btn-primary"
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
