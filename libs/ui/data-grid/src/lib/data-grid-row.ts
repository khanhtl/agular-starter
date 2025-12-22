import {
  Component,
  input
} from '@angular/core';
import { DataGridCellComponent } from './data-grid-cell';
import { ColumnConfig } from './data-grid.types';

@Component({
  selector: '[dataGridRow]',
  standalone: true,
  imports: [DataGridCellComponent],
  template: `
    @for (column of columns(); track column.key) {
      <td dataGridCell
        [style.min-width]="column.width"
        [style.max-width]="column.width"
        [style.text-align]="column.align || 'left'"
        class="data-grid-cell"
        [row]="row()"
        [column]="column"
        [rowIndex]="rowIndex()"
        [cellTemplate]="getCellTemplate(column)">
      </td>
    }
  `,
  styles: [`
    .data-grid-cell {
        padding: calc(var(--w-space-sm) / 2) var(--w-space-sm);
        border-bottom: 1px solid var(--c-border);
        color: var(--c-text);
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        height: 36px;
        box-sizing: border-box;
        &.pinned-left {
            background-color: var(--c-white);
            position: sticky;
            z-index: 4;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        }

        &.pinned-right {
            background-color: var(--c-white);
            position: sticky;
            z-index: 4;
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        }
    }

.dark .data-grid-cell {
  color: var(--c-text);
  border-bottom-color: var(--c-border);

  &.pinned-left,
  &.pinned-right {
    background-color: var(--c-bg);
  }
}
  `]
})
export class DataGridRowComponent {
  row = input<Record<string, any>>();
  columns = input<ColumnConfig[]>([]);
  rowIndex = input<number>();
  cellTemplatesMap = input<Map<string, any>>(new Map());

  getCellTemplate(column: ColumnConfig) {
    if (column.cellTemplate) {
      return this.cellTemplatesMap().get(column.cellTemplate) || null;
    }
    return this.cellTemplatesMap().get(column.key) || this.cellTemplatesMap().get('cell-' + column.key) || null;
  }

  trackByKey = (_: number, col: ColumnConfig) => col.key;
}
