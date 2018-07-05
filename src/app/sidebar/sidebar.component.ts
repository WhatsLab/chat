import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {ConversationsComponent} from './../conversations/conversations.component';
import {ContactsComponent} from './../contacts/contacts.component';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None // <------
})
export class SidebarComponent implements OnInit {

  @ViewChild(ConversationsComponent) child;
  tabs = {
    'conversations': {
      'path': 'conversations',
      'label': 'Conversations',
      'icon': 'chat'
    },
    'contacts': {
      'path': 'contacts',
      'label': 'Contacts',
      'icon': 'contacts'
    }
  };
  @Input() keyword: string;
  selectedIndex: number;
  defaultTab = 'contacts';
  selectedTab = this.defaultTab;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      const {tab = this.defaultTab} = params;
      this.selectedIndex = this.tabIndex(tab);
    });
  }

  private tabIndex(tab: string): number {
    return Object.keys(this.tabs).indexOf(tab);
  }

  ngOnInit() {
  }

  searchList() {
    this.child.searchConversations(this.keyword);
  }

  selectedTabChange(event: MatTabChangeEvent) {

    console.log('index => ', event.index);
    console.log('tab => ', event.tab.textLabel);

    this.selectedTab = Object.keys(this.tabs)[event.index];

    // Object.assign is used since you apparently
    // cannot add properties to snapshot query params
    // const queryParams = Object.assign({}, this.activatedRoute.snapshot.queryParams);


    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        'tab': this.selectedTab
      }
    });


  }
}
