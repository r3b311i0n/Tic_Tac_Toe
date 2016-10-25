import {Component, AfterViewInit} from '@angular/core';
import {ShapeService} from './shape.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'Tic Tac Toe';
  private t3Matrix = [[false, false, false], [false, false, false], [false, false, false]];

  constructor(private shapeService: ShapeService) {
  }

  ngAfterViewInit() {
    let canvas = <HTMLCanvasElement> document.getElementById('board');
    let context: CanvasRenderingContext2D = canvas.getContext('2d');

    context.strokeStyle = 'ghostwhite';
    context.strokeRect(0, 0, 360, 360);
    for (let i = 0; i <= 360; i += 120) {
      context.strokeRect(i, 0, 120, 120);
      context.strokeRect(i, 120, 120, 120);
      context.strokeRect(i, 240, 120, 120);
    }
  }

  boardClick(event: MouseEvent) {
    let cell: number;
    let avail: boolean;
    console.log(event.offsetX + ' ' + event.offsetY);
    cell = this.shapeService.determineSquare(event.offsetX, event.offsetY);
    avail = this.shapeService.checkAvailability(cell, this.t3Matrix);
    if (avail === true) {
      this.drawCross(cell);
      this.drawCircle(cell);
    }
  }

  drawCross(cell: number) {
    let canvas = <HTMLCanvasElement> document.getElementById('board');
    let context: CanvasRenderingContext2D = canvas.getContext('2d');

    switch (cell) {
      case 1:
        this.t3Matrix[0][0] = true;
        context.beginPath();
        context.moveTo(20, 260);
        context.lineTo(100, 340);
        context.moveTo(20, 340);
        context.lineTo(100, 260);
        context.stroke();
        break;
      case 2:
        this.t3Matrix[0][1] = true;
        context.beginPath();
        context.moveTo(140, 260);
        context.lineTo(220, 340);
        context.moveTo(140, 340);
        context.lineTo(220, 260);
        context.stroke();
        break;
      case 3:
        this.t3Matrix[0][2] = true;
        context.beginPath();
        context.moveTo(260, 260);
        context.lineTo(340, 340);
        context.moveTo(260, 340);
        context.lineTo(340, 260);
        context.stroke();
        break;
      case 4:
        this.t3Matrix[1][0] = true;
        context.beginPath();
        context.moveTo(20, 140);
        context.lineTo(100, 220);
        context.moveTo(20, 220);
        context.lineTo(100, 140);
        context.stroke();
        break;
      case 5:
        this.t3Matrix[1][1] = true;
        context.beginPath();
        context.moveTo(140, 140);
        context.lineTo(220, 220);
        context.moveTo(140, 220);
        context.lineTo(220, 140);
        context.stroke();
        break;
      case 6:
        this.t3Matrix[1][2] = true;
        context.beginPath();
        context.moveTo(260, 140);
        context.lineTo(340, 220);
        context.moveTo(260, 220);
        context.lineTo(340, 140);
        context.stroke();
        break;
      case 7:
        this.t3Matrix[2][0] = true;
        context.beginPath();
        context.moveTo(20, 20);
        context.lineTo(100, 100);
        context.moveTo(20, 100);
        context.lineTo(100, 20);
        context.stroke();
        break;
      case 8:
        this.t3Matrix[2][1] = true;
        context.beginPath();
        context.moveTo(140, 20);
        context.lineTo(220, 100);
        context.moveTo(140, 100);
        context.lineTo(220, 20);
        context.stroke();
        break;
      case 9:
        this.t3Matrix[2][2] = true;
        context.beginPath();
        context.moveTo(260, 20);
        context.lineTo(340, 100);
        context.moveTo(260, 100);
        context.lineTo(340, 20);
        context.stroke();
        break;
    }
  }

  drawCircle(cell: number) {
    let canvas = <HTMLCanvasElement> document.getElementById('board');
    let context: CanvasRenderingContext2D = canvas.getContext('2d');

    switch (cell) {
      case 1:
        this.t3Matrix[0][0] = true;
        context.beginPath();
        context.arc(60, 300, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 2:
        this.t3Matrix[0][1] = true;
        context.beginPath();
        context.arc(180, 300, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 3:
        this.t3Matrix[0][2] = true;
        context.beginPath();
        context.arc(300, 300, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 4:
        this.t3Matrix[1][0] = true;
        context.beginPath();
        context.arc(60, 180, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 5:
        this.t3Matrix[1][1] = true;
        context.beginPath();
        context.arc(180, 180, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 6:
        this.t3Matrix[1][2] = true;
        context.beginPath();
        context.arc(300, 180, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 7:
        this.t3Matrix[2][0] = true;
        context.beginPath();
        context.arc(60, 60, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 8:
        this.t3Matrix[2][1] = true;
        context.beginPath();
        context.arc(180, 60, 40, 0, Math.PI * 2);
        context.stroke();
        break;
      case 9:
        this.t3Matrix[2][2] = true;
        context.beginPath();
        context.arc(300, 60, 40, 0, Math.PI * 2);
        context.stroke();
        break;
    }
  }
}
