document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const submitBtn = document.getElementById('submit');
    const setupSection = document.getElementById('setup-section');
    const gameSection = document.getElementById('game-section');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');

    // Game State Variables
    let player1 = '';
    let player2 = '';
    let currentPlayer = 1; // 1 for Player 1 ('x'), 2 for Player 2 ('o')
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;

    // All possible winning combinations (rows, columns, diagonals)
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    // Handle starting the game
    submitBtn.addEventListener('click', () => {
        // Updated IDs here to match the test cases (removed the hyphens)
        player1 = document.getElementById('player1').value.trim();
        player2 = document.getElementById('player2').value.trim();

        if (player1 !== '' && player2 !== '') {
            setupSection.style.display = 'none';
            gameSection.style.display = 'block';
            gameActive = true;
            messageDiv.textContent = `${player1}, you're up`;
        } else {
            alert("Please enter names for both players.");
        }
    });

    // Handle clicking a cell
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            // The IDs are 1-9, so subtract 1 for 0-8 array indexing
            const cellIndex = parseInt(cell.id) - 1;

            // Prevent clicking on already filled cells or if game is over
            if (boardState[cellIndex] !== '' || !gameActive) {
                return;
            }

            // Mark the board array and the UI
            boardState[cellIndex] = currentPlayer === 1 ? 'x' : 'o';
            cell.textContent = boardState[cellIndex];

            // Check if this move won the game
            if (checkWin()) {
                const winnerName = currentPlayer === 1 ? player1 : player2;
                messageDiv.textContent = `${winnerName} congratulations you won!`;
                gameActive = false; // Stop further clicks
                return;
            }

            // Swap turns
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            const nextPlayerName = currentPlayer === 1 ? player1 : player2;
            messageDiv.textContent = `${nextPlayerName}, you're up`;
        });
    });

    // Function to evaluate the board for a win
    function checkWin() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            // Check if the 3 cells are filled and match
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return true;
            }
        }
        return false;
    }
});