import { Component } from '@angular/core';
import { Game } from './models/game.model';
import { GameService } from './services/game.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

   p1Turn: boolean;
   p2Turn: boolean;

   player1Game: Game;
   player2Game: Game;
  
   constructor(private gameService: GameService) {
     this.gameService = gameService;
     this.player1Game = this.gameService.getPlayer1Game();
     this.p1Turn = this.player1Game.Turn;

     this.player2Game = this.gameService.getPlayer2Game();
     this.p2Turn = this.player2Game.Turn;
   }
   
  handlePlayer1Sticked(totalScore1: number):void{
    console.log(`Player 1 sticked with score ${totalScore1}`);
    this.p2Turn = true;
  }

  handlePlayer2Sticked(totalScore2: number):void{
   // console.log(`Player 2 sticked with score ${totalScore2} and Player 1 turn is ${this.p1Turn}, Player 2 turn is ${this.p2Turn}`);
    this.p1Turn = true; //QUESTION - this doesn't display player 1's buttons, why?
  }
  
}
