import {Injectable} from '@angular/core';

// @Injectable()
// export class MinimaxService {
//   winningPatterns: number[] = [0b111000000, 0b000111000, 0b000000111, 0b100100100, 0b010010010, 0b001001001, 0b100010001, 0b001010100];
//
//   move(currMatrix: string[][], player: string, cpu: string): number[] {
//     // console.log(currMatrix + ' ' + player + ' ' + cpu);
//     let result: number[] = this.minimax(2, cpu, player, cpu, currMatrix);
//     return result;
//   }
//
//   minimax(depth: number, currPlayer: string, player: string, cpu: string, currMatrix: string[][]): number[] {
//     let movesList: number[] = this.generateMoves(currMatrix, player, cpu);
//     let bestScore: number = (currPlayer === cpu) ? Number.MAX_VALUE : Number.MIN_VALUE;
//     let currScore: number;
//     let bestRow: number = -1;
//     let bestCol: number = -1;
//
//     // console.log(bestScore + ' ' + bestRow + ' ' + bestCol);
//     // console.log(movesList);
//
//     if (movesList.length === 0 || depth === 0) {
//       bestScore = this.evaluate(currMatrix, player, cpu);
//       // console.log(bestScore);
//     }
//     else {
//       movesList.forEach(function (value, index, array) {
//         let x: number = array[index];
//         let y: number = array[index + 1];
//         console.log(x + ' ' + y);
//         currMatrix[x][y] = currPlayer;
//         if (currPlayer === cpu) {
//           currScore = this.minimax(depth - 1, player, player, cpu, currMatrix)[0];
//           // console.log(currScore);
//           if (currScore > bestScore) {
//             bestScore = currScore;
//             bestRow = x;
//             bestCol = y;
//           }
//         }
//         else {
//           currScore = this.minimax(depth - 1, cpu, player, cpu, currMatrix)[0];
//           // console.log(currScore);
//           if (currScore < bestScore) {
//             bestScore = currScore;
//             bestRow = x;
//             bestCol = y;
//           }
//         }
//         currMatrix[x][y] = 'empty';
//       }, this);
//       // for (let value of movesList) {
//       //   currMatrix[value[0]][value[1]] = currPlayer;
//       //   if (currPlayer === cpu) {
//       //     currScore = this.minimax(depth - 1, player, player, cpu, currMatrix)[0];
//       //     if (currScore > bestScore) {
//       //       bestScore = currScore;
//       //       bestRow = value[0];
//       //       bestCol = value[1];
//       //     }
//       //   }
//       //   else {
//       //     currScore = this.minimax(depth - 1, cpu, player, cpu, currMatrix)[0];
//       //     if (currScore < bestScore) {
//       //       bestScore = currScore;
//       //       bestRow = value[0];
//       //       bestCol = value[1];
//       //     }
//       //   }
//       //   currMatrix[value[0]][value[1]] = 'empty';
//       // }
//     }
//     // console.log(bestScore + ' ' + bestRow + ' ' + bestCol);
//     return [bestScore, bestRow, bestCol];
//   }
//
//   generateMoves(matrix: string[][], player, cpu): number[] {
//     let moves: number[] = [];
//     if (this.hasWon(cpu, matrix) || this.hasWon(player, matrix)) {
//       return moves;
//     }
//     for (let row = 0; row < 3; ++row) {
//       for (let col = 0; col < 3; ++col) {
//         if (matrix[row][col] === 'empty') {
//           moves.push(row, col);
//         }
//       }
//     }
//     return moves;
//   }
//
//   evaluate(matrix: string[][], player, cpu): number {
//     let score = 0;
//     score += this.evaluateLine(0, 0, 0, 1, 0, 2, matrix, player, cpu);
//     score += this.evaluateLine(1, 0, 1, 1, 1, 2, matrix, player, cpu);
//     score += this.evaluateLine(2, 0, 2, 1, 2, 2, matrix, player, cpu);
//     score += this.evaluateLine(0, 0, 1, 0, 2, 0, matrix, player, cpu);
//     score += this.evaluateLine(0, 1, 1, 1, 2, 1, matrix, player, cpu);
//     score += this.evaluateLine(0, 2, 1, 2, 2, 2, matrix, player, cpu);
//     score += this.evaluateLine(0, 0, 1, 1, 2, 2, matrix, player, cpu);
//     score += this.evaluateLine(0, 2, 1, 1, 2, 0, matrix, player, cpu);
//     console.log(score);
//     return score;
//   }
//
//   evaluateLine(row1: number, col1: number, row2: number, col2: number, row3: number, col3: number, matrix: string[][], player: string, cpu: string) {
//     let score = 0;
//
//     if (matrix[row1][col1] === cpu) {
//       score = 1;
//     } else if (matrix[row1][col1] === player) {
//       score = -1;
//     }
//
//     if (matrix[row2][col2] === cpu) {
//       if (score === 1) {
//         score = 10;
//       } else if (score === -1) {
//         return 0;
//       } else {
//         score = 1;
//       }
//     } else if (matrix[row2][col2] === player) {
//       if (score === -1) {
//         score = -10;
//       } else if (score === 1) {
//         return 0;
//       } else {
//         score = -1;
//       }
//     }
//
//     if (matrix[row3][col3] === cpu) {
//       if (score > 0) {
//         score *= 10;
//       } else if (score < 0) {
//         return 0;
//       } else {
//         score = 1;
//       }
//     } else if (matrix[row3][col3] === player) {
//       if (score < 0) {
//         score *= 10;
//       } else if (score > 1) {
//         return 0;
//       } else {
//         score = -1;
//       }
//     }
//     return score;
//   }
//
//   hasWon(player: string, matrix: string[][]): boolean {
//     let pattern = 0b000000000;
//     for (let row = 0; row < 3; ++row) {
//       for (let col = 0; col < 3; ++col) {
//         if (matrix[row][col] === player) {
//           pattern |= (1 << (row * 3 + col));
//         }
//       }
//     }
//     for (let value of this.winningPatterns) {
//       if (pattern === value) {
//         return true;
//       }
//     }
//     return false;
//   }
// }

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

  minimaxMove(board: boolean[][]) {
    this.numNodes = 0;
    // console.log(board);
    return this.recurseMinimax(board, true)[1];
  }
}
