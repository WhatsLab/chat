import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None // <------
})
export class SidebarComponent implements OnInit {

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
  selectedTab = this.tabs[0]['label'];

  constructor() {
  }

  ngOnInit() {
  }

  selectedTabChange(event: MatTabChangeEvent) {


    this.selectedTab = event.tab.textLabel;

    console.log('index => ', event.index);
    console.log('tab => ', event.tab.textLabel);
  }
}
