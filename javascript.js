
const player = (name, symbol) => {
    const getName = () => name;
    const setName = (newName) => name = newName;
    const getSymbol = () => symbol;
    return {getName, getSymbol, setName};
}

function boardInteract(board, player, button){
    let index = parseInt(button.dataset.index);
    board[index] = player.getSymbol();
    render(board);
    button.disabled = true;
}

function boardStateChecker(board){

    if (symbolChecker(0, 1, 2)) {
        return symbolChecker(0, 1, 2);
    } else if (symbolChecker(3, 4, 5)) {
        return symbolChecker(3, 4, 5);
    } else if (symbolChecker(6, 7, 8)) {
        return symbolChecker(6, 7, 8);
    } else if (symbolChecker(0, 3, 6)) {
        return symbolChecker(0, 3, 6);
    } else if (symbolChecker(1, 4, 7)) {
        return symbolChecker(1, 4, 7);
    } else if (symbolChecker(2, 5, 8)) {
        return symbolChecker(2, 5, 8);
    } else if (symbolChecker(0, 4, 8)) {
        return symbolChecker(0, 4, 8);
    } else if (symbolChecker(2, 4, 6)) {
        return symbolChecker(2, 4, 6);
    } else if (board.includes('?')) {
        // there are still remaining spots to be filled on the board
    } else {
        return 'draw';
    }

    function symbolChecker(indexA, indexB, indexC) {
        if (
          board[indexA] === board[indexB] &&
          board[indexB] === board[indexC] &&
          (board[indexC] === 'X' || board[indexC] === 'O')
        ) {
          return board[indexC];
        } else {
          return false;
        }
      }
}

function render(board) {
    for(let i = 0; i < 9; ++i){
        let boardButton = document.querySelector(`.board-button[data-index="${i}"]`);
        boardButton.textContent =  board[i];
    }
}

function disableAllBoardButtons(){
    let boardButtonsAll = document.querySelectorAll('.board-button');
    boardButtonsAll.forEach(boardButton => {
        boardButton.disabled = true;
    });
}

function finishGame(winner, player){
    console.log(winner);
    disableAllBoardButtons();

    let announcement = document.querySelector('.announcement');
    if (winner === 'draw'){
        announcement.textContent = 'Draw';
        
    } else {
        announcement.textContent = `${player.getName()} is the winner!`;
    }
    announcement.style.visibility = 'visible';
}

function setupNamesButton(playerX, playerO){
    let namesButton = document.querySelector('.insert-name');
    namesButton.addEventListener('click', () => {
        playerX.setName(prompt('Name of player (X): ','Player1'));
        playerO.setName(prompt('Name of player (O): ','Player2'));
    });
}

function enableBoardButtons(){
    let boardButtonsAll = document.querySelectorAll('.board-button');
    boardButtonsAll.forEach(boardButton => {
        boardButton.disabled = false;
    });
}

function run() {

    const gameBoard = (() => {
        let gameBoard = ['?', '?', '?', '?', '?', '?', '?', '?', '?'];
        return gameBoard;
    })();

    render(gameBoard);

    const playerX = player('X-Player','X');
    const playerO = player('O-Player','O');

    setupNamesButton(playerX, playerO);
    setupPlayButton();

    let currentPlayer = playerX;

    boardButtonSetup();

    function boardButtonSetup(){
        let boardButtonsAll = document.querySelectorAll('.board-button');
        boardButtonsAll.forEach(boardButton => {
            boardButton.addEventListener('click', () => {

                boardInteract(gameBoard, currentPlayer, boardButton);

                let result = boardStateChecker(gameBoard);

                if (result) {
                    finishGame(result, currentPlayer);
                }

                currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
            });

        });

    };

    function setupPlayButton(){
        let playButton = document.querySelector('.play');
        let announcement = document.querySelector('.announcement');
        playButton.addEventListener('click', () => {
            enableBoardButtons();
            for(let i = 0; i < 9; ++i) {
                gameBoard[i] = '?';
            }
            render(gameBoard);
            announcement.style.visibility = 'hidden';
        });
    }
};

run();

