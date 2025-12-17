import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import {
  ConfirmPopupData,
  ConfirmPopupResult,
} from './confirm.types';

@Component({
  standalone: true,
  selector: 'ui-confirm-dialog',
  imports: [CommonModule],
  template: `
    <h2>{{ data.title || 'Confirm' }}</h2>
    <p>{{ data.message }}</p>

    <div class="actions">
      <button (click)="cancel()">
        {{ data.cancelText || 'Cancel' }}
      </button>
      <button (click)="ok()">
        {{ data.okText || 'OK' }}
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 16px;
        width: 100%;
        background: white;
        border-radius: 8px;
      }

      h2 {
        margin-top: 0;
      }
      .actions {
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    `,
  ],
})
export class ConfirmDialog {
  private ref =
    inject<DialogRef<ConfirmPopupResult>>(DialogRef);
  data = inject<ConfirmPopupData>(DIALOG_DATA);

  ok() {
    this.ref.close({ confirmed: true });
  }

  cancel() {
    this.ref.close({ confirmed: false });
  }
}
