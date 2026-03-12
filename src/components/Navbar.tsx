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

  const navLinkClassName = ({ isActive }: { isActive: boolean }) => (
    `nav-link px-lg-3 ${isActive ? 'active fw-semibold' : ''}`
  );

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark site-navbar sticky-top py-0">
      <div className="container navbar__inner">
        <Link to="/" className="navbar-brand navbar__logo" onClick={() => setMenuOpen(false)}>
          <span className="navbar__logo-mark">🍣</span>
          <span>Fukusuke</span>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú"
          aria-controls="main-navbar"
          aria-expanded={menuOpen}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="main-navbar">
          <nav className="navbar-nav me-auto mb-3 mb-lg-0 align-items-lg-center gap-lg-1">
            <NavLink to="/" end className={navLinkClassName} onClick={() => setMenuOpen(false)}>
              Inicio
            </NavLink>
            <NavLink to="/menu" className={navLinkClassName} onClick={() => setMenuOpen(false)}>
              Menú
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink to="/cart" className={navLinkClassName} onClick={() => setMenuOpen(false)}>
                  Carrito
                  {totalItems > 0 && (
                    <span className="badge badge-counter rounded-pill text-bg-danger ms-2">{totalItems}</span>
                  )}
                </NavLink>
                <NavLink to="/orders" className={navLinkClassName} onClick={() => setMenuOpen(false)}>
                  Mis Pedidos
                </NavLink>
              </>
            )}

            {isAuthenticated && (user?.role === 'admin' || user?.role === 'dueño') && (
              <NavLink to="/admin" className={navLinkClassName} onClick={() => setMenuOpen(false)}>
                Admin
              </NavLink>
            )}
          </nav>

          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 navbar__auth">
            {isAuthenticated ? (
              <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 gap-lg-3 ms-lg-3">
                <span className="navbar__user-name">Hola, {user?.fullName.split(' ')[0]}</span>
                <button className="btn btn-outline-light btn-sm px-3" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-light btn-sm px-3"
                  onClick={() => setMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm px-3"
                  onClick={() => setMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
