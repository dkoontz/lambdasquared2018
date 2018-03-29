// PURE //////////////////////

const initialGameState = {
    currentPlayer: 1,
    gameOver: false,
    winner: 0,
    spaces: [0, 0, 0, 0, 0, 0, 0, 0, 0]
};

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// number -> string
function spaceCodeToLetter(code) {
    if (code === 1) {
        return 'X';
    }
    else if (code === 2) {
        return 'O';
    }
    else {
        return '';
    }
}

// GameState -> number -> boolean
function spaceIsEmpty(gameState, space) {
    return gameState.spaces[space] === 0;
}

// GameState -> number -> GameState
function claimSpace(gameState, space) {
    if (!gameState.gameOver && spaceIsEmpty(gameState, space)) {
        const newSpaces = gameState.spaces.slice();
        newSpaces[space] = gameState.currentPlayer;
        const newState = {
            ...gameState,
            spaces: newSpaces
        };

        const result = checkForWinner(newState);

        if (result === 1) {
            return {
                ...newState,
                gameOver: true,
                winner: newState.currentPlayer
            };
        }
        else if (result === 2) {
            return {
                ...newState,
                gameOver: true,
                winner: 0
            };
        }
        else {
            return {
                ...newState,
                currentPlayer: newState.currentPlayer === 1 ? 2 : 1
            }
        }
    }
}

// GameState -> number
function checkForWinner(gameState) {
    // 0 = no winner
    // 1 = winner
    // 2 = draw

    if (winningPatterns.some(pattern =>
        gameState.spaces[pattern[0]] !== 0 &&
        gameState.spaces[pattern[0]] == gameState.spaces[pattern[1]] &&
        gameState.spaces[pattern[0]] == gameState.spaces[pattern[2]])) {
        return 1;
    }
    else if (!gameState.spaces.some(space => space === 0)) {
        return 2;
    }

    return 0;
}


// EFFECTFUL

// () -> ()
$(document).ready(() => {
    const stateDisplay = $('.game-state');
    const board = $('.tic-tac-toe');
    const state = {
        data: initialGameState
    };

    const setState = newState => {
        state.data = newState;
    }

    const getState = () => {
        return state.data;
    }

    // attach click handler to each space
    for (var column = 0; column < 3; column++) {
        for (var row = 0; row < 3; row++) {
            // the first param to .click becomes the data field of the event
            board.children().eq(column).children().eq(row).click(row * 3 + column, onClick(getState)(setState)(board)(stateDisplay));
        }
    }

    updateBoardDisplay(board, stateDisplay, state.data);
});


// Longhand original version left for reference

// JQueryObject -> JQueryObject -> ClickEvent -> ()
// function onClick(getState) {
//     return function (setState) {
//         return function (board) {
//             return function (stateDisplay) {
//                 return function (event) {
//                     const state = getState();
//                     const newState = claimSpace(state, event.data);
//                     setState(newState);
//                     updateBoardDisplay(board, stateDisplay, newState);
//                 }
//             }
//         }
//     }
// }

const onClick = getState => setState => board => stateDisplay => event => {
    const state = getState();
    const newState = claimSpace(state, event.data);
    setState(newState);
    updateBoardDisplay(board, stateDisplay, newState);
}

// JQueryObject -> JQueryObject -> GameState -> ()
function updateBoardDisplay(board, stateDisplay, gameState) {
    /* 
        Logical arrangement of board spaces

        0 1 2
        3 4 5
        6 7 8

         Arrangement of spaces

            0      1      2
         ______ ______ ______
        |  --  |  --  |  --  |
     0  | |  | | |  | | |  | |
        |  --  |  --  |  --  |
     1  | |  | | |  | | |  | |
        |  --  |  --  |  --  |
     2  | |  | | |  | | |  | |
        |  --  |  --  |  --  |
        |______|______|______|
    */

    [0, 1, 2, 3, 4, 5, 6, 7, 8]
        .map(space => [space, spaceCodeToLetter(gameState.spaces[space])])
        .forEach(([space, letter]) => {
            const column = space % 3;
            const row = Math.floor(space / 3);

            board.children().eq(column).children().eq(row).text(letter)
        });

    if (gameState.gameOver) {
        stateDisplay.text(
            gameState.winner === 0
                ? 'Draw!'
                : 'Player ' + gameState.winner + ' wins!'
        );
    }
    else {
        stateDisplay.text('Player ' + gameState.currentPlayer + '\'s turn');
    }
}