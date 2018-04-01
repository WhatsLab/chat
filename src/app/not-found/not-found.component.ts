import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  @Input()
  type: string;

  message = {
    'icon': null,
    'title': null,
    'subTitle': null
  };

  constructor() {

  }

  ngOnInit() {
    switch (this.type) {
      case 'conversations' :
        console.log(this.message);
        this.message['icon'] = 'speaker_notes_off';
        this.message['title'] = 'You have no conversations';
        this.message['subTitle'] = 'You have to create conversation with some one to list it in this page.';
        break;
      case 'contacts' :
        this.message['icon'] = 'supervisor_account';
        this.message['title'] = 'You have no contacts';
        this.message['subTitle'] = 'It seems that you are the first member in this application.';
        break;
      default:
        this.message['icon'] = 'sentiment_very_dissatisfied';
        this.message['title'] = 'We are sorry';
        this.message['subTitle'] = 'No data found';
    }
  }

}
