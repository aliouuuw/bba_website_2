import { For, Show } from "solid-js";
import { BlogPostMeta } from "~/types";

interface BuildStatus {
  status: "building" | "ready" | "error" | "queued" | "unknown";
  commit_message?: string;
  created_at?: string;
}

interface AdminDashboardProps {
  posts: BlogPostMeta[];
  loading: boolean;
  error: string;
  success: string;
  buildStatus: BuildStatus | null;
  dataSource: "cache" | "github";
  onEdit: (post: BlogPostMeta) => void;
  onDelete: (filename: string) => void;
  onCreate: () => void;
  onLogout: () => void;
  onRefresh: () => void;
}

export default function AdminDashboard(props: AdminDashboardProps) {
  const getStatusColor = () => {
    switch (props.buildStatus?.status) {
      case "building": return "#fbbf24"; // amber
      case "ready": return "#10b981"; // green
      case "error": return "#ef4444"; // red
      case "queued": return "#3b82f6"; // blue
      default: return "#64748b"; // gray
    }
  };

  const getStatusText = () => {
    switch (props.buildStatus?.status) {
      case "building": return "Building...";
      case "ready": return "Ready";
      case "error": return "Error";
      case "queued": return "Queued";
      default: return "Unknown";
    }
  };

  return (
    <div class="admin-container">
      <div class="admin-header">
        <div>
          <h2 class="admin-title">Admin Dashboard</h2>
          <p class="admin-subtitle">Manage your blog content</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", "align-items": "center" }}>
          <Show when={props.buildStatus}>
            <div style={{
              display: "flex",
              "align-items": "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              "border-radius": "4px",
              background: "rgba(45, 42, 94, 0.05)",
              border: `1px solid ${getStatusColor()}`
            }}>
              <div style={{
                width: "12px",
                height: "12px",
                "border-radius": "50%",
                background: getStatusColor()
              }}></div>
              <span style={{ "font-size": "0.875rem", color: getStatusColor() }}>
                {getStatusText()}
              </span>
            </div>
          </Show>
          <button onClick={props.onRefresh} class="btn-outline" style={{ "font-size": "0.875rem" }}>
            Refresh Posts
          </button>
          <button onClick={props.onCreate} class="btn" style={{ "font-size": "0.875rem" }}>
            New Post
          </button>
          <button onClick={props.onLogout} class="btn-danger" style={{ "font-size": "0.875rem" }}>
            Logout
          </button>
        </div>
      </div>

      <div class="admin-content">
        <Show when={props.success}>
          <div style={{
            background: "#dcfce7",
            color: "#166534",
            padding: "1rem",
            "border-radius": "8px",
            "margin-bottom": "1rem",
            border: "1px solid #bbf7d0"
          }}>
            {props.success}
          </div>
        </Show>

        <Show when={props.error}>
          <div style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "1rem",
            "border-radius": "8px",
            "margin-bottom": "1rem",
            border: "1px solid #fecaca"
          }}>
            {props.error}
          </div>
        </Show>

        <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "1rem" }}>
          <h3 style={{ "font-size": "1.125rem", "font-weight": "600" }}>Blog Posts</h3>
          <span style={{ "font-size": "0.875rem", color: "#64748b" }}>
            Data Source: {props.dataSource === "github" ? "GitHub" : "Cache"}
          </span>
        </div>

        <Show when={props.loading} fallback={
          <>
            <Show when={props.posts.length > 0} fallback={
              <div style={{ "text-align": "center", padding: "4rem", color: "#64748b" }}>
                <p>No posts found. Create your first post!</p>
              </div>
            }>
              <div class="post-grid">
                <For each={props.posts}>
                  {(post) => (
                    <div class="post-card">
                      <div style={{ display: "flex", "justify-content": "space-between", "align-items": "flex-start", "margin-bottom": "0.5rem" }}>
                        <h4 class="post-card-title">{post.title}</h4>
                        <span style={{ "font-size": "0.75rem", color: "#64748b", "font-family": "var(--font-mono)" }}>
                          {post.category}
                        </span>
                      </div>
                      <p class="post-card-meta">{post.date} • {post.readTime}</p>
                      <p class="post-card-desc">{post.description}</p>
                      <div class="post-card-actions">
                        <button onClick={() => props.onEdit(post)} class="btn-sm btn-outline">
                          Edit
                        </button>
                        <button onClick={() => props.onDelete(post.filename)} class="btn-sm btn-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </>
        }>
          <div style={{ "text-align": "center", padding: "4rem" }}>
            <p>Loading posts...</p>
          </div>
        </Show>
      </div>
    </div>
  );
}
