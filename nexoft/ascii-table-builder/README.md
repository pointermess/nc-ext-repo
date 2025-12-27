# ASCII Table Builder Extension

An interactive ASCII table builder for NexCODE that allows you to create and edit beautiful ASCII tables with multiple styles.

## Features

- **Interactive Editor**: Edit table cells directly in a visual grid
- **Multiple Styles**: Choose from Box Drawing, Simple, Markdown, and Grid styles
- **Customizable**: Adjust rows, columns, and cell width
- **Real-time Preview**: See your table as you build it
- **Easy Integration**: Copy to clipboard or insert directly into your editor

## Usage

### Opening the Table Builder

1. **Keyboard Shortcut**: Press `Ctrl+Shift+T`
2. **Command Palette**: Run "Open ASCII Table Builder"
3. **File Association**: Open any `.txt`, `.md`, or `.ascii` file

### Building a Table

1. Set the number of rows and columns
2. Choose your preferred style
3. Edit cell contents in the visual editor
4. Adjust cell width as needed
5. Copy or insert the generated table

## Table Styles

### Box Drawing
```
┌────────────┬────────────┬────────────┐
│ Header 1   │ Header 2   │ Header 3   │
├────────────┼────────────┼────────────┤
│ Cell 1,1   │ Cell 1,2   │ Cell 1,3   │
├────────────┼────────────┼────────────┤
│ Cell 2,1   │ Cell 2,2   │ Cell 2,3   │
└────────────┴────────────┴────────────┘
```

### Simple
```
| Header 1     | Header 2     | Header 3     |
|--------------|--------------|--------------|
| Cell 1,1     | Cell 1,2     | Cell 1,3     |
| Cell 2,1     | Cell 2,2     | Cell 2,3     |
```

### Markdown
```
| Header 1     | Header 2     | Header 3     |
|--------------|--------------|--------------|
| Cell 1,1     | Cell 1,2     | Cell 1,3     |
| Cell 2,1     | Cell 2,2     | Cell 2,3     |
```

### Grid
```
+--------------+--------------+--------------+
| Header 1     | Header 2     | Header 3     |
+--------------+--------------+--------------+
| Cell 1,1     | Cell 1,2     | Cell 1,3     |
+--------------+--------------+--------------+
| Cell 2,1     | Cell 2,2     | Cell 2,3     |
+--------------+--------------+--------------+
```

## Commands

- `ascii-table-builder.open` - Open the table builder interface
- `ascii-table-builder.insert` - Insert a default 3x3 table at cursor

## Development

### Building

```bash
npm install
npm run build
```

### Watch Mode

```bash
npm run dev
```

## License

MIT
