export interface ColumnConfig {
    key: string
    title: string
    width?: string
    align?: 'left' | 'center' | 'right'
    sortable?: boolean
    pinned?: 'left' | 'right'
    pinnable?: boolean
    children?: ColumnConfig[]
    level?: number
    colSpan?: number
    rowSpan?: number
    parentKey?: string
    cellTemplate?: string
}

export interface DataGridProps {
    columns: ColumnConfig[]
    data: Record<string, any>[]
    height?: string
    rowKey?: string
    onColumnPinChange?: (columnKey: string, newPinState: 'left' | 'right' | undefined) => void
}

