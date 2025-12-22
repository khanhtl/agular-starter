import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal,
  viewChild
} from '@angular/core';
import { DataGridBodyComponent } from './data-grid-body';
import { CellTemplateDirective } from './data-grid-cell-template';
import { DataGridHeaderComponent } from './data-grid-header';
import { ColumnConfig } from './data-grid.types';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [DataGridHeaderComponent, DataGridBodyComponent, CellTemplateDirective, NgTemplateOutlet],
  template: `
    <div class="data-grid" [style.height]="height()" #dataGrid>
  <div class="data-grid-container">
    <div class="data-grid-table-wrapper">

      @if (leftPinnedColumns().length > 0) {
        <table class="data-grid-table data-grid-table-left">
          <thead dataGridHeader class="data-grid-header"
                 [columns]="leftHeaderColumns()"
                 [maxHeaderDepth]="maxHeaderDepth()"
                 (columnPinChange)="handleColumnPinChange($event)">
          </thead>

          <tbody dataGridBody class="data-grid-body"
                 [data]="data()"
                 [columns]="leftPinnedColumns()"
                 [rowKey]="rowKey()"
                 [cellTemplatesMap]="cellTemplateMap()">
          </tbody>
        </table>
      }

      @if (regularColumns().length > 0) {
        <table class="data-grid-table data-grid-table-regular">
          <thead dataGridHeader class="data-grid-header"
                 [columns]="regularHeaderColumns()"
                 [maxHeaderDepth]="maxHeaderDepth()"
                 (columnPinChange)="handleColumnPinChange($event)">
          </thead>

          <tbody dataGridBody class="data-grid-body"
                 [data]="data()"
                 [columns]="regularColumns()"
                 [rowKey]="rowKey()"
                 [cellTemplatesMap]="cellTemplateMap()">
          </tbody>
        </table>
      }

      @if (rightPinnedColumns().length > 0) {
        <table class="data-grid-table data-grid-table-right">
          <thead dataGridHeader class="data-grid-header"
                 [columns]="rightHeaderColumns()"
                 [maxHeaderDepth]="maxHeaderDepth()"
                 (columnPinChange)="handleColumnPinChange($event)">
          </thead>

          <tbody dataGridBody class="data-grid-body"
                 [data]="data()"
                 [columns]="rightPinnedColumns()"
                 [rowKey]="rowKey()"
                 [cellTemplatesMap]="cellTemplateMap()">
          </tbody>
        </table>
      }

    </div>
  </div>
</div>

  `,
  styles: [`
    .data-grid {
  width: 100%;
  border: 1px solid var(--c-border);
  border-radius: var(--w-radius);
  overflow: hidden;
  background-color: var(--c-white);

  .data-grid-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
  }

  .data-grid-table-wrapper {
    position: relative;
    width: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .data-grid-table {
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;

    thead {
      // display: table; // Removed to restore natural table alignment
      // width: 100%;    // Removed
      // table-layout: fixed; // Removed
    }

    tbody {
      // display: block; // Removed to restore natural table alignment
      
      tr {
        // display: table; // Removed
        // width: 100%;    // Removed
        // table-layout: fixed; // Removed
      }
    }

    &.data-grid-table-left {
      position: sticky;
      left: 0;
      z-index: 15;
      background-color: var(--c-white);
    }

    &.data-grid-table-regular {
      flex: 1;
    }

    &.data-grid-table-right {
      position: sticky;
      right: 0;
      z-index: 15;
      background-color: var(--c-white);
    }
  }
}

.dark .data-grid {
  background-color: var(--c-bg);

  .data-grid-table-left,
  .data-grid-table-right {
    background-color: var(--c-bg);
  }
}
.data-grid-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--c-bg);

  .data-grid-header-cell {
    padding: calc(var(--w-space-sm) / 2) var(--w-space-sm);
    font-weight: 600;
    color: var(--c-text);
    border-bottom: 2px solid var(--c-border);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;

    .header-cell-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .header-title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &.pinned-left {
      background-color: var(--c-bg);
      position: sticky;
      z-index: 11;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    &.pinned-right {
      background-color: var(--c-bg);
      position: sticky;
      z-index: 11;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    }
  }
}

.dark .data-grid-header {
  background-color: rgba(255, 255, 255, 0.1);

  .data-grid-header-cell {
    color: var(--c-text);
    border-bottom-color: var(--c-border);

    &.pinned-left,
    &.pinned-right {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
  `]
})
export class DataGridComponent implements AfterViewInit, OnDestroy {
  dataGrid = viewChild<ElementRef>('dataGrid');
  private resizeObserver?: ResizeObserver;

  data = input<Record<string, any>[]>([]);
  columns = input<ColumnConfig[]>([]);
  height = input<string>('400px');
  rowKey = input<string>('id');

  onColumnPinChange =
    input<(key: string, state: 'left' | 'right' | undefined) => void>();

  columnPinChange = output<{
    columnKey: string;
    newPinState: 'left' | 'right' | undefined;
  }>();


  cellTemplates = contentChildren(CellTemplateDirective);

  cellTemplateMap = computed(() => {
    const map = new Map<string, any>();
    this.cellTemplates().forEach(slot => {
      map.set(slot.name, slot.template);
    });
    return map;
  });


  internalColumns = signal<ColumnConfig[]>([]);

  constructor() {
    effect(() => {
      this.internalColumns.set([...this.columns()]);
      // Sync rows when columns change (might affect text wrapping)
      setTimeout(() => this.syncRowHeights(), 0);
    });

    effect(() => {
      // Sync rows when data changes
      this.data();
      setTimeout(() => this.syncRowHeights(), 0);
    });
  }

  ngAfterViewInit() {
    this.syncRowHeights();
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  private setupResizeObserver() {
    const dataGridEl = this.dataGrid()?.nativeElement;
    if (!dataGridEl) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.syncRowHeights();
    });

    // Observe the container to detect width changes that cause reflow/wrapping
    const container = dataGridEl.querySelector('.data-grid-container');
    if (container) {
      this.resizeObserver.observe(container);
    }
  }

  private syncRowHeights() {
    const dataGridEl = this.dataGrid()?.nativeElement;
    if (!dataGridEl) return;

    const leftRows = dataGridEl.querySelectorAll('.data-grid-table-left .data-grid-row');
    const regularRows = dataGridEl.querySelectorAll('.data-grid-table-regular .data-grid-row');
    const rightRows = dataGridEl.querySelectorAll('.data-grid-table-right .data-grid-row');

    const rowCount = Math.max(leftRows.length, regularRows.length, rightRows.length);

    // Use requestAnimationFrame to ensure we are not thrashing layout too much
    requestAnimationFrame(() => {
      for (let i = 0; i < rowCount; i++) {
        const leftRow = leftRows[i] as HTMLElement;
        const regularRow = regularRows[i] as HTMLElement;
        const rightRow = rightRows[i] as HTMLElement;

        // Reset heights first to allow natural sizing (compacting if content shrank)
        if (leftRow) leftRow.style.height = '';
        if (regularRow) regularRow.style.height = '';
        if (rightRow) rightRow.style.height = '';

        // Read heights
        const heights = [
          leftRow?.offsetHeight || 0,
          regularRow?.offsetHeight || 0,
          rightRow?.offsetHeight || 0
        ];

        const maxHeight = Math.max(...heights);

        // Apply max height
        if (maxHeight > 0) {
          if (leftRow) leftRow.style.height = `${maxHeight}px`;
          if (regularRow) regularRow.style.height = `${maxHeight}px`;
          if (rightRow) rightRow.style.height = `${maxHeight}px`;
        }
      }
    });
  }






  private flattenColumns(cols: ColumnConfig[]): ColumnConfig[] {
    const result: ColumnConfig[] = [];
    const walk = (columns: ColumnConfig[], parentPinned?: 'left' | 'right') => {
      columns.forEach(col => {
        if (col.children?.length) {
          const effectivePinned = col.pinned || parentPinned;
          walk(col.children, effectivePinned);
        } else {
          const effectivePinned = col.pinned || parentPinned;
          result.push({ ...col, pinned: effectivePinned });
        }
      });
    };
    walk(cols);
    return result;
  }

  flattenedColumns = computed(() =>
    this.flattenColumns(this.internalColumns())
  );

  leftPinnedColumns = computed(() =>
    this.flattenedColumns().filter(c => c.pinned === 'left')
  );

  regularColumns = computed(() =>
    this.flattenedColumns().filter(c => !c.pinned)
  );

  rightPinnedColumns = computed(() =>
    this.flattenedColumns().filter(c => c.pinned === 'right')
  );

  leftHeaderColumns = computed(() =>
    this.filterColumnsByPinned(this.internalColumns(), 'left')
  );

  regularHeaderColumns = computed(() =>
    this.filterColumnsByPinned(this.internalColumns(), null)
  );

  rightHeaderColumns = computed(() =>
    this.filterColumnsByPinned(this.internalColumns(), 'right')
  );


  maxHeaderDepth = computed(() => {
    const getMaxDepth = (cols: ColumnConfig[], currentDepth = 1): number => {
      if (!cols || cols.length === 0) return currentDepth - 1;

      let maxDepth = currentDepth;
      for (const col of cols) {
        if (col.children?.length) {
          const childDepth = getMaxDepth(col.children, currentDepth + 1);
          maxDepth = Math.max(maxDepth, childDepth);
        }
      }
      return maxDepth;
    };

    return getMaxDepth(this.internalColumns());
  });


  private findColumnByKey(
    columns: ColumnConfig[],
    key: string
  ): ColumnConfig | null {
    for (const col of columns) {
      if (col.key === key) return col;
      if (col.children?.length) {
        const found = this.findColumnByKey(col.children, key);
        if (found) return found;
      }
    }
    return null;
  }

  private filterColumnsByPinned(
    columns: ColumnConfig[],
    pinned: 'left' | 'right' | null
  ): ColumnConfig[] {
    return columns
      .map(col => {
        if (col.children?.length) {
          const effectivePinned = col.pinned;

          const filteredChildren = this.filterColumnsByPinned(
            col.children,
            pinned
          );

          if (filteredChildren.length > 0) {
            return { ...col, children: filteredChildren };
          }

          if (pinned === null) {
            return effectivePinned ? null : col;
          }
          return effectivePinned === pinned ? col : null;
        }

        if (pinned === null) {
          return col.pinned ? null : col;
        }

        return col.pinned === pinned ? col : null;
      })
      .filter(Boolean) as ColumnConfig[];
  }


  handleColumnPinChange(event: {
    columnKey: string;
    newPinState: 'left' | 'right' | undefined;
  }) {
    // Update internal state directly
    this.internalColumns.update(cols => {
      const newCols = [...cols];

      const updateRecursive = (configCols: ColumnConfig[]): boolean => {
        for (const col of configCols) {
          if (col.key === event.columnKey) {
            const setPinned = (c: ColumnConfig, state: 'left' | 'right' | undefined) => {
              c.pinned = state;
              if (c.children?.length) {
                c.children.forEach(child => setPinned(child, state));
              }
            }
            setPinned(col, event.newPinState);
            return true;
          }

          if (col.children?.length) {
            if (updateRecursive(col.children)) return true;
          }
        }
        return false;
      };

      updateRecursive(newCols);
      return newCols;
    });

    // Still emit event in case parent wants to listen (e.g. to save preference)
    this.columnPinChange.emit(event);

    // Call functional input if provided
    const cb = this.onColumnPinChange();
    if (cb) cb(event.columnKey, event.newPinState);
  }
}
