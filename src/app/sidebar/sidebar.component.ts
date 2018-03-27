import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None // <------
})
export class SidebarComponent implements OnInit  {

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

  constructor() {}

  ngOnInit() {
  }

  selectedTabChange(event: MatTabChangeEvent) {
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
  }
}
