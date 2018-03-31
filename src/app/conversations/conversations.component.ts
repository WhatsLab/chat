import {Component, OnInit} from '@angular/core';
import {RequestService} from '../request.service';


@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  loading = false;
  constructor(private Request: RequestService) {

  }

  ngOnInit() {
    console.log(11);
    // const data = {'eyad': 'hi'};
    // this.Request.call({
    //   'url': '/conversations',
    //   'method': 'GET',
    //   'data': data,
    //   'force_result': 1
    // }, res => {
    //   console.log(res);
    // });
  }

}
