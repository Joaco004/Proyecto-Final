
import { useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [showPw, setShowPw] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate(); 

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = "Ingresá tu usuario.";
    else if (username.trim().length < 3) e.username = "El usuario debe tener al menos 3 caracteres.";
    if (!password) e.password = "Ingresá tu contraseña.";
    else if (password.length < 6) e.password = "La contraseña debe tener al menos 6 caracteres.";
    return e;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerMsg("");

    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length) return;

    setSubmitting(true);
    try {
      const ok = await login(username.trim(), password);
      if (ok) {
        setUsername("");
        setPassword("");
        navigate("/"); 
      } else {
        setServerMsg("Usuario o contraseña inválidos.");
      }
    } catch {
      setServerMsg("No se pudo iniciar sesión. Intentalo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <h1>Iniciá sesión</h1>

      <section className="auth card">
        <h2>Hola, bienvenido de nuevo</h2>
        <p className="hint">Podés probar con <code>johnd</code> / <code>m38rmF$</code> (FakeStoreAPI).</p>

        <form onSubmit={handleLogin} noValidate>
          <div className="field">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErrors(s => ({ ...s, username: "" })); }}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "err-username" : undefined}
              autoFocus
            />
            {errors.username && <small id="err-username" className="error">{errors.username}</small>}
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <div className="pw">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(s => ({ ...s, password: "" })); }}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "err-password" : undefined}
              />
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPw ? "Ocultar" : "Ver"}
              </button>
            </div>
            {errors.password && <small id="err-password" className="error">{errors.password}</small>}
          </div>

          <button className="btn" disabled={submitting}>
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>

          <p className={`form-msg ${serverMsg ? "err" : ""}`} aria-live="polite">{serverMsg}</p>
        </form>
      </section>
    </Layout>
  );
};

export { Login };
