# Todo List Extension

A simple but fully-featured todo list extension for NexCODE that demonstrates the extension system capabilities.

## Features

- ✅ Add, complete, and delete todos
- 📂 Filter by All / Active / Completed
- 💾 Persistent storage across sessions
- 🎨 Beautiful dark mode UI
- ⌨️ Keyboard shortcuts

## Installation

Copy this folder to your NexCODE extensions directory:
- Windows: `%APPDATA%\nexcode\extensions\todo-list\`
- macOS: `~/Library/Application Support/nexcode/extensions/todo-list/`
- Linux: `~/.config/nexcode/extensions/todo-list/`

## Commands

| Command | Keybinding | Description |
|---------|------------|-------------|
| `todo-list.addTodo` | `Ctrl+Shift+T` | Focus the add todo input |
| `todo-list.clearCompleted` | - | Clear all completed todos |

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `todo-list.showCompleted` | boolean | `true` | Show completed todos in the list |
| `todo-list.persistTodos` | boolean | `true` | Persist todos across sessions |

## File Structure

```
todo-list/
├── manifest.json           # Extension metadata
├── index.ts                # Entry point (commands, activation)
├── README.md               # This file
└── components/
    └── TodoPanel.vue       # Main sidebar panel (Vue SFC)
```

## How It Works

1. **Discovery**: NexCODE scans the extensions directory for `manifest.json` files
2. **Activation**: The `index.ts` `activate()` function is called
3. **Panel Loading**: When the user clicks the Todo List icon in the activity bar, `TodoPanel.vue` is loaded using `vue3-sfc-loader` (runtime Vue SFC compilation)
4. **State**: Todos are persisted to localStorage

## Development

This extension demonstrates:

- **Vue 3 Composition API** with `<script setup>`
- **Reactive state** with `ref` and `computed`
- **Scoped CSS** that works with NexCODE's theming
- **Local storage** for persistence
- **Command registration** via the NexCODE API

## Screenshots

The extension adds a sidebar panel with:
- A beautiful gradient add button
- Filter tabs for All/Active/Completed
- Animated checkboxes
- Hover-reveal delete buttons
- Statistics showing active and completed counts

## License

MIT
