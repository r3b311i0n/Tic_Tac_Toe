import {Component, AfterViewInit} from '@angular/core';
import {BoardComponent} from './board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'Tic Tac Toe';
  private chosen: boolean = false;
  player: string;
  cpu: string;

  constructor(private boardComponent: BoardComponent) {
  }

  ngAfterViewInit() {
    let crossCanvas = <HTMLCanvasElement> document.getElementById('cross');
    let crossCtx: CanvasRenderingContext2D = crossCanvas.getContext('2d');
    let circleCanvas = <HTMLCanvasElement> document.getElementById('circle');
    let circleCtx: CanvasRenderingContext2D = circleCanvas.getContext('2d');

    crossCtx.strokeStyle = 'ghostwhite';
    crossCtx.strokeRect(0, 0, 360, 360);
    crossCtx.beginPath();
    crossCtx.moveTo(40, 40);
    crossCtx.lineTo(200, 200);
    crossCtx.moveTo(40, 200);
    crossCtx.lineTo(200, 40);
    crossCtx.stroke();

    circleCtx.strokeStyle = 'ghostwhite';
    circleCtx.strokeRect(0, 0, 360, 360);
    circleCtx.beginPath();
    circleCtx.arc(120, 120, 80, 0, Math.PI * 2);
    circleCtx.stroke();
  }

  setCross() {
    this.player = 'cross';
    this.cpu = 'circle';
    this.chosen = true;
  }

  setCircle() {
    this.player = 'circle';
    this.cpu = 'cross';
    this.chosen = true;
  }
}
