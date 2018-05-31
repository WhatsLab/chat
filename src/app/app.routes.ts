/* Custom file */

import {Routes} from '@angular/router';

import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {JoinUsComponent} from './join-us/join-us.component';
import {BlankComponent} from './blank/blank.component';
import {ConversationComponent} from './conversation/conversation.component';
import {SettingsComponent} from './settings/settings.component';

import {
  AuthGuardService as AuthInUser
} from './auth-guard.service';
import {
  AuthOutUserService as AuthOutUser
} from './auth-out-user.service';
import {ProfileComponent} from './profile/profile.component';
import {SecurityComponent} from './security/security.component';


export const appRoutes: Routes = [
  {
    path: 'login',
    canActivate: [AuthOutUser],
    component: LoginComponent
  },
  {
    path: 'joinUs',
    canActivate: [AuthOutUser],
    component: JoinUsComponent
  },
  {
    path: 'settings',
    canActivate: [AuthInUser],
    component: SettingsComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'security',
        component: SecurityComponent
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'main',
    canActivate: [AuthInUser],
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
