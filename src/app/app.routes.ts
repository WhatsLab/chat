/* Custom file */

import {Routes} from '@angular/router';

import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {BlankComponent} from './blank/blank.component';
import {ConversationComponent} from './conversation/conversation.component';


export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
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
        path: 'conversation/:conversationId',
        component: ConversationComponent
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
