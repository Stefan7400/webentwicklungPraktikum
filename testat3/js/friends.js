// variabls
const FriendsInput = document.getElementById("friendlistInput");
const SumbitFriend = document.getElementById("addFriendButton");
const FriendForm = document.getElementById("friendForm");
let friendsArray;

// server nach definierten usern fragen
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        friendsArray = JSON.parse(xmlhttp.responseText);
        console.log(friendsArray);
    }
};
// unsere Server URL
xmlhttp.open("GET", window.chatServer + "/" + window.chatCollectionId + "/user", true);
// token zur Authentifizierung, wenn notwendig
xmlhttp.setRequestHeader('Authorization', 'Bearer ' + window.chatToken);
xmlhttp.send();


// set action for every keystroke
FriendsInput.addEventListener("keyup", event => {
    curInput = FriendsInput.value;
    // delete previous suggestions
    cleanUp();

    // div to display the suggestions
    let friendlistDiv = document.createElement("div");
    friendlistDiv.setAttribute("class", "autocompleteFriends");
    FriendsInput.parentNode.appendChild(friendlistDiv);
    let nameHitDiv;

    // check if we have a fitting name in database
    for (let i = 0; i < friendsArray.length; i++) {
        if (friendsArray[i].substring(0, curInput.length).toLowerCase() == curInput.toLowerCase()) {
            // if yes, add to div
            let hit = friendsArray[i];
            nameHitDiv = document.createElement("div");
            nameHitDiv.innerHTML = hit;
            friendlistDiv.appendChild(nameHitDiv);

            // autofill if clicked on name
            nameHitDiv.addEventListener("click", event => {
                FriendsInput.value = hit;
                cleanUp();
            })
        }
    }
})

// delete previous suggestions
function cleanUp() {
    let elements = document.getElementsByClassName("autocompleteFriends");
    for (let i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
    }
}

// only send form for existing friends
function validateFriendForm() {
    // look up if we have the wanted user
    for (let i = 0; i < friendsArray.length; i++) {
        if (FriendsInput.value.toLowerCase() == friendsArray[i].toLowerCase()) {
            document.getElementById("FriendForm").submit();
            return true;
        }
    }
    // if not, dont send and alert
    event.preventDefault();
    alert('Sorry, you cant add an imaginary Friend ;(');
    return false;
} 