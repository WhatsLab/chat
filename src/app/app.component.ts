import {Component} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'app';

  constructor(private _electronService: ElectronService) {

  }

  lunchWindow() {
    this._electronService.shell.openExternal('https://www.facebook.com/Eyafa');
  }
}
