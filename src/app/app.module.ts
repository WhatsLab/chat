/* Libraries/Modules */
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
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';

/* Pipe/Filters */
import {ObjNgForPipe} from './obj-ng-for.pipe';

/* Directives */
import {DatetimeAgoDirective} from './datetime-ago.directive';
import {ScrollableDirective} from './scrollable.directive';
import {DefaultImgDirective} from './default-img.directive';

/* Services */
import {AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';
import {AuthOutUserService} from './auth-out-user.service';
import {RequestService} from './request.service';
import {EventBrokerService} from './event-broker.service';

/* Files */
import {appRoutes} from './app.routes';
import {environment} from '../environments/environment';

/* Components */
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {BlankComponent} from './blank/blank.component';
import {ConversationComponent} from './conversation/conversation.component';
import {JoinUsComponent} from './join-us/join-us.component';
import {ButtonComponent} from './button/button.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ConversationsComponent} from './conversations/conversations.component';
import {LoginComponent} from './login/login.component';
import {ContactsComponent} from './contacts/contacts.component';
import {GroupsComponent} from './groups/groups.component';
import {PlaceholderComponent} from './placeholder/placeholder.component';
import {SettingsComponent} from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';


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
    ButtonComponent,
    DefaultImgDirective,
    SettingsComponent,
    ProfileComponent,
    SecurityComponent
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
    EventBrokerService,
    AuthService,
    AuthGuardService,
    AuthOutUserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
