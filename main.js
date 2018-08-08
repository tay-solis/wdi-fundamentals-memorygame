
//Possible suites and values for a standard deck of cards
const suites = ["heart", "diamond", "club", "spade"];
const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];


//For each card in play, creates an array containing the image element.
let cards = document.querySelectorAll(".card");
let numberOfCardsInPlay = cards.length;
let cardsInPlay = [];



//Used to create card objects
class Card {
  constructor(suite, value, elm){
  //Suite of Card
    this.suite = suite;
  //Value of Card
    this.value = value;
  //HTML element
    this.elm = elm;
  }
}

function shuffle(arr){
  for(let i = 0; i < arr.length; i++){
    let j = Math.floor(Math.random() * arr.length);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function checkIfIncludes(arr, check, i){
  if(!arr.includes(check)){
    arr.push(check);
    return randomCard(i);
  } else{
    card = randomCard(i)
    check = card.suite + card.value;
    checkIfIncludes(arr, check, i);
  }
}


//Creates an array of Card objects, representing the game board, based on the number of cards on the board.
//For each card, there will be a card with the same suite and value.
function generateCards(){
  let done = [];
  for(let i = 0; i < numberOfCardsInPlay / 2; i++){
    let card = randomCard(i);
    let check = card.suite + card.value;
    card = checkIfIncludes(done, check, i);
    cardsInPlay.push(card);
    cardsInPlay.push(card);
  }
  shuffle(cardsInPlay);
  console.log(cardsInPlay);
}


//Randomly generates a suite and position for each card, with no repeats.
function randomCard(i){
  let suite = suites[Math.floor(Math.random() * 4)];
  let value = cardValues[Math.floor(Math.random() * 13)];
  let card = new Card(suite, value, cards[i]);
  return card;
}
//Randomly selects half of the positions on the board.


//Assigns the card value/suite to the card image elements according to the position on the screen.
//Sets up event listener for each card.
function setUpCards(){
  for (let i = 0; i < numberOfCardsInPlay; i++){
      cards[i].addEventListener("click", function(){
        console.log(this.suite + " " + this.value + " " + this.position);
      });
  }
}

generateCards();
