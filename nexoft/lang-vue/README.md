# Vue Language Support for NexCODE

Provides comprehensive Vue 3 language support for NexCODE IDE using Volar (Vue Language Server).

## Features

- **IntelliSense** — Auto-completion, parameter hints, and quick info for Vue components, props, emits, and more
- **Template Intelligence** — Smart completion for HTML tags, Vue directives, and component references
- **Script Support** — TypeScript and JavaScript support in `<script>` blocks with full type checking
- **Style Support** — CSS, SCSS, Less support in `<style>` blocks
- **Code Navigation** — Go-to-definition, find references for components, props, and methods
- **Diagnostics** — Real-time error and warning detection in templates, scripts, and styles
- **Code Formatting** — Integration with Prettier for consistent code style

## Requirements

### Bundled Dependencies

This extension includes `@vue/language-server` (Volar) as a bundled dependency, so **no global installation is required**. The extension is completely self-contained.

### Optional Tools

For enhanced formatting and linting support, you can optionally install:

```bash
npm install -g prettier eslint eslint-plugin-vue
```

These are optional and only needed if you want to use Prettier for formatting or ESLint for linting.

## Supported Languages

| Language | Extensions | Language ID |
|----------|------------|-------------|
| Vue | `.vue` | `vue` |

## Commands

| Command | Description |
|---------|-------------|
| `vue.restartServer` | Restart the Vue Language Server (Volar) |
| `vue.openDocs` | Open Vue 3 documentation in browser |
| `vue.showOutputChannel` | Show Vue Language Server output (future) |

## Configuration

The extension configures the following settings:

```json
{
    "lsp": {
        "enabled": true,
        "command": "node",
        "args": ["<extension-path>/node_modules/@vue/language-server/bin/vue-language-server.js", "--stdio"]
    },
    "formatter": {
        "enabled": true,
        "command": "prettier",
        "formatOnSave": true
    },
    "linter": {
        "enabled": true,
        "command": "eslint",
        "lintOnSave": true
    }
}
```

## Vue 3 Single File Components

The extension provides full support for Vue 3 `.vue` files with three sections:

### Template Block
```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
```

### Script Block (TypeScript)
```vue
<script setup lang="ts">
import { ref } from 'vue'

const msg = ref<string>('Hello Vue 3!')
</script>
```

### Style Block
```vue
<style scoped>
.hello {
  color: #42b983;
}
</style>
```

## TypeScript Support

For TypeScript support in Vue files, ensure your project has a `tsconfig.json`:

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "strict": true,
        "jsx": "preserve",
        "esModuleInterop": true,
        "skipLibCheck": true,
        "resolveJsonModule": true
    },
    "include": ["src/**/*.ts", "src/**/*.vue"],
    "exclude": ["node_modules"]
}
```

## Development

### Building the Extension

```bash
cd nexcode-extensions/nexcode/lang-vue
npm install
npm run build
```

### Watching for Changes

```bash
npm run dev
```

## How It Works

The extension includes Vue Language Server (Volar) as an npm dependency. When activated:

1. The extension references `node_modules/@vue/language-server/bin/vue-language-server.js`
2. It spawns Node.js to execute the language server
3. Communication happens via stdio using the Language Server Protocol

This approach ensures:
- **No global dependencies** — Everything is bundled with the extension
- **Version control** — The extension controls which Volar version it uses
- **Easy updates** — Update the dependency in `package.json` to upgrade
- **Cross-platform** — Works on Windows, macOS, and Linux without modification

## Volar Features

Volar (Vue Language Server) provides:
- **Composition API** support with full TypeScript inference
- **Template type checking** — Catch errors in templates before runtime
- **Component prop validation** — Autocomplete and type checking for props
- **Emit event validation** — Type-safe event emitters
- **Auto imports** — Automatic component and composable imports
- **Vue 3 specific features** — Teleport, Suspense, and more

## License

MIT

## Author

NexCODE Team
