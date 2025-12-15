export interface AppConfig {
    apiBaseUrl: string;
    env: string;
    featureFlags?: Record<string, boolean>;
}
