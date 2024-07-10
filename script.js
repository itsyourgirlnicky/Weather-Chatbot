var audio = new Audio('assets/sentmessage.mp3');

function startFunction() {
    setLastSeen();
    sendTextMessage("Hey there! 👋🏻,<br><br> I’m your personal weather guide. <br> <span class='bold'> Which city’s current weather would you like to check today? ☀️🌦️</span><br>");
}

function setLastSeen() {
    var date = new Date();
    var lastSeen = document.getElementById("lastseen");
    lastSeen.innerText = "last seen today at " + date.getHours() + ":" + date.getMinutes();
}

function isEnter(event) {
    if (event.keyCode == 13) {
        sendMsg();
    }
}

function sendMsg() {
    var input = document.getElementById("inputMSG");
    var ti = input.value;
    if (input.value == "") {
        return;
    }
    var date = new Date();
    var myLI = document.createElement("li");
    var myDiv = document.createElement("div");
    var greendiv = document.createElement("div");
    var dateLabel = document.createElement("label");
    dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
    myDiv.setAttribute("class", "sent");
    greendiv.setAttribute("class", "green");
    dateLabel.setAttribute("class", "dateLabel");
    greendiv.innerText = input.value;
    myDiv.appendChild(greendiv);
    myLI.appendChild(myDiv);
    greendiv.appendChild(dateLabel);
    document.getElementById("listUL").appendChild(myLI);
    var s = document.getElementById("chatting");
    s.scrollTop = s.scrollHeight;
    setTimeout(function () { waitAndResponce(ti) }, 1500);
    input.value = "";
}

async function waitAndResponce(inputText) {
    var lastSeen = document.getElementById("lastseen");
    lastSeen.innerText = "typing...";
    
    try {
        const response = await fetch('http://127.0.0.1:5000/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: inputText }),
        });
        const data = await response.json();
        sendTextMessage(data.response);
    } catch (error) {
        console.error("Error in API call:", error);
        sendTextMessage("Sorry, I encountered an error. Please try again.");
    }
    
    lastSeen.innerText = "online";
}

function sendTextMessage(textToSend) {
    setTimeout(function () {
        var date = new Date();
        var myLI = document.createElement("li");
        var myDiv = document.createElement("div");
        var greendiv = document.createElement("div");
        var dateLabel = document.createElement("label");
        dateLabel.setAttribute("id", "sentlabel");
        dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
        myDiv.setAttribute("class", "received");
        greendiv.setAttribute("class", "grey");
        greendiv.innerHTML = textToSend;
        myDiv.appendChild(greendiv);
        myLI.appendChild(myDiv);
        greendiv.appendChild(dateLabel);
        document.getElementById("listUL").appendChild(myLI);
        var s = document.getElementById("chatting");
        s.scrollTop = s.scrollHeight;
        playSound();
    }, 1500);
}

function playSound() {
    audio.play();
}


