import {Component, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {EventBrokerService} from '../event-broker.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';

interface LoginInputs {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None // <------
})
export class LoginComponent implements OnInit {

  loading: boolean;

  loginForm: FormGroup;

  email: FormControl;
  password: FormControl;

  constructor(private router: Router, private _eventBroker: EventBrokerService, private _auth: AngularFireAuth) {
    this._eventBroker.emit<boolean>('is-logged', false);


    this.email = new FormControl('eyadm.fa@gmail.com4', [
      Validators.required,
      Validators.email
    ]);
    this.password = new FormControl('12345678', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  async login() {
    this.loading = true;

    // console.log(this.loginForm.value);

    const {email, password} = this.loginForm.value;

    try {
      const result = await this._auth.auth.signInWithEmailAndPassword(email, password);
      // console.log(result);

      this.router.navigate(['main/blank']);
    } catch (error) {
      this._eventBroker.emit('open-snack-bar', {
        'message': error.message
      });
    }
    this.loading = false;


  }


  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
    // this.isLoggedEmitter.emit(true);
  }

}
