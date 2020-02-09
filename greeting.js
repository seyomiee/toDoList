const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";


function saveName(name) {
    localStorage.setItem(USER_LS, name);
}

function handleSubmit() {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(name) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${name}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askName();
    }
    else {
        paintGreeting(currentUser);  }
}

function init() {
    loadName();
}

init();
