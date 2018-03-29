$(document).ready(() => {
    var g = new Game();
});

class Game {
    constructor() {
        this.stateDisplay = $('.game-state');
        this.currentPlayer = 1;
        this.board = new Board();
        this.gameOver = false;

        this.board.onClick(event => {
            if (!this.gameOver && this.board.spaceIsEmpty(event.data)) {
                this.board.claimSpace(event.data, this.currentPlayer);

                var result = this.board.checkForWinner();
                if (result === 1) {
                    this.gameOver = true;
                    this.stateDisplay.text('Player ' + this.currentPlayer + ' wins!');
                }
                else if (result === 2) {
                    this.gameOver = true;
                    this.stateDisplay.text('Draw!');
                }
                else {
                    if (this.currentPlayer === 1) {
                        this.currentPlayer = 2;
                    }
                    else {
                        this.currentPlayer = 1;
                    }

                    this.stateDisplay.text('Player ' + this.currentPlayer + '\'s turn');
                }
            }
        });
    }
}

class Board {
    constructor() {
        this.spaces = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.board = $('.tic-tac-toe');
        this.winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.updateBoard();
    }

    onClick(callback) {
        for (var column = 0; column < 3; column++) {
            for (var row = 0; row < 3; row++) {
                this.board.children().eq(column).children().eq(row).click(row * 3 + column, callback);
            }
        }
    }

    spaceIsEmpty(space) {
        return this.spaces[space] === 0;
    }

    // 0 = no winner
    // 1 = winner
    // 2 = draw
    checkForWinner() {
        for (var pattern of this.winningPatterns) {
            if (this.spaces[pattern[0]] !== 0 &&
                this.spaces[pattern[0]] == this.spaces[pattern[1]] &&
                this.spaces[pattern[0]] == this.spaces[pattern[2]]) {
                return 1;
            }
        }

        var allTaken = true;
        for (var space of this.spaces) {
            if (space === 0) {
                allTaken = false;
            }
        }

        if (allTaken) {
            return 2;
        }

        return 0;
    }

    claimSpace(space, playerNumber) {
        this.spaces[space] = playerNumber;
        this.updateBoard();
    }

    updateBoard() {
        /* 
            Logical arrangement of board cells
     
            0 1 2
            3 4 5
            6 7 8
     
            Arrangement of cells
     
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

        var letter;
        for (var space in this.spaces) {
            if (this.spaces[space] === 0) {
                letter = '';
            }
            else if (this.spaces[space] === 1) {
                letter = 'X';
            }
            else {
                letter = 'O';
            }
            var column = space % 3;
            var row = Math.floor(space / 3);

            this.board.children().eq(column).children().eq(row).text(letter)
        }
    }
}