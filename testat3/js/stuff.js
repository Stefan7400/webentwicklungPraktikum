let usernameInput = document.getElementById("uname")
let passwordInput = document.getElementById("pwd");
let confirmPasswordInput = document.getElementById("confirm-pwd");


usernameInput.addEventListener("keyup", e => {
    const currentInput = usernameInput.value
    console.log(currentInput)
    if(currentInput.length <= 3){
        usernameInput.style.borderColor = "red"
    } else {
        usernameInput.style.borderColor = "gray"
    }
})
