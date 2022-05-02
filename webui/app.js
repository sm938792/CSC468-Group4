'use strict'
var userId;
/*--------------theme changing button------------------*/
const switcher = document.querySelector('.themer');

switcher.addEventListener('click', function() {
    document.body.classList.toggle('disc-dark-theme')

	var className = document.body.className;
	if(className == "light-theme") {
		this.textContent = "Dark";
	}
	if(className == "disc-dark-theme") {
		this.textContent = "Light";
	}
	if(className == "dark-theme") {
		this.textContent = "Light";
	}
	console.log('current class name: ' + className);
});


/*----------------login prompt stuff-----------------------------*/
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
/*----placeholder for actual login--------*/
    if (username === "user" && password === "pass") {
        alert("You have successfully logged in."); 
		/*-----give user access to menu and store current account id for instructions----*/
    } else {
        loginErrorMsg.style.opacity = 1;
		setTimeout(() => {loginErrorMsg.style.opacity = 0;}, 2000);
    }
})

function checkLogin(username, password) {
	/*connect to database, check credentials
	if valid creds, returns userID*/
}