document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div"); // Select all div elements inside the board

    // Add the class "square" to each div in the game board
    squares.forEach(square => {
        square.classList.add("square");
    });
});
