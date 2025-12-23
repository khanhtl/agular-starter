export interface ColumnConfig<T = any> {
    /** Unique identifier for the column. Used to map data to cells. */
    key: string;

    /** The text to display in the header. */
    title: string;

    /**
     * Width of the column.
     * Can be a string (e.g., '100px', '20%') or number (interpreted as pixels).
     */
    width?: string | number;

    /** Horizontal alignment of the content. Default is 'left'. */
    align?: 'left' | 'center' | 'right';

    /**
     * Whether the column should be pinned to the 'left' or 'right'.
     * Pinned columns stay visible while scrolling horizontally.
     */
    pinned?: 'left' | 'right';

    /**
     * Whether the user can toggle the pinned state of this column.
     * Default is false.
     */
    pinnable?: boolean;

    /**
     * Custom template name to use for this cell.
     * Corresponds to the `cellTemplate` directive in the HTML.
     */
    cellTemplate?: string;

    /** Nested columns for grouped headers. */
    children?: ColumnConfig<T>[];

    /** Custom CSS class for the header cell. */
    headerClass?: string;

    /** Custom CSS class for the body cell. */
    cellClass?: string | ((row: T) => string);

    // Internal use for layout calculation
    level?: number;
    colSpan?: number;
    rowSpan?: number;
    parentKey?: string;
}

export interface DataGridProps<T = any> {
    columns: ColumnConfig<T>[];
    data: T[];
    height?: string;
    rowKey?: string;
    onColumnPinChange?: (columnKey: string, newPinState: 'left' | 'right' | undefined) => void;
}

