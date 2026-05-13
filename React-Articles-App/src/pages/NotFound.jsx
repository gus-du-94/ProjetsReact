import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Page introuvable.</p>
      <Link to="/" className="btn">
        Retour à l’accueil
      </Link>
    </div>
  );
}

export default NotFound;