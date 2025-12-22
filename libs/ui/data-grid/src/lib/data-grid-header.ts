import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  input,
  output
} from '@angular/core';
import { ColumnConfig } from './data-grid.types';
import { PinIconComponent } from './pin-icon';

@Component({
  selector: '[dataGridHeader]',
  standalone: true,
  imports: [PinIconComponent, NgClass],
  template: `
    @for (level of headerLevels(); let levelIndex = $index; track levelIndex) {
  <tr>
    @for (column of level; track column.key) {
      <th
        class="data-grid-header-cell"
        [style.width]="column.width"
        [style.text-align]="column.align || 'left'"
        [attr.colspan]="column.colSpan || 1"
        [attr.rowspan]="column.rowSpan || 1"
        [class.data-grid-header-cell-parent]="column.children?.length"
        [class.pinned-left]="column.pinned === 'left'"
        [class.pinned-right]="column.pinned === 'right'">

        <div class="header-cell-content" 
            [ngClass]="['header-cell-content-'+(column.align || 'left')]"
            [attr.max-depth]="maxHeaderDepth()"
            [style.height]="column.children?.length || column.parentKey ? '36px': (36 * maxHeaderDepth() + 'px')"
            [class.header-cell-content-parent]="column.children?.length">
          <span class="header-title">
            {{ column.title }}
          </span>

          @if (column.pinnable) {
            <app-pin-icon
              [pinState]="getPinState(column)"
              [pinnable]="column.pinnable"
              (pinChange)="handlePinClick(column.key, $event)">
            </app-pin-icon>
          }
        </div>

      </th>
    }
  </tr>
}

  `,
  styles: [`
    .data-grid-header-cell {
        padding: 0 !important;
        &.pinned-right:first-child {
                border-left: 1px solid var(--c-border);
        }
    }
    .header-cell-content {
        box-sizing: border-box;
        padding: 8px;
        display: flex;
        align-items: center;
        border-right: 1px solid var(--c-border);
        border-bottom: 1px solid var(--c-border);
        &-parent {
            border-bottom: 1px solid var(--c-border);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &-left {
            justify-content: flex-start;
        }
        &-right {
            justify-content: flex-end;
        }
        &-center {
            justify-content: center;
        }
    }
  `]
})
export class DataGridHeaderComponent {
  columns = input<ColumnConfig[]>([]);
  maxHeaderDepth = input<number>(1);

  columnPinChange = output<{
    columnKey: string;
    newPinState: 'left' | 'right' | undefined;
  }>();


  private collectLeafPaths(
    columns: ColumnConfig[],
    path: ColumnConfig[] = [],
    result: ColumnConfig[][] = []
  ): ColumnConfig[][] {
    for (const col of columns) {
      const nextPath = [...path, col];

      if (col.children?.length) {
        this.collectLeafPaths(col.children, nextPath, result);
      } else {
        result.push(nextPath);
      }
    }
    return result;
  }

  private buildHeaderLevels(columns: ColumnConfig[]): ColumnConfig[][] {
    const leafPaths = this.collectLeafPaths(columns);
    // Use maxHeaderDepth from input to ensure all tables have same number of header rows
    const maxDepth = this.maxHeaderDepth() || (leafPaths.length > 0 ? Math.max(...leafPaths.map(p => p.length)) : 1);

    const levels: ColumnConfig[][] = Array.from(
      { length: maxDepth },
      () => []
    );

    const seen = new Map<string, ColumnConfig>();

    for (const path of leafPaths) {
      path.forEach((col, level) => {
        const id = `${col.key}-${level}`;

        if (!seen.has(id)) {
          const isLeaf = !col.children?.length;

          const cell: ColumnConfig = {
            ...col,
            level,
            parentKey: level > 0 ? path[level - 1].key : undefined,
            colSpan: 0,
            rowSpan: isLeaf ? maxDepth - level : 1
          };

          seen.set(id, cell);
          levels[level].push(cell);
        }

        seen.get(id)!.colSpan! += 1;
      });
    }

    return levels;
  }

  headerLevels = computed(() =>
    this.buildHeaderLevels(this.columns())
  );
  getPinState(column: ColumnConfig): 'none' | 'left' | 'right' {
    if (column.pinned === 'left') return 'left';
    if (column.pinned === 'right') return 'right';
    return 'none';
  }

  handlePinClick(
    columnKey: string,
    newPinState: 'left' | 'right' | undefined
  ) {
    this.columnPinChange.emit({ columnKey, newPinState });
  }
}
