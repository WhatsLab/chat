import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {EventBrokerService} from '../event-broker.service';
import {AngularFireStorage} from 'angularfire2/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading: boolean;

  profileForm: FormGroup;

  displayName: FormControl;
  photoURL: FormControl;

  avatar: string;

  constructor(private auth: AuthService, private fbauth: AngularFireAuth, private fbStorage: AngularFireStorage, private _eventBroker: EventBrokerService) {

    this.auth.getUser().then(user => {
      // console.log(user);
      const displayName = user['displayName'];
      const photoURL = user['photoURL'];
      this.displayName = new FormControl(
        displayName,
        [
          Validators.required
        ]
      );
      this.photoURL = new FormControl(
        photoURL
      );
    });


  }

  async updateProfile() {
    this.loading = true;
    const {displayName} = this.profileForm.value;
    console.log(displayName);
    const currentUser = this.fbauth.auth.currentUser;
    try {
      // this.fbStorage.ref();
      await currentUser.updateProfile({displayName, photoURL: null});
    } catch (error) {
      console.log(error);
      this._eventBroker.emit('open-snack-bar', {
        'message': error.message
      });
    }
    this.loading = false;
  }

  selectFile(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.avatar = reader.result;
        const base64 = this.avatar.split(',');
        const photo = {
          filename: file.name,
          fileType: file.type,
          value: {
            prefix: base64[0],
            encoded: base64[1]
          }
        };

        console.log(photo);
        // this.profileForm.get('avatar').setValue(photo);
      };
    }
  }

  ngOnInit() {
    this.profileForm = new FormGroup({
      displayName: this.displayName,
      photoURL: this.photoURL
    });
  }

}
