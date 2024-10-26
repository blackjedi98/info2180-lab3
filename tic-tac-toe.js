document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div"); // Select all div elements inside the board
    const gameState = Array(9).fill(null); // Initialize an array to track the state of the game
    let currentPlayer = "X"; // Start with player "X"

    // Add the class "square" to each div in the game board
    squares.forEach((square, index) => {
        square.classList.add("square");

        // Add click event listener to each square
        square.addEventListener("click", () => {
            if (!gameState[index]) { // Only allow a move if the square is empty
                gameState[index] = currentPlayer; // Record the move in the game state
                square.textContent = currentPlayer; // Display "X" or "O" in the square
                square.classList.add(currentPlayer); // Add "X" or "O" class for styling

                // Toggle the current player
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        });

        // Add hover effect with mouseenter and mouseleave events
        square.addEventListener("mouseenter", () => {
            if (!gameState[index]) { // Only show hover effect if the square is empty
                square.classList.add("hover");
            }
        });

        square.addEventListener("mouseleave", () => {
            square.classList.remove("hover");
        });
    });
});
