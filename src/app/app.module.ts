import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {NgxElectronModule} from 'ngx-electron';

import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialComponentsModule} from './material-components/material-components.module';
import {SimpleNg5StorageModule} from 'simple-ng5-storage';

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {BlankComponent} from './blank/blank.component';
import {ConversationComponent} from './conversation/conversation.component';

import {appRoutes} from './app.routes';
import {SidebarComponent} from './sidebar/sidebar.component';
import {LoginComponent} from './login/login.component';
import {ConversationsComponent} from './conversations/conversations.component';
import {ContactsComponent} from './contacts/contacts.component';
import {GroupsComponent} from './groups/groups.component';
import {PlaceholderComponent} from './placeholder/placeholder.component';
import {RequestService} from './request.service';
import {EventBrokerService} from './event-broker.service';
import {NotFoundComponent} from './not-found/not-found.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {DatetimeAgoDirective} from './datetime-ago.directive';
import {ScrollableDirective} from './scrollable.directive';
import {ObjNgForPipe} from './obj-ng-for.pipe';
import {JoinUsComponent} from './join-us/join-us.component';
import {ButtonComponent} from './button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BlankComponent,
    ConversationComponent,
    SidebarComponent,
    LoginComponent,
    GroupsComponent,
    PlaceholderComponent,
    ConversationsComponent,
    ContactsComponent,
    NotFoundComponent,
    DatetimeAgoDirective,
    ScrollableDirective,
    ObjNgForPipe,
    JoinUsComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNg5StorageModule,
    MaterialComponentsModule,
    NgxElectronModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore
    AngularFireAuthModule
    // AngularFirestoreModule.enablePersistence() // <--- update this line for enable offline Data
  ],
  providers: [
    RequestService,
    EventBrokerService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
