// ─── CONFIGURATION FIREBASE ─────────────────────────────────────────────────
// Étapes pour obtenir cette config :
// 1. Va sur https://console.firebase.google.com
// 2. Clique "Ajouter un projet" → donne-lui un nom (ex: patisscap)
// 3. Dans le projet : clique l'icône Web </> pour ajouter une app Web
// 4. Copie les valeurs firebaseConfig ci-dessous
// 5. Va dans Authentication > Sign-in method > Google → activer
// 6. Va dans Firestore Database → Créer une base → mode test (30 jours)
// ─────────────────────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey:            "AIzaSyBnOuzO_ZmSnDgSOmGSuCHj5fWGdJ9Ex_o",
  authDomain:        "cappatisserie.firebaseapp.com",
  projectId:         "cappatisserie",
  storageBucket:     "cappatisserie.firebasestorage.app",
  messagingSenderId: "769956297985",
  appId:             "1:769956297985:web:ca2c42b64a86ae0a06ef00",
  measurementId:     "G-Z3F1HN8Y4W"
};

// ─── Règles Firestore à copier dans la console Firebase ─────────────────────
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /publicRecipes/{id} {
//       allow read: if request.auth != null;
//       allow write: if request.auth != null && (
//         !resource.data.keys().hasAny(['authorUid']) ||
//         resource.data.authorUid == request.auth.uid
//       );
//       allow create: if request.auth != null &&
//         request.resource.data.authorUid == request.auth.uid;
//       allow delete: if request.auth != null &&
//         resource.data.authorUid == request.auth.uid;
//     }
//   }
// }
// ─────────────────────────────────────────────────────────────────────────────

if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  window.db             = firebase.firestore();
  window.auth           = firebase.auth();
  window.googleProvider = new firebase.auth.GoogleAuthProvider();
  window.FirebaseReady  = firebaseConfig.apiKey !== 'REMPLACER';
  if (!window.FirebaseReady) {
    console.warn('Pâtiss\'CAP — Firebase non configuré. Remplis firebase-config.js.');
  }
} else {
  window.FirebaseReady = false;
}
