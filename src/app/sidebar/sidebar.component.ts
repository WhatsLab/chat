import { Component, OnInit } from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit  {

  tabs = [
    {
      'path': 'conversations',
      'label': 'Conversations'
    },
    {
      'path': 'contacts',
      'label': 'Contacts'
    },
    {
      'path': 'groups',
      'label': 'Groups'
    }
  ];

  constructor() {}

  ngOnInit() {
  }

  selectedTabChange(_matTabChangeEvent: MatTabChangeEvent) {
    console.log(_matTabChangeEvent);
  }
}
