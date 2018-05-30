import {Component, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

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

  inputs: LoginInputs = {} as any;

  loading: boolean;
  @Output() isLoggedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {

  }

  login() {
    this.loading = true;

    console.log(this.inputs);

    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['main/blank']);
    }, 3000);

  }

  testEvent() {
    this.isLoggedEmitter.emit(true);
  }

  ngOnInit() {
    // this.isLoggedEmitter.emit(true);
  }

}
