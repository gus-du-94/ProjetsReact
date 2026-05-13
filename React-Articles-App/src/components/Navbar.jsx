import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Articles App
      </Link>

      <div className="nav-links">
        <NavLink to="/">Accueil</NavLink>

        {isAuthenticated ? (
          <>
            <NavLink to="/create">Créer</NavLink>
            <NavLink to="/my-articles">Mes articles</NavLink>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Connexion</NavLink>
            <NavLink to="/register">Inscription</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;