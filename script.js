// 2d array variable board
/*
    board = [
        [00, 01, 02],
        [10, 11, 12],
        [20, 21, 22]
    ]
*/
let board = [];

// Turn State
// True -> Player turn.
// False -> Bots' Turn.
let playerTurn = true;

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


// Add event click listener to each cell.
for (let i = 0; i < board.length; i++) {
    board[i].forEach(cell => {
        cell.addEventListener("click", () => {
            statusText.style.visibility = "hidden";
            let h1 = cell.getElementsByTagName("h1")[0];
            if (!thereIsWinner) {
                if (playerTurn) {
                    if (h1.innerHTML == "") {
                        h1.innerHTML = "X";
                        playerTurn = false;
                        antiWin();
                    }
                } else {
                    playerTurn = true;
                }
            }

            if (thereIsPattern()) {
                win();
            } else if (
                board[0][0].innerText != "" &&
                board[0][1].innerText != "" &&
                board[0][2].innerText != "" &&
                board[1][0].innerText != "" &&
                board[1][1].innerText != "" &&
                board[1][2].innerText != "" &&
                board[2][0].innerText != "" &&
                board[2][1].innerText != "" &&
                board[2][2].innerText != "" &&
                thereIsPattern() == false
            ) {
                statusText.style.visibility = "visible";
                statusText.innerHTML = "Draw!";
                thereIsWinner = true;
            }
        });
    });
}


function bot() {
    let r1 = Math.floor(Math.random() * 3);
    let r2 = Math.floor(Math.random() * 3);
    let h1 = board[r1][r2].getElementsByTagName("h1")[0];

    for (let i = 0; i < 10; i++) {
        if (h1.innerHTML != "") {
            r1 = Math.floor(Math.random() * 3);
            r2 = Math.floor(Math.random() * 3);
            h1 = board[r1][r2].getElementsByTagName("h1")[0];
        } else {
            break;
        }
    }

    h1.innerHTML = "O";
}

function antiWin() {
    let cell;
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
        bot();
    }

    h1 = cell.getElementsByTagName("h1")[0];
    h1.innerHTML = "O";
}


function win() {
    thereIsWinner = true;
    statusText.style.visibility = "visible";
    if (!playerTurn) {
        statusText.innerHTML = "You Win"
    } else {
        statusText.innerHTML = "Bot Wins"
    }
}


function reset() {
    for (let i = 0; i < board.length; i++) {
        board[i].forEach(cell => {
            let h1 = cell.getElementsByTagName("h1")[0];
            h1.innerHTML = "";
        });
    }
    playerTurn = true;
    thereIsWinner = false;
    statusText.style.visibility = "visible";
    statusText.innerHTML = "Ready";
}


// Check if there is a pattern.
// Return 'true' if pattern matched.
// Return 'false' if not.
function thereIsPattern() {
    for (let i = 0; i < 3; i++) {
        // Check rows
        if (board[i][0].innerText == board[i][1].innerText &&
            board[i][0].innerText == board[i][2].innerText &&
            board[i][0].innerText != '') {
            return true;
        }

        // Check columns
        if (board[0][i].innerText == board[1][i].innerText &&
            board[0][i].innerText == board[2][i].innerText &&
            board[0][i].innerText != '') {
            return true;
        }
    }

    // check top left to bottom right
    if (board[0][0].innerText == board[1][1].innerText &&
        board[0][0].innerText == board[2][2].innerText &&
        board[0][0].innerText != '') {
        return true;
    }

    // check bottom left to top right
    if (board[2][0].innerText == board[1][1].innerText &&
        board[2][0].innerText == board[0][2].innerText &&
        board[2][0].innerText != '') {
        return true;
    }

    // No pattern
    return false;
}
