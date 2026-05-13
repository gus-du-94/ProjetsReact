import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API_URL from "../lib/api";
import { useAuth } from "../context/AuthContext";

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, token } = useAuth();

  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setArticle(data);
        }
      })
      .catch(() => setError("Erreur lors du chargement de l’article"));
  }, [id]);

  async function handleDelete() {
    const confirmDelete = window.confirm("Supprimer cet article ?");

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      navigate("/");
    }
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!article) {
    return <p>Chargement...</p>;
  }

  const isAuthor = user && user.id === article.authorId;

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>

      <p>{article.content}</p>

      <small>Auteur : {article.authorEmail}</small>

      <br />
      <br />

      {isAuthor && (
        <div className="actions">
          <Link to={`/edit/${article.id}`} className="btn">
            Modifier
          </Link>

          <button onClick={handleDelete} className="danger">
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;