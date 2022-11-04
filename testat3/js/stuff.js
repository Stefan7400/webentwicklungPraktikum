const usernameInput = document.getElementById("uname")
const passwordInput = document.getElementById("pwd");
const confirmPasswordInput = document.getElementById("confirm-pwd");
const form = document.getElementById("form");

window.chatToken = "...";
window.chatCollectionId = "...";
window.chatServer = "https://online-lectures-cs.thi.de/chat"

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        let data = JSON.parse(xmlhttp.responseText);
        console.log(data);
    }
};
// Chat Server URL und Collection ID als Teil der URL
xmlhttp.open("GET", window.chatServer + "/" + window.chatCollectionId +
    "/user", true);
// Das Token zur Authentifizierung, wenn notwendig
xmlhttp.setRequestHeader('Authorization', 'Bearer ' + window.chatToken);
xmlhttp.send();


usernameInput.addEventListener("keyup", e => {

    if(isUsernameValid()){
        usernameInput.style.outline = "none";
        usernameInput.style.borderColor = "green"
    } else {
        usernameInput.style.outline = "none";
        usernameInput.style.borderColor = "red"
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
    highlightPasswordDifference()
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
    if(username.length < 3){
        return false;
    }



    return true;
}


function isPasswordValid(){
    const currentPassword = passwordInput.value;

    return currentPassword.length >= 8;
}

function passwordsMatch(){
    return passwordInput.value === confirmPasswordInput.value;
}

function highlightPasswordDifference(){
    if(confirmPasswordInput.value.length === 0){
        //Ignore when there is not input for the cofirm password
        return;
    }

    if(!passwordsMatch()){
        //passwords do not match
        confirmPasswordInput.style.borderColor = "red"
    }

}


function isValid() {
    return isUsernameValid() && isPasswordValid() && passwordsMatch()

}