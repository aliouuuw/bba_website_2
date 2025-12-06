import { createSignal, createEffect, Show } from "solid-js";
import { marked } from "marked";

interface MarkdownEditorProps {
  value: string;
  onChange: (markdown: string) => void;
}

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const [content, setContent] = createSignal(props.value);
  const [preview, setPreview] = createSignal("");
  const [showPreview, setShowPreview] = createSignal(true);

  // Update preview when content changes
  createEffect(() => {
    const html = marked(content(), { breaks: true, gfm: true });
    setPreview(html as string);
  });

  const handleInput = (e: InputEvent) => {
    const newContent = (e.target as HTMLTextAreaElement).value;
    setContent(newContent);
    props.onChange(newContent);
  };

  // Toolbar actions
  const insertText = (before: string, after: string = "") => {
    const textarea = document.querySelector(".markdown-textarea") as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = content();
    const selectedText = text.substring(start, end);
    
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    setContent(newText);
    props.onChange(newText);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const insertHeading = (level: number) => {
    const prefix = "#".repeat(level) + " ";
    insertText(prefix);
  };

  return (
    <div class="markdown-editor-container">
      {/* Toolbar */}
      <div class="editor-toolbar">
        <div class="toolbar-group">
          <button type="button" class="toolbar-btn" onClick={() => insertHeading(1)} title="Heading 1">
            H1
          </button>
          <button type="button" class="toolbar-btn" onClick={() => insertHeading(2)} title="Heading 2">
            H2
          </button>
          <button type="button" class="toolbar-btn" onClick={() => insertHeading(3)} title="Heading 3">
            H3
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn" onClick={() => insertText("**", "**")} title="Bold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
              <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => insertText("*", "*")} title="Italic">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="4" x2="10" y2="4" />
              <line x1="14" y1="20" x2="5" y2="20" />
              <line x1="15" y1="4" x2="9" y2="20" />
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => insertText("~~", "~~")} title="Strikethrough">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 4H9a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H7" />
              <line x1="4" y1="12" x2="20" y2="12" />
            </svg>
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn" onClick={() => insertText("- ")} title="Bullet List">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="9" y1="6" x2="20" y2="6" />
              <line x1="9" y1="12" x2="20" y2="12" />
              <line x1="9" y1="18" x2="20" y2="18" />
              <circle cx="4" cy="6" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="4" cy="18" r="1" fill="currentColor" />
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => insertText("1. ")} title="Numbered List">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <text x="3" y="7" font-size="6" fill="currentColor" stroke="none">1</text>
              <text x="3" y="13" font-size="6" fill="currentColor" stroke="none">2</text>
              <text x="3" y="19" font-size="6" fill="currentColor" stroke="none">3</text>
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => insertText("> ")} title="Quote">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z" />
            </svg>
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn" onClick={() => insertText("```\n", "\n```")} title="Code Block">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => insertText("\n---\n")} title="Horizontal Rule">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn" onClick={() => {
            const url = prompt('Enter URL:');
            if (url) insertText("[", `](${url})`);
          }} title="Insert Link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => {
            const url = prompt('Enter image URL:');
            if (url) insertText("![Image](", `${url})`);
          }} title="Insert Image">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </button>
        </div>

        <div style={{ "margin-left": "auto" }}>
          <button 
            type="button" 
            class={`toolbar-btn ${showPreview() ? 'active' : ''}`}
            onClick={() => setShowPreview(!showPreview())}
            title="Toggle Preview"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Editor and Preview */}
      <div class="markdown-editor-content" style={{ display: "grid", "grid-template-columns": showPreview() ? "1fr 1fr" : "1fr", gap: "0" }}>
        <div class="markdown-editor-pane">
          <textarea
            class="markdown-textarea admin-input"
            value={content()}
            onInput={handleInput}
            placeholder="Write your markdown here..."
            style={{
              width: "100%",
              height: "100%",
              "min-height": "500px",
              resize: "none",
              "font-family": "var(--font-mono)",
              "font-size": "0.9rem",
              "line-height": "1.6",
              padding: "1.5rem",
              border: "1px solid rgba(45, 42, 94, 0.1)",
              "border-right": showPreview() ? "none" : "1px solid rgba(45, 42, 94, 0.1)",
              background: "var(--color-white)",
              "margin-bottom": "0"
            }}
          />
        </div>
        
        <Show when={showPreview()}>
          <div 
            class="markdown-preview blog-content"
            style={{
              padding: "1.5rem",
              "overflow-y": "auto",
              background: "var(--color-white)",
              border: "1px solid rgba(45, 42, 94, 0.1)",
              "min-height": "500px"
            }}
            innerHTML={preview()}
          />
        </Show>
      </div>
    </div>
  );
}