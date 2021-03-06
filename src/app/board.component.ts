import {Component, ViewChild, ElementRef, AfterViewInit, Input} from '@angular/core';
import {ShapeService} from './shape.service';
import {MinimaxService} from './minimax.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./app.component.css', './board.component.css']
})
export class BoardComponent implements AfterViewInit {
  private t3Matrix: boolean[][] = [[null, null, null], [null, null, null], [null, null, null]];
  myTurn = true;
  resetButton = false;
  winnerLabel: string;
  @Input() player: string;
  @Input() cpu: string;

  @ViewChild('board') board: ElementRef;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(private shapeService: ShapeService, private minimaxService: MinimaxService) {
  }

  ngAfterViewInit() {
    this.drawBoard();
  }

  get Player(): string {
    return this.player;
  }

  get Cpu(): string {
    return this.cpu;
  }

  get T3Matrix(): boolean[][] {
    return this.t3Matrix;
  }

  set T3Matrix(t3Matrix: boolean[][]) {
    this.t3Matrix = t3Matrix;
  }

  boardClick(event: MouseEvent): void {
    let square: number = this.shapeService.determineSquare(event.offsetX, event.offsetY);
    let avail: boolean = this.shapeService.checkAvailability(square, this.T3Matrix);
    if (this.myTurn && avail) {
      this.control(event);
      this.myTurn = true;
    }
  }

  control(event: MouseEvent) {
    let cell: number;
    let avail: boolean;
    let cCell: number;
    let cpuMove: any;
    let winner: number;
    console.log(event.offsetX + ' ' + event.offsetY + ': player=> ' + this.Player + ': cpu=> ' + this.Cpu + ' ' + this.T3Matrix);
    cell = this.shapeService.determineSquare(event.offsetX, event.offsetY);
    avail = this.shapeService.checkAvailability(cell, this.T3Matrix);
    if (avail === true && this.Player === 'cross') {
      this.drawCross(cell, false);
    }
    else if (avail === true && this.Player === 'circle') {
      this.drawCircle(cell, false);
    }
    // end turn
    this.myTurn = false;
    console.log(this.T3Matrix);
    cpuMove = this.minimaxService.move(this.T3Matrix);
    console.log(cpuMove[0]);
    cCell = this.diffBoard(cpuMove);
    this.T3Matrix = cpuMove;
    if (avail === true && this.Cpu === 'cross') {
      this.drawCross(cCell, true);
    }
    else if (avail === true && this.Cpu === 'circle') {
      this.drawCircle(cCell, true);
    }
    winner = this.minimaxService.getWinner(this.T3Matrix);
    if (winner === 1 || winner === 0) {
      this.winnerLabel = winner === 1 ? 'CPU Wins!' : 'You Win!';
      this.resetButton = true;
    }
    else {
      let tie: boolean;
      for (let i = 0; i < 3; ++i) {
        tie = this.T3Matrix[i].every(function (value) {
          return value !== null;
        });
        if (!tie) {
          break;
        }
      }
      if (tie) {
        this.winnerLabel = 'It\'s a Tie!';
        this.resetButton = true;
      }
    }
  }

  drawBoard(): void {
    this.canvas = this.board.nativeElement;
    this.context = this.canvas.getContext('2d');

    this.context.strokeStyle = 'ghostwhite';
    this.context.strokeRect(0, 0, 360, 360);
    for (let i = 0; i <= 360; i += 120) {
      this.context.strokeRect(i, 0, 120, 120);
      this.context.strokeRect(i, 120, 120, 120);
      this.context.strokeRect(i, 240, 120, 120);
    }
  }

  drawCross(cell: number, user: boolean): void {
    let canvas = <HTMLCanvasElement> document.getElementById('board');
    let context: CanvasRenderingContext2D = canvas.getContext('2d');

    switch (cell) {
      case 1:
        this.T3Matrix[0][0] = user;
        context.beginPath();
        context.moveTo(20, 260);
        context.lineTo(100, 340);
        context.moveTo(20, 340);
        context.lineTo(100, 260);
        context.stroke();
        break;
      case 2:
        this.T3Matrix[0][1] = user;
        context.beginPath();
        context.moveTo(140, 260);
        context.lineTo(220, 340);
        context.moveTo(140, 340);
        context.lineTo(220, 260);
        context.stroke();
        break;
      case 3:
        this.T3Matrix[0][2] = user;
        context.beginPath();
        context.moveTo(260, 260);
        context.lineTo(340, 340);
        context.moveTo(260, 340);
        context.lineTo(340, 260);
        context.stroke();
        break;
      case 4:
        this.T3Matrix[1][0] = user;
        context.beginPath();
        context.moveTo(20, 140);
        context.lineTo(100, 220);
        context.moveTo(20, 220);
        context.lineTo(100, 140);
        context.stroke();
        break;
      case 5:
        this.T3Matrix[1][1] = user;
        context.beginPath();
        context.moveTo(140, 140);
        context.lineTo(220, 220);
        context.moveTo(140, 220);
        context.lineTo(220, 140);
        context.stroke();
        break;
      case 6:
        this.T3Matrix[1][2] = user;
        context.beginPath();
        context.moveTo(260, 140);
        context.lineTo(340, 220);
        context.moveTo(260, 220);
        context.lineTo(340, 140);
        context.stroke();
        break;
      case 7:
        this.T3Matrix[2][0] = user;
        context.beginPath();
        context.moveTo(20, 20);
        context.lineTo(100, 100);
        context.moveTo(20, 100);
        context.lineTo(100, 20);
        context.stroke();
        break;
      case 8:
        this.T3Matrix[2][1] = user;
        context.beginPath();
        context.moveTo(140, 20);
        context.lineTo(220, 100);
        context.moveTo(140, 100);
        context.lineTo(220, 20);
        context.stroke();
        break;
      case 9:
        this.T3Matrix[2][2] = user;
        context.beginPath();
        context.moveTo(260, 20);
        context.lineTo(340, 100);
        context.moveTo(260, 100);
        context.lineTo(340, 20);
        context.stroke();
        break;
    }
  }

  drawCircle(cell: number, user: boolean): void {
    let canvas = <HTMLCanvasElement> document.getElementById('board');
    let context: CanvasRenderingContext2D = canvas.getContext('2d');

    switch (cell) {
      case 1:
        this.T3Matrix[0][0] = user;
        context.beginPath();
        context.arc(60, 300, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 2:
        this.T3Matrix[0][1] = user;
        context.beginPath();
        context.arc(180, 300, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 3:
        this.T3Matrix[0][2] = user;
        context.beginPath();
        context.arc(300, 300, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 4:
        this.T3Matrix[1][0] = user;
        context.beginPath();
        context.arc(60, 180, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 5:
        this.T3Matrix[1][1] = user;
        context.beginPath();
        context.arc(180, 180, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 6:
        this.T3Matrix[1][2] = user;
        context.beginPath();
        context.arc(300, 180, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 7:
        this.T3Matrix[2][0] = user;
        context.beginPath();
        context.arc(60, 60, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 8:
        this.T3Matrix[2][1] = user;
        context.beginPath();
        context.arc(180, 60, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 9:
        this.T3Matrix[2][2] = user;
        context.beginPath();
        context.arc(300, 60, 40, 0, Math.PI * 2);
        context.stroke();
        break;
    }
  }

  diffBoard(cpuMove: any): number {
    let cell: number;
    for (let i = 0; i < 3; ++i) {
      for (let n = 0; n < 3; ++n) {
        if (cpuMove[i][n] !== this.T3Matrix[i][n]) {
          cell = this.shapeService.convertToNumber([i, n]);
          console.log(cell);
          return cell;
        }
      }
    }
  }

  resetBoard(): void {
    let canvas = <HTMLCanvasElement> document.getElementById('board');
    let context: CanvasRenderingContext2D = canvas.getContext('2d');
    this.T3Matrix = [[null, null, null], [null, null, null], [null, null, null]];
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBoard();
    this.resetButton = false;
  }
}
