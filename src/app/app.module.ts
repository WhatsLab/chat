import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatMenuModule, MatTabsModule} from '@angular/material';
import {NgxElectronModule} from 'ngx-electron';

import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import { BlankComponent } from './blank/blank.component';
import { ChatComponent } from './chat/chat.component';

import {appRoutes} from './app.routes';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ContactsComponent } from './contacts/contacts.component';
import { GroupsComponent } from './groups/groups.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BlankComponent,
    ChatComponent,
    SidebarComponent,
    LoginComponent,
    ConversationsComponent,
    ContactsComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatMenuModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
