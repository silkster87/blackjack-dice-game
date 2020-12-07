import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { Player1Component } from './player1/player1.component';
import { Player2Component } from './player2/player2.component';

@NgModule({
  declarations: [
    AppComponent,
    Player1Component,
    Player2Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
