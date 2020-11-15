import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_FB_APIKEY,
  projectId: process.env.REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
  appId: process.env.REACT_APP_FB_APPID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENTID,
};

firebase.initializeApp(config);

const storage = firebase.storage();

const storageRef = storage.ref();
const imagesRef = storageRef.child('images');

export { storageRef, imagesRef };
