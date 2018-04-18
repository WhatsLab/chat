import {Component, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';

interface ConversationMember {
  contactId: string;
  conversationId: string;
  conversation: {
    creation: string;
    lastUpdate: string;
    type: string;
  };
  joinOn: string;
  role: string;
}

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  // conversationMembersCollection: AngularFirestoreCollection<ConversationMembers>;
  conversationMemberRef: AngularFirestoreCollection<any[]>;
  conversations: Observable<any[]>;

  userRef: any;
  loading = false;
  foundData = false;

  constructor(private Request: RequestService, private afs: AngularFirestore) {
    this.conversationMemberRef = this.afs.collection('conversationMembers');
    const myId = 'fMlDxgxOuha3FPZ0jm8E';
    this.userRef = this.getContactRef(myId);
  }

  private getContactRef(id: string) {
    return this.afs.collection('contacts').doc(id).ref;
  }
  private getConversationRef(id: string) {
    return this.afs.collection('conversations').doc(id).ref;
  }

  private getLastMessage(conversationId) {
    return this.afs.collection(
      `conversations/${conversationId.id}/messages`,
      ref => {
        return ref.orderBy(
          'creation', 'desc'
        ).limit(1);
      }
    ).snapshotChanges().flatMap(
      res => {
        return res.map(m => {
          const data = m.payload.doc.data();
          return data.senderId.get().then(snap => {
            return snap.data().contactId.get().then(contact => {
              data['sender'] = contact.data();
              delete data['senderId'];
              return data;
            });
          });
          // return data;
        })[0];
      }
    );
  }

  private getSingleMeta(conversationId) {
    // Get the date of the second and last member in the conversation.
    return this.afs.collection(
      'conversationMembers',
      ref => {
        return ref.where(
          'conversationId', '==', conversationId
        ).where(
          'contactId', '<', this.userRef
        ).limit(1);
      }
    ).snapshotChanges().flatMap(
      res => res.map(m => m.payload.doc.data().contactId.get().then(snap => snap.data()))[0]
    );
  }

  searchConversations(keyword: string) {
    this.conversations = null;
    this.foundData = false;
    this.loadList(keyword);
  }

  private loadList(keyword?: string) {
    this.loading = true;

    this.conversations = this.afs.collection(
      'conversationMembers',
      ref => ref.where('contactId', '==', this.userRef)
    ).snapshotChanges().map(
      res => {
        return res.map(a => {
          const data = a.payload.doc.data();
//          console.log(data);
          data['contactId'] = data.contactId.id;
          data['conversation'] = {};
          data.conversationId.get().then(snap => {
            data.conversation = snap.data();
            data.conversation['id'] = data.conversationId.id;
            if (data.conversation['type'] === 'single') {
              delete data.conversation['groupMeta'];
              this.getSingleMeta(data.conversationId).subscribe(singleMeta => {
                data.conversation['singleMeta'] = singleMeta;
              });
            }

            this.getLastMessage(data.conversationId).subscribe(lastMessage => {
              data.conversation['lastMessage'] = lastMessage;
            });
            delete data.conversationId;
            delete data.contactId;
          });

          this.loading = false;
          if (data) {
            this.foundData = true;
          }
          console.log(data);
          return data;
        });
      }
    );
  }

  ngOnInit() {
    this.loadList();

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

  private createRandomGroup() {
    const currentTime = new Date().getTime();
    this.afs.collection(
      'conversations'
    ).add({
      'creation': currentTime,
      'groupMeta': {
        'icon': 'https://firebasestorage.googleapis.com/v0/b/osca-e9735.appspot.com/o/groupIcons%2F1200x630bb.jpg' +
        '?alt=media&token=b4bcd7ca-5b19-4dec-8732-8a4f6982648a',
        'name': 'Test Group Name'
      },
      'lastUpdate': currentTime,
      'memberCount': 2,
      'type': 'group'
    }).then(res => {
      const conversationId = this.getConversationRef(res.id);
      this.afs.collection(
        'contacts',
        ref => {
          return ref.limit(3);
        }
      ).snapshotChanges().map(m => {
        return m.map(c => {
          return {
            'contactId': this.getContactRef(c.payload.doc.ref.id),
            'role': 'member'
          };
        });
      }).subscribe(s => {
        s[Math.floor(Math.random() * s.length)]['role'] = 'admin';
        console.log(s);
        s.forEach(cm => {
          this.afs.collection(
            'conversationMembers'
          ).add({
            'contactId': cm['contactId'],
            'conversationId': conversationId,
            'joinOn': currentTime,
            'role': cm['role'],
            'unreadCount': 0
          }).then(a => {
            console.log('added', a.id);
          });
        });

      });
    });
  }
}
