import {Component, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
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
  conversations: Observable<any[]>;
  test: Observable<any[]>;

  userRef: any;
  loading = false;

  constructor(private Request: RequestService, private afs: AngularFirestore) {

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

  ngOnInit() {
    const myId = 'fMlDxgxOuha3FPZ0jm8E';
    this.userRef = this.afs.collection('contacts').doc(myId).ref;
    this.conversations = this.afs.collection(
      'conversationMembers',
      ref => {
        return ref.where('contactId', '==', this.userRef);
      }
    ).snapshotChanges().map(
      res => {
        return res.map(a => {
          const data = a.payload.doc.data();
          data['contactId'] = data.contactId.id;
          data.conversation = {};
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

          console.log(data);
          return data;
        });
      }
    );

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
