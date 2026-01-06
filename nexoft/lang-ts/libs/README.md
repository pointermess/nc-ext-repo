# TypeScript Language Server Binaries

This directory is intended to contain bundled TypeScript Language Server binaries for self-contained distribution.

## Current Status

Currently, the extension uses the system-installed `typescript-language-server`. 

## Bundling Instructions

To bundle the TypeScript Language Server:

### Windows

1. Install the package locally:
   ```bash
   npm install typescript-language-server typescript
   ```

2. Create a wrapper script `typescript-language-server.cmd`:
   ```batch
   @echo off
   node "%~dp0node_modules\typescript-language-server\lib\cli.mjs" %*
   ```

### Unix (macOS/Linux)

1. Install the package locally:
   ```bash
   npm install typescript-language-server typescript
   ```

2. Create a wrapper script `typescript-language-server`:
   ```bash
   #!/bin/bash
   node "$(dirname "$0")/node_modules/typescript-language-server/lib/cli.mjs" "$@"
   ```

3. Make it executable:
   ```bash
   chmod +x typescript-language-server
   ```

## Directory Structure

```
libs/
├── .gitkeep
├── README.md (this file)
├── typescript-language-server.cmd  (Windows wrapper)
├── typescript-language-server      (Unix wrapper)
└── node_modules/
    ├── typescript/
    └── typescript-language-server/
```
