document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div"); // Select all div elements inside the board
    const status = document.getElementById("status"); // The div that shows the game status
    const gameState = Array(9).fill(null); // Initialize an array to track the state of the game
    let currentPlayer = "X"; // Start with player "X"
    let gameOver = false; // Track if the game has ended
    const newGameButton = document.querySelector(".btn"); // The "New Game" button

    // Winning combinations
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6]  // Diagonal from top-right to bottom-left
    ];

    // Function to check if there's a winner
    function checkWinner() {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                gameState[a] &&
                gameState[a] === gameState[b] &&
                gameState[a] === gameState[c]
            ) {
                return gameState[a]; // Return the winner ("X" or "O")
            }
        }
        return null; // No winner yet
    }

    // Function to handle each click
    function handleClick(index, square) {
        if (gameState[index] || gameOver) return; // Do nothing if the square is already filled or the game is over

        gameState[index] = currentPlayer; // Record the move in the game state
        square.textContent = currentPlayer; // Display "X" or "O" in the square
        square.classList.add(currentPlayer); // Add "X" or "O" class for styling

        // Check for a winner after each move
        const winner = checkWinner();
        if (winner) {
            status.textContent = `Congratulations! ${winner} is the Winner!`; // Update the status message
            status.classList.add("you-won"); // Add the "you-won" class for styling
            gameOver = true; // End the game
        } else {
            // Toggle the current player if there's no winner
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    // Reset game function
    function resetGame() {
        // Clear game state
        for (let i = 0; i < gameState.length; i++) {
            gameState[i] = null; // Reset game state array
        }

        // Clear squares
        squares.forEach(square => {
            square.textContent = ""; // Clear X or O from each square
            square.classList.remove("X", "O"); // Remove "X" and "O" classes for styling
        });

        // Reset the status message
        status.textContent = "Move your mouse over a square and click to play an X or an O.";
        status.classList.remove("you-won"); // Remove the "you-won" styling class

        // Reset game variables
        currentPlayer = "X"; // Start again with player "X"
        gameOver = false; // Allow game to be played again
    }

    // Initialize the game board and add event listeners
    squares.forEach((square, index) => {
        square.classList.add("square");

        // Add click event listener to each square
        square.addEventListener("click", () => handleClick(index, square));

        // Add hover effect
        square.addEventListener("mouseenter", () => {
            if (!gameState[index] && !gameOver) {
                square.classList.add("hover");
            }
        });

        square.addEventListener("mouseleave", () => {
            square.classList.remove("hover");
        });
    });

    // Add click event listener to the "New Game" button
    newGameButton.addEventListener("click", resetGame);
});
