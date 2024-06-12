import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const env = process.env;
let firebaseConfig;

if (env.REACT_APP_ENV === 'production') {
  firebaseConfig = {
    apiKey: env.REACT_APP_API_KEY,
    authDomain: env.REACT_APP_AUTH_DOMAIN,
    projectId: env.REACT_APP_PROJECT_ID,
    storageBucket: env.REACT_APP_BUCKET,
    messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
    appId: env.REACT_APP_APP_ID,
    measurementId: env.REACT_APP_MEASUREMENT_ID
  };

  console.log('Estamos em um ambiente de produção');
} else if (env.REACT_APP_ENV === 'staging') {
  console.log('Estamos em um ambiente de staging');
  firebaseConfig = {
    apiKey: env.REACT_APP_API_KEY_STAGING,
    authDomain: env.REACT_APP_AUTH_DOMAIN_STAGING,
    projectId: env.REACT_APP_PROJECT_ID_STAGING,
    storageBucket: env.REACT_APP_BUCKET_STAGING,
    messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID_STAGING,
    appId: env.REACT_APP_APP_ID_STAGING,
    measurementId: env.REACT_APP_MEASUREMENT_ID_STAGING
  };
} else {
  console.log('Estamos em um ambiente de desenvolvimento ', env.REACT_APP_ENV);
  firebaseConfig = {
    apiKey: env.REACT_APP_API_KEY,
    authDomain: env.REACT_APP_AUTH_DOMAIN,
    projectId: env.REACT_APP_PROJECT_ID,
    storageBucket: env.REACT_APP_BUCKET,
    messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
    appId: env.REACT_APP_APP_ID,
    measurementId: env.REACT_APP_MEASUREMENT_ID
  };
}

console.log(env);

let storage;
if (firebaseConfig) {
  console.log(`Using Firebase Storage Bucket: ${firebaseConfig.storageBucket}`);
  const app = initializeApp(firebaseConfig);
  storage = getStorage(app);
}

export { storage };
