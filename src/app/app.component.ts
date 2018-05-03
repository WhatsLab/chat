import {Component} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'app';

  constructor(private _electronService: ElectronService, private router: Router) {

  }

  logout() {
    this.router.navigate(['login']);
  }

  lunchWindow() {
    this._electronService.shell.openExternal('https://www.facebook.com/Eyafa');
  }
}
