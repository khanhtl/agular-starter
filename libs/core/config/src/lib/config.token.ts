import { InjectionToken } from '@angular/core';
import { AppConfig } from './app-config';

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
export const provideAppConfig = (config: AppConfig) => {
    return {
        provide: APP_CONFIG,
        useValue: config,
    };
};
