# Angular Data Grid Component

A high-performance, feature-rich Data Grid component for Angular applications. Built with Signals and optimized for modern Angular standards.

## Features

- **Column Pinning**: Pin columns to the left or right.
- **Complex Headers**: Support for nested/grouped headers with automatic colspan/rowspan calculation.
- **Responsive Layout**: Sticky headers and pinned columns with synchronized scrolling.
- **Dynamic Row Heights**: Correctly handles variable row heights (text wrapping/multi-lines) even across pinned sections.
- **Custom Templates**: Fully customizable cell rendering using directives.
- **Custom Classes**: Apply custom CSS classes to headers and cells dynamically.
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
import { ColumnConfig } from '@angular-starter/ui/data-grid';

interface User {
  id: number;
  name: string;
  role: string;
  status: string;
}

columns: ColumnConfig<User>[] = [
  { key: 'id', title: 'ID', width: 80, pinned: 'left' },
  { key: 'name', title: 'Name', width: 200 },
  { 
    key: 'role', 
    title: 'Role', 
    width: 150,
    cellClass: (row) => row.role === 'Admin' ? 'text-bold' : '' 
  },
  { key: 'actions', title: 'Actions', width: 100, pinned: 'right' }
];

data: User[] = [
  { id: 1, name: 'Alice', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob', role: 'User', status: 'Inactive' },
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
| `width` | `string \| number` | Width of the column (e.g., '100px' or 100). |
| `pinned` | `'left' \| 'right'` | (Optional) Pin state. |
| `align` | `'left' \| 'center' \| 'right'` | Text alignment. |
| `children` | `ColumnConfig[]` | (Optional) Nested columns for grouped headers. |
| `pinnable` | `boolean` | (Optional) Allow user to toggle pin state (default: true). |
| `headerClass`| `string` | (Optional) CSS class to apply to the header cell. |
| `cellClass` | `string \| (row) => string` | (Optional) CSS class to apply to the body cell. |

### Custom Cell Templates

Use `*cellTemplate` to customize specific cells based on column key.

```html
<app-data-grid [data]="users" [columns]="columns">
  
  <!-- Custom rendering for 'status' column -->
  <ng-template cellTemplate="status" let-value="value" let-row="row">
    <span class="badge" [class.active]="value === 'Active'">
      {{ value }}
    </span>
  </ng-template>

  <!-- Custom rendering for 'actions' column -->
  <ng-template cellTemplate="actions" let-row="row">
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
The grid is rendered as three separate `<table>` elements (Left Pinned, Regular, Right Pinned) inside a flex container.

- **`DataGridComponent`** observes resizing and data changes.
- It calculates the maximum natural height of a row across all 3 tables.
- It explicitly applies this height to all corresponding `<tr>` elements to ensure alignment.

### State Management
State (pinned columns, data) is managed internally using `Signals`.
