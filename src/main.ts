import { bootstrap } from './app/app.config';

bootstrap().catch(err => {
    console.error('❌ App bootstrap failed', err);
});
