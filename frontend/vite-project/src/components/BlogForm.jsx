import { useState } from "react";

function BlogForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, category });
    setTitle("");
    setContent("");
    setCategory("");
  };

  return (
    <div className="blog-form">
      <h2>Create New Blog ✍️</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />

        <label>Category</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />

        <button type="submit" className="btn btn-primary">Publish</button>
      </form>
    </div>
  );
}
export default BlogForm;
