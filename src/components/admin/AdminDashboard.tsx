import { BlogPostMeta } from "../../types";

interface AdminDashboardProps {
  posts: BlogPostMeta[];
  loading: boolean;
  onEdit: (post: BlogPostMeta) => void;
  onDelete: (filename: string) => void;
  onCreate: () => void;
  onLogout: () => void;
}

export default function AdminDashboard({ 
  posts, 
  loading, 
  onEdit, 
  onDelete, 
  onCreate, 
  onLogout 
}: AdminDashboardProps) {
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
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
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

      <main className="admin-content">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-periwinkle)' }}>
            Loading content...
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-periwinkle)' }}>
            No posts found. Create your first blog post to get started.
          </div>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <div key={post.filename} className="post-card">
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
    </div>
  );
}
