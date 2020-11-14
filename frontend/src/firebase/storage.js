import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
  apiKey: REACT_APP_FB_APIKEY,
  projectId: REACT_APP_FB_PROJECTID,
  storageBucket: REACT_APP_FB_STORAGEBUCKET,
  appId: REACT_APP_FB_APPID,
  measurementId: REACT_APP_FB_MEASUREMENTID,
};

firebase.initializeApp(config);

const storage = firebase.storage();

const storageRef = storage.ref();
const imagesRef = storageRef.child('images');

export { storageRef, imagesRef };
