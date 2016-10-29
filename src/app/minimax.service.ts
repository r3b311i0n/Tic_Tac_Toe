import {Injectable} from '@angular/core';

@Injectable()
export class MinimaxService {
  winningPatterns: number[] = [0b111000000, 0b000111000, 0b000000111, 0b100100100, 0b010010010, 0b001001001, 0b100010001, 0b001010100];

  move(currMatrix: string[][], player: string, cpu: string): number[] {
    let result: number[] = this.minimax(2, cpu, player, cpu, currMatrix);
    return result;
  }

  minimax(depth: number, currPlayer: string, player: string, cpu: string, currMatrix: string[][]): number[] {
    let movesList: number[] = this.generateMoves(currMatrix, player, cpu);
    let bestScore: number = (currPlayer === cpu) ? Number.MAX_VALUE : Number.MIN_VALUE;
    let currScore: number;
    let bestRow: number = -1;
    let bestCol: number = -1;

    if (movesList.length === 0 || depth === 0) {
      bestScore = this.evaluate(currMatrix, player, cpu);
    }
    else {
      for (let value of movesList) {
        currMatrix[value[0]][value[1]] = currPlayer;
        if (currPlayer === cpu) {
          currScore = this.minimax(depth - 1, player, player, cpu, currMatrix)[0];
          if (currScore > bestScore) {
            bestScore = currScore;
            bestRow = value[0];
            bestCol = value[1];
          }
        }
        else {
          currScore = this.minimax(depth - 1, cpu, player, cpu, currMatrix)[0];
          if (currScore < bestScore) {
            bestScore = currScore;
            bestRow = value[0];
            bestCol = value[1];
          }
        }
        currMatrix[value[0]][value[1]] = 'empty';
      }
    }
    return [bestScore, bestRow, bestCol];
  }

  generateMoves(matrix: string[][], player, cpu): number[] {
    let moves: number[] = [];
    if (this.hasWon(cpu, matrix) || this.hasWon(player, matrix)) {
      return moves;
    }
    for (let row = 0; row < 3; ++row) {
      for (let col = 0; col < 3; ++col) {
        if (matrix[row][col] === 'empty') {
          moves.push(row, col);
        }
      }
    }
    return moves;
  }

  evaluate(matrix: string[][], player, cpu): number {
    let score = 0;
    score += this.evaluateLine(0, 0, 0, 1, 0, 2, matrix, player, cpu);
    score += this.evaluateLine(1, 0, 1, 1, 1, 2, matrix, player, cpu);
    score += this.evaluateLine(2, 0, 2, 1, 2, 2, matrix, player, cpu);
    score += this.evaluateLine(0, 0, 1, 0, 2, 0, matrix, player, cpu);
    score += this.evaluateLine(0, 1, 1, 1, 2, 1, matrix, player, cpu);
    score += this.evaluateLine(0, 2, 1, 2, 2, 2, matrix, player, cpu);
    score += this.evaluateLine(0, 0, 1, 1, 2, 2, matrix, player, cpu);
    score += this.evaluateLine(0, 2, 1, 1, 2, 0, matrix, player, cpu);
    return score;
  }

  evaluateLine(row1: number, col1: number, row2: number, col2: number, row3: number, col3: number, matrix: string[][], player: string, cpu: string) {
    let score = 0;

    if (matrix[row1][col1] === cpu) {
      score = 1;
    } else if (matrix[row1][col1] === player) {
      score = -1;
    }

    if (matrix[row2][col2] === cpu) {
      if (score === 1) {
        score = 10;
      } else if (score === -1) {
        return 0;
      } else {
        score = 1;
      }
    } else if (matrix[row2][col2] === player) {
      if (score === -1) {
        score = -10;
      } else if (score === 1) {
        return 0;
      } else {
        score = -1;
      }
    }

    if (matrix[row3][col3] === cpu) {
      if (score > 0) {
        score *= 10;
      } else if (score < 0) {
        return 0;
      } else {
        score = 1;
      }
    } else if (matrix[row3][col3] === player) {
      if (score < 0) {
        score *= 10;
      } else if (score > 1) {
        return 0;
      } else {
        score = -1;
      }
    }
    return score;
  }

  hasWon(player: string, matrix: string[][]): boolean {
    let pattern = 0b000000000;
    for (let row = 0; row < 3; ++row) {
      for (let col = 0; col < 3; ++col) {
        if (matrix[row][col] === player) {
          pattern |= (1 << (row * 3 + col));
        }
      }
    }
    for (let value of this.winningPatterns) {
      if (pattern === value) {
        return true;
      }
    }
    return false;
  }
}
