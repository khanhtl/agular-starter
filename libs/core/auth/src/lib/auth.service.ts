import { inject, Injectable } from '@angular/core';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private store = inject(AuthStore);

  login() {
    // DEMO
    this.store.user.set({
      id: 1,
      name: 'Admin',
      permissions: ['job:all', 'candidate:all'],
    });
    this.store.token.set('FAKE_TOKEN');
  }

  logout() {
    this.store.clear();
  }
}
