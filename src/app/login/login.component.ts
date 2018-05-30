import {Component, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {EventBrokerService} from '../event-broker.service';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private router: Router, private _eventBroker: EventBrokerService) {
    this._eventBroker.emit<boolean>('is-logged', false);

    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  login() {
    this.loading = true;

    console.log(this.loginForm.value);

    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['main/blank']);
    }, 3000);

  }


  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
    // this.isLoggedEmitter.emit(true);
  }

}
