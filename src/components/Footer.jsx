import { Link } from "react-router-dom";
import "../styles/components/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__copy">
          © {year} Compra Gamer — Sitio desarrollado por{" "}
          <a
            href="https://www.linkedin.com/in/joaquin-garinei-892654304/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Joaquin Garinei
          </a>
        </p>

        <nav className="site-footer__nav" aria-label="Enlaces del sitio">
          <Link to="/about">Sobre nosotros</Link>
          <Link to="/registrate">Registrate</Link>
          <a href="mailto:contacto@compragamer.test">Contacto</a>
        </nav>

        <button
          className="site-footer__top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
        >
          ↑ Arriba
        </button>
      </div>
    </footer>
  );
};

export { Footer };
