import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import API_URL from "../lib/api";
import { useAuth } from "../context/AuthContext";

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/articles/${id}`)
      .then((response) => response.json())
      .then((data) => setArticle(data))
      .catch((error) => console.error(error));
  }, [id]);

  async function handleUpdate(articleData) {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(articleData)
    });

    if (response.ok) {
      navigate(`/article/${id}`);
    }
  }

  if (!article) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>Modifier l’article</h1>

      <ArticleForm
        initialData={article}
        buttonText="Modifier"
        onSubmit={handleUpdate}
      />
    </div>
  );
}

export default EditArticle;