import { createSignal, onMount, onCleanup } from "solid-js";

interface RichTextEditorProps {
  value: string;
  onChange: (markdown: string) => void;
}

// Convert markdown to HTML for display
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');
  
  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');
  
  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
  
  // Inline code
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  
  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  
  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  
  // Images
  html = html.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" />');
  
  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr />');
  
  // Paragraphs (wrap remaining text)
  html = html.split('\n\n').map(block => {
    if (block.trim() && !block.startsWith('<')) {
      return `<p>${block}</p>`;
    }
    return block;
  }).join('\n');
  
  // Line breaks
  html = html.replace(/\n/g, '<br />');
  
  return html;
}

// Convert HTML back to markdown
function htmlToMarkdown(html: string): string {
  let markdown = html;
  
  // Remove extra whitespace
  markdown = markdown.replace(/&nbsp;/g, ' ');
  
  // Headers
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  
  // Bold
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  
  // Italic
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  
  // Strikethrough
  markdown = markdown.replace(/<del[^>]*>(.*?)<\/del>/gi, '~~$1~~');
  markdown = markdown.replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~');
  
  // Code blocks
  markdown = markdown.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n');
  
  // Inline code
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
  
  // Blockquotes
  markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n');
  
  // Lists
  markdown = markdown.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
    return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n') + '\n';
  });
  markdown = markdown.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
    let index = 1;
    return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${index++}. $1\n`) + '\n';
  });
  
  // Links
  markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Images
  markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)');
  
  // Horizontal rule
  markdown = markdown.replace(/<hr\s*\/?>/gi, '\n---\n\n');
  
  // Paragraphs
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  
  // Line breaks
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
  
  // Remove remaining HTML tags
  markdown = markdown.replace(/<[^>]+>/g, '');
  
  // Clean up extra newlines
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  markdown = markdown.trim();
  
  return markdown;
}

export default function RichTextEditor(props: RichTextEditorProps) {
  let editorRef: HTMLDivElement | undefined;
  const [isReady, setIsReady] = createSignal(false);

  onMount(() => {
    if (editorRef) {
      // Initialize with markdown converted to HTML
      editorRef.innerHTML = markdownToHtml(props.value);
      setIsReady(true);
    }
  });

  const handleInput = () => {
    if (editorRef) {
      const markdown = htmlToMarkdown(editorRef.innerHTML);
      props.onChange(markdown);
    }
  };

  // Execute formatting command
  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef?.focus();
    handleInput();
  };

  // Insert heading
  const insertHeading = (level: 1 | 2 | 3) => {
    execCommand('formatBlock', `h${level}`);
  };

  // Insert link
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  // Insert image
  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  return (
    <div class="rich-editor-container">
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
          <button type="button" class="toolbar-btn" onClick={() => execCommand('formatBlock', 'p')} title="Paragraph">
            P
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn" onClick={() => execCommand('bold')} title="Bold (Ctrl+B)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
              <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => execCommand('italic')} title="Italic (Ctrl+I)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="4" x2="10" y2="4" />
              <line x1="14" y1="20" x2="5" y2="20" />
              <line x1="15" y1="4" x2="9" y2="20" />
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => execCommand('strikeThrough')} title="Strikethrough">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 4H9a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H7" />
              <line x1="4" y1="12" x2="20" y2="12" />
            </svg>
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn" onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="9" y1="6" x2="20" y2="6" />
              <line x1="9" y1="12" x2="20" y2="12" />
              <line x1="9" y1="18" x2="20" y2="18" />
              <circle cx="4" cy="6" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="4" cy="18" r="1" fill="currentColor" />
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => execCommand('insertOrderedList')} title="Numbered List">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <text x="3" y="7" font-size="6" fill="currentColor" stroke="none">1</text>
              <text x="3" y="13" font-size="6" fill="currentColor" stroke="none">2</text>
              <text x="3" y="19" font-size="6" fill="currentColor" stroke="none">3</text>
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => execCommand('formatBlock', 'blockquote')} title="Quote">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z" />
            </svg>
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn" onClick={() => execCommand('formatBlock', 'pre')} title="Code Block">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => execCommand('insertHorizontalRule')} title="Horizontal Rule">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn" onClick={insertLink} title="Insert Link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={insertImage} title="Insert Image">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </button>
        </div>

        <div class="toolbar-divider" />

        <div class="toolbar-group">
          <button type="button" class="toolbar-btn" onClick={() => execCommand('undo')} title="Undo (Ctrl+Z)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7v6h6M3 13a9 9 0 1 0 2.5-6.5L3 9" />
            </svg>
          </button>
          <button type="button" class="toolbar-btn" onClick={() => execCommand('redo')} title="Redo (Ctrl+Y)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 7v6h-6M21 13a9 9 0 1 1-2.5-6.5L21 9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Editor */}
      <div class="rich-editor-wrapper">
        <div
          ref={editorRef}
          class="rich-editor blog-content"
          contentEditable={true}
          onInput={handleInput}
          onBlur={handleInput}
        />
      </div>
    </div>
  );
}