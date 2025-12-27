export interface Coordinate {
    x: number
    y: number
}

export interface Size {
    width: number
    height: number
}

export interface Primitive {
    id: string
    type: string
    position: Coordinate
    selected?: boolean
}

export interface TableCell {
    content: string
    rowSpan: number
    colSpan: number
    width?: number
}

export interface Table extends Primitive {
    type: 'table'
    rows: number
    cols: number
    cells: TableCell[][]
    style: 'box' | 'simple' | 'markdown' | 'grid'
    autoSize: boolean
    defaultCellWidth: number
}

export type TextAlign =
    | 'top-left' | 'top-center' | 'top-right'
    | 'center-left' | 'center-center' | 'center-right'
    | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface Box extends Primitive {
    type: 'box'
    size: Size
    filled: boolean
    content: string
    autoSize: boolean
    textAlign: TextAlign
}

export interface Line extends Primitive {
    type: 'line'
    end: Coordinate
    style: 'single' | 'double' | 'dashed'
    horizontal: boolean
}

export interface TextElement extends Primitive {
    type: 'text'
    content: string
}

export type CanvasElement = Table | Box | Line | TextElement
