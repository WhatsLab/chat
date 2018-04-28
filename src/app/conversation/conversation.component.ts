import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  @HostBinding('class') class = 'display-flex';

  constructor() {
  }

  ngOnInit() {
  }

}
