// chat token (tom)
window.chatToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNjY3NTU5NDM1fQ.uxDqhtYomc51BlCZ9R2Ua3KbPogaVIi2SUfL5A0cuCM";
window.chatCollectionId = "c2df5e51-285f-441f-9baa-3c510f5f4663";
window.chatServer = "https://online-lectures-cs.thi.de/chat";
// variabls
const FriendsInput = document.getElementById("friendlistInput");
const SumbitFriend = document.getElementById("addFriendButton");
const FriendForm = document.getElementById("friendForm");
var friendsArray;

// server nach definierten usern fragen
var xmlhttp = new XMLHttpRequest();
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


//set action for every keystrole
FriendsInput.addEventListener("keyup", event => {
    curInput = FriendsInput.value;
    // delete previous suggestions
    cleanUp();

    // div to display the suggestions
    var friendlist = document.createElement("div");
    friendlist.setAttribute("class", "autocompleteFriends");
    FriendsInput.parentNode.appendChild(friendlist);
    var nameHit;

    // check if we have a fitting name in database
    for (var i = 0; i < friendsArray.length; i++) {
        if (friendsArray[i].substring(0, curInput.length).toLowerCase() == curInput.toLowerCase()) {
            // if yes, add to div
            var hit = friendsArray[i];
            nameHit = document.createElement("div");
            nameHit.innerHTML = hit;
            friendlist.appendChild(nameHit);

            // autofill if clicked on name
            nameHit.addEventListener("click", event => {
                FriendsInput.value = hit;
                cleanUp();
            })
        }
    }
})

// delete previous suggestions
function cleanUp() {
    var elements = document.getElementsByClassName("autocompleteFriends");
    for (var i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
    }
}

// only send form for existing friends
function validateFriendForm() {
    // look up if we have the wanted user
    for (var i = 0; i < friendsArray.length; i++) {
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