import { AppConfig } from './app-config';

export async function loadAppConfig(): Promise<AppConfig> {
    const env =
        (window as any).__ENV__ ??
        'development';

    const response = await fetch(
        `/config/config.${env}.json`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to load config for env: ${env}`
        );
    }

    return response.json();
}
