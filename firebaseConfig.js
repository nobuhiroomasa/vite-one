// firebaseConfig.js



import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

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

// ログインしているユーザー情報を取得する関数
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve(user);  // ログインしているユーザー情報を返す
            } else {
                reject('ユーザーがログインしていません');
            }
        });
    });
};

// Firestoreからユーザーデータを取得する関数
export const getUsersFromFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, data: doc.data() });
        });
        return users;  // Firestoreから取得したユーザーデータを返す
    } catch (error) {
        console.error("Firestoreからデータの取得に失敗しました", error);
        throw error;
    }
};

export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('ログイン成功:', user);
            return user;  // 成功した場合、ユーザー情報を返す
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error('ログインエラー:', error);
            throw new Error(errorMessage);  // エラーメッセージを返す
        });
};





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





