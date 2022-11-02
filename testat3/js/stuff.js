const usernameInput = document.getElementById("uname")
const passwordInput = document.getElementById("pwd");
const confirmPasswordInput = document.getElementById("confirm-pwd");
const form = document.getElementById("form");


usernameInput.addEventListener("keyup", e => {

    if(isUsernameValid()){
        usernameInput.style.outline = "none";
        usernameInput.style.borderColor = "red"
    } else {
        usernameInput.style.outline = "none";
        usernameInput.style.borderColor = "green"
    }

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
    if(passwordsMatch()){
        confirmPasswordInput.style.outline = "none";
        confirmPasswordInput.style.borderColor = "green"
    } else {
        confirmPasswordInput.style.outline = "none";
        confirmPasswordInput.style.borderColor = "red"
    }
})

form.addEventListener("submit", e => {
    if(!isValid()){
        e.preventDefault()
        window.history.back()
    }
})

function isUsernameValid(){
    //TODO check if username is already used
    const username = usernameInput.value
    if(username.length >= 3){
        return false;
    }



    return true;
}


function isPasswordValid(){
    const currentPassword = passwordInput.value;

    return currentPassword.length < 8;
}

function passwordsMatch(){
    return passwordInput.value === confirmPasswordInput.value;
}


function isValid() {
    return isUsernameValid() && isPasswordValid() && passwordsMatch()

}