import {Injectable} from '@angular/core';

@Injectable()
export class MinimaxService {
  numNodes = 0;
  board: boolean[][];
  vals = [true, false];

  getWinner(board): number {
    // AI = 1, Human = 0, Tie = -1
    let allNotNull = true;
    for (let k = 0; k < this.vals.length; k++) {
      let value = this.vals[k];

      let diagonalComplete1 = true;
      let diagonalComplete2 = true;
      for (let i = 0; i < 3; i++) {
        if (board[i][i] !== value) {
          diagonalComplete1 = false;
        }
        if (board[2 - i][i] !== value) {
          diagonalComplete2 = false;
        }
        let rowComplete = true;
        let colComplete = true;
        for (let j = 0; j < 3; j++) {
          if (board[i][j] !== value) {
            rowComplete = false;
          }
          if (board[j][i] !== value) {
            colComplete = false;
          }
          if (board[i][j] == null) {
            allNotNull = false;
          }
        }
        if (rowComplete || colComplete) {
          return value ? 1 : 0;
        }
      }
      if (diagonalComplete1 || diagonalComplete2) {
        return value ? 1 : 0;
      }
    }
    if (allNotNull) {
      return -1;
    }
    return null;
  }

  recurseMinimax(board: boolean[][], player: boolean): any {
    this.numNodes++;
    let winner = this.getWinner(board);
    if (winner != null) {
      switch (winner) {
        case 1:
          return [1, board];
        case 0:
          return [-1, board];
        case -1:
          return [0, board];
      }
    } else {
      let nextVal = null;
      let nextBoard = null;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == null) {
            board[i][j] = player;
            let value = this.recurseMinimax(board, !player)[0];
            if ((player && (nextVal == null || value > nextVal)) || (!player && (nextVal == null || value < nextVal))) {
              nextBoard = board.map(function (arr) {
                return arr.slice();
              });
              nextVal = value;
            }
            board[i][j] = null;
          }
        }
      }
      return [nextVal, nextBoard];
    }
  }

  move(matrix: boolean[][]): any {
    console.log(this.board);
    this.board = this.minimaxMove(matrix);
    console.log(this.board);
    return this.board;
  }

  minimaxMove(board: boolean[][]): any {
    this.numNodes = 0;
    return this.recurseMinimax(board, true)[1];
  }
}
