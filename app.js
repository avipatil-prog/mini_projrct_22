const board = document.getElementById("game-board");
const resetBtn = document.getElementById("reset-btn");

let currentPlayer = "X";
let gameActive = true;


let gameState = Array(16).fill("");

function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

function handleClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        alert(`${currentPlayer} Wins! 🎉`);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        alert("It's a Draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    const wins = [

        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],

        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],


        [0, 5, 10, 15],
        [3, 6, 9, 12]
    ];

    return wins.some(combo =>
        combo.every(i => gameState[i] === currentPlayer)
    );
}

resetBtn.addEventListener("click", () => {
    gameState = Array(16).fill("");
    currentPlayer = "X";
    gameActive = true;
    createBoard();
});

createBoard();
