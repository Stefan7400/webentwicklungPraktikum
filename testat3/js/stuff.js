const usernameInput = document.getElementById("uname")
const passwordInput = document.getElementById("pwd");
const confirmPasswordInput = document.getElementById("confirm-pwd");
const form = document.getElementById("form");

window.chatToken = "...";
window.chatCollectionId = "89b60f9b-5632-448a-ac19-9895d76000d2";
window.chatServer = "https://online-lectures-cs.thi.de/chat"

const xmlhttp = new XMLHttpRequest();
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
        console.log("VALID")
        setOkBorder(usernameInput)
    } else {
        console.log("INVALID")
        setErrorBorder(usernameInput)
    }

})

passwordInput.addEventListener("keyup", e => {
    if(isPasswordValid()){
       setOkBorder(passwordInput)
    } else {
        setErrorBorder(passwordInput)
    }
    highlightPasswordDifference()
})


confirmPasswordInput.addEventListener("keyup", e => {
    if(passwordsMatch() && isPasswordValid()){
        setOkBorder(confirmPasswordInput)
    } else {
        setErrorBorder(confirmPasswordInput)
    }
})

form.addEventListener("submit", e => {
    if(!isValid()){
        e.preventDefault()
        window.history.back()
    }
})

function setErrorBorder(element) {
    element.classList.remove("okBorder")
    element.classList.add("errorBorder")
}

function setOkBorder(element){
    element.classList.remove("errorBorder")
    element.classList.add("okBorder")
}

function isUsernameValid(){
    const username = usernameInput.value
    if(username.length < 3){
        return false;
    }

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if(xmlhttp.status === 204) {
                console.log("Exists");
                setErrorBorder(usernameInput)
            } else if(xmlhttp.status === 404) {
                console.log("Does not exist");
                setOkBorder(usernameInput)
            }
        }
    };
    xmlhttp.open("GET", "https://online-lectures-cs.thi.de/chat/89b60f9b-5632-448a-ac19-9895d76000d2/user/" + username, true);
    xmlhttp.send();


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

    if(!passwordsMatch() || isPasswordValid()){
        //passwords do not match
        setErrorBorder(confirmPasswordInput)
    }

}


function isValid() {
    return isUsernameValid() && isPasswordValid() && passwordsMatch()

}
