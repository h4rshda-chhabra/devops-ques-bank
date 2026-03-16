const admin = require('firebase-admin');

// Ensure that we only initialize the app once
if (!admin.apps.length) {
    let credential;
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            credential = admin.credential.cert(serviceAccount);
        } catch (error) {
            console.error('⚠️ Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:', error);
        }
    }

    if (credential) {
        admin.initializeApp({
            credential: credential,
            projectId: process.env.FIREBASE_PROJECT_ID || 'devops-prep-app'
        });
    } else {
        console.warn('⚠️ No Firebase credentials provided. Firestore will fail until .env is configured.');
        admin.initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID || 'devops-prep-app'
        });
    }
}

const db = admin.firestore();

module.exports = { admin, db };
