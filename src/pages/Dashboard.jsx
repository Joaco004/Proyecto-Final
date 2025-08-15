import { useState } from "react";
import { Layout } from "../components/Layout";
import "../styles/pages/Dashboard.css";

const Dashboard = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
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
          category: form.category || "other",
          image: form.image || "https://picsum.photos/seed/product/600"
        })
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
      <h1>Panel de Administración</h1>

      <section className="card form-card">
        <h2>Cargar nuevo producto</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
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

          <div className="field">
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
              <option value="men's clothing">Hombre</option>
              <option value="women's clothing">Mujer</option>
              <option value="jewelery">Joyería</option>
              <option value="electronics">Electrónica</option>
            </select>
          </div>

          <div className="field">
            <label>URL de imagen (opcional)</label>
            <input
              name="image"
              placeholder="https://... .jpg"
              value={form.image}
              onChange={onChange}
            />
            {errors.image && <small className="error">{errors.image}</small>}
          </div>

          <button className="btn" disabled={submitting}>
            {submitting ? "Guardando..." : "Guardar producto"}
          </button>

          <p
            className={`form-msg ${serverMsg.includes("✅") ? "ok" : "err"}`}
            aria-live="polite"
          >
            {serverMsg}
          </p>
        </form>
      </section>

      {created && (
        <section className="card created">
          <h3>Último creado</h3>
          <p><strong>{created.title}</strong> — ${created.price}</p>
          {created.image && <img src={created.image} alt={created.title} width="120" />}
          <p>{created.description}</p>
        </section>
      )}
    </Layout>
  );
};

export { Dashboard };
