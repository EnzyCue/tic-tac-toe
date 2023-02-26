
const player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol};
}

const gameBoard = (() => {
    let gameBoard = ['?', '?', '?', '?', '?', '?', '?', '?', '?'];
    return gameBoard;
})();

function boardInteract(player, button){
    button.textContent = player.getSymbol();
    // button.disbled = "disabled";
}

function render(board) {
    for(let i = 0; i < 9; ++i){
        let boardButton = document.querySelector(`.board-button[data-index="${i}"]`);
        boardButton.textContent =  board[i];
    }
}

function run() {
    const player1 = player('player1', 'X');
    const player2 = player('player2', 'O');

    let currentPlayer = player1;

    render(gameBoard);
    buttonSetup();

    function buttonSetup(){
        let boardButtonsAll = document.querySelectorAll('.board-button');
        boardButtonsAll.forEach(boardButton => {
            boardButton.addEventListener('click', () => {
                boardInteract(currentPlayer, boardButton);
                currentPlayer = (currentPlayer === player1) ? player2 : player1;
            });

        });

    };
};

run();



// const exampleFactor = (name) =>{
//     const object = {name};
//     return object;
// }

// const exampleInheritor = () => {
//     const {juicer} = exampleFactor('yeet');
//     const bruh = () => console.log('bruh we inherited smthn fr fr.')
//     return {juicer, bruh};
// }