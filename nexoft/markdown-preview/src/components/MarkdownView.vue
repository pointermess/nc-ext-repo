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
            renderedContent.value = `<div class="error">
                <strong>Error rendering markdown</strong>
                <p>${e}</p>
            </div>`
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
    <div class="markdown-preview-container">
        <div v-if="!hasContent" class="empty-state">
            <div class="empty-icon-wrapper">
                <div class="empty-icon">📝</div>
            </div>
            <div class="empty-title">Markdown Preview</div>
            <div class="empty-description">Select a markdown file to visualize your content</div>
        </div>

        <div v-else class="markdown-wrapper">
            <div class="markdown-body prose prose-invert" v-html="renderedContent" />
        </div>
    </div>
</template>

<style>
.markdown-preview-container {
    height: 100%;
    width: 100%;
    background: var(--color-background, #0c0c0e);
    color: var(--color-text-primary, #e4e4e7);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.markdown-wrapper {
    flex: 1;
    overflow-y: auto;
    padding: 40px;
    scroll-behavior: smooth;
}

/* Scrollbar styling */
.markdown-wrapper::-webkit-scrollbar {
    width: 10px;
}

.markdown-wrapper::-webkit-scrollbar-track {
    background: transparent;
}

.markdown-wrapper::-webkit-scrollbar-thumb {
    background: var(--color-surface);
    border: 3px solid var(--color-background);
    border-radius: 10px;
}

.markdown-wrapper::-webkit-scrollbar-thumb:hover {
    background: var(--color-border-muted);
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    padding: 2rem;
}

.empty-icon-wrapper {
    width: 80px;
    height: 80px;
    background: var(--color-surface);
    border: 1px solid var(--color-border-muted);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.empty-icon {
    font-size: 2.5rem;
}

.empty-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--color-text-primary);
}

.empty-description {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    max-width: 250px;
}

/* Premium Markdown Body Styling */
.markdown-body {
    max-width: 880px;
    margin: 0 auto;
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 16px;
    line-height: 1.6;
}

.markdown-body h1 {
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 2.5rem 0 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border-muted);
    color: var(--color-text-primary);
}

.markdown-body h2 {
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 2rem 0 1rem;
    color: var(--color-text-primary);
}

.markdown-body h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 1.5rem 0 0.75rem;
}

.markdown-body p {
    margin-bottom: 1.25rem;
    color: var(--color-text-secondary);
}

.markdown-body a {
    color: var(--color-accent, #6366f1);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    border-bottom: 1px solid transparent;
}

.markdown-body a:hover {
    border-bottom-color: currentColor;
}

.markdown-body ul,
.markdown-body ol {
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
}

.markdown-body li {
    margin-bottom: 0.5rem;
}

.markdown-body code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.85em;
    background: var(--color-surface);
    padding: 0.2em 0.4em;
    border-radius: 6px;
    color: var(--color-accent);
}

.markdown-body pre {
    background: var(--color-surface-elevated, #18181b);
    border: 1px solid var(--color-border-muted);
    padding: 1.25rem;
    border-radius: 12px;
    overflow-x: auto;
    margin: 1.5rem 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.markdown-body pre code {
    background: transparent;
    padding: 0;
    font-size: 0.9em;
    color: var(--color-text-secondary);
}

.markdown-body blockquote {
    border-left: 4px solid var(--color-accent-muted);
    padding: 0.5rem 1.5rem;
    margin: 1.5rem 0;
    color: var(--color-text-muted);
    font-style: italic;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0 8px 8px 0;
}

.markdown-body table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 1.5rem 0;
    border: 1px solid var(--color-border-muted);
    border-radius: 8px;
    overflow: hidden;
}

.markdown-body th,
.markdown-body td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border-muted);
    border-right: 1px solid var(--color-border-muted);
    text-align: left;
}

.markdown-body th:last-child,
.markdown-body td:last-child {
    border-right: none;
}

.markdown-body tr:last-child td {
    border-bottom: none;
}

.markdown-body th {
    background: var(--color-surface);
    font-weight: 600;
    color: var(--color-text-primary);
}

.markdown-body hr {
    border: none;
    border-top: 1px solid var(--color-border-muted);
    margin: 2.5rem 0;
}

.markdown-body img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 1.5rem 0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.markdown-body .error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #ef4444;
    padding: 1.5rem;
    border-radius: 12px;
    margin: 1.5rem 0;
}

.markdown-body .error strong {
    display: block;
    margin-bottom: 0.5rem;
}
</style>
