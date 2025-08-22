import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import "../styles/pages/About.css"

const About = () => {
  return (
    <Layout>
 
      <section className="about-hero">
        <h1>Quiénes somos</h1>
        <p>
          Somos dos amigos que empezamos a armar computadoras cuando
          éramos adolescentes. Entre gabinetes abiertos y pruebas de
          rendimiento, nació la idea de ayudar a otros a tener la PC
          ideal para jugar, trabajar y crear.
        </p>
      </section>

      <section className="about-features">
        <div className="feature card">
          <h3>Componentes de PC</h3>
          <p>
            Asesoramos en la elección de CPU, GPU, RAM, almacenamiento,
            fuentes y periféricos. Optimizamos la relación
            rendimiento/precio según tu presupuesto.
          </p>
          <ul>
            <li>Builds para gaming, creators y oficina</li>
            <li>Compatibilidad y cuellos de botella</li>
            <li>Actualizaciones inteligentes</li>
          </ul>
        </div>

        <div className="feature card">
          <h3>Armado a medida</h3>
          <p>
            Ensamblamos tu equipo con manejo de cables, airflow y
            temperaturas. Probamos estabilidad y te entregamos
            configuraciones listas para usar.
          </p>
          <ul>
            <li>Montaje, BIOS y drivers</li>
            <li>Pruebas de estrés y benchmarks</li>
            <li>Perfil silencioso o performance</li>
          </ul>
        </div>

        <div className="feature card">
          <h3>Mantenimiento & Soporte</h3>
          <p>
            Limpieza, cambio de pasta térmica, diagnóstico de fallas,
            upgrades y migración de datos. Soporte remoto y presencial.
          </p>
          <ul>
            <li>Limpieza profunda y repasteo</li>
            <li>Detección de fallas y ruidos</li>
            <li>Planes de mantenimiento preventivo</li>
          </ul>
        </div>
      </section>


      <section className="about-process card">
        <h2>Cómo trabajamos</h2>
        <ol>
          <li>
            <strong>Asesoría personalizada:</strong> nos contás para qué la
            usás y tu presupuesto.
          </li>
          <li>
            <strong>Armado y pruebas:</strong> ensamblamos, optimizamos y
            testeamos estabilidad/temperaturas.
          </li>
          <li>
            <strong>Entrega y soporte:</strong> te llevás tu PC lista y
            quedamos disponibles para cualquier duda Post venta.
          </li>
        </ol>
      </section>

      <section className="about-required card">
  <h2>Sobre este proyecto</h2>

  <div className="about-required__grid">
    <div>
      <h3>¿De qué trata?</h3>
      <p>
        Es una tienda ficticia enfocada en componentes de PC: CPUs, GPUs, motherboards,
        RAM, almacenamiento, fuentes, gabinetes y periféricos. Permite explorar,
        buscar por nombre/categoría y simula acciones básicas de administración.
      </p>
    </div>

    <div>
      <h3>¿A quién está dirigido?</h3>
      <p>
        A entusiastas del hardware, jugadores y usuarios que desean armar o actualizar su
        computadora, y a estudiantes que quieran ver un ejemplo de SPA con React.
      </p>
    </div>

    <div>
      <h3>Tecnologías y enfoques</h3>
      <ul>
        <li>React + Vite, Router, Context API (Auth, Theme, Cart)</li>
        <li>Diseño responsive (breakpoints 480px / 880px)</li>
        <li>Grid responsive y búsqueda parcial en vivo</li>
        <li>Validaciones UX con mensajes y estados de carga</li>
        <li>FakeStoreAPI: registro de usuarios (POST /users)</li>
      </ul>
    </div>
  </div>
</section>

      <section className="about-values">
        <div className="value card">
          <h3>Transparencia</h3>
          <p>Explicamos cada componente y por qué lo elegimos.</p>
        </div>
        <div className="value card">
          <h3>Rendimiento real</h3>
          <p>Probamos con benchmarks y medimos resultados.</p>
        </div>
        <div className="value card">
          <h3>Garantía & Soporte</h3>
          <p>Cobertura por armado y acompañamiento post-venta.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="about-faq card">
        <h2>Preguntas frecuentes</h2>

        <details>
          <summary>¿Qué componentes recomiendan para gaming 1080p?</summary>
          <p>
            Un CPU de 6 núcleos moderno, 16&nbsp;GB RAM, GPU de gama media
            actual, SSD NVMe 1&nbsp;TB y fuente 80+ Bronze/Gold con margen.
          </p>
        </details>

        <details>
          <summary>¿Pueden aprovechar partes que ya tengo?</summary>
          <p>
            Sí. Evaluamos compatibilidad (socket, RAM, tamaño, fuente) y
            te proponemos un upgrade progresivo.
          </p>
        </details>

        <details>
          <summary>¿Cada cuánto conviene hacer mantenimiento?</summary>
          <p>
            Sugerimos limpieza y chequeo térmico cada 6–12 meses, según
            entorno y uso.
          </p>
        </details>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>¿Armamos tu próxima PC?</h2>
        <p>
          Te ayudamos a elegir componentes, la armamos y la dejamos lista.
        </p>
        <Link className="btn" to="/registrate">Pedir asesoría</Link>
      </section>
    </Layout>
  );
};

export { About };
