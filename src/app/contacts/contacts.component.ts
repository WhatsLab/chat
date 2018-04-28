import {Component, OnInit} from '@angular/core';


interface PageState {
  loading: boolean;
  loadMore: boolean;
  notFound: boolean;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts;
  page: PageState = {} as any;

  constructor() {
    this.page.notFound = false;
  }

  private startLoading(): void {
    if (!this.contacts || this.contacts.length === 0) {
      this.page.loading = true;
    } else {
      this.page.loadMore = true;
    }
  }

  private stopLoading(): void {
    this.page.loading = false;
    this.page.loadMore = false;
  }

  ngOnInit() {
    this.startLoading();
    setTimeout(() => {
      this.contacts = this.loadContacts();
      if (this.contacts.length === 0) {
        this.page.notFound = true;
      } else {
        this.page.notFound = false;
      }
      this.stopLoading();
    }, 1000);

  }

  private loadContacts(): Array<Object> {
    return [
      {
        'id': 'sdfhlhkjdvhsdsdiewwdf',
        'avatar': 'https://firebasestorage.googleapis.com/v0/b/osca-e9735.appspot.com/o/contactAvatar%2F3.jpg?alt=media&token=7608a9cf-' +
        'd779-4a77-bb10-069ab43d585a',
        'name': 'Adam Eyad',
        'email': 'adame.fa@gmail.com'
      },
      {
        'id': 'sdfhlhkjdvghrtrtgsdwdf',
        'avatar': 'https://firebasestorage.googleapis.com/v0/b/osca-e9735.appspot.com/o/contactAvatar%2F3.jpg?alt=media&token=7608a9cf-' +
        'd779-4a77-bb10-069ab43d585a',
        'name': 'Eyad Farra',
        'email': 'eyadm.fa@gmail.com'
      }
    ];
  }

}
