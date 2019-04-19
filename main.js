// Getting all the card and store it in a variable
const cards = document.querySelectorAll('.memory-card');

//modal
let modal = document.getElementById('modal');
let modalLay = document.getElementById('modal-overlay');

// Store the first & second card that user click in order to implement the matching card logic
let hasFlippedCard = false;
let firstCard, secondCard;

// Counter of matched card
let matchedCard = 0;
let moves = 0;
let lockBoard = false;

// flip card function
function flipCard() {
  if (lockBoard) return;
  //   preventing cards from double click
  if (this === firstCard) return;

  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    // first card
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  //   second card
  hasFlippedCard = false;
  secondCard = this;

  checkMatch();
}

function checkMatch() {
  //   let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  //   isMatch ? disableCards() : unflipCards();

  //   check card match?
  if (firstCard.dataset.name === secondCard.dataset.name) {
    //   matched
    disableCards();
    matchedCard += 1;
    moves += 1;
  } else {
    //   not match
    unflipCards();
    moves += 1;
  }

  if (matchedCard == 6) {
    congratulations();
    document.getElementById('moves').innerHTML = moves;
  }
}

function disableCards() {
  // disable the flip card feature for the card that match
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  // ( the timeout function is for delaying the first card reset to the original look after the second card is click)
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// shuffle the card
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
}

//congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
  //show congratulations modal
  modal.classList.remove('closed');
  modalLay.classList.remove('closed');
}

//for player to play Again
function playAgain() {
  //hide modal
  modal.classList.add('closed');
  modalLay.classList.add('closed');
  shuffle();
}

window.onload = shuffle();
