import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDqAlk2mnx3oz_dZeMkzXTekqjjTyxarGk",
  authDomain: "messengerclone-d4793.firebaseapp.com",
  projectId: "messengerclone-d4793",
  storageBucket: "messengerclone-d4793.appspot.com",
  messagingSenderId: "36722609367",
  appId: "1:36722609367:web:94c4253b0348c664e87492",
  measurementId: "G-6YZD2KC1D7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
firebase.analytics();
