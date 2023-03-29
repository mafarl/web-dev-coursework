const skinImages = ['emoji-assets/skin/red.png', 'emoji-assets/skin/yellow.png', 'emoji-assets/skin/green.png'];
const eyesImages = ['emoji-assets/eyes/closed.png', 'emoji-assets/eyes/laughing.png', 'emoji-assets/eyes/long.png', 'emoji-assets/eyes/normal.png', 'emoji-assets/eyes/rolling.png', 'emoji-assets/eyes/winking.png'];
const mouthImages = ['emoji-assets/mouth/open.png', 'emoji-assets/mouth/sad.png', 'emoji-assets/mouth/smiling.png', 'emoji-assets/mouth/straight.png', 'emoji-assets/mouth/surprise.png', 'emoji-assets/mouth/teeth.png'];

let level = document.getElementById("level-storage").value;
let numberOfCards = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let allPairs = [];
let cardID = 0;

// Generate combination of images (skin,eyes,mouth) for the card
function createCardCombination(skinImages, eyesImages, mouthImages){
    // Math.floor(x) - the largest integer number less or equal to x
    // Math.random() - returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1
    const skinIndex = Math.floor(Math.random() * skinImages.length);
    const eyesIndex = Math.floor(Math.random() * eyesImages.length);
    const mouthIndex = Math.floor(Math.random() * mouthImages.length);
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
    if (this === firstCard) return;

    this.classList.add('flip');
  
    //this.classList.add('flip');
    let children = this.childNodes;
    children.forEach(child => child.removeAttribute("hidden"));
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
  
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.id == secondCard.id;
  
    if (isMatch) {
      //numMatches++;
      disableCards();
    } else {
      //numAttempts++;
      unflipCards();
    }
}

function unflipCards() {
    lockBoard = true;
    
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      let firstImg = firstCard.querySelectorAll('.emoji-pairs-card');
      firstImg.forEach(img => img.setAttribute("hidden", "hidden"));
      let secondImg = secondCard.querySelectorAll('.emoji-pairs-card');
      secondImg.forEach(img => img.setAttribute("hidden", "hidden"));
  
      resetBoard();
    }, 1000);
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    resetBoard();
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Create card divs and img elements (=> create cards on the board)
function createCards(){

    while (allPairs.length != 5){
        createCardCombination(skinImages, eyesImages, mouthImages);
    }

    let cardFacesArray = [];

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



document.getElementById("button-to-start-game").addEventListener('click', createCards);

