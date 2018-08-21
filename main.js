/*
Memory Game created as prework for General Assembly's Web Development Immersive 2018
Card files from https://github.com/hayeah/playing-cards-assets/tree/331779f7069f45577119a677b8878b2bbd010302
*/

//Possible suites and values for a standard deck of cards
const suites = ["Hearts", "Diamonds", "Clubs", "Spades"];
const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
let won = false;

//Game div
let game = document.querySelector(".game");
//For each card in play, creates an array containing the image element.
let cards = [];
//The number of cards to be generated
let numberOfCardsInPlay = 8;
//Contains the Card objects of the game board.
let currentBoard = [];
//Contans the two cards that the player has selected.
let cardsInPlay = [];
//Contains cards that have already been matched.
let doneCards = [];

//Easy and Hard Links
let easyLink = document.getElementById("easyLink");
let hardLink = document.getElementById("hardLink");


//Used to create card objects
class Card {
  constructor(suite, value, elm){
  //Suite of Card
    this.suite = suite;
  //Value of Card
    this.value = value;
  //Appropriate card image file path
    this.filePath = "svg-cards/"+ value + "_of_" + suite + ".svg";
  //DOM Element Tied to Card object
    this.elm = elm;
  }
}
  let done = [];

  //Check if an array already includes check (suite and value of cards). If it does, generates a new card.
  function checkIfIncludes(arr, check, card, i){
    if(!arr.includes(check)){
      arr.push(check);
      currentBoard.push(card);
      currentBoard.push(card);
      return;
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
    checkIfIncludes(done, check, card, i);
    game.appendChild(card.elm);
    game.appendChild(card.elm.cloneNode(true));
  }
  cards = document.querySelectorAll('.card');
  for(var i = game.children.length; i >= 0; i--){
    game.appendChild(game.children[Math.random() * i | 0])
  }
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
  let elm = document.createElement("img");
  elm.setAttribute("alt", value + " of " + suite);
  elm.setAttribute("src", "images/back.png")
  elm.classList.add("card");
  let card = new Card(suite, value, elm);
  return card;
}

//"Flips" the card to display either the front or back image.
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

//Returns index of card in array. If it is not present, returns -1.
//Because Node Lists dont have indexOf...
function findCard(arr, card){
  for (let i = 0; i < arr.length; i++){
    if(cards[i] == card) return i;
  }
  return -1;
}

//Checks if the cards in play match. If they do, they are added to doneCards. If not, they are reset.
function checkForMatch(){
  if(cardsInPlay[0] === cardsInPlay[1]){
    cardsInPlay = [];
    return;
  }
  if(cardsInPlay[0].getAttribute("alt") === cardsInPlay[1].getAttribute("alt")){
    console.log("Matched " + cardsInPlay[0].getAttribute("alt") + " and " + cardsInPlay[0].getAttribute("alt"));
    doneCards.push(cardsInPlay[0]);
    doneCards.push(cardsInPlay[1]);
    cardsInPlay = [];
  } else{
    setTimeout(function(){
      flipCard(findCard(cards, cardsInPlay[0]));
      flipCard(findCard(cards, cardsInPlay[1]));
      cardsInPlay = [];
    }, 500);
  }
}

//Generates a deck of random pairs of cards, sets the attributes of the HTML files,
//and adds event listener so every time the player clicks two cards, it checks
//if there was a match.
function setUpCards(){
  generateCards();
  for (let i = 0; i < numberOfCardsInPlay; i++){
      cards[i].addEventListener("click", function(){
        if(!doneCards.includes(cards[i])){
          flipCard(i);
          cardsInPlay.push(cards[i]);
          if(cardsInPlay.length > 1) checkForMatch();
        }
        if(doneCards.length == numberOfCardsInPlay){
          document.getElementById("message").innerHTML = "Congrats! You win!";
        }
      });
  }
}

function reset(){
  game.innerHTML = '';
  cardsInPlay = [];
  doneCards = [];
  cards = [];
  currentBoard = [];
  document.getElementById("message").innerHTML = "";

}

function easyAndHard(){
  easyLink.addEventListener("click", function(){
    if(hardLink.classList.contains("selected")){
      hardLink.classList.remove("selected");
      easyLink.classList.add("selected");
      numberOfCardsInPlay = 4;
      reset();
      setUpCards();
    }
  });
  hardLink.addEventListener("click", function(){
    if(easyLink.classList.contains("selected")){
      easyLink.classList.remove("selected");
      hardLink.classList.add("selected");
      numberOfCardsInPlay = 8;
      reset();
      setUpCards();
    }
  });
}

function init(){
  setUpCards();
  document.getElementById("instructionsLink").addEventListener("click", function(){
    document.getElementById("instructions").classList.toggle("hidden");
  });
  document.getElementById("resetLink").addEventListener("click", function(){
    reset();
    setUpCards();
  });
  easyAndHard();
}

init();
