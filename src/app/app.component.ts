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
   die1Number: number;
   die2Number: number;
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
     
     this.die1Number = null;
     this.die2Number = null;
   }

   totalScore1Inc(score1: number):void{
    this.gameService.getPlayer1Game().totalScore = score1;
   }

   totalScore2Inc(score2: number):void{
    this.gameService.getPlayer2Game().totalScore = score2;
   }
   
  handlePlayer1Sticked(totalPlayerScore1: number):void{
    this.gameService.player1Sticked(totalPlayerScore1);
    
    if(!this.player1Game.wonLastGame){ //If P1 did not win last game them when P1 sticks it's time to compare scores
      this.gameStatusArray = this.gameService.compareScores();
      this.setupNewGame(this.gameStatusArray);
    }else{
      this.p2Turn = true; //P1 won last time so when P1 sticks it's P2's turn 
      this.p1Turn = false;
    }
  }

  handlePlayer2Sticked(totalPlayerScore2: number):void{
    this.gameService.player2Sticked(totalPlayerScore2);

    if(!this.player2Game.wonLastGame){
      this.gameStatusArray = this.gameService.compareScores();
      this.setupNewGame(this.gameStatusArray);
    }else{
      this.p1Turn = true; 
      this.p2Turn = false;
    }
  }

  handlePlayer1GoneOver(totalScore1Over: number):void{
    if(totalScore1Over == 21){
      //Player 1 won game
      this.user1GamesWon += 1;
      this.gameService.getPlayer1Game().wonLastGame = true;
      this.gameService.getPlayer2Game().wonLastGame = false;
      this.p1Turn = true;
      this.p2Turn = false;
    }else if(totalScore1Over > 21){
      //Player 1 lost game
      this.user2GamesWon += 1;
      this.gameService.getPlayer1Game().wonLastGame = false;
      this.gameService.getPlayer2Game().wonLastGame = true;
      this.p1Turn = false;
      this.p2Turn = true;
    }
    this.totalScore1 = 0;
    this.totalScore2 = 0;
    this.die1Number = null;
    this.die2Number = null;
    console.log(this.die1Number);
  }

  handlePlayer2GoneOver(totalScore2Over: number):void{
    if(totalScore2Over == 21){
      //Player 2 won game
      this.user2GamesWon +=1;
      this.gameService.getPlayer1Game().wonLastGame = false;
      this.gameService.getPlayer2Game().wonLastGame = true;
      this.p1Turn = false;
      this.p2Turn = true;
    }else if(totalScore2Over > 21){
      //Player 2 lost game
      this.user1GamesWon += 1;
      this.gameService.getPlayer1Game().wonLastGame = false;
      this.gameService.getPlayer1Game().wonLastGame = true;
      this.p1Turn = true;
      this.p2Turn = false;
    }
    this.totalScore1 = 0;
    this.totalScore2 = 0;
    this.die1Number = null;
    this.die2Number = null;
  }
 
  setupNewGame(gameArray : Array<Game>){
      this.p1Turn = gameArray[0].Turn;
      this.totalScore1 = gameArray[0].totalScore; 
    
      this.user1GamesWon = gameArray[0].GamesWon;

      this.p2Turn = gameArray[1].Turn;
      this.totalScore2 = gameArray[1].totalScore; //This isn't changing the actual total score for a new game.
      this.user2GamesWon = gameArray[1].GamesWon; //This does change the score
      console.log(gameArray);
      console.log(`Player 1 score: ${this.totalScore1}`);
      console.log(`Player 2 score: ${this.totalScore2}`);
  }
  
}
