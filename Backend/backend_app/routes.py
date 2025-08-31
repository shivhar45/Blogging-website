from flask import Blueprint, request, jsonify
from .extensions import db
from .models import User, Blog

auth_bp = Blueprint("auth", __name__)
blog_bp = Blueprint("blogs", __name__)

# ---------- Auth ----------
@auth_bp.post("/register")
def register():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not username or not password:
        return jsonify({"error": "username and password required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "User exists"}), 400

    user = User(username=username)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Registered", "user_id": user.id}), 201


@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not username or not password:
        return jsonify({"error": "username and password required"}), 400

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return jsonify({"message": "Login success", "user_id": user.id, "username": user.username})
    return jsonify({"error": "Invalid credentials"}), 401


# ---------- Blogs ----------
@blog_bp.get("/")
def list_blogs():
    blogs = Blog.query.order_by(Blog.id.desc()).all()
    return jsonify([
        {
            "id": b.id,
            "title": b.title,
            "content": b.content,
            "category": b.category,
            "user_id": b.user_id,
            "author": b.author.username if b.author else None,
        }
        for b in blogs
    ])

@blog_bp.post("/")
def create_blog():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    content = (data.get("content") or "").strip()
    category = (data.get("category") or "").strip() or None
    user_id = data.get("user_id")

    if not title or not content or not user_id:
        return jsonify({"error": "title, content, user_id required"}), 400

    if not User.query.get(user_id):
        return jsonify({"error": "user_id does not exist"}), 400

    blog = Blog(title=title, content=content, category=category, user_id=user_id)
    db.session.add(blog)
    db.session.commit()
    return jsonify({"message": "Blog created", "id": blog.id}), 201

@blog_bp.put("/<int:id>")
def update_blog(id: int):
    blog = Blog.query.get_or_404(id)
    data = request.get_json(silent=True) or {}

    if "title" in data:
        blog.title = (data["title"] or "").strip() or blog.title
    if "content" in data:
        blog.content = (data["content"] or "").strip() or blog.content
    if "category" in data:
        blog.category = (data["category"] or "").strip() or None

    db.session.commit()
    return jsonify({"message": "Blog updated"})

@blog_bp.delete("/<int:id>")
def delete_blog(id: int):
    blog = Blog.query.get_or_404(id)
    db.session.delete(blog)
    db.session.commit()
    return jsonify({"message": "Blog deleted"})
