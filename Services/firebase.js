import * as firebase from 'firebase';
import "firebase/firestore"
import {
    FB_APIKEY,
    FB_AUTHDOMAIN,
    FB_DBURL,
    FB_PROJECTID,
    FB_STORAGEBUCKET,
    FB_MESSAGESENDERID,
    FB_APPID,
    FB_MEASUREMENTID,
} from "@env";

console.log('apikey asd:',FB_APIKEY);

const config = {
    apiKey: FB_APIKEY,
    authDomain: FB_AUTHDOMAIN,
    databaseURL: FB_DBURL,
    projectId: FB_PROJECTID,
    storageBucket: FB_STORAGEBUCKET,
    messagingSenderId: FB_MESSAGESENDERID,
    appId: FB_APPID,
    measurementId: FB_MEASUREMENTID
};

export default firebase.initializeApp(config);