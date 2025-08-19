import { useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Login.css";

const Register = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (form.firstname.trim().length < 2) e.firstname = "Ingresá tu nombre.";
    if (form.lastname.trim().length < 2) e.lastname = "Ingresá tu apellido.";
    if (form.username.trim().length < 3) e.username = "Usuario mínimo 3 caracteres.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email inválido.";
    if (form.password.length < 6) e.password = "Contraseña mínima de 6 caracteres.";
    if (form.phone && !/^[0-9+\s()-]{6,}$/.test(form.phone)) e.phone = "Teléfono inválido.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg("");

    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length) return;

    setSubmitting(true);
    try {
      const ok = await register(form);           
      if (ok) {
        setServerMsg("Registro exitoso ✅");
        navigate("/");                            
      } else {
        setServerMsg("No se pudo registrar. Probá de nuevo.");
      }
    } catch {
      setServerMsg("Error del servidor. Intentalo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <h1>Registrate</h1>

      <section className="auth card">
        <h2>Crear cuenta</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label>Nombre</label>
            <input name="firstname" value={form.firstname} onChange={onChange} />
            {errors.firstname && <small className="error">{errors.firstname}</small>}
          </div>

          <div className="field">
            <label>Apellido</label>
            <input name="lastname" value={form.lastname} onChange={onChange} />
            {errors.lastname && <small className="error">{errors.lastname}</small>}
          </div>

          <div className="field">
            <label>Usuario</label>
            <input name="username" value={form.username} onChange={onChange} />
            {errors.username && <small className="error">{errors.username}</small>}
          </div>

          <div className="field">
            <label>Correo electrónico</label>
            <input name="email" type="email" value={form.email} onChange={onChange} />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <div className="field">
            <label>Contraseña</label>
            <input name="password" type="password" value={form.password} onChange={onChange} />
            {errors.password && <small className="error">{errors.password}</small>}
          </div>

          <div className="field">
            <label>Teléfono (opcional)</label>
            <input name="phone" value={form.phone} onChange={onChange} />
            {errors.phone && <small className="error">{errors.phone}</small>}
          </div>

          <button className="btn" disabled={submitting}>
            {submitting ? "Creando..." : "Crear cuenta"}
          </button>

          <p className={`form-msg ${serverMsg && !serverMsg.includes("✅") ? "err" : ""}`} aria-live="polite">
            {serverMsg}
          </p>
        </form>
      </section>
    </Layout>
  );
};

export { Register };