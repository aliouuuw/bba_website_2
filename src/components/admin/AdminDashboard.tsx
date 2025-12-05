import { BlogPostMeta } from "../../types";

interface BuildStatus {
  status: "building" | "ready" | "error" | "queued" | "unknown";
  commit_message?: string;
  created_at?: string;
}

interface AdminDashboardProps {
  posts: BlogPostMeta[];
  loading: boolean;
  error?: string;
  success?: string;
  buildStatus?: BuildStatus | null;
  dataSource?: "cache" | "github";
  onEdit: (post: BlogPostMeta) => void;
  onDelete: (filename: string) => void;
  onCreate: () => void;
  onLogout: () => void;
  onRefresh: () => void;
}

export default function AdminDashboard({ 
  posts, 
  loading,
  error,
  success,
  buildStatus,
  dataSource,
  onEdit, 
  onDelete, 
  onCreate, 
  onLogout,
  onRefresh,
}: AdminDashboardProps) {
  const getBuildStatusColor = () => {
    switch (buildStatus?.status) {
      case "building":
      case "queued":
        return "#f59e0b"; // amber
      case "ready":
        return "#10b981"; // green
      case "error":
        return "#ef4444"; // red
      default:
        return "#6b7280"; // gray
    }
  };

  const getBuildStatusText = () => {
    switch (buildStatus?.status) {
      case "building":
        return "Building...";
      case "queued":
        return "Queued";
      case "ready":
        return "Live";
      case "error":
        return "Build Failed";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 className="admin-title" style={{ fontSize: '1.5rem', margin: 0 }}>Content Manager</h1>
          <span style={{ 
            background: 'rgba(94, 234, 212, 0.2)', 
            color: 'var(--color-navy)', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            {posts.length} Posts
          </span>
          {buildStatus && (
            <span style={{ 
              background: `${getBuildStatusColor()}20`,
              color: getBuildStatusColor(),
              padding: '0.25rem 0.75rem', 
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {(buildStatus.status === "building" || buildStatus.status === "queued") && (
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: getBuildStatusColor(),
                  animation: 'pulse 1.5s infinite'
                }} />
              )}
              {getBuildStatusText()}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={onRefresh} 
            className="btn-outline btn-sm"
            disabled={loading}
            title="Fetch latest posts from GitHub"
          >
            ↻ Refresh
          </button>
          <button onClick={onCreate} className="admin-btn btn-sm">
            + New Post
          </button>
          <a href="/" className="btn-outline" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            View Site
          </a>
          <button onClick={onLogout} className="btn-outline">
            Logout
          </button>
        </div>
      </header>

      {/* Data Source Indicator */}
      {dataSource && (
        <div style={{
          padding: '0.5rem 2rem',
          fontSize: '0.75rem',
          color: 'var(--color-periwinkle)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          Data source: <strong>{dataSource === 'github' ? '🔄 Live from GitHub' : '📦 Cached (last build)'}</strong>
          {dataSource === 'cache' && (
            <span style={{ marginLeft: '0.5rem' }}>
              — <button onClick={onRefresh} style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--color-teal)', 
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
                font: 'inherit'
              }}>Load fresh data</button>
            </span>
          )}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div style={{
          background: 'rgba(94, 234, 212, 0.15)',
          border: '1px solid var(--color-teal)',
          color: 'var(--color-navy)',
          padding: '1rem 1.5rem',
          margin: '1rem 2rem 0',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.25rem' }}>✓</span>
          <div>
            <strong>{success}</strong>
            {buildStatus?.status === "building" && (
              <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.25rem' }}>
                Site is rebuilding. Changes will be live in ~1-2 minutes.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid #ef4444',
          color: '#dc2626',
          padding: '1rem 1.5rem',
          margin: '1rem 2rem 0',
          borderRadius: '8px',
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <main className="admin-content">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-periwinkle)' }}>
            <div style={{ 
              display: 'inline-block',
              width: '24px',
              height: '24px',
              border: '3px solid rgba(94, 234, 212, 0.3)',
              borderTopColor: 'var(--color-teal)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }} />
            <div>Loading content...</div>
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-periwinkle)' }}>
            No posts found. Create your first blog post to get started.
          </div>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <div key={post.filename || post.slug} className="post-card">
                <h3 className="post-card-title">{post.title}</h3>
                <div className="post-card-meta">
                  {post.date} • {post.category}
                </div>
                <p className="post-card-desc">
                  {post.description || "No description provided."}
                </p>
                <div className="post-card-actions">
                  <button onClick={() => onEdit(post)} className="admin-btn btn-sm" style={{ flex: 1 }}>
                    Edit
                  </button>
                  <button onClick={() => onDelete(post.filename)} className="btn-danger btn-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
