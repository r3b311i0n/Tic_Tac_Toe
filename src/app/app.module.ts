import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ShapeService} from './shape.service';
import {BoardComponent} from './board.component';
import {MinimaxService} from './minimax.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ShapeService, BoardComponent, MinimaxService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
