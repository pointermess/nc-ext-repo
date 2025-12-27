<script setup lang="ts">
/**
 * MarkdownView Component
 * 
 * Renders Markdown content using markdown-it.
 * This component is bundled with the extension including the markdown-it dependency.
 */
import { ref, onMounted, onUnmounted, watch } from 'vue'
import MarkdownIt from 'markdown-it'

// Access global NexCODE API
const nexcode = (window as any).nexcode
const editor = nexcode?.editor

// State
const content = ref('')
const renderedContent = ref('')
const hasContent = ref(false)

// Initialize markdown-it with full features
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
})

/**
 * Update content from the active file
 */
function updateContent() {
    if (editor?.activeFile && typeof editor.activeFile.content === 'string') {
        content.value = editor.activeFile.content
        hasContent.value = true

        try {
            renderedContent.value = md.render(content.value)
        } catch (e) {
            console.error('[MarkdownView] Rendering error:', e)
            renderedContent.value = `<p class="error">Error rendering markdown: ${e}</p>`
        }
    } else {
        hasContent.value = false
        renderedContent.value = ''
    }
}

// Event cleanup
let disposables: Array<{ dispose(): void }> = []

onMounted(() => {
    console.log('[MarkdownView] Component mounted')
    updateContent()

    // Listen for file changes
    if (nexcode?.events) {
        disposables.push(
            nexcode.events.onDidChangeActiveFile(() => updateContent()),
            nexcode.events.onDidChangeTextDocument(() => updateContent())
        )
    }
})

onUnmounted(() => {
    // Cleanup event listeners
    for (const d of disposables) {
        d.dispose()
    }
    disposables = []
})
</script>

<template>
    <div class="markdown-view nexcode-markdown-preview-extension">
        <!-- Empty state -->
        <div v-if="!hasContent" class="empty-state">
            <div class="empty-icon">📝</div>
            <div class="empty-title">Markdown Preview</div>
            <div class="empty-description">Open a markdown file to see the preview</div>
        </div>

        <!-- Rendered content -->
        <div v-else class="markdown-body" v-html="renderedContent" />
    </div>
</template>

<style>
.markdown-view {
    height: 100%;
    width: 100%;
    background: var(--color-bg-level-1, #1e1e1e);
    color: var(--color-text-primary, #e4e4e7);
    overflow: auto;
    padding: 24px 32px;
    font-family: system-ui, -apple-system, sans-serif;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    opacity: 0.5;
}

.empty-icon {
    font-size: 3rem;
    margin-bottom: 16px;
}

.empty-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
}

.empty-description {
    font-size: 0.875rem;
}
</style>

<style>
/* Global styles for rendered markdown */
.markdown-body {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
}

.markdown-body h1 {
    font-size: 1.6rem;
    font-weight: 700;
    border-bottom: 1px solid var(--color-border-muted, #3f3f46);
    padding-bottom: 0.5rem;
    margin: 1.5rem 0 1rem;
}

.markdown-body h2 {
    font-size: 1.5em;
    font-weight: 600;
    margin: 1.5rem 0 0.75rem;
}

.markdown-body h3 {
    font-size: 1.25em;
    font-weight: 600;
    margin: 1.25rem 0 0.5rem;
}

.markdown-body p {
    margin: 1rem 0;
}

.markdown-body ul,
.markdown-body ol {
    margin: 1rem 0;
    padding-left: 2rem;
}

.markdown-body ul {
    list-style-type: disc;
}

.markdown-body ol {
    list-style-type: decimal;
}

.markdown-body li {
    margin: 0.25rem 0;
}

.markdown-body blockquote {
    border-left: 4px solid var(--color-primary, #6366f1);
    padding-left: 1rem;
    margin: 1rem 0;
    color: var(--color-text-muted, #a1a1aa);
    font-style: italic;
}

.markdown-body pre {
    background: var(--color-bg-level-2, #27272a);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1rem 0;
}

.markdown-body code {
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.9em;
}

.markdown-body :not(pre)>code {
    background: var(--color-bg-level-2, #27272a);
    padding: 0.2em 0.4em;
    border-radius: 4px;
}

.markdown-body table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
}

.markdown-body th,
.markdown-body td {
    border: 1px solid var(--color-border-muted, #3f3f46);
    padding: 0.5rem 1rem;
    text-align: left;
}

.markdown-body th {
    background: var(--color-bg-level-2, #27272a);
    font-weight: 600;
}

.markdown-body tr:nth-child(even) {
    background: rgba(255, 255, 255, 0.02);
}

.markdown-body a {
    color: var(--color-primary, #6366f1);
    text-decoration: none;
}

.markdown-body a:hover {
    text-decoration: underline;
}

.markdown-body img {
    max-width: 100%;
    border-radius: 8px;
}

.markdown-body hr {
    border: none;
    border-top: 1px solid var(--color-border-muted, #3f3f46);
    margin: 2rem 0;
}

.markdown-body .error {
    color: #ef4444;
    padding: 1rem;
    background: rgba(239, 68, 68, 0.1);
    border-radius: 8px;
}
</style>
