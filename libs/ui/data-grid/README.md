# Angular Data Grid Component

A high-performance, feature-rich Data Grid component for Angular applications. Built with Signals and optimized for modern Angular standards.

## Features

- **Column Pinning**: Pin columns to the left or right.
- **Complex Headers**: Support for nested/grouped headers with automatic colspan/rowspan calculation.
- **Responsive Layout**: Sticky headers and pinned columns with synchronized scrolling.
- **Dynamic Row Heights**: Correctly handles variable row heights (text wrapping/multi-lines) even across pinned sections.
- **Custom Templates**: Fully customizable cell rendering using directives.
- **Signals Based**: Uses Angular Signals for reactive state management and OnPush performance.

## Installation

Ensure you have the module imported in your component:

```typescript
import { DataGridComponent, ColumnConfig } from '@angular-starter/ui/data-grid';

@Component({
  standalone: true,
  imports: [DataGridComponent],
  // ...
})
export class MyComponent {}
```

## Basic Usage

### 1. Define Columns

```typescript
// component.ts
columns: ColumnConfig[] = [
  { key: 'id', title: 'ID', width: '80px', pinned: 'left' },
  { key: 'name', title: 'Name', width: '200px' },
  { key: 'role', title: 'Role', width: '150px' },
  { key: 'actions', title: 'Actions', width: '100px', pinned: 'right' }
];

data = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' },
];
```

### 2. Use Component

```html
<!-- component.html -->
<app-data-grid
  [data]="data"
  [columns]="columns"
  rowKey="id"
  height="500px"
>
</app-data-grid>
```

## Advanced Features

### Column Configuration (`ColumnConfig`)

| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` | Unique identifier for data mapping. |
| `title` | `string` | Display text in header. |
| `width` | `string` | Width of the column (e.g., '100px'). |
| `pinned` | `'left' \| 'right'` | (Optional) Pin state. |
| `align` | `'left' \| 'center' \| 'right'` | Text alignment. |
| `children` | `ColumnConfig[]` | (Optional) Nested columns for grouped headers. |
| `pinnable` | `boolean` | (Optional) Allow user to toggle pin state (default: true). |

### Custom Cell Templates

Use `*cellSlot` to customize specific cells based on column key or special functionalities.

```html
<app-data-grid [data]="users" [columns]="columns">
  
  <!-- Custom rendering for 'status' column -->
  <ng-template cellSlot="status" let-value="value">
    <span class="badge" [class.active]="value === 'Active'">
      {{ value }}
    </span>
  </ng-template>

  <!-- Custom rendering for 'actions' column -->
  <ng-template cellSlot="actions" let-row="row">
    <button (click)="edit(row)">Edit</button>
  </ng-template>

</app-data-grid>
```

### Grouped Headers

Simply nest columns in the definition:

```typescript
{
  key: 'contact',
  title: 'Contact Info',
  children: [
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Phone' }
  ]
}
```

## Architecture Notes

### Layout Synchronization
The grid is rendered as three separate `<table>` elements (Left Pinned, Regular, Right Pinned) inside a flex container to support sticky positioning correctly across all browsers.

To ensure rows align perfectly even when content wraps:
- **`DataGridComponent`** observes resizing and data changes.
- It calculates the maximum natural height of a row across all 3 tables.
- It explicitly applies this height to all corresponding `<tr>` elements.

### State Management
State (pinned columns, data) is managed internally using `Signals`. When a user pins a column:
1. `DataGridComponent` updates its internal signal.
2. `computed` signals recalculate the 3 table structures.
3. The UI updates efficiently without full re-render.
