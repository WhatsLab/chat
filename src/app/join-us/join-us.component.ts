import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventBrokerService} from '../event-broker.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

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

  contacts: AngularFirestoreCollection<any>;
  contact: Observable<any>;

  constructor(private _eventBroker: EventBrokerService, private _auth: AngularFireAuth, private _afs: AngularFirestore, private router: Router) {
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


    this.contacts = this._afs.collection('contacts');
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
    const {email, password, name: {firstName: first, lastName: last}} = this.joinUsForm.value;

    this._auth.auth.createUserWithEmailAndPassword(email, password).then(res => {

      this._auth.auth.currentUser.updateProfile({displayName: `${first} ${last}`, photoURL: null});

      this.contacts.add({
        'uuid': res.uid,
        'unreadCount': 0
      }).then(contact => {
        this.loading = false;
        this.router.navigate(['main/blank']);
      }).catch(error => {
        this.loading = false;
        console.log(error);
        this._eventBroker.emit('open-snack-bar', {
          'message': error.message
        });
      });


      console.log(res);
    }).catch(error => {
      this.loading = false;
      console.log(error);
      this._eventBroker.emit('open-snack-bar', {
        'message': error.message
      });
    });
  }
}
