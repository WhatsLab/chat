import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthService {

  constructor(private _auth: AngularFireAuth) {
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      this._auth.authState.subscribe(res => {
        const isAuth = res ? !res.isAnonymous : false;
        const user = isAuth ? res.providerData[0] : {};
        resolve({isAuth, user});
      });
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this._auth.authState.subscribe(res => {
        const user = !res.isAnonymous ? res.providerData[0] : {};
        resolve(user);
      });
    });
  }
}
