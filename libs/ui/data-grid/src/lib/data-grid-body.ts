import {
  Component,
  input
} from '@angular/core';
import { DataGridRowComponent } from './data-grid-row';
import { ColumnConfig } from './data-grid.types';

/**
 * Component responsible for rendering the table body.
 * Iterates over data rows and renders `DataGridRowComponent`.
 */
@Component({
  selector: '[dataGridBody]',
  standalone: true,
  imports: [DataGridRowComponent],
  template: `
    @for (row of data(); let rowIndex = $index; track trackByRow(rowIndex, row)) {
      <tr
        class="data-grid-row"
        dataGridRow
        [row]="row"
        [columns]="columns()"
        [rowIndex]="rowIndex"
        [cellTemplatesMap]="cellTemplatesMap()">
      </tr>
    }
  `,
  styles: [`
    .data-grid-row {
      &:hover {
        background-color: rgba(var(--c-brand), 0.05);
      }
    }

    .dark .data-grid-row {
      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }
    }
  `]
})
export class DataGridBodyComponent {
  /** The data to display. */
  data = input<Record<string, any>[]>([]);

  /** The columns to render. */
  columns = input<ColumnConfig[]>([]);

  /** Unique key to track rows for performance optimization. */
  rowKey = input<string | undefined>(undefined);

  /** Map of cell templates for custom rendering. */
  cellTemplatesMap = input<Map<string, any>>(new Map());

  trackByRow(index: number, row: Record<string, any>): any {
    const key = this.rowKey();
    return key ? row[key] : index;
  }
}
