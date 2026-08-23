import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessageService } from '@progress/kendo-angular-l10n';
import { TranslateModule } from '@ngx-translate/core';



import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    MessageService,
    importProvidersFrom(TranslateModule.forRoot()),
    {
    provide: LOCALE_ID,
    useValue: 'en-US'
    }
  ]
};