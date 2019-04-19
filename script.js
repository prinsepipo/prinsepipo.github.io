// 2d array variable board
/*
    board = [
        [00, 01, 02],
        [10, 11, 12],
        [20, 21, 22]
    ]
*/
let board = [];

// Winner status
let thereIsWinner = false;

// Status text reference
let statusText = document.getElementById("status");

// Button reset reference
let buttonReset = document.getElementById("btn-reset");
buttonReset.addEventListener("click", reset);


// Create the reference for each cell and append it to board.
for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
        let cell = document.getElementById("_" + i.toString() + j.toString());
        row.push(cell);
    }
    board.push(row);
}


// Iterate the 1st level array in variable board. => board[?]
for (let i = 0; i < board.length; i++) {
    // Iterate the next level array. => board[i][?]
    board[i].forEach(cell => {
        // Each cell event listener.
        cell.addEventListener("click", () => {

            // Get the h1 tag which contains the text of the cell.
            let h1 = cell.getElementsByTagName("h1")[0];

            // Check the rules.
            // Rule: Check if the cell clicked is empty.
            if (h1.innerHTML == "" && thereIsWinner == false) {
                // Cell is empty.


                // Hide the status text. Just hide it. LOL!
                statusText.style.visibility = "hidden";

                // Set the cell text to "X" for player turn.
                h1.innerHTML = "X";
                console.log("Player turn's done.");

                // Then check for pattern.
                if (playerPattern() == true) {
                    // There is pattern for player.
                    // Call win function.
                    win("player");

                    // Show text that the player wins.
                    statusText.innerHTML = "You Win"
                }

                // Call the bot function for bots turn.
                // Use setTimeout function to put delay to bots turn.
                setTimeout(randomPlacement, 500);
                console.log("Bots turn's done.");

                // Check for pattern again.
                if (botPattern() == true) {
                    // There is pattern for the bot.
                    // Call win function.
                    win("bot");

                    // Show text that the bot wins.
                    statusText.innerHTML = "Bot Win"
                }

            } else if (boardIsCrowded) {
                statusText.innerHTML == "Draw!";
            }

        });
    });
}


// This function will randomly place the bots turn on an empty cell.
function randomPlacement() {
    // We assign a random number from 0 to 3 (not including 3)
    //      to variable r1 and r2.
    let r1 = Math.floor(Math.random() * 3);
    let r2 = Math.floor(Math.random() * 3);

    // Assign the first random cell to h1 variable which holds the text.
    let h1 = board[r1][r2].getElementsByTagName("h1")[0];

    // If the first assigned variable is not empty. Re-random the numbers
    //      and reassign a new cell to h1.
    while (h1.innerHTML != "") {
        // Stop the loop if all of the boards cell is not empty.
        if (boardIsCrowded()) {
            break;
        }
        r1 = Math.floor(Math.random() * 3);
        r2 = Math.floor(Math.random() * 3);
        h1 = board[r1][r2].getElementsByTagName("h1")[0];
    }

    // Place the bots turn to the random empty cell.
    if (thereIsWinner == false) {
        h1.innerHTML = "O";
    }
}


// This function is the players opponent. The bot.
function bot() {
    // Cell reference
    let cell = board[0][0]

    // Check if pattern is incoming.
    if (boardIsCrowded == false) {
        for (let i = 0; i < 3; i++) {
            // Check Edges.
            if (board[0][i].innerText == "X" || board[0][i].innerText == "O" &&
                board[0][i].innerText == board[1][i].innerText &&
                board[2][i].innerText == "") {
                // Assign the empty board that is suitable for win to cell
                cell = board[2][i];
            } else if (board[i][0].innerText == "X" || board[i][0].innerText == "O" &&
                board[i][0].innerText == board[i][1].innerText &&
                board[i][2].innerText == "") {
                cell = board[i][2];
            } else if (board[i][2].innerText == "X" || board[i][2].innerText == "O" &&
                board[i][2].innerText == board[i][1].innerText &&
                board[i][0].innerText == "") {
                cell = board[i][0];
            } else if (board[2][i].innerText == "X" || board[2][i].innerText == "O" &&
                board[2][i].innerText == board[1][i].innerText &&
                board[0][i].innerText == "") {
                cell = board[0][i];
            }
        }
        let x = 0;
        for (let i = 0; i < 3; i += 2) {
            // Check in-between.
            if (board[0][i].innerText == "X" || board[0][i].innerText == "O" &&
                board[0][i].innerText == board[2][i].innerText &&
                board[1][x].innerText == "") {
                cell = board[1][x];
            } else if (board[i][0].innerText == "X" || board[i][0].innerText == "O" &&
                board[i][0].innerText == board[i][2].innerText &&
                board[x][1].innerText == "") {
                cell == board[x][1];
            }

            x++;
        }
        // Check diagonally.
        if (board[0][0].innerText == "X" || board[0][0].innerText == "O" &&
            board[0][0].innerText == board[1][1].innerText &&
            board[2][2].innerText == "") {
            cell = board[2][2];
        } else if (board[0][0].innerText == "X" || board[0][0].innerText == "O" &&
            board[0][0].innerText == board[2][2].innerText &&
            board[1][1].innerText == "") {
            cell = board[1][1];
        } else if (board[1][1].innerText == "X" || board[1][1].innerText == "O" &&
            board[1][1].innerText == board[2][2].innerText &&
            board[0][0].innerText == "") {
            cell = board[0][0];
        } else if (board[2][0].innerText == "X" || board[2][0].innerText == "O" &&
            board[2][0].innerText == board[1][1].innerText &&
            board[0][2].innerText == "") {
            cell = board[0][2];
        } else if (board[2][0].innerText == "X" || board[2][0].innerText == "O" &&
            board[2][0].innerText == board[0][2].innerText &&
            board[1][1].innerText == "") {
            cell = board[1][1];
        } else if (board[1][1].innerText == "X" || board[1][1].innerText == "O" &&
            board[1][1].innerText == board[0][2].innerText &&
            board[2][0].innerText == "") {
            cell = board[2][0];
        } else {
            // Randomly place because no pattern incoming is detected.
            randomPlacement();
        }
    }

    // Assign the cell to h1 variable which holds the text.
    let h1 = cell.getElementsByTagName("h1")[0];

    // Place the bots turn to the empty cell.
    h1.innerHTML = "O";
}


function win() {
    thereIsWinner = true;
    statusText.style.visibility = "visible";

    // Logs
    console.log("------ Win Function ------");
    console.log("thereIsWinner set to true.");
    console.log("statusText.style.visibility set to visible.");
}


// This function will reset everything to beginning.
function reset() {
    for (let i = 0; i < board.length; i++) {
        board[i].forEach(cell => {
            let h1 = cell.getElementsByTagName("h1")[0];
            h1.innerHTML = "";
        });
    }
    thereIsWinner = false;
    statusText.style.visibility = "visible";
    statusText.innerHTML = "Ready";

    // Logs
    console.log("------ Reset Function ------");
    console.log("thereIsWinner set to false.");
    console.log("statusText.style.visibility set to visible");
    console.log("statusText.innerHTML set to Ready");
    console.log("The board is cleared.")
}

// This function will check if all of the cells is empty or not.
function boardIsCrowded() {
    if (
        board[0][0].innerText != "" &&
        board[0][1].innerText != "" &&
        board[0][2].innerText != "" &&
        board[1][0].innerText != "" &&
        board[1][1].innerText != "" &&
        board[1][2].innerText != "" &&
        board[2][0].innerText != "" &&
        board[2][1].innerText != "" &&
        board[2][2].innerText != ""
    ) {
        // The board is crowded.
        return true;
    }

    // The board is not crowded.
    return false;
}


// Check if there is a pattern for player.
// Return 'true' if pattern matched.
// Return 'false' if not.
function playerPattern() {
    for (let i = 0; i < 3; i++) {
        // Check rows
        if (board[i][0].innerText == board[i][1].innerText &&
            board[i][0].innerText == board[i][2].innerText &&
            board[i][0].innerText == "X") {
            console.log("Pattern in rows.");
            return true;
        }

        // Check columns
        if (board[0][i].innerText == board[1][i].innerText &&
            board[0][i].innerText == board[2][i].innerText &&
            board[0][i].innerText == "X") {
            console.log("Pattern in columns.");
            return true;
        }
    }

    // check top left to bottom right
    if (board[0][0].innerText == board[1][1].innerText &&
        board[0][0].innerText == board[2][2].innerText &&
        board[0][0].innerText == "X") {
        console.log("Pattern top left to bottom right.");
        return true;
    }

    // check bottom left to top right
    if (board[2][0].innerText == board[1][1].innerText &&
        board[2][0].innerText == board[0][2].innerText &&
        board[2][0].innerText == "X") {
        console.log("Pattern bottom left to top right.");
        return true;
    }

    // No pattern
    console.log("No pattern");
    return false;
}


// Check if there is a pattern for bot.
// Return 'true' if pattern matched.
// Return 'false' if not.
function botPattern() {
    for (let i = 0; i < 3; i++) {
        // Check rows
        if (board[i][0].innerText == board[i][1].innerText &&
            board[i][0].innerText == board[i][2].innerText &&
            board[i][0].innerText == "O") {
            console.log("Pattern in rows.");
            return true;
        }

        // Check columns
        if (board[0][i].innerText == board[1][i].innerText &&
            board[0][i].innerText == board[2][i].innerText &&
            board[0][i].innerText == "O") {
            console.log("Pattern in columns.");
            return true;
        }
    }

    // check top left to bottom right
    if (board[0][0].innerText == board[1][1].innerText &&
        board[0][0].innerText == board[2][2].innerText &&
        board[0][0].innerText == "O") {
        console.log("Pattern top left to bottom right.");
        return true;
    }

    // check bottom left to top right
    if (board[2][0].innerText == board[1][1].innerText &&
        board[2][0].innerText == board[0][2].innerText &&
        board[2][0].innerText == "O") {
        console.log("Pattern bottom left to top right.");
        return true;
    }

    // No pattern
    console.log("No pattern");
    return false;
}
