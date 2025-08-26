import { useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/Login.css";

const RegisterInline = () => {
  const [form, setForm] = useState({ username:"", email:"", password:"" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Ingresá un usuario.";
    if (!form.email.includes("@")) e.email = "Ingresá un email válido.";
    if (form.password.length < 6) e.password = "Mínimo 6 caracteres.";
    return e;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length) return;

    setSubmitting(true);
    try {
      const body = {
        email: form.email,
        username: form.username,
        password: form.password,
        name: { firstname: "Demo", lastname: "User" },
        address: {
          city: "Buenos Aires",
          street: "Demo",
          number: 1,
          zipcode: "1000",
          geolocation: { lat: "-34.6", long: "-58.4" },
        },
        phone: "0000000000",
      };

      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("error");
      await res.json();
      setMsg("Usuario registrado con éxito ✅");
      setForm({ username:"", email:"", password:"" });
    } catch {
      setMsg("No se pudo registrar. Probá más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="register" className="auth card register-inline">
      <h2>Registrate</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="r-username">Usuario</label>
          <input id="r-username" name="username" value={form.username} onChange={onChange} />
          {errors.username && <small className="error">{errors.username}</small>}
        </div>
        <div className="field">
          <label htmlFor="r-email">Email</label>
          <input id="r-email" name="email" type="email" value={form.email} onChange={onChange} />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>
        <div className="field">
          <label htmlFor="r-password">Contraseña</label>
          <input id="r-password" name="password" type="password" value={form.password} onChange={onChange} />
          {errors.password && <small className="error">{errors.password}</small>}
        </div>
        <button className="btn" disabled={submitting}>
          {submitting ? "Creando..." : "Crear cuenta"}
        </button>
        <p className={`form-msg ${msg.includes("✅") ? "ok" : "err"}`} aria-live="polite">{msg}</p>
      </form>
    </section>
  );
};

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
        <p className="hint">Probá con johnd / m38rmF$ (FakeStoreAPI).</p>

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
                {showPw ? "🙈" : "🙉"}
              </button>
            </div>
            {errors.password && <small id="err-password" className="error">{errors.password}</small>}
          </div>

          <button className="btn" disabled={submitting}>
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>

          <p className="muted">
            ¿No tenés cuenta?{" "}
            <Link to="/registrate" className="btn-link">Registrate</Link>
          </p>

          <p className={`form-msg ${serverMsg ? "err" : ""}`} aria-live="polite">{serverMsg}</p>
        </form>
      </section>

    
    </Layout>
  );
};

export { Login };
