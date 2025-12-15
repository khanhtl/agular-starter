import { computed, Injectable, signal } from '@angular/core';

export interface AuthUser {
  id: number;
  name: string;
  permissions: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  user = signal<AuthUser | null>(null);
  token = signal<string | null>(null);

  isLoggedIn = computed(() => !!this.user());
  permissions = computed(() => this.user()?.permissions ?? []);

  hasPermission(permission: string) {
    return this.permissions().includes(permission);
  }

  clear() {
    this.user.set(null);
    this.token.set(null);
  }
}
