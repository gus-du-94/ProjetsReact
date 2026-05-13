import { useEffect, useState } from "react";
import API_URL from "../lib/api";
import { useAuth } from "../context/AuthContext";
import ArticleCard from "../components/ArticleCard";

function MyArticles() {
  const { token } = useAuth();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/articles/my-articles`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <div>
      <h1>Mes articles</h1>

      {articles.length === 0 ? (
        <p>Tu n’as pas encore créé d’article.</p>
      ) : (
        <div className="grid">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyArticles;