<script setup lang="ts">
/**
 * TodoPanel.vue
 * 
 * A simple todo list panel demonstrating NexCODE's extension system.
 * This component will be compiled at runtime using vue3-sfc-loader.
 */
import { ref, computed, onMounted } from 'vue'

// Todo item interface
interface TodoItem {
    id: string
    text: string
    completed: boolean
    createdAt: number
}

// State
const todos = ref<TodoItem[]>([])
const newTodoText = ref('')
const filter = ref<'all' | 'active' | 'completed'>('all')
const isLoading = ref(true)

// Generate unique ID
function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Computed
const filteredTodos = computed(() => {
    switch (filter.value) {
        case 'active':
            return todos.value.filter(t => !t.completed)
        case 'completed':
            return todos.value.filter(t => t.completed)
        default:
            return todos.value
    }
})

const activeTodosCount = computed(() =>
    todos.value.filter(t => !t.completed).length
)

const completedTodosCount = computed(() =>
    todos.value.filter(t => t.completed).length
)

// Actions
function addTodo() {
    const text = newTodoText.value.trim()
    if (!text) return

    todos.value.unshift({
        id: generateId(),
        text,
        completed: false,
        createdAt: Date.now()
    })

    newTodoText.value = ''
    saveTodos()
}

function toggleTodo(id: string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

function deleteTodo(id: string) {
    const index = todos.value.findIndex(t => t.id === id)
    if (index !== -1) {
        todos.value.splice(index, 1)
        saveTodos()
    }
}

function clearCompleted() {
    todos.value = todos.value.filter(t => !t.completed)
    saveTodos()
}

// Persistence
function saveTodos() {
    try {
        localStorage.setItem('nexcode.todo-list.todos', JSON.stringify(todos.value))
    } catch (e) {
        console.error('[TodoPanel] Failed to save todos:', e)
    }
}

function loadTodos() {
    try {
        const saved = localStorage.getItem('nexcode.todo-list.todos')
        if (saved) {
            todos.value = JSON.parse(saved)
        }
    } catch (e) {
        console.error('[TodoPanel] Failed to load todos:', e)
    }
}

// Lifecycle
onMounted(() => {
    loadTodos()
    isLoading.value = false
})
</script>

<template>
    <div class="flex flex-col h-full p-3 font-sans text-[var(--color-text-primary)]">
        <!-- Header -->
        <div class="mb-4">
            <h2 class="flex items-center gap-2 mb-2 text-lg font-semibold">
                <span class="text-xl">✅</span>
                Todo List
            </h2>
            <div class="flex gap-3 text-xs">
                <span class="px-2 py-0.5 rounded-full bg-[var(--color-surface-elevated)]"
                    :class="{ 'text-blue-400': true }">{{ activeTodosCount }} active</span>
                <span class="px-2 py-0.5 rounded-full bg-[var(--color-surface-elevated)]"
                    :class="{ 'text-green-400': true }">{{ completedTodosCount }} done</span>
            </div>
        </div>

        <!-- Add Todo Input -->
        <div class="flex gap-2 mb-3">
            <input v-model="newTodoText" type="text" placeholder="What needs to be done?"
                class="flex-1 px-3 py-2.5 bg-[var(--color-bg-level-2)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-[var(--color-text-muted)] transition-all"
                @keyup.enter="addTodo" />
            <button
                class="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg text-white text-2xl font-light hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                @click="addTodo" :disabled="!newTodoText.trim()">
                <span>+</span>
            </button>
        </div>

        <!-- Filter Tabs -->
        <div class="flex gap-1 p-1 mb-3 bg-[var(--color-surface)] rounded-lg">
            <button v-for="f in ['all', 'active', 'completed']" :key="f"
                class="flex-1 py-1.5 px-3 rounded-md text-xs font-medium capitalize transition-all"
                :class="filter === f ? 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-sm' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'"
                @click="filter = f as any">
                {{ f }}
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center gap-2 p-8 text-sm text-[var(--color-text-muted)]">
            <div
                class="w-4 h-4 border-2 border-[var(--color-border-muted)] border-t-indigo-500 rounded-full animate-spin">
            </div>
            Loading todos...
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredTodos.length === 0"
            class="flex flex-col items-center justify-center p-8 text-center text-[var(--color-text-muted)]">
            <span class="text-4xl mb-2 opacity-50">📝</span>
            <p v-if="filter === 'all'" class="text-sm m-0">No todos yet. Add one above!</p>
            <p v-else-if="filter === 'active'" class="text-sm m-0">No active todos. Great job!</p>
            <p v-else class="text-sm m-0">No completed todos yet.</p>
        </div>

        <!-- Todo List -->
        <div v-else class="flex-1 overflow-y-auto flex flex-col gap-1.5">
            <div v-for="todo in filteredTodos" :key="todo.id"
                class="group flex items-center gap-2.5 p-2.5 bg-[var(--color-surface)] border border-[var(--color-border-muted)] rounded-lg hover:border-[var(--color-border)] transition-all"
                :class="{ 'opacity-60': todo.completed }">

                <button
                    class="w-5 h-5 flex items-center justify-center bg-transparent border-2 border-[var(--color-border-muted)] rounded-md text-white text-xs cursor-pointer hover:border-indigo-500 transition-all shrink-0"
                    :class="{ 'bg-gradient-to-br from-indigo-500 to-violet-500 border-transparent': todo.completed }"
                    @click="toggleTodo(todo.id)">
                    <span v-if="todo.completed">✓</span>
                </button>

                <span class="flex-1 text-sm break-all"
                    :class="{ 'line-through text-[var(--color-text-muted)]': todo.completed }">{{ todo.text }}</span>

                <button
                    class="w-6 h-6 flex items-center justify-center bg-transparent border-none rounded-md text-[var(--color-text-muted)] text-xl cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-500 transition-all shrink-0"
                    @click="deleteTodo(todo.id)">
                    ×
                </button>
            </div>
        </div>

        <!-- Footer Actions -->
        <div v-if="completedTodosCount > 0" class="mt-3 pt-3 border-t border-[var(--color-border-muted)]">
            <button
                class="w-full py-2 px-3 bg-transparent border border-[var(--color-border-muted)] rounded-md text-[var(--color-text-muted)] text-xs hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 transition-all"
                @click="clearCompleted">
                Clear {{ completedTodosCount }} completed
            </button>
        </div>
    </div>
</template>
