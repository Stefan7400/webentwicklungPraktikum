const usernameInput = document.getElementById("uname")
const passwordInput = document.getElementById("pwd");
const confirmPasswordInput = document.getElementById("confirm-pwd");
const form = document.getElementById("form");

usernameInput.addEventListener("keyup", e => {

    if(isUsernameValid()){
        setOkBorder(usernameInput)
    } else {
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

    const username = usernameInput.value;
    e.preventDefault()
    window.history.back()

    if(!isValid()){
        return
    }


    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if(xmlhttp.status === 404) {
                document.location.href = "friends.html"
            }
        }
    };
    xmlhttp.open("GET", window.chatServer + "/" + window.chatCollectionId + "/user/" + username, true);
    xmlhttp.send();
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
                setErrorBorder(usernameInput)
            } else if(xmlhttp.status === 404) {
                setOkBorder(usernameInput)
            }
        }
    };
    xmlhttp.open("GET", window.chatServer + "/" + window.chatCollectionId + "/user/" + username, true);
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

    if(!passwordsMatch() || !isPasswordValid()){
        //passwords do not match
        setErrorBorder(confirmPasswordInput)
    } else {
        setOkBorder(confirmPasswordInput)
    }

}

function isValid() {
    return isPasswordValid() && passwordsMatch()
}
