
//Possible suites and values for a standard deck of cards
const suites = ["Hearts", "Diamonds", "Clubs", "Spades"];
const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];


//For each card in play, creates an array containing the image element.
let cards = document.querySelectorAll(".card");
let numberOfCardsInPlay = cards.length;
let currentBoard = [];
let cardsInPlay = [];
let doneCards = [];



//Used to create card objects
class Card {
  constructor(suite, value){
  //Suite of Card
    this.suite = suite;
  //Value of Card
    this.value = value;
  //Appropriate card image file path
    this.filePath = "playing-cards-assets/svg-cards/"+ value + "_of_" + suite + ".svg";
  }
}
  let done = [];

  //Check if an array already includes check (suite and value of cards). If it does, generates a new card.
  function checkIfIncludes(arr, check, card, i){
    if(!arr.includes(check)){
      arr.push(check);
      return card;
    } else{
      card = randomCard(i);
      check = card.suite + card.value;
      checkIfIncludes(arr, check, card, i);
    }
  }

//Creates an array of Card objects, representing the game board, based on the number of cards on the board.
//For each card, there will be a card with the same suite and value.
function generateCards(){

  for(let i = 0; i < numberOfCardsInPlay / 2; i++){
    let card = randomCard(i);
    let check = card.suite + card.value;
    card = checkIfIncludes(done, check, card, i);
    currentBoard.push(card);
    currentBoard.push(card);
  }
  shuffle(currentBoard);
  console.log(currentBoard);
}

//Shuffles an array
function shuffle(arr){
  for(let i = 0; i < arr.length; i++){
    let j = Math.floor(Math.random() * arr.length);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}


//Randomly generates a suite and value.
function randomCard(i){
  let suite = suites[Math.floor(Math.random() * 4)];
  let value = cardValues[Math.floor(Math.random() * 13)];
  let card = new Card(suite, value);
  return card;
}

function flipCard(i){
  if(doneCards.includes(cards[i])) return;
  if(cards[i].getAttribute("src") == "images/back.png"){
    cards[i].setAttribute("src", currentBoard[i].filePath);
    cards[i].classList.add("shown");
  } else if(cards[i].getAttribute("src") == currentBoard[i].filePath){
    cards[i].setAttribute("src", "images/back.png");
    cards[i].classList.remove("shown");
  }
}

function checkForMatch(){
  if(cardsInPlay[0].getAttribute("alt") === cardsInPlay[1].getAttribute("alt")){
    console.log("Matched " + cardsInPlay[0].getAttribute("alt") + " and " + cardsInPlay[0].getAttribute("alt"));
    doneCards.push(cardsInPlay[0]);
    doneCards.push(cardsInPlay[1]);
    cardsInPlay = [];
  } else{
    
  }
}


function setUpCards(){
  generateCards();
  for (let i = 0; i < numberOfCardsInPlay; i++){
      cards[i].setAttribute("alt", currentBoard[i].value + " of " + currentBoard[i].suite);
      cards[i].addEventListener("click", function(){
        if(!doneCards.includes(cards[i])){
          flipCard(i);
          cardsInPlay.push(cards[i]);
          if(cardsInPlay.length > 1) checkForMatch();
        }
      });
  }
}

function init(){
  setUpCards();
}

init();
