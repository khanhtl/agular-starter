import { CommonModule } from '@angular/common';
import { Component, TemplateRef, input } from '@angular/core';
import { ColumnConfig } from './data-grid.types';

/**
 * Component responsible for rendering the content of a single cell.
 * Supports custom templates via `cellTemplate`.
 */
@Component({
  selector: '[dataGridCell]',
  imports: [CommonModule],
  standalone: true,
  template: `
    <ng-container *ngIf="cellTemplate(); else default">
      <ng-container
        [ngTemplateOutlet]="cellTemplate()"
        [ngTemplateOutletContext]="{
          row: row(),
          value: row()[column().key],
          column: column(),
          rowIndex: rowIndex()
        }"
      />
    </ng-container>

    <ng-template #default>
      {{ row()[column().key] }}
    </ng-template>
  `,
  styles: [`
    .data-grid-cell {
      padding: calc(var(--w-space-sm) / 2) var(--w-space-sm);
      border-bottom: 1px solid var(--c-border);
      color: var(--c-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;

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
export class DataGridCellComponent {
  /** The data object for the row this cell belongs to. */
  row = input.required<any>();

  /** The configuration for the column this cell belongs to. */
  column = input.required<ColumnConfig>();

  /** The index of the row. */
  rowIndex = input<number>();

  /** 
   * Custom template to render for this cell. 
   * If provided, overrides default text rendering. 
   */
  cellTemplate = input<TemplateRef<any> | null>(null);
}
