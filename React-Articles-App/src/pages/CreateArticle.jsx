import { useNavigate } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import API_URL from "../lib/api";
import { useAuth } from "../context/AuthContext";

function CreateArticle() {
  const navigate = useNavigate();
  const { token } = useAuth();

  async function handleCreate(articleData) {
    const response = await fetch(`${API_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(articleData)
    });

    const data = await response.json();

    if (response.ok) {
      navigate(`/article/${data.id}`);
    }
  }

  return (
    <div>
      <h1>Créer un article</h1>

      <ArticleForm buttonText="Créer" onSubmit={handleCreate} />
    </div>
  );
}

export default CreateArticle;