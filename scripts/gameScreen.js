const z = document.getElementById("board");
const board = z.getContext("2d");
const newGameButton = document.getElementById("newGameButton");
const boxText = document.getElementById("wordContainer");
const boxLettersUsed = document.getElementById("letterUsedContainer");
const quitButton = document.getElementById("quitButton");
const keyBoardContainer = document.getElementById("keyBoardContainer");

let words = ["HOUSE", "DOG", "FRIDGE", "WINDOW", "GREEN", "BIRD", "MEAT", "KITCHEN", "ROOMMATE", "HEART"];

let min = 0;    //gets the random word
let max = words.length - 1;     //to get the random word
let randomWord;     //Contains the random word
let lengthWord;     //Contains the length of the random word
let letter;     //Contains the key "letter" that has been pressed 
let newInputText;   //Creates spaces in the interface for each letter of the random word
let inputText;   //Brings each spaces to check the letter
let counter = 0;    //Counter used to know if the word has been found
let letterPress = [""];     //Cotains keys pressed
let newContent;
let attempt = 0;
let checkAttempts;      // if the letters pressed coincides with any letter of randomWord checkAttempts is true, helps to count attempts
let popUpGameEnded;
let gameIsOver = false;
let keyButtonPressed;
let keyOrButton;    // to know if the user use the physical kayboard or virtual keyboard

// Event Listeners -----------------------------------------------------------------------------------------------------------------------------
startButton.addEventListener("click", startGame);
window.addEventListener("orientationchange", checkDimensionsDevice);
document.addEventListener("keydown", detectKey);
keyBoardContainer.addEventListener("touchstart", detectKeyButton);
newGameButton.addEventListener("click", restartGame);
quitButton.addEventListener("click", quitGame);
quitButton.addEventListener("click", function(){hideDiv(gameScreen)}, false);
quitButton.addEventListener("click", function(){showDiv(startingScreen)}, false);
window.addEventListener("resize", checkDimensionsDevice);

// Functions -----------------------------------------------------------------------------------------------------------------------------
function startGame () {
    checkDimensionsDevice();
    getRandomWord();
    createLettersContainer();
}

function getRandomWord() {
    max = words.length - 1;
    let randomNum = Math.floor(Math.random()*(max - min + 1)) + min;
    randomWord = words[randomNum];
    lengthWord = randomWord.length;
    console.log(randomWord);
}

function createLettersContainer ()    //Creates spaces in the interface for each letter of the random word and sets color to look invisible
{
    for (i=0; i < lengthWord; i++)
    {
        newInputText = document.createElement("input");
        newInputText.setAttribute("type", "text");
        newInputText.setAttribute("id", "letter" + i);
        newInputText.setAttribute("class", "letters-container");
        newInputText.setAttribute("value", randomWord[i]);
        newInputText.setAttribute("readonly", "readonly");
        boxText.appendChild(newInputText);
        newInputText.style.color = "#F0FFF4";
        newInputText.style.fontFamily = "myFontGame";
    }
}

function checkDimensionsDevice () {     //Function uses to change the dimensions of the board according to device's dimensions
    if (width < 500 || height < 500) 
    {
        z.setAttribute("width", 300);
        z.setAttribute("height", 300);
        gameScreen.style.display == "" ? hideDiv(iconsContainer) : showDiv(iconsContainer); 
    }
}

function detectKey (event) {    // key detector of the physical keyboard
    keyOrButton = "key";
    if (gameIsOver == false)    // if game is over, does not receive more letters 
    {
        letter = event.key;
        letter = letter.toUpperCase();
        if (event.code.indexOf("Key" + letter) !== -1){     // to avoid keys like tab, spacebar or numbers
            getInputs();
        }
    }
}

function detectKeyButton (event) {    // key detector of the virtual keyboard
    keyOrButton = "button";
    alert(event);
    console.log(event);
    if (gameIsOver == false)    // if game is over, does not receive more letters 
    {
        keyButtonPressed = event.path[0];
        letter = keyButtonPressed.innerText;
        getInputs();
    }  
}

function getInputs()
{
    checkAttempts = false;
    for (j=0; j < lengthWord; j++)
    {
        inputText = document.getElementById("letter" + j);   
        compareLetter (inputText, letter);     //checks each of the spaces to compare the letters, if found it change style to make it visible
    }
    if (checkAttempts == false)
    {
        attempt++;
        fillLetterPressed();
        if (keyOrButton === "button")
        {
            keyButtonPressed.style.background = "#ff8882";
        }
        else 
        {
            changeStyleVirtualKeyBoard("#ff8882");
        }
    }
    drawHangman();
    checkCounter();
}

function compareLetter (inputText, letter)
{
    if (inputText.value == letter)
    {
        counter++;
        inputText.style.color = "#668F6E";
        if (keyOrButton === "button")
        {
            keyButtonPressed.style.background = "#6aa9e9";
        }
        else 
        {
            changeStyleVirtualKeyBoard("#6aa9e9");
        }
        checkAttempts = true;
    }
}

function fillLetterPressed () {     
    for (k=0; k < letterPress.length; k++)
        {
            if (letterPress.indexOf(letter) == -1)    //checks if the key already has been pressed to not repeat process   
            {
                letterPress.push(letter);
                printLettersPressed (letterPress, newContent, boxLettersUsed);
            }
        }
}

function changeStyleVirtualKeyBoard (color)
{
    for (element of keyBoardContainer.children) {
        if (element.innerText == letter) {
            element.style.background = color;
        }
    }
}

function drawHangman () 
{
    if (width > 500 && height > 500)
    {
        if (attempt == 1){
            drawLine ("#668F6E", 50, 400, 400, 400);
            drawLine ("#668F6E", 100, 400, 100, 50);
            drawLine ("#668F6E", 96, 50, 254, 50);
            drawLine ("#668F6E", 250, 50, 250, 100);
        }
        if (attempt == 2){
            drawCircle ("#668F6E", "#F0FFF4", 250, 120, 30) 
        }
        if (attempt == 3){
            drawLine ("#668F6E", 250, 150, 250, 270);
        }
        if (attempt == 4){
            drawLine ("#668F6E", 250, 270, 210, 340);
        }
        if (attempt == 5){
            drawLine ("#668F6E", 250, 270, 290, 340);
        }
        if (attempt == 6){
            drawLine ("#668F6E", 250, 180, 210, 240);
        }
        if (attempt == 7){
            drawLine ("#668F6E", 250, 180, 290, 240);
            alertGameEnd("Game over", "You've made 7 mistakes and lost this game");
        }
    }
    else {
        if (attempt == 1){
            drawLine ("#668F6E", 25, 275, 275, 275);
            drawLine ("#668F6E", 75, 275, 75, 21);
            drawLine ("#668F6E", 75, 25, 189, 25);
            drawLine ("#668F6E", 185, 25, 185, 50);
        }
        if (attempt == 2){
            drawCircle ("#668F6E", "#F0FFF4", 185, 70, 20) 
        }
        if (attempt == 3){
            drawLine ("#668F6E", 185, 90, 185, 180);
        }
        if (attempt == 4){
            drawLine ("#668F6E", 185, 180, 160, 230);
        }
        if (attempt == 5){
            drawLine ("#668F6E", 185, 180, 210, 230);
        }
        if (attempt == 6){
            drawLine ("#668F6E", 185, 120, 160, 160);
        }
        if (attempt == 7){
            drawLine ("#668F6E", 185, 120, 210, 160);
            alertGameEnd("Game over", "You've made 7 mistakes and lost this game");
        }
    }
}

function drawLine (color, xInitial, yInitial, xFinal, yFinal) {
    board.beginPath();
    board.strokeStyle = color;
    board.lineWidth = 8;
    board.moveTo(xInitial, yInitial);
    board.lineTo(xFinal, yFinal);
    board.stroke();
    board.closePath();
}

function drawCircle (color1, color2, x, y, r)
{
    board.beginPath();
    board.strokeStyle = color1;
    board.fillStyle = color2;
    board.arc(x, y, r, 0, 2*Math.PI);
    board.fill();
    board.stroke();
}

function alertGameEnd (textTop, textBottom)
{
    gameIsOver = true;
    popUpGameEnded = document.createElement("div");
    popUpGameEnded.setAttribute("class", "alert-game-end")
    gameScreen.appendChild(popUpGameEnded);
    let text1 = document.createElement("textarea");
    let texto1 = document.createTextNode(textTop);
    text1.setAttribute("class", "text-alert-1");
    popUpGameEnded.appendChild(text1);
    text1.appendChild(texto1);
    text1.style.fontFamily = "myFontGame";
    let text2 = document.createElement("textarea");
    let texto2 = document.createTextNode(textBottom);
    text2.setAttribute("class", "text-alert-2");
    popUpGameEnded.appendChild(text2);
    text2.appendChild(texto2);
    text2.style.fontFamily = "myFontGame";
}

function checkCounter ()
{
    if (counter === lengthWord) {
        alertGameEnd("Excellent!", "You have found the word")
    }
}

function printLettersPressed (letterPress, newContent, boxLettersUsed)
{
    let resultado = letterPress.slice(-1);
    newContent = document.createTextNode(resultado);
    boxLettersUsed.appendChild(newContent);
}

// Functions uses when the game is over -------------------------------------------------------------------------------------
function restartGame () 
{
    cleanScreen(boxText);
    cleanScreen(boxLettersUsed);
    if (gameIsOver == true)
    {
        cleanScreen(popUpGameEnded);
        gameScreen.removeChild(popUpGameEnded);
        gameIsOver = false;
    }
    cleanDraw();
    cleanVariables();
    cleanKeyBoard();
    startGame();
}

function quitGame ()
{
    cleanScreen(boxText);
    cleanScreen(boxLettersUsed);
    if (gameIsOver == true)
    {
        cleanScreen(popUpGameEnded);
        gameScreen.removeChild(popUpGameEnded);
        gameIsOver = false;
    }
    cleanDraw();
    cleanVariables();
    cleanKeyBoard();
    showDiv(iconsContainer);
}

function cleanScreen (div)
{
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function cleanVariables ()
{
    counter = 0;
    letterPress = [""];
    checkAttempts = false;
    attempt = 0;
}

function cleanDraw ()
{
    z.width = z.width;
}

function cleanKeyBoard ()
{
    for (element of keyBoardContainer.children) {
            element.style.background = "#EBEBEB";
    }
}

