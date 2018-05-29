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

  loading: boolean;

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

  ngOnInit() {
  }

}
