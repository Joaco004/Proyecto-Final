import { useEffect, useMemo, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import "../styles/pages/Home.css";

const Home = () => {
  const [products, setProducts] = useState([])
  const [q, setQ] = useState("");
  const [showPopup, setShowPopup] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")

  // simulando existencia del usuario, proximamente este estado será global
  const { user } = useAuth()

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()
    setProducts(data)
  }

  // El array vacío (dependencias) espera a que ejecute el return del jsx. Si tiene algo, useEffect se va a ejecutar cada vez que se modifique lo que este dentro de la dependencia.
  useEffect(() => {
    fetchingProducts()
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
      // fetchingProducts()
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

  // petición al backend mediante fetch para modificar-> método PATCH / PUT https://fakeproductapi.com/products
  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(prevProduct =>
          prevProduct.map((product) =>
            product.id === productToEdit.id
              ? data
              : product
          ))
        // fetchingProducts()
      }
      setShowPopup(false)
    } catch (error) {
      console.log(error)
    }
  }

  const filteredProducts = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products;
    return products.filter(p =>
      p.title.toLowerCase().incluides(term) ||
      p.category.toLowerCase().incluides(term)
    );
  }, [q, products])

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
            <p>Estamos disponibles para ayudarte y asesorarte las 24/7.</p>
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
          placeholder="Buscar (ej: proce, mother, ram)...."
          aria-label="Buscar productos"
          />
        </div>
        


        
          {showPopup && ( 
          <section className="popup-edit">
            <div className="popup-edit__dialog">
              <header className="popup-edit__header">
                <h2>Editando producto.</h2>
            <button onClick={() => setShowPopup(null)}>Cerrar</button>
              </header>

              <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              />
              <input
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
              <textarea
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
              <button className="btn">Actualizar</button>
            </form>
            </div>
          </section>
  )}

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

export { Home }
