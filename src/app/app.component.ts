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
   totalScore1: number;
   totalScore2: number;
   user1GamesWon: number;
   user2GamesWon: number;
   player1Game: Game;
   player2Game: Game;

   gameStatusArray : Array<Game>;
  
   constructor(private gameService: GameService) {
     this.gameService = gameService;
//Setup player 1
     this.player1Game = this.gameService.getPlayer1Game();
     this.p1Turn = this.player1Game.Turn;
     this.totalScore1 = this.player1Game.totalScore;
     this.user1GamesWon = this.player1Game.GamesWon;
//Setup player 2
     this.player2Game = this.gameService.getPlayer2Game();
     this.p2Turn = this.player2Game.Turn;
     this.totalScore2 = this.player2Game.totalScore;
     this.user2GamesWon = this.player2Game.GamesWon;
   }
   
  handlePlayer1Sticked(totalScore1: number):void{
    this.gameService.player1Sticked(totalScore1);
    this.p2Turn = true;
  }

  handlePlayer2Sticked(totalScore2: number):void{
    this.gameService.player2Sticked(totalScore2);
    this.p1Turn = true; 

    this.gameStatusArray = this.gameService.compareScores();
    this.setupGame(this.gameStatusArray);
  }

 
  setupGame(gameArray : Array<Game>){
      this.p1Turn = gameArray[0].Turn;
      this.totalScore1 = gameArray[0].totalScore; 
     // console.log(this.totalScore1);
      this.user1GamesWon = gameArray[0].GamesWon;

      this.p2Turn = gameArray[1].Turn;
      this.totalScore2 = gameArray[1].totalScore; //This isn't changing the actual total score for a new game.
    //  console.log(this.totalScore2);
      this.user2GamesWon = gameArray[1].GamesWon; //This does change the score
      console.log(gameArray);
  }
  
}
