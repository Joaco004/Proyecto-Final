import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import logo from "../assets/imagentpfinal.png";
import "../styles/components/Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => logout();

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav__link active" : "nav__link";

  return (
    <header className="cg-header">
      <div className="cg-header__inner">
        <Link to="/" className="brand" aria-label="Compra Gamer - inicio">
          <img src={logo} alt="Compra Gamer" className="brand__logo" />
          <span className="brand__name">COMPRA GAMER</span>
        </Link>

        <button
          className="nav__toggle"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <nav className={`nav ${open ? "open" : ""}`} aria-label="Principal">
          <ul className="nav__list">
            {user ? (
              <>
                <li><NavLink to="/" end className={navLinkClass}>Inicio</NavLink></li>
                <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>
                <li>
                  <button className="btn btn--ghost" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>
                <li><NavLink to="/registrate" className={navLinkClass}>Registrate</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export { Header };
