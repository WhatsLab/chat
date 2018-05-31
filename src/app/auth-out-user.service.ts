import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {EventBrokerService} from './event-broker.service';

@Injectable()
export class AuthOutUserService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.auth.isAuthenticated().then(({isAuth, user}) => {
        this._eventBroker.emit('logged-user', {isAuth, user});
        if (isAuth) {
          this.router.navigate(['main/blank']);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  constructor(private router: Router, private auth: AuthService, private _eventBroker: EventBrokerService) {
  }

}
