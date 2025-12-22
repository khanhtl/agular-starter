import {
  Component,
  input
} from '@angular/core';
import { DataGridRowComponent } from './data-grid-row';
import { ColumnConfig } from './data-grid.types';

@Component({
  selector: '[dataGridBody]',
  standalone: true,
  imports: [DataGridRowComponent],
  template: `
    @for (row of data(); let rowIndex = $index; track rowIndex) {
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
  data = input<Record<string, any>[]>([]);
  columns = input<ColumnConfig[]>([]);
  rowKey = input<string | undefined>(undefined);
  cellTemplatesMap = input<Map<string, any>>(new Map());

  trackByRow = (_: number, row: Record<string, any>) =>
    row[this.rowKey() || 'id'] ?? _;
}
