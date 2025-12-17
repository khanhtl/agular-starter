import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { PopupService } from '@angular-starter/ui/popup';
import { Candidate } from './candidate.types';
import { CandidatePopupMap } from './popups/candidate.popup';


@Component({
    standalone: true,
    selector: 'feature-candidate-page',
    imports: [CommonModule],
    template: `
    <h1>Candidates</h1>
    <button (click)="add()">Add Candidate</button>
    <ul>
      @for (candidate of candidates(); track candidate.id) {
        <li>
          {{ candidate.name }}
          <button (click)="edit(candidate)">
            Edit
          </button>
        </li>
      }
    </ul>
  `,
})
export class CandidatePage {
    private popup =
        inject(PopupService<CandidatePopupMap>);

    candidates = signal<Candidate[]>([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ]);

    async edit(candidate: Candidate) {
        const result = await this.popup.openAndWait(
            'candidate.edit',
            {
                data: { ...candidate },
                hooks: {
                    onOpen: () =>
                        console.log('🟢 Edit Candidate popup opened'),
                    onClose: result =>
                        console.log('🔴 Edit Candidate popup closed', result),
                },
            },

        );

        if (result?.saved) {
            const index = this.candidates().findIndex(
                candidate => candidate.id === result.data.id
            );
            this.candidates.update(candidates => [
                ...candidates.slice(0, index),
                result.data!,
                ...candidates.slice(index + 1),
            ]);
            this.reload();
        }
    }

    async add() {
        const result = await this.popup.openAndWait(
            'candidate.add',
            {
                hooks: {
                    onOpen: () =>
                        console.log('🟢 Add Candidate popup opened'),
                    onClose: result =>
                        console.log('🔴 Add Candidate popup closed', result),
                },
            }
        );

        if (result?.created) {
            this.candidates.update(candidates => [
                ...candidates,
                result.candidate!,
            ]);
            this.reload();
        }
    }

    reload() {
        console.log('Reload candidates');
    }
}
