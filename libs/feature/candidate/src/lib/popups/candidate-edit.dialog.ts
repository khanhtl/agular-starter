export interface CandidateEditResult {
  saved: boolean;
  data: Candidate;
}

import {
  DIALOG_DATA,
  DialogRef,
} from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Candidate } from '../candidate.types';

@Component({
  standalone: true,
  selector: 'candidate-edit-dialog',
  imports: [CommonModule],
  template: `
    <h2>Edit Candidate</h2>

    <p>Candidate ID: {{ data.id }}</p>

    <label>
      Name:
      <input
        [value]="name()"
        (input)="name.set($any($event.target).value)"
      />
    </label>

    <div class="actions">
      <button (click)="cancel()">Cancel</button>
      <button
        (click)="save()"
        [disabled]="saving()"
      >
        {{ saving() ? 'Saving...' : 'Save' }}
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
export class CandidateEditPopup {
  readonly data = inject<Candidate>(DIALOG_DATA);
  private readonly dialogRef =
    inject<DialogRef<CandidateEditResult>>(DialogRef);

  name = signal('');
  saving = signal(false);

  constructor() {
    this.name.set(this.data.name);
  }

  cancel() {
    this.dialogRef.close();
  }

  async save() {
    this.saving.set(true);

    await new Promise(r => setTimeout(r, 200));

    this.saving.set(false);
    this.dialogRef.close({ saved: true, data: { id: this.data.id, name: this.name() } });
  }
}

