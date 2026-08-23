import { Routes } from '@angular/router';

import { ReturnReasons } from './pages/return-reasons/return-reasons';

export const routes: Routes = [
  {
    path: 'return-reasons',
    component: ReturnReasons
  },
  {
    path: '',
    redirectTo: 'return-reasons',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'return-reasons'
  }
];