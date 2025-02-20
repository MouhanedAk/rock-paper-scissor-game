let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();
/*if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}*/


let isAutoPlay = false;
let intervalId;


function autoPlay() {
  if (!isAutoPlay) {
      intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  })
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  })
  document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  })

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {

  const computerMove = pickComputerMove();

  console.log(computerMove);

  let result = '';

  
  if (playerMove === 'scissors') {
    if (computerMove ==='rock') {
    result = 'You lose.';
  } else if (computerMove == 'paper') {
    result = 'You win.';
  } else if (computerMove == 'scissors') {
    result = 'Tie.'
  }
  }


  if (playerMove === 'paper') {
  if (computerMove ==='rock') {
    result = 'You win.';
  } else if (computerMove == 'paper') {
    result = 'Tie.';
  } else if (computerMove == 'scissors') {
    result = 'You lose.'
  }
  }


  if (playerMove === 'rock') {
  if (computerMove ==='rock') {
    result = 'Tie.';
  } else if (computerMove == 'paper') {
    result = 'You lose.';
  } else if (computerMove == 'scissors') {
    result = 'You win.'
  }
  }

  document.querySelector('.js-moves')
    .innerHTML =`You 
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;  

  if (result === 'You win.') {
    score.wins++;
  } else if (result ==='You lose.') {
    score.losses++;
  } else if (result ==='Tie.') {
    score.ties++;
  }
  
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML =`${result}`;
  }

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}  

function pickComputerMove(){
  let computerMove='';
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
  }