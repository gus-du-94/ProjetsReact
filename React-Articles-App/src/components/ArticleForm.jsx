import { useState } from "react";

function ArticleForm({ initialData, onSubmit, buttonText }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      title,
      content
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Titre</label>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label>Contenu</label>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        required
      />

      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default ArticleForm;