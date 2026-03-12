import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">🍣 Fukusuke</span>
          <p>Sushi Delivery — Maipú, Santiago</p>
          <p>Radio de despacho: 3 km</p>
        </div>

        <div className="footer__links">
          <h4>Navegación</h4>
          <Link to="/">Inicio</Link>
          <Link to="/menu">Menú</Link>
          <Link to="/register">Registrarse</Link>
          <Link to="/login">Iniciar sesión</Link>
        </div>

        <div className="footer__contact">
          <h4>Contacto</h4>
          <p>📍 Av. Pajaritos 1234, Maipú</p>
          <p>📞 +56 2 2345 6789</p>
          <p>✉️ contacto@fukusuke.cl</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Fukusuke Sushi Delivery. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
