// Declare an array of selection
const selection = ["ROCK", "PAPER", "SCISSORS"];
const icons = {ROCK: "rock.png", PAPER: "paper.png", SCISSORS: "scissors.png"}

// Declare global variables
const header = document.querySelector("#header");
const compImgContainer = document.querySelector("#comp-img");
const compSelectionText = document.querySelector("#comp-selection");
const compNameScore = document.querySelector("#comp-name-score");
const humanImgContainer = document.querySelector("#human-img");
const humanSelectionText = document.querySelector("#human-selection");
const humanNameScore = document.querySelector("#human-name-score");
const restartBtn = document.querySelector("#restart-btn");

let humanScore = 0;
let compScore = 0;

// Write the logic for comp selection
const getCompSelection = () => {
    let compIcon = document.createElement("img");
    compImgContainer.textContent = "";
    compImgContainer.appendChild(compIcon);

    const index = Math.floor(Math.random() * 3);
    const compChoice = selection[index];

    compIcon.src = icons[compChoice];
    compIcon.alt = compChoice;
    compSelectionText.textContent = compChoice;

    return compChoice;
}

// Write the logic for human Selection
const getHumanSelection = () => {
    return new Promise((resolve) => {
        document.querySelector("#rock-btn").addEventListener("click", () => {
            updateSelection(selection[0]);
        });
        document.querySelector("#paper-btn").addEventListener("click", () => {
            updateSelection(selection[1]);
        });
        document.querySelector("#scissors-btn").addEventListener("click", () => {
            updateSelection(selection[2]);
        });

        function updateSelection(choice) {
            humanImgContainer.textContent = "";

            let humanIcon = document.createElement("img");
            humanIcon.src = icons[choice];
            humanIcon.alt = choice;
            humanImgContainer.appendChild(humanIcon);
            humanSelectionText.textContent = choice;

            resolve(choice);
        }
    });   
}

// Write the logic to play a single round
const playRound = (humanSelection, compSelection) => {
    let choices = `${humanSelection}-${compSelection}`;
    header.textContent = choices;

    switch(choices) {
        case "ROCK-PAPER":
            header.textContent = "You lose! Paper beats Rock.";
            return "lose";
        case "PAPER-ROCK":
            header.textContent = "You win! Paper beats Rock.";
            return "win";

        case "SCISSORS-ROCK":
            header.textContent = "You lose! Rock beats Scissors.";
            return "lose";
        case "ROCK-SCISSORS":
            header.textContent = "You win! Rock beats Scissors.";
            return "win";

        case "PAPER-SCISSORS":
            header.textContent = "You lose! Scissors beat Paper.";
            return "lose";
        case "SCISSORS-PAPER":
            header.textContent = "You win! Scissors beat Paper.";
            return "win";

        default:
            header.textContent = "It's a tie!";
            return "tie";
    }
}

// Write the logic to play the entire game
async function playGame() {
    while (humanScore < 5 && compScore < 5) {
        const humanSelection = await getHumanSelection();
        const compSelection = getCompSelection();
        let result = playRound(humanSelection, compSelection);

        switch(result) {
            case "win":
                humanScore++;
                humanNameScore.textContent = `HUMAN : ${humanScore}`;
                break;

            case "lose":
                compScore++;
                compNameScore.textContent = `COMPUTER : ${compScore}`;
                break;

            default:
                break;
        }
    }

    if (humanScore < compScore) {
        header.textContent = "YOU LOST THE GAME, TRY AGAIN.";
    } else if (humanScore > compScore) {
        header.textContent = "CONGRATULATIONS! YOU WON THE GAME!";
    } else {
        header.textContent = "It's a tie!";
    }
};

// Deploy restart button
restartBtn.addEventListener("click", () => {
    // reset the header
    header.textContent = "Think you can win 5 times against the computer?";

    // reset comp ui
    compScore = 0;
    compImgContainer.textContent = "";
    compSelectionText.textContent = "SELECTION";
    compNameScore.textContent = `COMPUTER : ${compScore}`;

    // reset human ui
    humanScore = 0;
    humanImgContainer.textContent = "";
    humanSelectionText.textContent = "SELECTION";
    humanNameScore.textContent = `HUMAN : ${humanScore}`;

    // start a new game
    playGame();
});

playGame();
