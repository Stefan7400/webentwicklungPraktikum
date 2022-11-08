var messageCount = 0;
var xmlhttp = new XMLHttpRequest();

var chatbox = document.getElementById("chatbox");
var recipient = "Tom";

document.getElementById("sendMessage").addEventListener("click", sendMessage);
document.getElementById("message").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const input = document.getElementById("message");
    if (input.value !== undefined && input.value !== null && input.value !== "") {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
                console.log("sent message");
            }
        };

        xmlhttp.open("POST", window.chatServer + "/" + window.chatCollectionId + "/message", true);
        xmlhttp.setRequestHeader('Content-type', 'application/json');
        xmlhttp.setRequestHeader('Authorization', 'Bearer ' + window.chatToken);

        let data = {
            message: input.value,
            to: recipient
        }
        let jsonString = JSON.stringify(data);      // Serialize as JSON
        xmlhttp.send(jsonString);                   // Send JSON-data to server
        
        input.value = "";
    }
}

function addMessageHTML(data) {
    let message = document.createElement("div");
    message.className = "flex";

    let text = document.createElement("div");
    text.innerText = data.from + ": " + data.msg;
    message.appendChild(text);

    let timestamp = document.createElement("div");
    timestamp.innerHTML = new Date(data.time).toLocaleTimeString();
    timestamp.className = "time";
    message.appendChild(timestamp);

    chatbox.appendChild(message);
}

function loadNewMessages(recipient) {
    if (recipient !== undefined && recipient !== null && recipient !== "") {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let data = JSON.parse(xmlhttp.responseText);
                console.log(data);

                for (let i = messageCount; i < data.length; i++) {
                    addMessageHTML(data[i]);
                    messageCount++;
                }
            }
        };

        xmlhttp.open("GET", window.chatServer + "/" + window.chatCollectionId + "/message/" + recipient, true);
        xmlhttp.setRequestHeader('Authorization', 'Bearer ' + window.chatToken);
        xmlhttp.send();
    }
}

window.setInterval(function() {
    loadNewMessages(recipient);
    console.log("refreshing site");
}, 1000);

window.setInterval(function() {
    // send Dummy Message from Tom

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 204) {
            console.log("received message");
        }
    };

    xmlhttp.open("POST", window.chatServer + "/" + window.chatCollectionId + "/message", true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVG9tIiwiaWF0IjoxNjY3Njc2ODE2fQ._xMdkK91a6QdDXruTJTbnHVb3Th7QHGMR6r1Bkj6j1k');

    let data = {
        message: "Dummy Message",
        to: "Jerry"
    }
    let jsonString = JSON.stringify(data);
    xmlhttp.send(jsonString);
}, 30000);