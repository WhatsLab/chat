import {Component, OnInit} from '@angular/core';
import {RequestService} from '../request.service';


@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  constructor(private Request: RequestService) {
  }

  ngOnInit() {
    const data = {};
    this.Request.call({
      'url': '/conversations',
      'method': 'GET',
      'data': data,
      'expected_result': 1
    }, res => {
      console.log(res);
    });
  }

}
