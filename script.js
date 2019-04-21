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

// Board status
let boardActive = true;

// Status text reference
let statusText = document.getElementById("status");

// Button reset reference
let buttonReset = document.getElementById("btn-reset");
buttonReset.addEventListener("click", reset);

// Sound effects reference
let playerSFX = document.getElementById("player-sfx");
let botSFX = document.getElementById("bot-sfx");
let winSFX = document.getElementById("win-sfx");
let loseSFX = document.getElementById("lose-sfx");
let drawSFX = document.getElementById("draw-sfx");


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
            // Check the rules.
            // Rule 1: Check if the board is active or clickable.
            // Rule 2: Check if the cell clicked is empty.
            // Rule 3: Check if there is no winner.
            if (boardActive == true &&
                cell.innerText == "" &&
                thereIsWinner == false) {
                // This will make the board disabled until the bots turn is done.
                boardActive = false;

                // Play playerSFX.
                playerSFX.play();

                // Get the h1 tag which contains the text of the cell.
                let h1 = cell.getElementsByTagName("h1")[0];




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

                    setTimeout(() => {
                        // Play winSFX.
                        winSFX.play();
                        // Show text that the player wins.
                        statusText.innerHTML = "You Win"
                    }, 500);
                }

                // Call the bot function for bots turn.
                // Use setTimeout function to put delay to bots turn.
                setTimeout(bot, 500);
                console.log("Bots turn's done.");

                // Check for draw.
                if (boardIsCrowded() == true && thereIsWinner == false) {
                    // Play drawSFX.
                    setTimeout(() => {
                        drawSFX.play();
                        statusText.style.visibility = "visible";
                        statusText.innerHTML = "Draw!";
                    }, 500);
                }
            }
        });
    });
}


// This function will randomly place the bots turn on an empty cell.
function randomCell() {
    // We assign a random number from 0 to 3 (not including 3)
    //      to variable r1 and r2.
    let r1 = Math.floor(Math.random() * 3);
    let r2 = Math.floor(Math.random() * 3);

    // Assign the first random cell.
    let cell = board[r1][r2];

    // If the first assigned variable is not empty. Re-random the numbers
    //      and reassign a new cell to cell.
    while (cell.innerText != "") {
        // Stop the loop if all of the boards cell is not empty.
        if (boardIsCrowded()) {
            break;
        }
        r1 = Math.floor(Math.random() * 3);
        r2 = Math.floor(Math.random() * 3);
        cell = board[r1][r2];
    }

    // Return a random empty cell.
    return cell;
}


// This function is the players opponent. The bot.
function bot() {
    // Cell reference
    let cell = randomCell();

    // Check if pattern is incoming.
    if (board[0][0].innerText != "" && board[0][0].innerText == board[0][1].innerText && board[0][2].innerText == "") {
        cell = board[0][2];
    } else if (board[0][0].innerText != "" && board[0][0].innerText == board[0][2].innerText && board[0][1].innerText == "") {
        cell = board[0][1];
    } else if (board[0][2].innerText != "" && board[0][2].innerText == board[0][1].innerText && board[0][0].innerText == "") {
        cell = board[0][0];
    } else if (board[1][0].innerText != "" && board[1][0].innerText == board[1][1].innerText && board[1][2].innerText == "") {
        cell = board[1][2];
    } else if (board[1][0].innerText != "" && board[1][0].innerText == board[1][2].innerText && board[1][1].innerText == "") {
        cell = board[1][1];
    } else if (board[1][1].innerText != "" && board[1][1].innerText == board[1][2].innerText && board[1][0].innerText == "") {
        cell = board[1][0];
    } else if (board[2][0].innerText != "" && board[2][0].innerText == board[2][1].innerText && board[2][2].innerText == "") {
        cell = board[2][2];
    } else if (board[2][0].innerText != "" && board[2][0].innerText == board[2][2].innerText && board[2][1].innerText == "") {
        cell = board[2][1];
    } else if (board[2][1].innerText != "" && board[2][1].innerText == board[2][2].innerText && board[2][0].innerText == "") {
        cell = board[2][0];
    } else if (board[0][0].innerText != "" && board[0][0].innerText == board[1][0].innerText && board[2][0].innerText == "") {
        cell = board[2][0];
    } else if (board[0][0].innerText != "" && board[0][0].innerText == board[2][0].innerText && board[1][0].innerText == "") {
        cell = board[1][0];
    } else if (board[1][0].innerText != "" && board[1][0].innerText == board[2][0].innerText && board[0][0].innerText == "") {
        cell = board[0][0];
    } else if (board[0][1].innerText != "" && board[0][1].innerText == board[1][1].innerText && board[2][1].innerText == "") {
        cell = board[2][1];
    } else if (board[1][0].innerText != "" && board[1][0].innerText == board[2][1].innerText && board[1][1].innerText == "") {
        cell = board[1][1];
    } else if (board[1][1].innerText != "" && board[1][1].innerText == board[2][1].innerText && board[0][1].innerText == "") {
        cell = board[0][1];
    } else if (board[0][2].innerText != "" && board[0][2].innerText == board[1][2].innerText && board[2][2].innerText == "") {
        cell = board[2][2];
    } else if (board[0][2].innerText != "" && board[0][2].innerText == board[2][2].innerText && board[1][2].innerText == "") {
        cell = board[1][2];
    } else if (board[1][2].innerText != "" && board[1][2].innerText == board[2][2].innerText && board[0][2].innerText == "") {
        cell = board[0][2];
    } else if (board[0][0].innerText != "" && board[0][0].innerText == board[1][1].innerText && board[2][2].innerText == "") {
        cell = board[2][2];
    } else if (board[0][0].innerText != "" && board[0][0].innerText == board[2][2].innerText && board[1][1].innerText == "") {
        cell = board[1][1];
    } else if (board[1][1].innerText != "" && board[1][1].innerText == board[2][2].innerText && board[0][0].innerText == "") {
        cell = board[0][0];
    } else if (board[2][0].innerText != "" && board[2][0].innerText == board[1][1].innerText && board[0][2].innerText == "") {
        cell = board[0][2];
    } else if (board[2][0].innerText != "" && board[2][0].innerText == board[0][2].innerText && board[1][1].innerText == "") {
        cell = board[1][1];
    } else if (board[0][2].innerText != "" && board[0][2].innerText == board[1][1].innerText && board[2][0].innerText == "") {
        cell = board[2][0];
    } else {
        cell = randomCell();
    }

    // Assign the cell to h1 variable which holds the text.
    let h1 = cell.getElementsByTagName("h1")[0];

    // Place bots turn if it's not a draw, there is no winner and 
    //      the cell doesn't contain "X".
    if (boardIsCrowded() == false && thereIsWinner == false && h1.innerHTML != "X") {
        // Play botSFX.
        botSFX.play();

        // Place the bots turn to the empty cell.
        h1.innerHTML = "O";

        // Check for pattern again.
        if (botPattern() == true) {
            // There is pattern for the bot.
            // Call win function.
            win("bot");

            setTimeout(() => {
                // Play loseSFX.
                loseSFX.play();

                // Show text that the bot wins.
                statusText.innerHTML = "Bot Wins"
            }, 500);
        }
    }

    // Set the board active again after the bots turn.
    boardActive = true;
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
    boardActive = true;
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
