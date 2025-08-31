import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import {
  getBlogs,
  createBlog,
  loginUser,
  registerUser,
} from "./api";
import "./styles.css";


function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  // fetch blogs on mount
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data); // ✅ make sure backend returns {data: [...]}
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (blog) => {
    try {
      const res = await createBlog({ ...blog, user_id: user.id });
      if (res.status === 201) {
        loadBlogs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (data) => {
    try {
      const res = await loginUser(data);
      setUser({ id: res.data.user_id, username: data.username });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  const handleRegister = async (data) => {
    try {
      await registerUser(data);
      // auto login after register
      handleLogin(data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("User already exists");
    }
  };

  const handleLogout = () => setUser(null);

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        {/* ✅ only keep one / route */}
        <Route
          path="/"
          element={<BlogList blogs={blogs} user={user} onRefresh={loadBlogs} />}
        />
        <Route
          path="/create"
          element={
            user ? (
              <BlogForm onSubmit={handleCreate} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
