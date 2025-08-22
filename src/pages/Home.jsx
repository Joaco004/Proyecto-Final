import { useEffect, useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";
import "../styles/pages/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");                  
  const [showPopup, setShowPopup] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [titleEdit, setTitleEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");

  const { user } = useAuth();

  const fetchingProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => { fetchingProducts(); }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" });
    if (res.ok) setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleOpenEdit = (product) => {
    setShowPopup(true);
    setProductToEdit(product);
    setTitleEdit(product.title);
    setPriceEdit(product.price);
    setDescriptionEdit(product.description);
    setCategoryEdit(product.category);
    setImageEdit(product.image);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    };
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct)
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(prev => prev.map(p => p.id === productToEdit.id ? data : p));
      }
      setShowPopup(false);
    } catch (err) { console.log(err); }
  };


  const filteredProducts = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products;
    return products.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }, [q, products]);

  return (
    <Layout>
      <section>
        <h1>Bienvenido a Nuestra Tienda</h1>
        <p>Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.</p>
      </section>

      <section>
        <h2>¿Por qué elegirnos?</h2>
        <ul>
          <li>
            <h3>Envíos a todo el país</h3>
            <p>Recibí tu compra en la puerta de tu casa estés donde estés.</p>
          </li>
          <li>
            <h3>Pagos seguros</h3>
            <p>Trabajamos con plataformas que garantizan tu seguridad.</p>
          </li>
          <li>
            <h3>Atención personalizada</h3>
            <p>Estamos disponibles para ayudarte en todo momento.</p>
          </li>
        </ul>
      </section>

      <section>
        <div className="home__header">
          <h2>Nuestros productos</h2>
          <input
            className="home__search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="text"
            placeholder="Buscar (ej: cam, zapatillas, men)..."
            aria-label="Buscar productos"
          />
        </div>

        {/* POPUP EDITAR */}
        {showPopup && (
          <section className="popup-edit">
            <div className="popup-edit__dialog">
              <header className="popup-edit__header">
                <h3>Editando producto</h3>
                <button onClick={() => setShowPopup(null)} className="btn btn--ghost">Cerrar</button>
              </header>

              <form onSubmit={handleUpdate} className="form">
                <input type="text" placeholder="Título" value={titleEdit} onChange={(e) => setTitleEdit(e.target.value)} />
                <input type="number" placeholder="Precio" value={priceEdit} onChange={(e) => setPriceEdit(e.target.value)} />
                <textarea placeholder="Descripción" value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)} />
                <input type="text" placeholder="Categoría" value={categoryEdit} onChange={(e) => setCategoryEdit(e.target.value)} />
                <input type="text" placeholder="URL imagen" value={imageEdit} onChange={(e) => setImageEdit(e.target.value)} />
                <button className="btn">Actualizar</button>
              </form>
            </div>
          </section>
        )}

        {/* GRID RESPONSIVE */}
        {filteredProducts.length === 0 ? (
          <p className="home__empty">No se encontraron productos.</p>
        ) : (
          <div className="grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="card">
                <img src={product.image} alt={`Imagen de ${product.title}`} loading="lazy" />
                <div className="card__body">
                  <h3 className="card__title">{product.title}</h3>
                  <p className="card__price">
                    ${Number(product.price).toLocaleString("es-AR", { maximumFractionDigits: 2 })}
                  </p>
                  <p className="card__desc">{product.description}</p>
                  <p className="card__cat"><strong>{product.category}</strong></p>

                  {user && (
                    <div className="card__actions">
                      <button className="btn" onClick={() => handleOpenEdit(product)}>Actualizar</button>
                      <button className="btn btn--danger" onClick={() => handleDelete(product.id)}>Borrar</button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export { Home };



