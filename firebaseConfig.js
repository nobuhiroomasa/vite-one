// firebaseConfig.js



import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

// Firebaseの設定情報
const firebaseConfig = {
    apiKey: "AIzaSyBiHjBk7rMiz4Fw7IoLPpFo1FTrQxqy_58",
    authDomain: "acau-3ebcf.firebaseapp.com",
    projectId: "acau-3ebcf",
    storageBucket: "acau-3ebcf.appspot.com",
    messagingSenderId: "407904196633"
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);

// Firebaseサービスの初期化
const auth = getAuth(app);
const db = getFirestore(app);

// 他のファイルから利用できるようにエクスポート
export { auth, db };





    // // Firebaseの初期化
    // const firebaseConfig = {
    //     apiKey: "AIzaSyBiHjBk7rMiz4Fw7IoLPpFo1FTrQxqy_58",
    //     authDomain: "acau-3ebcf.firebaseapp.com",
    //     projectId: "acau-3ebcf",
    //     storageBucket: "acau-3ebcf.appspot.com",
    //     messagingSenderId: "407904196633",
    // };

    // // 初期化
    // if (!firebase.apps.length) {
    //     firebase.initializeApp(firebaseConfig);
    // }
    // const db = firebase.firestore();





