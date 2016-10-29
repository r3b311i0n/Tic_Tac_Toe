import {Injectable} from '@angular/core';

@Injectable()
export class ShapeService {
  determineSquare(xCoords: number, yCoords: number): number {
    if (yCoords < 170 && xCoords < 120) {
      return 7;
    }
    else if (yCoords < 290 && xCoords < 120) {
      return 4;
    }
    else if (yCoords < 410 && xCoords < 120) {
      return 1;
    }
    if (yCoords < 170 && xCoords < 240) {
      return 8;
    }
    else if (yCoords < 290 && xCoords < 240) {
      return 5;
    }
    else if (yCoords < 410 && xCoords < 240) {
      return 2;
    }
    if (yCoords < 170 && xCoords < 360) {
      return 9;
    }
    else if (yCoords < 290 && xCoords < 360) {
      return 6;
    }
    else if (yCoords < 410 && xCoords < 360) {
      return 3;
    }
  }

  checkAvailability(cell: number, matrix: string[][]): boolean {
    switch (cell) {
      case 1:
        return matrix[0][0] === 'empty';
      case 2:
        return matrix[0][1] === 'empty';
      case 3:
        return matrix[0][2] === 'empty';
      case 4:
        return matrix[1][0] === 'empty';
      case 5:
        return matrix[1][1] === 'empty';
      case 6:
        return matrix[1][2] === 'empty';
      case 7:
        return matrix[2][0] === 'empty';
      case 8:
        return matrix[2][1] === 'empty';
      case 9:
        return matrix[2][2] === 'empty';
    }
  }
}
