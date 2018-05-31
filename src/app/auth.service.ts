import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthService {

  constructor(private _auth: AngularFireAuth) {
  }

  isAuthenticated() {
    return this._auth.authState.subscribe(res => {
      return res ? res.isAnonymous : false;
    });
  }
}
