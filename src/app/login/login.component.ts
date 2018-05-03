import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

interface LoginInputs {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputs: LoginInputs = {} as any;

  constructor(private router: Router) {
  }

  login() {
    console.log(this.inputs);
    this.router.navigate(['main/blank']);
  }

  ngOnInit() {
  }

}
