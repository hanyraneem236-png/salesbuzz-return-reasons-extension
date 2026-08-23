

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

localStorage.setItem('lang', 'en');
localStorage.setItem('isRightToLeft', 'ltr');

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
