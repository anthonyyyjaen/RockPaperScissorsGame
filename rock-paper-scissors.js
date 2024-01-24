let score = JSON.parse(localStorage.getItem('score')) || 
{
    wins: 0,
    losses: 0,
    ties: 0
};

// if (!score) {
//     score = {
//         wins: 0,
//         losses: 0,
//         ties: 0
//     };
// }

function resetScore() {
    
    resetConfirmation();

    document.querySelector('.yes-button').addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScore();
        document.querySelector('.confirmation').innerHTML = '';
    });
    document.querySelector('.no-button').addEventListener('click', () => {
        document.querySelector('.confirmation').innerHTML = '';
    });
}

const resetButton = document.querySelector('.reset-button');

resetButton.addEventListener('click', () => {
    resetScore();
});



function pickComputerMove() {

    const randomNumber = Math.random() * 3;
    let computerMove = '';


    if (randomNumber >0 && randomNumber < 1) {
        computerMove = 'rock';
    }
    else if (randomNumber >= 1 && randomNumber <= 2) {
        computerMove = 'paper';
    }
    else {
        computerMove = 'scissors';
    }

    return computerMove;
}

function updateScore() {
    document.querySelector('.score').innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function playGame(playerMove) {

    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.'
        }
        else if (computerMove === 'paper') {
            result = 'You Lost.';
        }
        else {
            result = 'You Win.';
        }
    }

    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You Win.'
        }
        else if (computerMove === 'paper') {
            result = 'Tie.';
        }
        else {
            result = 'You Lost.';
        }
    }
    else {
        if (computerMove === 'rock') {
            result = 'You Lost.'
        }
        else if (computerMove === 'paper') {
            result = 'You Win.';
        }
        else {
            result = 'Tie.';
        }
    }

    if (result === 'You Win.') {
        score.wins++;
    }
    else if (result === 'You Lost.') {
        score.losses++;
    }
    else {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    // alert(`
    // You picked ${playerMove}. Computer picked ${computerMove}. ${result}
    // Wins: ${score.wins}, losses: ${score.losses}, tie: ${score.ties}
    // `);

    document.querySelector('.result').innerText = `${result}`;

    document.querySelector('.move').innerHTML = `You
    <img src="assets/icons/${playerMove}.png" alt="">
    <img src="assets/icons/${computerMove}.png" alt="">
    Computer`;


    updateScore();
}

let isAutoPlaying = false;
let intervalID;

// const autoPlay = () => {

// };

//EVENT LISTENER
document.querySelector('.rock-button').addEventListener('click', () => {
    playGame('rock');
})
document.querySelector('.paper-button').addEventListener('click', () => {
    playGame('paper');
})
document.querySelector('.scissors-button').addEventListener('click', () => {
    playGame('scissors');
})

document.querySelector('.auto-play-button').addEventListener('click', () => {
    autoPlay();
});
document.querySelector('.reset-button').addEventListener('click', () => {
    resetScore();
});


document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') {
        playGame('rock');
    }
    else if(event.key === 'p') {
        playGame('paper');
    }
    else if(event.key === 's') {
        playGame('scissors');
    }
    else if(event.key === 'a') {
        autoPlay();
    }
    else if(event.key === 'Backspace') {
        resetScore();
    }
});


function autoPlay() {
    const button = document.querySelector('.auto-play-button');

    if(!isAutoPlaying && button.innerText === 'Auto Play') {
        intervalID = setInterval(() => {
            const playerMove =  pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        button.innerText = 'Stop Playing';
    }
    else {
        clearInterval(intervalID);
        isAutoPlaying = false;
        button.innerText = 'Auto Play';
    }
}


function resetConfirmation() {
    document.querySelector('.confirmation').innerHTML = `<p>Are you sure you want to reset the score</p><button class="yes-button">Yes</button><button class="no-button">No</button>`;
}