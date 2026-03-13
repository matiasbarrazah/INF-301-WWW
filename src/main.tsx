import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  </StrictMode>
);
