import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
export {admin, functions, firestore};
// if you need to use the Firebase Admin SDK, uncomment the following:
// import * as admin from 'firebase-admin'


// Create and Deploy Cloud Function with TypeScript using script that is
// defined in functions/package.json:
//    cd functions
//    npm run deploy

// import * as admin from 'firebase-admin';
