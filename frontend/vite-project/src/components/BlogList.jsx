import { useState } from "react";
import { deleteBlog, updateBlog } from "../api";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

function BlogList({ blogs, user, onRefresh }) {
  const [editingBlog, setEditingBlog] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", category: "" });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (blog) => {
    setEditingBlog(blog.id);
    setForm({
      title: blog.title,
      content: blog.content,
      category: blog.category || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateBlog(editingBlog, form);
      setEditingBlog(null);
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')", // blogging bg
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        padding: "2rem",
        marginTop:"10px",
        opacity:"inherit"
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)", // makes bg darker
          zIndex: 0,
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 1, color: "#fff" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          ✍️ All Blogs
        </h2>

        <div style={{ display: "grid", gap: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                backdropFilter: "blur(6px)",
              }}
            >
              {editingBlog === blog.id ? (
                <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    style={inputStyle}
                  />
                  <textarea
                    placeholder="Content"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    style={{ ...inputStyle, minHeight: "100px" }}
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    style={inputStyle}
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" style={saveBtn}>
                      <FaSave /> Save
                    </button>
                    <button type="button" onClick={() => setEditingBlog(null)} style={cancelBtn}>
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 style={{ marginBottom: "0.5rem" }}>{blog.title}</h3>
                  <p style={{ marginBottom: "0.5rem", opacity: 0.9 }}>{blog.content}</p>
                  {blog.category && <small style={{ opacity: 0.7 }}>Category: {blog.category}</small>}
                  {user && (
                    <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
                      <button style={editBtn} onClick={() => startEdit(blog)}>
                        <FaEdit />
                      </button>
                      <button style={deleteBtn} onClick={() => handleDelete(blog.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
};

const saveBtn = {
  background: "#4caf50",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

const cancelBtn = {
  background: "#f44336",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

const editBtn = {
  background: "#2196f3",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#e91e63",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
};

export default BlogList;
