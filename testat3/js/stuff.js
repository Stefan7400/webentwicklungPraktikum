let usernameInput = document.getElementById("uname")
let passwordInput = document.getElementById("pwd");
let confirmPasswordInput = document.getElementById("confirm-pwd");


usernameInput.addEventListener("keyup", e => {
    const currentInput = usernameInput.value
    if(currentInput.length <= 3){
        usernameInput.style.outline = "none";
        usernameInput.style.borderColor = "red"
    } else {
        usernameInput.style.outline = "none";
        usernameInput.style.borderColor = "green"
    }
    //TODO check if username is already used
})

passwordInput.addEventListener("keyup", e => {
    const currentInput = passwordInput.value;
    if(currentInput.length < 8){
        passwordInput.style.outline = "none";
        passwordInput.style.borderColor = "red"
    } else {
        passwordInput.style.outline = "none";
        passwordInput.style.borderColor = "green"
    }
})


confirmPasswordInput.addEventListener("keyup", e => {
    const currentInput = confirmPasswordInput.value;
    const shouldEqual = passwordInput.value;
    if(currentInput === shouldEqual){
        confirmPasswordInput.style.outline = "none";
        confirmPasswordInput.style.borderColor = "green"
    } else {
        confirmPasswordInput.style.outline = "none";
        confirmPasswordInput.style.borderColor = "red"
    }
})