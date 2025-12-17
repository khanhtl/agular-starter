import { isDevMode } from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco.loader';

export function provideI18n() {
  return provideTransloco({
    config: {
      availableLangs: ['en', 'vi'],
      defaultLang: 'vi',
      reRenderOnLangChange: true,
      prodMode: !isDevMode(),
    },
    loader: TranslocoHttpLoader,
  });
}
