/* Custom file */

import {Routes} from '@angular/router';

import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {BlankComponent} from './blank/blank.component';
import {ChatComponent} from './chat/chat.component';


export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'blank',
        component: BlankComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: '',
        redirectTo: 'blank',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/blank',
    pathMatch: 'full'
  }
];
