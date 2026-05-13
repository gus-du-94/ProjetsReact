import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <div className="card">
      <h2>{article.title}</h2>

      <p>
        {article.content.length > 120
          ? article.content.substring(0, 120) + "..."
          : article.content}
      </p>

      <small>Auteur : {article.authorEmail}</small>

      <br />

      <Link to={`/article/${article.id}`} className="btn">
        Voir l’article
      </Link>
    </div>
  );
}

export default ArticleCard;