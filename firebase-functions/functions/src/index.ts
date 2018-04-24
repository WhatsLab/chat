import {functions} from './app/init';


import {
  conversationLastUpdateUpdatedHandler
} from './app/handlers';

export let helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!\n\n');
});

export let conversationLastUpdateUpdated = functions.firestore.document(
  '/conversations/{conversationId}/lastUpdate'
).onUpdate(
  conversationLastUpdateUpdatedHandler
);
