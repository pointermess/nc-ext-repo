# C/C++ Language Support for NexCODE

Comprehensive C and C++ language support for NexCODE IDE, powered by Clangd.

## Features

### 🧠 IntelliSense (Clangd LSP)
- **Auto-completion** with detailed suggestions
- **Go to Definition** / **Go to Declaration**
- **Find References** and **Rename Symbol**
- **Hover Information** with documentation
- **Real-time Diagnostics** with clang-tidy integration
- **Code Actions** and Quick Fixes
- **Signature Help** for function parameters

### 📝 Code Formatting
- Integrated **clang-format** support
- Format on Save (configurable)
- Format on Paste (configurable)
- Respects `.clang-format` configuration files

### 🔍 Linting
- **cppcheck** integration for static analysis
- Lint on Save (configurable)
- Real-time linting (configurable)

### 🔧 Compiler Profiles
Built-in compiler profiles for common compilers:
- **GCC** (g++) - Default on Linux
- **Clang** (clang++) - Default on macOS
- **MSVC** (cl) - Default on Windows

### 🚀 Launch Configurations
Pre-configured launch profiles:
- **Debug C++ Application** - Full debug support with GDB/LLDB
- **Run C++ Application** - Quick run without debugging

### 🐛 Debugger Support
- **GDB** integration (Linux/Windows)
- **LLDB** integration (macOS)
- Breakpoints, stepping, variable inspection

## Requirements

### Bundled
- **clangd** - Language Server (bundled in `libs/`)

### System Requirements
The following tools should be available in your system PATH:

- **Compiler** (one of):
  - GCC (g++) 
  - Clang (clang++)
  - MSVC (cl)

- **Debugger** (one of):
  - GDB
  - LLDB

- **Optional Tools**:
  - `clang-format` for formatting
  - `cppcheck` for static analysis

## Installation

The extension is automatically discovered when placed in NexCODE's extensions directory.

## Configuration

Language settings can be configured in **Settings → Programming Languages → C++**:

| Setting | Description | Default |
|---------|-------------|---------|
| LSP Enabled | Enable Clangd language server | `true` |
| LSP Command | Path to clangd binary | Bundled |
| Formatter Enabled | Enable code formatting | `true` |
| Format on Save | Auto-format when saving | `true` |
| Linter Enabled | Enable static analysis | `true` |
| Lint on Save | Run linter on save | `true` |

## Commands

| Command | Description |
|---------|-------------|
| `C++: Restart Clangd` | Restart the Clangd language server |
| `C++: Select Compiler` | Choose the active compiler profile |
| `C++: Create Launch Configuration` | Set up a new launch/debug configuration |

## Project Configuration

### compile_commands.json

For best results, generate a `compile_commands.json` file in your project root:

**CMake:**
```bash
cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=ON .
```

**Bear (for Make):**
```bash
bear -- make
```

### .clang-format

Create a `.clang-format` file in your project for formatting preferences:

```yaml
BasedOnStyle: Google
IndentWidth: 4
ColumnLimit: 100
```

## Extension Manifest

This extension contributes:
- Language definitions for C and C++
- LSP configuration (Clangd)
- Formatter integration (clang-format)
- Linter integration (cppcheck)
- Compiler profiles (GCC, Clang, MSVC)
- Launch profiles (Debug, Run)
- Debugger configuration (GDB, LLDB)

## License

MIT
