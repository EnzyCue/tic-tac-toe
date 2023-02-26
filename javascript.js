
const player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol};
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

function finishGame(winner){
    console.log(winner);

    //do something to end the game
}

function run() {

    const gameBoard = (() => {
        let gameBoard = ['?', '?', '?', '?', '?', '?', '?', '?', '?'];
        return gameBoard;
    })();

    const playerX = player('player1', 'X');
    const playerO = player('player2', 'O');

    let currentPlayer = playerX;

    render(gameBoard);
    buttonSetup();

    function buttonSetup(){
        let boardButtonsAll = document.querySelectorAll('.board-button');
        boardButtonsAll.forEach(boardButton => {
            boardButton.addEventListener('click', () => {

                boardInteract(gameBoard, currentPlayer, boardButton);

                let result = boardStateChecker(gameBoard);

                if (result) {
                    finishGame(result);
                }

                currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
            });

        });

    };
};

run();

