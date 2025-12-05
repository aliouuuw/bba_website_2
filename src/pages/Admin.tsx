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
  const [success, setSuccess] = useState("");
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

  // Auto-clear success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 8000);
      return () => clearTimeout(timer);
    }
  }, [success]);

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
    setSuccess("");
    
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(post),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to save post");
      }
      
      // Optimistic update - add/update the post in local state immediately
      const savedPost = data.post as BlogPostMeta;
      setPosts(prevPosts => {
        const existingIndex = prevPosts.findIndex(p => p.slug === savedPost.slug);
        if (existingIndex >= 0) {
          // Update existing post
          const updated = [...prevPosts];
          updated[existingIndex] = savedPost;
          return updated;
        } else {
          // Add new post at beginning
          return [savedPost, ...prevPosts];
        }
      });
      
      setEditingPost(null);
      setIsNewPost(false);
      setSuccess(data.message || "Post saved successfully! Site will rebuild in ~1-2 minutes.");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (filename: string) => {
    if (!confirm("Are you sure you want to delete this post? This will trigger a site rebuild.")) return;
    
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await fetch(`/api/admin/posts?filename=${encodeURIComponent(filename)}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete post");
      }
      
      // Optimistic update - remove from local state immediately  
      setPosts(prevPosts => prevPosts.filter(p => p.filename !== filename));
      setSuccess(data.message || "Post deleted! Site will rebuild in ~1-2 minutes.");
      
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
    setError("");
    setSuccess("");
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
      error={error}
      success={success}
      onEdit={(post) => {
        setEditingPost(post);
        setIsNewPost(false);
        setError("");
        setSuccess("");
      }}
      onDelete={deletePost}
      onCreate={createNewPost}
      onLogout={handleLogout}
    />
  );
}
