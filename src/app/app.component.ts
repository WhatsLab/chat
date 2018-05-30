import {Component, OnDestroy} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {Router} from '@angular/router';
import {EventBrokerService} from './event-broker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  title = 'app';
  isLogged: boolean;
  private _myEventListener;

  constructor(private _electronService: ElectronService, private router: Router, private _eventBroker: EventBrokerService) {
    // this.isLogged = false;
    this._myEventListener = _eventBroker.listen<boolean>('is-logged', (value: boolean) => {
      this.isLogged = value;
    });
  }

  public ngOnDestroy() {
    this._myEventListener.ignore();
  }

  changeLoggedStatus(isLogged: boolean): void {
    console.log(isLogged);
    this.isLogged = !this.isLogged || true;
  }

  logout() {
    this.isLogged = false;
    this.router.navigate(['login']);
  }

  lunchWindow() {
    this._electronService.shell.openExternal('https://www.facebook.com/Eyafa');
  }
}
