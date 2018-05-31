import {Component, OnDestroy} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {Router} from '@angular/router';
import {EventBrokerService} from './event-broker.service';
import {MatSnackBar} from '@angular/material';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  title = 'app';
  isLogged: boolean;
  loggedUser: any;

  private _snackBarListener;
  private _loggedUserListener;

  constructor(private _electronService: ElectronService, private router: Router, private _eventBroker: EventBrokerService,
              public snackBar: MatSnackBar, private _autn: AngularFireAuth) {
    // this.isLogged = false;

    this._snackBarListener = _eventBroker.listen('open-snack-bar', (data: any) => {
      const {message, action = '', duration = 5000} = data;
      this.snackBar.open(message, action, {
        duration,
        horizontalPosition: 'left'
      });
    });
    this._loggedUserListener = _eventBroker.listen('logged-user', ({isAuth, user}) => {
      this.isLogged = isAuth;
      this.loggedUser = user;
    });
  }

  public ngOnDestroy() {
    this._snackBarListener.ignore();
    this._loggedUserListener.ignore();
  }

  changeLoggedStatus(isLogged: boolean): void {
    console.log(isLogged);
    this.isLogged = !this.isLogged || true;
  }

  logout() {
    this._autn.auth.signOut();
    this.isLogged = false;
    this.router.navigate(['login']);
  }

  lunchWindow() {
    this._electronService.shell.openExternal('https://www.facebook.com/Eyafa');
  }
}
