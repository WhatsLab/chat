import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule} from '@angular/material';
import {NgxElectronModule} from 'ngx-electron';

import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import { BlankComponent } from './blank/blank.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    data: {
      title: 'Heroes List'
    },
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
        redirectTo: '/main/blank',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BlankComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatMenuModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
