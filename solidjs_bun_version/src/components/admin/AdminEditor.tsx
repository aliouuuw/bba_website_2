import { createSignal, Show } from "solid-js";
import { BlogPostMeta } from "~/types";
import RichTextEditor from "~/components/RichTextEditor";

interface AdminEditorProps {
  post: BlogPostMeta;
  isNew: boolean;
  loading: boolean;
  error: string;
  onSave: (post: BlogPostMeta) => void;
  onCancel: () => void;
  onChange: (post: BlogPostMeta) => void;
}

export default function AdminEditor(props: AdminEditorProps) {
  const [content, setContent] = createSignal(props.post.content || "");
  const [title, setTitle] = createSignal(props.post.title || "");
  const [slug, setSlug] = createSignal(props.post.slug || "");
  const [date, setDate] = createSignal(props.post.date || "");
  const [category, setCategory] = createSignal(props.post.category || "Technology");
  const [description, setDescription] = createSignal(props.post.description || "");
  const [readTime, setReadTime] = createSignal(props.post.readTime || "5 min read");
  const [filename, setFilename] = createSignal(props.post.filename || "");

  // Update the post whenever any field changes
  const updatePost = () => {
    props.onChange({
      ...props.post,
      title: title(),
      slug: slug(),
      date: date(),
      category: category(),
      description: description(),
      readTime: readTime(),
      content: content(),
      filename: filename()
    });
  };

  // Generate slug from title
  const updateTitle = (newTitle: string) => {
    setTitle(newTitle);
    const newSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setSlug(newSlug);
    updatePost();
  };

  const handleSave = () => {
    const updatedPost = {
      ...props.post,
      title: title(),
      slug: slug(),
      date: date(),
      category: category(),
      description: description(),
      readTime: readTime(),
      content: content(),
      filename: filename()
    };
    props.onSave(updatedPost);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    props.onChange({
      ...props.post,
      title: title(),
      slug: slug(),
      date: date(),
      category: category(),
      description: description(),
      readTime: readTime(),
      content: newContent,
      filename: filename()
    });
  };

  return (
    <div class="admin-container">
      <header class="admin-header">
        <h1 class="admin-title" style={{ "font-size": "1.5rem", margin: "0" }}>
          {props.isNew ? "New Post" : "Edit Post"}
        </h1>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={props.onCancel} class="btn-outline">
            Cancel
          </button>
          <button onClick={handleSave} class="admin-btn btn-sm" disabled={props.loading}>
            {props.loading ? "Saving..." : "Save & Publish"}
          </button>
        </div>
      </header>

      <div class="editor-layout">
        <aside class="editor-sidebar">
          <Show when={props.error}>
            <div style={{ 
              background: "#fee2e2", 
              color: "#991b1b", 
              padding: "0.75rem", 
              "border-radius": "8px", 
              "margin-bottom": "1.5rem",
              "font-size": "0.875rem",
              border: "1px solid #fecaca"
            }}>
              {props.error}
            </div>
          </Show>

          <div class="form-group">
            <label class="form-label">Title</label>
            <input
              type="text"
              class="admin-input"
              value={title()}
              onInput={(e) => updateTitle((e.target as HTMLInputElement).value)}
              placeholder="Post title..."
            />
          </div>

          <div class="form-group">
            <label class="form-label">Slug</label>
            <input
              type="text"
              class="admin-input"
              value={slug()}
              onInput={(e) => {
                setSlug((e.target as HTMLInputElement).value);
                updatePost();
              }}
              placeholder="url-slug"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Date</label>
            <input
              type="date"
              class="admin-input"
              value={date()}
              onInput={(e) => {
                setDate((e.target as HTMLInputElement).value);
                updatePost();
              }}
            />
          </div>

          <div class="form-group">
            <label class="form-label">Category</label>
            <select
              class="admin-input"
              value={category()}
              onChange={(e) => {
                setCategory((e.target as HTMLSelectElement).value);
                updatePost();
              }}
            >
              <option>Technology</option>
              <option>Strategy</option>
              <option>Compliance</option>
              <option>Risk</option>
              <option>News</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Read Time</label>
            <input
              type="text"
              class="admin-input"
              value={readTime()}
              onInput={(e) => {
                setReadTime((e.target as HTMLInputElement).value);
                updatePost();
              }}
              placeholder="e.g. 5 min read"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Description (SEO)</label>
            <textarea
              class="admin-input"
              rows={4}
              value={description()}
              onInput={(e) => {
                setDescription((e.target as HTMLTextAreaElement).value);
                updatePost();
              }}
              placeholder="Short summary for search engines..."
              style={{ resize: "vertical" }}
            />
          </div>
        </aside>

        <main class="editor-main">
          <RichTextEditor
            value={content()}
            onChange={handleContentChange}
          />
        </main>
      </div>
    </div>
  );
}
