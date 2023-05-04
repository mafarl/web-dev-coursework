const skinImages = ['emoji-assets/skin/red.png', 'emoji-assets/skin/yellow.png', 'emoji-assets/skin/green.png'];
const eyesImages = ['emoji-assets/eyes/closed.png', 'emoji-assets/eyes/laughing.png', 'emoji-assets/eyes/long.png', 'emoji-assets/eyes/normal.png', 'emoji-assets/eyes/rolling.png', 'emoji-assets/eyes/winking.png'];
const mouthImages = ['emoji-assets/mouth/open.png', 'emoji-assets/mouth/sad.png', 'emoji-assets/mouth/smiling.png', 'emoji-assets/mouth/straight.png', 'emoji-assets/mouth/surprise.png', 'emoji-assets/mouth/teeth.png'];

let numberOfCards = 0;

const maxAttempts = 100;
// Seconds
const maxTime = 300;

let numAttempts = 0;
let numCurrentAttempts = 0;
let numberFlippedCard = 0;
let lockBoard = false;
let arrayOfCards=[];
let allPairs = [];
let cardID = 0;
let distance;

let once = true;
let over = false;
let startAudio = true;

let level = 0;
let current_level_score = 80;

let level_scores = [];

let numMatches = 0;

// Generate combination of images (skin,eyes,mouth) for the card
function createCardCombination(skinImages, eyesImages, mouthImages){
    // Math.floor(x) - the largest integer number less or equal to x
    // Math.random() - returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1
    let skinIndex = Math.floor(Math.random() * skinImages.length);
    let eyesIndex = Math.floor(Math.random() * eyesImages.length);
    let mouthIndex = Math.floor(Math.random() * mouthImages.length);
    let array = [skinImages[skinIndex], eyesImages[eyesIndex], mouthImages[mouthIndex], cardID];
    if (checkIfCardExists(array,allPairs) == false){
        cardID++;
        allPairs.push(array);
        return true;
    }
}

// Check if the generated combination of images (skin,eyes,mouth) already exists
function checkIfCardExists(currentCardArray, allPairsHere){
    let match = false;
    for (let i=0; i<allPairs.length; i++){
        if (allPairsHere[i][0] == currentCardArray[0] && allPairsHere[i][1] == currentCardArray[1] && allPairsHere[i][2] == currentCardArray[2]){
            match = true;
        }
    }
    return match;
}

// Need to shuffle cards before creating them
function cardsShuffle(cardArray){

      let currentIndex = cardArray.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [cardArray[currentIndex], cardArray[randomIndex]] = [
            cardArray[randomIndex], cardArray[currentIndex]];
      }

      return cardArray;
}

function flipCard() {
    if (lockBoard) return;
    // Instead of checking if it's the 1st card, check  if it's NOT the last one
    if (this === arrayOfCards[0]) return;

    this.classList.add('flip');

    this.removeEventListener('click', flipCard);
  
    let children = this.childNodes;
    children.forEach(child => child.removeAttribute("hidden"));
    if (numberFlippedCard!=(numberOfCards-1)) {
      arrayOfCards[numberFlippedCard] = this;
      numberFlippedCard++;
      return;
    }
  
    arrayOfCards[numberFlippedCard] = this;
    numberFlippedCard++;
    checkForMatch();
}

function checkForMatch() {

    let winVar = false;
    let isMatch = true;
    for (let i=0;i<(numberFlippedCard-1);i++){
        if (arrayOfCards[i].id != arrayOfCards[i+1].id){
            isMatch = false;
        }
    }
    
    if (isMatch) {
        numAttempts++;
        numCurrentAttempts ++;
        numMatches++;
        disableCards();

        if (numMatches == 5){

            $.ajax({
                type: "POST",
                url: "storeScore.php",
                data: {level: level, score: current_level_score},
                success: function(data) {
                    console.log("Score stored successfully");
                }
            });

            if (numberOfCards == 4){
                level_scores.push(current_level_score);
                
                win();
                winVar = true;
            } else{
                numMatches = 0;
                level_scores.push(current_level_score);
                numCurrentAttempts = 0;
                removeCards();
                createCards();
                checkAttempts();
            }       
        } else {
            checkAttempts();
        }
        
    } else {
        numCurrentAttempts ++;
        numAttempts++;
        checkAttempts();  
        unflipCards();
    }

    if (!winVar){
        const overallAttempts = document.getElementById("attempts-container").firstElementChild;
        overallAttempts.innerHTML = "Overall attempts: " + numAttempts;     
    }
}

function checkAttempts(){
    if (numAttempts >= 100){
        removeCards();
        lostAttempts();
    }
}

function removeCards(){
    let inputLevel = document.getElementById("level-storage");
    inputLevel.value = numberOfCards;

    const cards = document.querySelectorAll('.card');
    cards.forEach(function(card){
        while (card.hasChildNodes()){
            card.removeChild(card.firstChild);
        }
        card.remove();
    });
}

function unflipCards() {
    lockBoard = true;
    
    setTimeout(() => {
        arrayOfCards.forEach(card => card.classList.remove('flip'));

        arrayOfCards.forEach(card => card.addEventListener('click', flipCard));

        arrayOfCards.forEach(card => card.querySelectorAll('.emoji-pairs-card').forEach(img => img.setAttribute("hidden", "hidden")));
  
      resetBoard();
    }, 1000);
}

function disableCards() {
    arrayOfCards.forEach(card => card.removeEventListener('click', flipCard));

    resetBoard();
}

function resetBoard() {
    [numberFlippedCard, lockBoard] = [0, false];
    arrayOfCards = [];
    arrayOfCards.push(0*(numberOfCards - 1));
}

// Create card divs and img elements (=> create cards on the board)
function createCards(){

    //Play sound
    if (startAudio){
        audio.play();
        startAudio = false;
    }
    
    level = document.getElementById("level-storage").value;

    while (allPairs.length != 5){
        createCardCombination(skinImages, eyesImages, mouthImages);
    }

    //console.log("Cards after createCardCombination in main function"+allPairs);

    // Assign how many cards a user should match (number of each card that should be generated)
    if (level == 1){
        numberOfCards = 2;
        cardFacesArray = allPairs.concat(allPairs);
    } else if (level == 2) {
        numberOfCards = 3;
        cardFacesArray = allPairs.concat(allPairs).concat(allPairs);
    } else if (level == 3) {
        numberOfCards = 4;
        cardFacesArray = allPairs.concat(allPairs).concat(allPairs).concat(allPairs);
    } 
    arrayOfCards.push(0*(numberOfCards - 1));
    cardsShuffle(cardFacesArray);

    const cardBoard = document.getElementById("cards-layout");

    // Create all the cards on the board (5 different each having the appropriate no. copies depending on the level)
    for (let j=0; j < (5*numberOfCards); j++){
        // Create card div element 
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.id = cardFacesArray[j][3];
        cardID++;

        // Create skin image inside from the array of all the faces that should be added (they are shuffled already)
        const imgSkin = document.createElement("img");
        imgSkin.src = cardFacesArray[j][0];
        imgSkin.classList.add('emoji-pairs-card');
        imgSkin.setAttribute("hidden", "hidden");
        card.appendChild(imgSkin);
        // Create eyes image inside from the array of all the faces that should be added
        const imgEyes = document.createElement("img");
        imgEyes.src = cardFacesArray[j][1];
        imgEyes.classList.add('emoji-pairs-card');
        imgEyes.setAttribute("hidden", "hidden");
        card.appendChild(imgEyes);
        // Create mouth image inside from the array of all the faces that should be added
        const imgMouth = document.createElement("img");
        imgMouth.src = cardFacesArray[j][2];
        imgMouth.classList.add('emoji-pairs-card');
        imgMouth.setAttribute("hidden", "hidden");
        card.appendChild(imgMouth);

        cardBoard.appendChild(card);
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', flipCard));
}

function win(){

    // Reduce volume
    audio.volume = 0.4;

    over = true;

    // Stop timer
    once = false;
    const button = document.getElementById("button-to-start-game");
    button.removeEventListener("click", checkTime);

    const attem = document.getElementById("attempts-container");
    const timee = document.getElementById("timer-container");


    while (attem.hasChildNodes()) {
        attem.removeChild(attem.firstChild);
    }


    while (timee.hasChildNodes()) {
        timee.removeChild(timee.firstChild);
    }

    removeCards();
    if (session_set) {
        // Session is set
        const cardBoard = document.getElementById("game-board");
        // changed div to form
        const wrapper = document.createElement("form");
        wrapper.setAttribute("id", "wrapper");
        
        const scoreMessage = document.createElement("h2");
        scoreMessage.setAttribute("id", "h2-pairs");
        // Sum of scores of all three levels
        const scoreNum = Math.round(level_scores.reduce(function(a, b){
            return a + b;
          }));
        const textNode = document.createTextNode("Your score: " + scoreNum);
        scoreMessage.appendChild(textNode); 
        cardBoard.appendChild(scoreMessage);

        //addded
        // Create form --> inside input + button to submit score 
        const formWrap = document.createElement("form");
        formWrap.setAttribute("method", "POST");
        formWrap.setAttribute("action", "/leaderboard.php");

        const hiddenInput = document.createElement("input");
        hiddenInput.setAttribute("hidden", "hidden");
        hiddenInput.setAttribute("name", "level_scores");
        hiddenInput.setAttribute("value", level_scores);
        hiddenInput.value = level_scores;

        formWrap.appendChild(hiddenInput);

        const submitScore = document.createElement("button");
        submitScore.setAttribute("id", "button-on-pairs-win");
        const textNode1 = document.createTextNode("Submit score");
        
        // Check the user doesn't have scores uploaded already
        submitScore.addEventListener('click', function(){submitScoreClickHandler('user');});
        submitScore.onclick = function(){
            // First check if already in the file (if yes - delete, use the same ajax for 'Play again')
            // Pause the audio
            audio.pause();
            window.location.href = "leaderboard.php";
        }

        submitScore.appendChild(textNode1);
        formWrap.appendChild(submitScore);

        const playAgain = document.createElement("button"); 
        playAgain.setAttribute("id", "button-on-pairs-win");
        const textNode2 = document.createTextNode("Play again");

        playAgain.addEventListener('click', function(){deleteLastScore('JohnDoe');});
        playAgain.onclick = function(){

            deleteLastScore("username");
            // Pause the audio
            audio.pause();  
            window.location.href = "pairs.php";
        }

        playAgain.appendChild(textNode2);
        formWrap.appendChild(playAgain);
        wrapper.appendChild(formWrap);
        //wrapper.appendChild(playAgain);
        cardBoard.appendChild(wrapper);
    } else {
        // Session is not set
        const cardBoard = document.getElementById("game-board");
        const wrapper = document.createElement("div");
        wrapper.setAttribute("id", "wrapper");
        
        // Prints out score
        const scoreMessage = document.createElement("h2");
        scoreMessage.setAttribute("id", "h2-pairs");
        const scoreNum = Math.round(level_scores.reduce(function(a, b){
            return a + b;
          }));
        const textNode = document.createTextNode("Your score: " + scoreNum);
        scoreMessage.appendChild(textNode); 
        cardBoard.appendChild(scoreMessage);

        // Says that the score can't be saved to leaderboard
        const message = document.createElement("h3");
        message.setAttribute("id", "h2-pairs");
        const textNode1 = document.createTextNode("Can't save your score because you're not registered.");
        message.appendChild(textNode1); 
        cardBoard.appendChild(message);

        // Button to registration.php (Register now)
        const registerNow = document.createElement("button"); 
        registerNow.setAttribute("id", "button-on-pairs-win");
        const text = document.createTextNode("Register now");

        registerNow.addEventListener('click', function(){deleteLastScore('JohnDoe');});
        registerNow.onclick = function(){
            window.location.href = "registration.php";
        }
        registerNow.appendChild(text);
        wrapper.appendChild(registerNow);

        // Button to pairs.php (Play again)
        const playAgain = document.createElement("button"); 
        playAgain.setAttribute("id", "button-on-pairs-win");
        const text2 = document.createTextNode("Play again");
        playAgain.appendChild(text2);

        playAgain.addEventListener('click', function(){deleteLastScore('JohnDoe');});
        playAgain.onclick = function(){
            window.location.href = "pairs.php";
        }
        wrapper.appendChild(playAgain);
        cardBoard.appendChild(wrapper);
    }
}

function lostAttempts(){

    // Reduce volume
    audio.volume = 0.4;

    over = true;

    // Stop timer
    once = false;
    const button = document.getElementById("button-to-start-game");
    button.removeEventListener("click", checkTime);

    const cardBoard = document.getElementById("game-board");
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", "wrapper");

    const lostMessage = document.createElement("h2");
    lostMessage.setAttribute("id", "h2-pairs");
    const textNode = document.createTextNode("Oops... Someone's lots...");
    lostMessage.appendChild(textNode); 
    wrapper.appendChild(lostMessage);

    const reasonMessage = document.createElement("h3");
    reasonMessage.setAttribute("id", "h2-pairs");
    const textNode1 = document.createTextNode("You've used to many attempts!");
    reasonMessage.appendChild(textNode1); 
    wrapper.appendChild(reasonMessage);

    const playAgain = document.createElement("button"); 
    playAgain.setAttribute("id", "button-on-pairs");
    const text = document.createTextNode("Play again");
    playAgain.appendChild(text);

    if (level != 1){
        deleteLastScore("username");
    }

    playAgain.onclick = function(){
        // Pause the audio
        audio.pause();
        window.location.href = "pairs.php";
    }
    // add the button to the page
    wrapper.appendChild(playAgain);
    cardBoard.appendChild(wrapper);
}

function lostTime(){

    // Reduce volume
    audio.volume = 0.4;

    over = true;

    // Stop timer
    const button = document.getElementById("button-to-start-game");
    button.removeEventListener("click", checkTime);

    const cardBoard = document.getElementById("game-board");
    const wrapper = document.createElement("div");
    wrapper.setAttribute("id", "wrapper");

    const lostMessage = document.createElement("h2");
    lostMessage.setAttribute("id", "h2-pairs");
    const textNode = document.createTextNode("Oops... Someone's lots...");
    lostMessage.appendChild(textNode); 
    wrapper.appendChild(lostMessage);

    const reasonMessage = document.createElement("h3");
    reasonMessage.setAttribute("id", "h2-pairs");
    const textNode1 = document.createTextNode("You've run out of time!");
    reasonMessage.appendChild(textNode1); 
    wrapper.appendChild(reasonMessage);

    const playAgain = document.createElement("button"); 
    playAgain.setAttribute("id", "button-on-pairs");
    const text = document.createTextNode("Play again");
    playAgain.appendChild(text);

    if (level != 1){
        deleteLastScore("username");
    }

    playAgain.onclick = function(){
        // Pause the audio
        audio.pause();
        window.location.href = "pairs.php";
    }
    // add the button to the page
    wrapper.appendChild(playAgain);
    cardBoard.appendChild(wrapper);
}


document.getElementById("button-to-start-game").addEventListener('click', createCards);
const button = document.getElementById("button-to-start-game");
button.addEventListener("click", checkTime);
button.addEventListener("click", checkScore);
var audio = document.getElementById("myAudio");
let clock;

function checkTime(){
    const timer = document.getElementById('timer-container').firstChild;
    clock = setInterval(function() {
        var timeNow = new Date();
        let timeGiven = document.body.dataset.timeGiven;
        timeGiven = new Date(timeGiven);
        distance = timeGiven - timeNow;
        if (distance < 0){ 
            button.removeEventListener("click", checkTime); 
            clearInterval(clock);
            removeCards(); 
            if (once){
                lostTime(); 
                once = false;
            }
                    
        } else{
            timer.innerHTML = "Time left: " + Math.round(distance/1000) + "seconds";
        }
    }, 1000);
}

function checkScore(){
    clock = setInterval(function() {
        $.ajax({
            type: "POST",
            url: "checkScore.php",
            data: {level: level, score: current_level_score},
            success: function(data) {
                if (data == 0){
                    const cardBoardDiv = document.getElementById("game-board"); 
                    cardBoardDiv.style.backgroundColor = "#FFD700";
                } else {
                    const cardBoardDiv = document.getElementById("game-board"); 
                    cardBoardDiv.style.backgroundColor = "grey";
                }
            }
        });

        if (!over){
            const currentAttempts = document.getElementById("attempts-container").lastElementChild;

            // Insert score here (not attempts)
            level = Number(level);

            if (level == 1) {
                current_level_score = Math.round(0.2 * (100 - numCurrentAttempts + distance/1000));
            } else if (level == 2){
                current_level_score = Math.round(0.3 * (100 - numCurrentAttempts + distance/1000));
            } else {
                current_level_score = Math.round(0.5 * (100 - numCurrentAttempts + distance/1000));
            }

            currentAttempts.innerHTML = "Level " + (numberOfCards - 1) + " score: " + current_level_score;
        }
        

    }, 1000);
}

function submitScoreClickHandler(username) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "submit_score.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Score submitted successfully");
      }
    };
    xhr.send("username=" + encodeURIComponent(username));
}
  
  function deleteLastScore(username) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "delete_last_score.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Last score deleted successfully");
      }
    };
    xhr.send("username=" + encodeURIComponent(username));
  }
  