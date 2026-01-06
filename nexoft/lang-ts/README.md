# TypeScript Language Support for NexCODE

Provides comprehensive TypeScript and JavaScript language support for NexCODE IDE.

## Features

- **IntelliSense** — Auto-completion, parameter hints, and quick info via TypeScript Language Server
- **Code Navigation** — Go-to-definition, find references, and symbol search
- **Diagnostics** — Real-time error and warning detection
- **JSX/TSX Support** — Full React development support
- **Code Formatting** — Integration with Prettier
- **Linting** — Integration with ESLint

## Requirements

### TypeScript Language Server

This extension requires `typescript-language-server` to be installed globally:

```bash
npm install -g typescript-language-server typescript
```

Or with yarn:

```bash
yarn global add typescript-language-server typescript
```

### Optional Tools

For formatting and linting support:

```bash
npm install -g prettier eslint
```

## Supported Languages

| Language | Extensions | Language ID |
|----------|------------|-------------|
| TypeScript | `.ts`, `.mts`, `.cts` | `typescript` |
| TypeScript React | `.tsx` | `typescriptreact` |
| JavaScript | `.js`, `.mjs`, `.cjs` | `javascript` |
| JavaScript React | `.jsx` | `javascriptreact` |

## Commands

| Command | Description |
|---------|-------------|
| `typescript.restartServer` | Restart the TypeScript Language Server |
| `typescript.organizeImports` | Organize imports in the current file |
| `typescript.goToProjectConfig` | Open tsconfig.json or jsconfig.json |

## Configuration

The extension configures the following settings:

```json
{
    "lsp": {
        "enabled": true,
        "command": "typescript-language-server",
        "args": ["--stdio"]
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

## Project Configuration

The extension looks for `tsconfig.json` or `jsconfig.json` in your project root. If not found, you can create one using the **Go to Project Configuration** command.

### Sample tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

## Development

### Building the Extension

```bash
cd nexcode-extensions/nexcode/lang-ts
npm install
npm run build
```

### Watching for Changes

```bash
npm run dev
```

## Bundling the Language Server (Future)

For self-contained distribution, the TypeScript Language Server can be bundled in the `libs/` directory:

```
libs/
├── typescript-language-server.cmd  (Windows)
├── typescript-language-server      (Unix)
└── node_modules/
    ├── typescript/
    └── typescript-language-server/
```

## License

MIT

## Author

NexCODE Team
