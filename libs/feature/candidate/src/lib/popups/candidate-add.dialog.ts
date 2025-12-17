import {
  DialogRef,
} from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Candidate } from '../candidate.types';

export interface CandidateAddResult {
  created: boolean;
  candidate?: Candidate;
}

@Component({
  standalone: true,
  selector: 'candidate-add-dialog',
  imports: [CommonModule],
  template: `
    <h2>Add Candidate</h2>

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
        {{ saving() ? 'Creating...' : 'Create' }}
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
export class CandidateAddPopup {
  private ref =
    inject<DialogRef<CandidateAddResult>>(DialogRef);

  name = signal('');
  saving = signal(false);

  cancel() {
    this.ref.close();
  }

  async save() {
    this.saving.set(true);

    // fake API
    await new Promise(r => setTimeout(r, 300));

    const newCandidate = {
      id: Math.random(),
      name: this.name(),
    };

    this.saving.set(false);
    this.ref.close({
      created: true,
      candidate: newCandidate,
    });
  }
}
