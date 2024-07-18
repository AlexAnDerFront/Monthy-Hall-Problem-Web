let winNumber = Math.floor(Math.random() * 3) + 1;
let playerNumber = 0;
let win = 0;
let lose = 0;
let gameState = 0;
let dialog = document.getElementById('dialog1');
// dialog handeling
const openDialogButton1 = document.getElementById('door1');
const openDialogButton2 = document.getElementById('door2');
const openDialogButton3 = document.getElementById('door3');
function setupDialogClose(dialogId) {
    const dialog = document.getElementById(dialogId);
    const closeButton = dialog.querySelector('button');
    closeButton.addEventListener('click', () => {
        dialog.style.display = 'none';
    });
}
setupDialogClose('dialog1');
setupDialogClose('dialog2');
setupDialogClose('dialog3');

openDialogButton1.addEventListener('click', (event) => {
    playerNumber = 1;
    if (gameState == 0) {
        door1();
    } else if (gameState == 1) {
        secondChoice();
    }
    dialog.style.display = 'block';
});
openDialogButton2.addEventListener('click', (event) => {
    playerNumber = 2;
    if (gameState == 0) {
        door2();
    } else if (gameState == 1) {
        secondChoice();
    }
    dialog.style.display = 'block';
});
openDialogButton3.addEventListener('click', (event) => {
    playerNumber = 3;
    if (gameState == 0) {
        door3();
    } else if (gameState == 1) {
        secondChoice();
    }
    dialog.style.display = 'block';
});

closeDialogButton.addEventListener('click', () => {
    dialog.style.display = 'none';
});
// functions for the doors
function door1() {
    let door;
    console.log("Win number: " + winNumber)
    console.log("Selected value: " + playerNumber);
    if (winNumber == 2) {
        door = document.getElementById('door3');
    } else if (winNumber == 3) {
        door = document.getElementById('door2');
    } else {
        if (Math.random() * 2 < 1) {
            door = document.getElementById('door2');
        } else {
            door = document.getElementById('door3');
        }
    }
    door.classList.add('--active1'); // Fügt class "--active" hinzu
    gameState = 1;
    console.log("Gamestate " + gameState);
};
function door2() {
    let door;
    console.log("Win number: " + winNumber);
    console.log("Selected value: " + playerNumber);
    if (winNumber == 1) {
        door = document.getElementById('door3');
    } else if (winNumber == 3) {
        door = document.getElementById('door1');
    } else {
        if (Math.random() * 2 < 1) {
            door = document.getElementById('door1');
        } else {
            door = document.getElementById('door3');
        }
    }
    door.classList.add('--active1'); // Fügt class "--active" hinzu
    gameState = 1;
    console.log("Gamestate " + gameState);
};
function door3() {
    let door;
    console.log("Win number: " + winNumber);
    console.log("Selected value: " + playerNumber);
    if (winNumber === 2) {
        door = document.getElementById('door1');
    } else if (winNumber === 1) {
        door = document.getElementById('door2');
    } else {
        if (Math.random() * 2 < 1) {
            door = document.getElementById('door1');
        } else {
            door = document.getElementById('door2');
        }
    }
    door.classList.add('--active1'); // Fügt class "--active" hinzu
    gameState = 1;
};

// Win or lose
function secondChoice() {
    let door;
    
    if (playerNumber == winNumber) {
        dialog = document.getElementById('dialog2');
        win++;
        door = document.getElementById('door' + playerNumber);
        writeScore();
        door.classList.add('--active2');
        const button1 = document.getElementById('door1');
        const button2 = document.getElementById('door2');
        const button3 = document.getElementById('door3');
        if (button1.classList.contains('--active2')) {
            let door1 = document.getElementById('door2');
            let door2 = document.getElementById('door3');
            door1.classList.add('--active1');
            door2.classList.add('--active1');
        } else if (button2.classList.contains('--active2')) {
            let door1 = document.getElementById('door1');
            let door2 = document.getElementById('door3');
            door1.classList.add('--active1');
            door2.classList.add('--active1');
        } else if (button3.classList.contains('--active2')) {
            let door1 = document.getElementById('door1');
            let door2 = document.getElementById('door2');
            door1.classList.add('--active1');
            door2.classList.add('--active1');
        }
    } else if (playerNumber != winNumber) {
        lose++;
        dialog = document.getElementById('dialog3');
        writeScore();
        door = document.getElementById('door' + playerNumber);
        door.classList.add('--active1');
        door = document.getElementById('door' + winNumber);
        door.classList.add('--active2');
    }
}

function writeScore() {
    document.getElementById('wins').innerHTML = "Wins: " + win;
    document.getElementById('loses').innerHTML = "Loses: " + lose;
}

function restartGame() {
    playerNumber = 0;
    winNumber = Math.floor(Math.random() * 3) + 1;
    gameState = 0;
    const doors = document.querySelectorAll('#door1, #door2, #door3');
    dialog = document.getElementById('dialog1');
    doors.forEach(door => {
        door.classList.remove('--active1');
        door.classList.remove('--active2');
    });
    console.log(gameState);
}



