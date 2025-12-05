import { lazy, Suspense } from "preact/compat";
import { BlogPostMeta } from "../../types";

const MilkdownEditor = lazy(() => import("../MilkdownEditor"));

interface AdminEditorProps {
  post: BlogPostMeta;
  isNew: boolean;
  loading: boolean;
  error: string;
  onSave: (post: BlogPostMeta) => void;
  onCancel: () => void;
  onChange: (post: BlogPostMeta) => void;
}

export default function AdminEditor({ 
  post, 
  isNew, 
  loading, 
  error, 
  onSave, 
  onCancel, 
  onChange 
}: AdminEditorProps) {
  
  const updateTitle = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    onChange({ ...post, title, slug });
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="admin-title" style={{ fontSize: '1.5rem', margin: 0 }}>
          {isNew ? "New Post" : "Edit Post"}
        </h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={onCancel} className="btn-outline">
            Cancel
          </button>
          <button onClick={() => onSave(post)} className="admin-btn btn-sm" disabled={loading}>
            {loading ? "Saving..." : "Save & Publish"}
          </button>
        </div>
      </header>

      <div className="editor-layout">
        <aside className="editor-sidebar">
          {error && (
            <div style={{ 
              background: '#fee2e2', 
              color: '#991b1b', 
              padding: '0.75rem', 
              borderRadius: '8px', 
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="admin-input"
              value={post.title}
              onInput={(e) => updateTitle((e.target as HTMLInputElement).value)}
              placeholder="Post title..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Slug</label>
            <input
              type="text"
              className="admin-input"
              value={post.slug}
              onInput={(e) => onChange({ ...post, slug: (e.target as HTMLInputElement).value })}
              placeholder="url-slug"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="admin-input"
              value={post.date}
              onInput={(e) => onChange({ ...post, date: (e.target as HTMLInputElement).value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="admin-input"
              value={post.category}
              onChange={(e) => onChange({ ...post, category: (e.target as HTMLSelectElement).value })}
            >
              <option>Technology</option>
              <option>Strategy</option>
              <option>Compliance</option>
              <option>Risk</option>
              <option>News</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Read Time</label>
            <input
              type="text"
              className="admin-input"
              value={post.readTime}
              onInput={(e) => onChange({ ...post, readTime: (e.target as HTMLInputElement).value })}
              placeholder="e.g. 5 min read"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description (SEO)</label>
            <textarea
              className="admin-input"
              rows={4}
              value={post.description}
              onInput={(e) => onChange({ ...post, description: (e.target as HTMLTextAreaElement).value })}
              placeholder="Short summary for search engines..."
              style={{ resize: 'vertical' }}
            />
          </div>
        </aside>

        <main className="editor-main">
          <Suspense fallback={<div style={{ color: "var(--color-navy)", padding: "2rem", textAlign: "center" }}>Loading editor...</div>}>
            <MilkdownEditor
              value={post.content}
              onChange={(content) => onChange({ ...post, content })}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
