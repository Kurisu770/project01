let username = document.querySelector('#username').value;
let password = document.querySelector('#password').value;
let address = document.querySelector('#address').value;
localStorage.setItem('username',JSON.stringify(username));
localStorage.setItem('password',JSON.stringify(password));
localStorage.setItem('address',JSON.stringify(address));
let con_username = JSON.parse(localStorage.getItem('username'));
let con_password = JSON.parse(localStorage.getItem('password'));
let con_address = JSON.parse(localStorage.getItem('address'));