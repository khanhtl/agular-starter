import { ConfigService } from '@angular-starter/core/config';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private http = inject(HttpClient);
  private config = inject(ConfigService);

  get<T>(url: string) {
    return this.http.get<T>(
      `${this.config.apiBaseUrl()}${url}`
    );
  }

  post<T>(url: string, body: unknown) {
    return this.http.post<T>(
      `${this.config.apiBaseUrl()}${url}`,
      body
    );
  }

  put<T>(url: string, body: unknown) {
    return this.http.put<T>(
      `${this.config.apiBaseUrl()}${url}`,
      body
    );
  }

  delete<T>(url: string) {
    return this.http.delete<T>(
      `${this.config.apiBaseUrl()}${url}`
    );
  }
}
