import { onMount, onCleanup, createSignal } from "solid-js";
import { Editor, rootCtx, defaultValueCtx, editorViewCtx } from "@milkdown/core";
import { 
  commonmark, 
  toggleStrongCommand, 
  toggleEmphasisCommand, 
  wrapInBlockquoteCommand, 
  insertHrCommand,
  wrapInHeadingCommand,
  createCodeBlockCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
  insertImageCommand,
  toggleLinkCommand
} from "@milkdown/preset-commonmark";
import { gfm, toggleStrikethroughCommand } from "@milkdown/preset-gfm";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { history, undoCommand, redoCommand } from "@milkdown/plugin-history";
import { clipboard } from "@milkdown/plugin-clipboard";
import { indent } from "@milkdown/plugin-indent";
import { callCommand } from "@milkdown/utils";

interface MilkdownEditorProps {
  value: string;
  onChange: (markdown: string) => void;
}

// Toolbar button component
function ToolbarButton(props: { 
  onClick: () => void; 
  active?: boolean; 
  disabled?: boolean;
  title: string;
  children: any;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.title}
      class={`toolbar-btn ${props.active ? 'active' : ''}`}
    >
      {props.children}
    </button>
  );
}

function ToolbarDivider() {
  return <div class="toolbar-divider" />;
}

export default function MilkdownEditor(props: MilkdownEditorProps) {
  let editorRef: HTMLDivElement | undefined;
  let editorInstance: Editor | null = null;
  const [isReady, setIsReady] = createSignal(false);

  onMount(async () => {
    if (!editorRef) return;

    editorInstance = await Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, editorRef!);
        ctx.set(defaultValueCtx, props.value);
        ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
          props.onChange(markdown);
        });
      })
      .use(commonmark)
      .use(gfm)
      .use(listener)
      .use(history)
      .use(clipboard)
      .use(indent)
      .create();
    
    setIsReady(true);
  });

  onCleanup(() => {
    editorInstance?.destroy();
    setIsReady(false);
  });

  // Command execution helper
  const runCommand = (command: Parameters<typeof callCommand>[0], payload?: unknown) => {
    if (!editorInstance) return;
    editorInstance.action(callCommand(command, payload));
    // Refocus editor after command
    editorInstance.action((ctx) => {
      const view = ctx.get(editorViewCtx);
      view.focus();
    });
  };

  // Insert heading using proper command
  const insertHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    runCommand(wrapInHeadingCommand.key, level);
  };

  // Insert code block using proper command
  const insertCodeBlock = () => {
    runCommand(createCodeBlockCommand.key, "");
  };

  // Insert link using proper command
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (!url) return;
    runCommand(toggleLinkCommand.key, { href: url });
  };

  // Insert image using proper command
  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (!url) return;
    const alt = prompt('Enter alt text:', 'Image') || 'Image';
    runCommand(insertImageCommand.key, { src: url, alt, title: alt });
  };

  // Insert bullet list
  const insertBulletList = () => {
    runCommand(wrapInBulletListCommand.key);
  };

  // Insert ordered list
  const insertOrderedList = () => {
    runCommand(wrapInOrderedListCommand.key);
  };

  return (
    <div class="milkdown-container">
      {/* Toolbar */}
      <div class="editor-toolbar">
        <div class="toolbar-group">
          <ToolbarButton onClick={() => runCommand(undoCommand.key)} title="Undo (Ctrl+Z)" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7v6h6M3 13a9 9 0 1 0 2.5-6.5L3 9" />
            </svg>
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand(redoCommand.key)} title="Redo (Ctrl+Y)" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 7v6h-6M21 13a9 9 0 1 1-2.5-6.5L21 9" />
            </svg>
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        <div class="toolbar-group">
          <ToolbarButton onClick={() => insertHeading(1)} title="Heading 1" disabled={!isReady()}>
            H1
          </ToolbarButton>
          <ToolbarButton onClick={() => insertHeading(2)} title="Heading 2" disabled={!isReady()}>
            H2
          </ToolbarButton>
          <ToolbarButton onClick={() => insertHeading(3)} title="Heading 3" disabled={!isReady()}>
            H3
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        <div class="toolbar-group">
          <ToolbarButton onClick={() => runCommand(toggleStrongCommand.key)} title="Bold (Ctrl+B)" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
              <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
            </svg>
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand(toggleEmphasisCommand.key)} title="Italic (Ctrl+I)" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="4" x2="10" y2="4" />
              <line x1="14" y1="20" x2="5" y2="20" />
              <line x1="15" y1="4" x2="9" y2="20" />
            </svg>
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand(toggleStrikethroughCommand.key)} title="Strikethrough" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 4H9a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H7" />
              <line x1="4" y1="12" x2="20" y2="12" />
            </svg>
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        <div class="toolbar-group">
          <ToolbarButton onClick={insertBulletList} title="Bullet List" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="9" y1="6" x2="20" y2="6" />
              <line x1="9" y1="12" x2="20" y2="12" />
              <line x1="9" y1="18" x2="20" y2="18" />
              <circle cx="4" cy="6" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="4" cy="18" r="1" fill="currentColor" />
            </svg>
          </ToolbarButton>
          <ToolbarButton onClick={insertOrderedList} title="Numbered List" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <text x="3" y="7" font-size="6" fill="currentColor" stroke="none">1</text>
              <text x="3" y="13" font-size="6" fill="currentColor" stroke="none">2</text>
              <text x="3" y="19" font-size="6" fill="currentColor" stroke="none">3</text>
            </svg>
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand(wrapInBlockquoteCommand.key)} title="Quote" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z" />
            </svg>
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        <div class="toolbar-group">
          <ToolbarButton onClick={insertCodeBlock} title="Code Block" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand(insertHrCommand.key)} title="Horizontal Rule" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          </ToolbarButton>
        </div>

        <ToolbarDivider />

        <div class="toolbar-group">
          <ToolbarButton onClick={insertLink} title="Insert Link" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </ToolbarButton>
          <ToolbarButton onClick={insertImage} title="Insert Image" disabled={!isReady()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </ToolbarButton>
        </div>
      </div>

      {/* Editor */}
      <div class="milkdown-wrapper">
        <div ref={editorRef} class="milkdown-editor" />
      </div>
    </div>
  );
}