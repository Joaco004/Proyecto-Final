import { useState } from "react";
import { Layout } from "../components/Layout";
import "../styles/pages/Dashboard.css";

const PC_CATEGORIES = [
  { value: "cpu", label: "CPU" },
  { value: "gpu", label: "GPU" },
  { value: "motherboard", label: "Motherboard" },
  { value: "ram", label: "Memoria RAM" },
  { value: "almacenamiento", label: "Almacenamiento (SSD/HDD)" },
  { value: "fuente", label: "Fuente (PSU)" },
  { value: "gabinete", label: "Gabinete" },
  { value: "cooler", label: "Refrigeración (Cooler/AIO)" },
  { value: "monitor", label: "Monitor" },
  { value: "teclado", label: "Teclado" },
  { value: "mouse", label: "Mouse" },
  { value: "audio", label: "Audio / Headset" },
  { value: "red", label: "Red / WiFi" },
  { value: "video", label: "Video / Captura" },
  { value: "energia", label: "Energía / UPS" },
  { value: "accesorio", label: "Accesorios / Herramientas" },
];

const Dashboard = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [created, setCreated] = useState(null);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (form.title.trim().length < 4) e.title = "El nombre debe tener al menos 4 caracteres.";
    if (!form.price || Number(form.price) <= 0) e.price = "Ingresá un precio mayor a 0.";
    if (form.description.trim().length < 10) e.description = "La descripción debe tener al menos 10 caracteres.";
    if (form.image && !/^https?:\/\/.+\.(png|jpe?g|webp|gif)$/i.test(form.image))
      e.image = "Ingresá una URL de imagen válida (png, jpg, webp, gif).";
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
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          price: Number(form.price),
          description: form.description,
          category: form.category || "accesorio",
          image: form.image || "https://source.unsplash.com/600x600/?computer%20hardware&sig=777",
        }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();

      setCreated(data);
      setServerMsg("Producto creado correctamente ✅");
      setForm({ title: "", price: "", description: "", category: "", image: "" });
    } catch (err) {
      setServerMsg("No se pudo crear el producto. Intentalo más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1 className="page-title">Panel de Administración</h1>

        <section className="card dashboard__panel">
          <h2>Cargar nuevo producto</h2>

          <form className="dashboard__form" onSubmit={handleSubmit} noValidate>
            <div className="field field--full">
              <label>Nombre del producto</label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                required
                minLength={4}
              />
              {errors.title && <small className="error">{errors.title}</small>}
            </div>

            <div className="field">
              <label>Precio</label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={onChange}
                required
              />
              {errors.price && <small className="error">{errors.price}</small>}
            </div>

            <div className="field field--full">
              <label>Descripción</label>
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={onChange}
                required
              />
              {errors.description && <small className="error">{errors.description}</small>}
            </div>

            <div className="field">
              <label>Categoría</label>
              <select name="category" value={form.category} onChange={onChange}>
                <option value="">Seleccionar…</option>
                {PC_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>URL de imagen (opcional)</label>
              <input
                name="image"
                type="url"
                placeholder="https://... .jpg"
                value={form.image}
                onChange={onChange}
              />
              {errors.image && <small className="error">{errors.image}</small>}
            </div>

            <div className="actions">
              <button className="btn" disabled={submitting}>
                {submitting ? "Guardando..." : "Guardar producto"}
              </button>
            </div>

            {serverMsg && (
              <p className={`form-msg ${serverMsg.includes("✅") ? "ok" : "err"}`} aria-live="polite">
                {serverMsg}
              </p>
            )}
          </form>
        </section>

        {created && (
          <section className="card dashboard__preview">
            <h3>Último creado</h3>
            <p><strong>{created.title}</strong> — ${created.price}</p>
            {created.image && <img src={created.image} alt={created.title} width="120" />}
            <p>{created.description}</p>
          </section>
        )}
      </div>
    </Layout>
  );
};

export { Dashboard };
