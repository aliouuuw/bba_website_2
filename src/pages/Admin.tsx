import { useState, useEffect } from "preact/compat";
import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminEditor from "../components/admin/AdminEditor";
import { BlogPostMeta } from "../types";
import "../admin.css";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingPost, setEditingPost] = useState<BlogPostMeta | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);

  // Check for stored session
  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  // Load posts when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  const handleLogin = async (password: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Invalid password");
      }

      const data = await res.json();
      sessionStorage.setItem("admin_session", data.token);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    setIsAuthenticated(false);
    setPosts([]);
    setEditingPost(null);
  };

  const getAuthHeaders = () => {
    const token = sessionStorage.getItem("admin_session");
    return { Authorization: `Bearer ${token}` };
  };

  const loadPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/posts", {
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          throw new Error("Session expired. Please login again.");
        }
        throw new Error("Failed to load posts");
      }
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const savePost = async (post: BlogPostMeta) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(post),
      });
      if (!res.ok) throw new Error("Failed to save post");
      await loadPosts();
      setEditingPost(null);
      setIsNewPost(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (filename: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/posts?filename=${encodeURIComponent(filename)}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete post");
      await loadPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  const createNewPost = () => {
    const today = new Date().toISOString().split("T")[0];
    setEditingPost({
      slug: "",
      title: "",
      date: today,
      category: "Technology",
      description: "",
      readTime: "5 min read",
      filename: "",
      content: "Start writing your blog post here...\n\n## Introduction\n\nAdd your content.",
    });
    setIsNewPost(true);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} loading={loading} error={error} />;
  }

  if (editingPost) {
    return (
      <AdminEditor
        post={editingPost}
        isNew={isNewPost}
        loading={loading}
        error={error}
        onSave={savePost}
        onCancel={() => {
          setEditingPost(null);
          setIsNewPost(false);
        }}
        onChange={setEditingPost}
      />
    );
  }

  return (
    <AdminDashboard
      posts={posts}
      loading={loading}
      onEdit={(post) => {
        setEditingPost(post);
        setIsNewPost(false);
      }}
      onDelete={deletePost}
      onCreate={createNewPost}
      onLogout={handleLogout}
    />
  );
}
