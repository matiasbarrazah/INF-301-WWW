import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          🍣 <span>Fukusuke</span>
        </Link>

        {/* Hamburger (mobile) */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Links */}
        <nav className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Inicio</NavLink>
          <NavLink to="/menu" onClick={() => setMenuOpen(false)}>Menú</NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
                Carrito
                {totalItems > 0 && <span className="badge">{totalItems}</span>}
              </NavLink>
              <NavLink to="/orders" onClick={() => setMenuOpen(false)}>Mis Pedidos</NavLink>
            </>
          )}

          {isAuthenticated && (user?.role === 'admin' || user?.role === 'dueño') && (
            <NavLink to="/admin" onClick={() => setMenuOpen(false)}>Admin</NavLink>
          )}
        </nav>

        {/* Auth */}
        <div className={`navbar__auth ${menuOpen ? 'open' : ''}`}>
          {isAuthenticated ? (
            <div className="navbar__user">
              <span className="navbar__user-name">Hola, {user?.fullName.split(' ')[0]}</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline"
                onClick={() => setMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                onClick={() => setMenuOpen(false)}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
