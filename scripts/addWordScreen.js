const saveStartButton = document.getElementById("saveStartButton");
const textAreaNewWord = document.getElementById("textAreaNewWord");
const backButton = document.getElementById("backButton");

let newWord;

saveStartButton.addEventListener("click", addWord);
backButton.addEventListener("click", function(){hideDiv(addWordScreen)}, false);
backButton.addEventListener("click", function(){showDiv(startingScreen)}, false);

function addWord ()
{
    if (textAreaNewWord.value != "")
    {
        newWord = textAreaNewWord.value;
        if (newWord.length <= 8 && newWord.indexOf(" ") == -1)
        {
            newWord = newWord.toUpperCase();
            words.push(newWord);
            textAreaNewWord.value = "";
            hideDiv(addWordScreen);
            showDiv(gameScreen);
            restartGame();
        }
        else
        {
            alert("Check the word");
        }
    }
    else
    {
        alert("Introduce a word");
    }
}

