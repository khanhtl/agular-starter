import {
  Component,
  computed,
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
    @for (row of displayData(); let rowIndex = $index; track trackByRow(rowIndex, row)) {
      <tr
        class="data-grid-row"
        dataGridRow
        [row]="row"
        [columns]="columns()"
        [rowIndex]="rowIndex"
        [loading]="loading()"
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

  /** Whether the grid is in loading state. */
  loading = input<boolean>(false);

  /** Number of skeleton rows to show when loading. Default `5`. */
  skeletonRows = input<number>(5);

  /** Map of cell templates for custom rendering. */
  cellTemplatesMap = input<Map<string, any>>(new Map());

  /** Computed list of data to display, including skeletons if loading. */
  displayData = computed(() => {
    if (this.loading()) {
      return Array(this.skeletonRows()).fill({});
    }
    return this.data();
  });

  trackByRow(index: number, row: Record<string, any>): any {
    if (this.loading()) return index;
    const key = this.rowKey();
    return key ? row[key] : index;
  }
}
