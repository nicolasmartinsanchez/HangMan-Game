const startingScreen = document.getElementById("startingScreen");
const gameScreen = document.getElementById("gameScreen");
const addWordScreen = document.getElementById("addWordScreen");
const startButton = document.getElementById("startButton");
const addWordButton = document.getElementById("addWordButton");
const iconsContainer = document.getElementById("iconsContainer");

let width = window.innerWidth;
let height = window.innerHeight;

window.addEventListener("load", function(){hideDiv(gameScreen)}, false);
window.addEventListener("load", function(){hideDiv(addWordScreen)}, false);

startButton.addEventListener("click", function(){hideDiv(startingScreen)}, false);
startButton.addEventListener("click", function(){showDiv(gameScreen)}, false);
addWordButton.addEventListener("click", function(){hideDiv(startingScreen)}, false);
addWordButton.addEventListener("click", function(){showDiv(addWordScreen)}, false);

function hideDiv(div)
{
    div.style.display = "none";
}

function showDiv(div)
{
    div.style.display = "";
}
