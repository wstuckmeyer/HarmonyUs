//import FireAuth from 'react-native-firebase-auth';
import * as firebase from "firebase";
const firebaseConfig = {
     apiKey: "AIzaSyBXM21WvoGi-mPvp0DWc_4j6fLELa3Ffts",
    authDomain: "harmonyus-46339.firebaseapp.com",
    databaseURL: "https://harmonyus-46339.firebaseio.com",
    projectId: "harmonyus-46339",
    storageBucket: "harmonyus-46339.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
