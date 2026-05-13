import { useEffect, useState } from "react";
import API_URL from "../lib/api";
import ArticleCard from "../components/ArticleCard";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/articles`)
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Liste des articles</h1>

      {articles.length === 0 ? (
        <p>Aucun article disponible.</p>
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

export default Home;