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

  constructor(private _eventBroker: EventBrokerService, private _auth: AngularFireAuth,
              private _afs: AngularFirestore, private router: Router) {
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

  async joinUs() {
    this.loading = true;
    if (this.joinUsForm.invalid) {
      console.log('joinUsForm is invalid');
      return;
    }
    const {email, password, name: {firstName: first, lastName: last}} = this.joinUsForm.value;

    try {

      const newUser = await this._auth.auth.createUserWithEmailAndPassword(email, password);
      const currentUser = this._auth.auth.currentUser;

      const displayName = `${first} ${last}`;
      const photoURL = null;
      const unreadCount = 0;
      const created = new Date();


      currentUser.updateProfile({displayName, photoURL});

      await this.contacts.doc(newUser.uid).set({
        email,
        photoURL,
        displayName,
        unreadCount,
        created
      });

      this.router.navigate(['main/blank']);

    } catch (error) {
      console.log(error);
      this._eventBroker.emit('open-snack-bar', {
        'message': error.message
      });
    }

    this.loading = false;


  }
}
