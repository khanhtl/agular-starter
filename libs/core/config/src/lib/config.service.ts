import { inject, Injectable, signal } from '@angular/core';
import { AppConfig } from './app-config';
import { APP_CONFIG } from './config.token';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config = inject<AppConfig>(APP_CONFIG);

  apiBaseUrl = signal(this.config.apiBaseUrl);
  env = signal(this.config.env);
}
