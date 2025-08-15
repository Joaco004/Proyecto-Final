import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import "../styles/pages/NotFound.css";

const NotFound = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="nf">
        <div className="nf__card">
          <h1 className="nf__code">404</h1>
          <h2 className="nf__title">Página no encontrada</h2>
          <p className="nf__desc">
            No existe la ruta <code className="nf__path">{pathname}</code>.
          </p>

          <div className="nf__actions">
            <button className="btn btn--ghost" onClick={() => navigate(-1)}>
              Volver atrás
            </button>
            <Link className="btn" to="/">Ir al inicio</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export { NotFound };
