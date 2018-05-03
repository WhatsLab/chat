import {Component, HostBinding, OnInit} from '@angular/core';
import {SNG5LocalStorageService} from 'simple-ng5-storage';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';

interface PageState {
  loading: boolean;
  loadMore: boolean;
  notFound: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  animations: [
    trigger('infoPageAnimation', [
      transition('* => *', [
        query(
          '#info-page:enter',
          style({width: 0}),
          {optional: true}
        ),
        query('#info-page:enter .image-wrapper', style({width: '90pt', height: '90pt', opacity: .1}), {optional: true}),
        query('#info-page:enter #info-meta', style({top: '30pt', opacity: .03}), {optional: true}),
        query(
          '#info-page:enter',
          animate(
            '.2s ease-out',
            keyframes(
              [
                style({width: '412.33px'})
              ]
            )
          ),
          {optional: true}
        ),
        query('#info-page:enter .image-wrapper', animate('.2s ease-out', keyframes([
          style({width: '170pt', height: '170pt', opacity: 1})
        ])), {optional: true, delay: 50}),


        query('#info-page:enter #info-meta', animate('.2s ease-out', keyframes([
          style({top: '0pt', opacity: 1})
        ])), {optional: true, delay: 200})
      ])

    ]),
  ]
})
export class ConversationComponent implements OnInit {
  @HostBinding('class') class = 'display-flex';

  textContent: string;
  user: User;
  showInfoPage: boolean;

  constructor(private localStorage: SNG5LocalStorageService) {
    // this.localStorage.setObject('osca-user', {
    //   'id': 'fMlDxgxOuha3FPZ0jm8E',
    //   'name': 'Eyad Farra',
    //   'avatar': 'https://firebasestorage.googleapis.com/v0/b/osca-e9735.appspot.com/o/contactAvatar%2F2.jpg?alt=media&token=' +
    //   'b58bc8f7-f146-4ba9-a8b7-d90d9df0331d'
    // });

    this.showInfoPage = false;
    this.user = this.localStorage.getObject('osca-user');
  }

  chats;
  page: PageState = {} as any;

  private startLoading(): void {
    if (!this.chats || this.chats.length === 0) {
      this.page.loading = true;
    } else {
      this.page.loadMore = true;
    }
  }

  private stopLoading(): void {
    this.page.loading = false;
    this.page.loadMore = false;
  }

  private loadChats(keyword?: string): Array<Object> {
    return [
      {
        'id': 'asdfsdfsdfsd33242',
        'type': 'text',
        'content': 'how are you',
        'seenBy': [
          {
            'id': 'sdhghg234d4',
            'name': 'Sami helwa',
            'avatar': ''
          }
        ],
        'sender': {
          'id': 'fMlDxgxOuha3FPZ0jm8E',
          'name': 'Eyad Farra',
          'avatar': 'https://firebasestorage.googleapis.com/v0/b/osca-e9735.appspot.com/o/contactAvatar%2F2.jpg?alt=media&token=b58bc8f' +
          '7-f146-4ba9-a8b7-d90d9df0331d'
        },
        'sentOn': new Date()
      },
      {
        'id': 'asdfsdfsdfsd33232',
        'type': 'text',
        'content': 'and how old are you?',
        'seenBy': [
          {
            'id': 'sdhghg234d4',
            'name': 'Sami helwa',
            'avatar': ''
          }
        ],
        'sender': {
          'id': 'fMlDxgxOuha3FPZ0jm8E',
          'name': 'Eyad Farra',
          'avatar': 'https://firebasestorage.googleapis.com/v0/b/osca-e9735.appspot.com/o/contactAvatar%2F2.jpg?alt=media&token=b58bc8' +
          'f7-f146-4ba9-a8b7-d90d9df0331d'
        },
        'sentOn': new Date()
      },
      {
        'id': 'jkhggg23k342kjhh',
        'type': 'text',
        'content': 'Thanks all well',
        'seenBy': [
          {
            'id': 'fMlDxgxOuha3FPZ0jm8E',
            'name': 'Eyad Farra',
            'avatar': ''
          }
        ],
        'sender': {
          'id': 'sdhghg234d4',
          'name': 'Sami helwa',
          'avatar': 'https://firebasestorage.googleapis.com/v0/b/osca-e9735.appspot.com/o/contactAvatar%2F3.jpg?alt=media&token=7608' +
          'a9cf-d779-4a77-bb10-069ab43d585a'
        },
        'sentOn': new Date()
      },
      {
        'id': '23ljk23lkjlkjd',
        'type': 'text',
        'content': 'Ok that is nice news.',
        'seenBy': [],
        'sender': {
          'id': 'fMlDxgxOuha3FPZ0jm8E',
          'name': 'Eyad Farra',
          'avatar': 'https://firebasestorage.googleapis.com/v0/b/osca-e9735.appspot.com/o/contactAvatar%2F2.jpg?alt=media&token=' +
          'b58bc8f7-f146-4ba9-a8b7-d90d9df0331d'
        },
        'sentOn': new Date()
      }
    ];
  }

  isMe(id) {
    return this.user.id === id;
  }

  private format(chats) {
    const output = [];
    for (const current_chat of chats) {

      const previous_chat = output && output.length > 0 ? output[output.length - 1] : false;
      const add_message = message => {
        return {
          'id': message['id'],
          'type': message['type'],
          'content': message['content'],
          'sentOn': message['sentOn'],
          'seenBy': message['seenBy'],
        };
      };
      if (previous_chat && previous_chat['sender']['id'] === current_chat['sender']['id']) {
        previous_chat['messages'].push(add_message(current_chat));
      } else {
        output.push({
          'sender': current_chat['sender'],
          'messages': [add_message(current_chat)]
        });
      }

    }

    return output;
  }

  toggleInfoPage(force?) {
    if (force !== undefined) {
      this.showInfoPage = force;
    } else {
      this.showInfoPage = !this.showInfoPage;
    }
    console.log('infoPage', this.showInfoPage);
  }

  appendMessage({type, content, sender = false}) {
    let newMessage = [{
      'id': new Date().getTime(),
      type,
      content,
      'seenBy': [],
      'sender': sender ? sender : this.user,
      'sentOn': new Date()
    }];

    newMessage = this.format(newMessage);

    if (this.chats[this.chats.length - 1]['sender']['id'] === newMessage[0]['sender']['id']) {
      this.chats[this.chats.length - 1]['messages'] = this.chats[this.chats.length - 1]['messages'].concat(newMessage[0]['messages']);
    } else {
      this.chats = this.chats.concat(newMessage);
    }


    // this.chats.push(newMessage);


  }

  addTextMessage(text) {
    this.textContent = '';
    text = text.trim();
    if (!text) {
      return;
    }

    this.appendMessage({
      'type': 'text',
      'content': text
    });
    console.log(text);
  }

  ngOnInit() {
    this.startLoading();
    setTimeout(() => {
      const chats = this.loadChats();
      if (chats.length === 0) {
        this.page.notFound = true;
      } else {
        this.page.notFound = false;
        this.chats = this.format(chats);
      }
      console.log(this.chats);
      this.stopLoading();
    }, 1000);
  }

}
