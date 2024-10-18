
//index.js

const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');

loginButton.onclick = () => {
    location.href = 'login&logout/login .html';
};
signupButton.innerText = '新規登録';
signupButton.onclick = () => {
    location.href = 'signup.html';  // signup.html のリンク修正
};

