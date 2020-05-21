"use strict";

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatPrivate")
    .build();


connection.on("ReceiveMessage", function (message) {
    var li = document.createElement("li");
    li.textContent = message;
    document.getElementById("messagesList").appendChild(li);
});

document.getElementById("send-private").addEventListener("click", async (event) => {
    var userid = document.getElementById("userid").value;
    var message = document.getElementById("msg").value;

    try {
        await connection.invoke("SendPrivateMessage", user, message);
    }
    catch (e) {
        console.error(e.toString());
    }
    event.preventDefault();
});

