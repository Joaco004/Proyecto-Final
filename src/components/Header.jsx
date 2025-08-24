import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { ThemeToggle } from "./ThemeToggle"; 
import logo from "../assets/imagentpfinal.png";
import "../styles/components/Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav__link active" : "nav__link";

  return (
    <header className="cg-header">
      <div className="cg-header__inner">
        <Link to="/" className="brand" aria-label="Compra Gamer - inicio">
          <img src={logo} alt="Compra Gamer" className="brand__logo" />
          <span className="brand__name">COMPRA GAMER</span>
        </Link>

        <div className="header-actions">
          <ThemeToggle /> {/* ☀️ 🌙 🖥️ */}
          <button
            className="nav__toggle"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>

        <nav className={`nav ${open ? "open" : ""}`} aria-label="Principal">
          <ul className="nav__list" onClick={() => setOpen(false)}>
            <li><NavLink to="/" end className={navLinkClass}>Inicio</NavLink></li>
            <li><NavLink to="/about" className={navLinkClass}>Sobre nosotros</NavLink></li>

            {user ? (
              <>
                <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>
                <li>
                  <button className="btn btn--ghost" onClick={logout}>
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

