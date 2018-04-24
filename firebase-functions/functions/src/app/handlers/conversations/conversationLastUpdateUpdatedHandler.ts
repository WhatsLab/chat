import {firestore} from './../../init';

export const conversationLastUpdateUpdatedHandler = (snap, context) => {

  // ('/conversations/{conversationId}/lastUpdate').onUpdate

  const lastUpdate = snap.data();
  const conversationRef = firestore.collection('conversations').doc(context.params.conversationId);
  // firestore.collection(
  //   'conversationMembers'
  // ).where(
  //   'conversationId', '==', conversationRef
  // ).get().then(
  //   snapshot => {
  //     snapshot.forEach(childSnapshot => {
  //         childSnapshot.ref.set({lastUpdate}, {merge: true});
  //       }
  //     );
  //   }
  // );
  return 'hi';


};
