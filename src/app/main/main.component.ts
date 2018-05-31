import {Component, OnInit} from '@angular/core';
import {EventBrokerService} from '../event-broker.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(private _eventBroker: EventBrokerService, private router: Router, private _auth: AngularFireAuth) {


    // this._auth.authState.subscribe(res => {
    //   if (!res) {
    //     this._eventBroker.emit<boolean>('is-logged', false);
    //     this.router.navigate(['login']);
    //     return;
    //   }
    //   this._eventBroker.emit<boolean>('is-logged', !res.isAnonymous);
    //   if (res.isAnonymous) {
    //     this.router.navigate(['login']);
    //   } else {
    //     console.log(res);
    //     this._eventBroker.emit('logged-user', res.providerData[0]);
    //   }
    // });

  }

  ngOnInit() {
  }

}
