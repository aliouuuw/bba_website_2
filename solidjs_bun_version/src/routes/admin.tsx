import { createSignal, onMount, onCleanup, Show } from "solid-js";
import AdminLogin from "~/components/admin/AdminLogin";
import AdminDashboard from "~/components/admin/AdminDashboard";
import AdminEditor from "~/components/admin/AdminEditor";
import { BlogPostMeta } from "~/types";
import "../admin.css";

interface BuildStatus {
  status: "building" | "ready" | "error" | "queued" | "unknown";
  commit_message?: string;
  created_at?: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [posts, setPosts] = createSignal<BlogPostMeta[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [success, setSuccess] = createSignal("");
  const [editingPost, setEditingPost] = createSignal<BlogPostMeta | null>(null);
  const [isNewPost, setIsNewPost] = createSignal(false);
  const [buildStatus, setBuildStatus] = createSignal<BuildStatus | null>(null);
  const [dataSource, setDataSource] = createSignal<"cache" | "github">("cache");

  // Check for stored session
  onMount(() => {
    const session = sessionStorage.getItem("admin_session");
    if (session) {
      setIsAuthenticated(true);
    }
  });

  // Load posts when authenticated
  onMount(() => {
    if (isAuthenticated()) {
      loadPosts(false);
      checkBuildStatus();
    }
  });

  // Poll build status when building
  onMount(() => {
    if (buildStatus()?.status === "building" || buildStatus()?.status === "queued") {
      const interval = setInterval(checkBuildStatus, 5000);
      onCleanup(() => clearInterval(interval));
    }
  });

  // Auto-clear success message
  onMount(() => {
    if (success()) {
      const timer = setTimeout(() => setSuccess(""), 10000);
      onCleanup(() => clearTimeout(timer));
    }
  });

  const handleLogin = async (password: string) => {
    setLoading(true);
    setError("");
    console.log("Attempting login to /api/admin/login");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      console.log("Login response status:", res.status);

      if (!res.ok) {
        let errorMessage = "Invalid password";
        try {
          const data = await res.json();
          console.error("Login error response:", data);
          errorMessage = data.error || errorMessage;
        } catch {
          // Response might not be JSON
          console.error("Could not parse error response");
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      console.log("Login successful, token received");
      sessionStorage.setItem("admin_session", data.token);
      setIsAuthenticated(true);
      
      // Load posts after successful login
      loadPosts(false);
      checkBuildStatus();
    } catch (err) {
      console.error("Login error:", err);
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError("Cannot connect to server. Please ensure the server is running.");
      } else {
        setError(err instanceof Error ? err.message : "Login failed. Please try again.");
      }
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

  const checkBuildStatus = async () => {
    try {
      const res = await fetch("/api/admin/build-status", {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setBuildStatus(data);

        // Auto-refresh posts when build completes
        if (data.status === "ready" && buildStatus()?.status === "building") {
          loadPosts(true);
        }
      }
    } catch (err) {
      console.error("Failed to check build status:", err);
    }
  };

  const loadPosts = async (fresh: boolean = false) => {
    setLoading(true);
    setError("");
    try {
      const url = fresh ? "/api/admin/posts?fresh=true" : "/api/admin/posts";
      const res = await fetch(url, {
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
      setDataSource(data.source || "cache");

      if (fresh) {
        setSuccess("Posts refreshed from GitHub!");
      }
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
      setSuccess(data.message || "Post saved! Site rebuilding...");

      // Start checking build status
      setTimeout(checkBuildStatus, 2000);

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
      setSuccess(data.message || "Post deleted! Site rebuilding...");

      // Start checking build status
      setTimeout(checkBuildStatus, 2000);

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

  return (
    <Show
      when={isAuthenticated()}
      fallback={<AdminLogin onLogin={handleLogin} loading={loading()} error={error()} />}
    >
      <Show
        when={editingPost()}
        fallback={
          <AdminDashboard
            posts={posts()}
            loading={loading()}
            error={error()}
            success={success()}
            buildStatus={buildStatus()}
            dataSource={dataSource()}
            onEdit={(post) => {
              setEditingPost(post);
              setIsNewPost(false);
              setError("");
              setSuccess("");
            }}
            onDelete={deletePost}
            onCreate={createNewPost}
            onLogout={handleLogout}
            onRefresh={() => loadPosts(true)}
          />
        }
      >
        <AdminEditor
          post={editingPost()!}
          isNew={isNewPost()}
          loading={loading()}
          error={error()}
          onSave={savePost}
          onCancel={() => {
            setEditingPost(null);
            setIsNewPost(false);
          }}
          onChange={setEditingPost}
        />
      </Show>
    </Show>
  );
}
