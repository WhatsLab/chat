import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {ConversationsComponent} from './../conversations/conversations.component';
import {ContactsComponent} from './../contacts/contacts.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None // <------
})
export class SidebarComponent implements OnInit {

  @ViewChild(ConversationsComponent) child;
  tabs = [
    {
      'path': 'conversations',
      'label': 'Conversations',
      'icon': 'chat'
    },
    {
      'path': 'contacts',
      'label': 'Contacts',
      'icon': 'contacts'
    }
  ];
  @Input() keyword: string;

  selectedTab = this.tabs[0]['label'];

  constructor() {
  }

  ngOnInit() {
  }

  searchList() {
    this.child.searchConversations(this.keyword);
  }

  selectedTabChange(event: MatTabChangeEvent) {


    this.selectedTab = event.tab.textLabel;

    console.log('index => ', event.index);
    console.log('tab => ', event.tab.textLabel);
  }
}
