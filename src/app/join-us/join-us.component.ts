import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventBrokerService} from '../event-broker.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss'],
  encapsulation: ViewEncapsulation.None // <------
})
export class JoinUsComponent implements OnInit {

  loading: boolean;

  joinUsForm: FormGroup;

  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;

  constructor(private _eventBroker: EventBrokerService, private _autn: AngularFireAuth) {
    this._eventBroker.emit<boolean>('is-logged', false);

    this.firstName = new FormControl('Eyad', [
      Validators.required
    ]);
    this.lastName = new FormControl('Farra', [
      Validators.required
    ]);
    this.email = new FormControl('eyadm.fa@gmail.com', [
      Validators.required,
      Validators.email
    ]);
    this.password = new FormControl('12345678', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  ngOnInit() {
    this.joinUsForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName
      }),
      email: this.email,
      password: this.password
    });
  }

  joinUs() {
    this.loading = true;
    if (this.joinUsForm.invalid) {
      console.log('joinUsForm is invalid');
      return;
    }
    const {email, password} = this.joinUsForm.value;

    this._autn.auth.createUserWithEmailAndPassword(email, password).then(res => {
      this.loading = false;
      console.log(res);
    }).catch(error => {
      this.loading = false;
      this._eventBroker.emit('open-snack-bar', {
        'message': error.message
      });
      console.log(error);
    });
  }
}
