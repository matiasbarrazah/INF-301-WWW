import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout__content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
