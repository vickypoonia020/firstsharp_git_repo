var itemList = document.querySelector("#items");

let newWord = document.createElement("h1");
newWord.className = "hello";
newWord.id = "hello1";
var newText = document.createTextNode("Hello");
newWord.appendChild(newText);
var container = document.querySelector("ul .list-group-item:nth-child(1)");
var h1 = document.querySelector("ul h1");
newWord.style.fontSize = "30px";
container.insertBefore(newWord, h1);