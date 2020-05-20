"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;
document.getElementById("addProductBtn").disabled = true;
document.getElementById("addStudentBtn").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    document.getElementById("addProductBtn").disabled = false;
    document.getElementById("addStudentBtn").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

//-----------------------------------------------------//
connection.on("ReceiveProduct", function (productName, productPrice) {
    var product = "Product Name : " + productName + "Product Price : ฿" + productPrice;
    var li = document.createElement("li");
    li.textContent = product;
    document.getElementById("messagesList").appendChild(li);
});

document.getElementById("addProductBtn").addEventListener("click", function (event) {
    var name = document.getElementById("productName").value;
    var price = document.getElementById("productPrice").value;
    connection.invoke("AddProduct", name, price).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

//-----------------------------------------------------//
var student = { firstname: "Fiat", lastname: "500", color: "white" };

document.getElementById("addStudentBtn").addEventListener("click", function (event) {

    student.firstname = document.getElementById("firstname").value;
    student.lastname = document.getElementById("lastname").value;
    connection.invoke("AddStudent", student).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});


connection.on("ReceiveNewStudent", function (student) {
    var std = "First Name : " + student.firstName + " Last Name : " + student.lastName;
    var li = document.createElement("li");
    li.textContent = std;
    document.getElementById("messagesList").appendChild(li);
});