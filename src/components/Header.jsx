import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import logo from "../assets/imagentpfinl.png";


const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header style={{ backgroundColor: "lightblue" }}>
      <img src="{logo}" alt="Compra Gamer" />
      <nav>
        <ul>
          {/* Cambiar elementos a por componentes Link de react-router-dom */}
          {
            user && <>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          }
          {
            !user && <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/registrate">Registrate</Link></li>
            </>
          }
        </ul>
      </nav>
    </header>
  )
}

export { Header }