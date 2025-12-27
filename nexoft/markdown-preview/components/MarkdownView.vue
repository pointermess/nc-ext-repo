<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// Access global API - bypass import issues
const nexcode = (window as any).nexcode
const editor = nexcode.editor

const content = ref('')
const renderedContent = ref('')

// Simple Markdown Parser (fallback if markdown-it is unavailable/not installed)
function parseMarkdown(text: string) {
    if (!text) return ''
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

    // Header
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-4">$1</h2>')
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2 mt-3">$1</h3>')

    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')

    // Italic
    html = html.replace(/\*(.*)\*/gim, '<i>$1</i>')

    // Code block
    html = html.replace(/```([\s\S]*?)```/gim, '<pre class="bg-gray-800 p-2 rounded block"><code>$1</code></pre>')

    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code class="bg-gray-800 px-1 rounded">$1</code>')

    // Paragraphs (newline)
    html = html.replace(/\n\n/gim, '<p class="my-2"></p>')
    html = html.replace(/\n/gim, '<br>')

    return html
}

function updateContent() {
    if (editor.activeFile && typeof editor.activeFile.content === 'string') {
        content.value = editor.activeFile.content
        renderedContent.value = parseMarkdown(content.value)
    }
}

onMounted(() => {
    updateContent()

    // Listen to global changes
    const { events } = nexcode
    if (events) {
        events.onDidChangeActiveFile(() => updateContent())
        events.onDidChangeTextDocument(() => updateContent())
    }
})
</script>

<template>
    <div class="h-full w-full bg-[var(--color-bg-level-1)] overflow-auto p-8 text-[var(--color-text-primary)]">
        <div v-if="!renderedContent" class="flex flex-col items-center justify-center h-full text-gray-500">
            <div class="text-xl">Preview</div>
        </div>
        <div class="markdown-body prose prose-invert max-w-none" v-html="renderedContent"></div>
    </div>
</template>

<style>
.markdown-body h1 {
    border-bottom: 1px solid var(--color-border-muted);
    padding-bottom: 0.5rem;
}
</style>
