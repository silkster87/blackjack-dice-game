import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  /*The GameService class handles the logic of working out whether or not Player 1 or 2 has won a game. It also
  * initiates the setup of the game with Player 1 starting first. If a Player wins a game they start the next game
  * retaining their first go.
  */

  private p1Game: Game;
  private p2Game: Game;
  private gameArray : Array<Game>;
  
  constructor() {
    this.p1Game = {
      totalScore: 0,
      GamesWon: 0,
      Turn: true,
      wonLastGame: true //P1 starts play first
  };

  this.p2Game = {
      totalScore: 0,
      GamesWon: 0,
      Turn: false,
      wonLastGame: false
  };
   }

   getPlayer1Game(): Game{
     return this.p1Game;
   }

   getPlayer2Game(): Game{
     return this.p2Game;
   }

  player1Sticked(score: number){
      this.p1Game.totalScore = score;
  }

  player2Sticked(score: number){
    this.p2Game.totalScore = score;
  }

  checkScore1(score1: number): number{
      this.p1Game.totalScore = score1;
      return score1;
  }

  checkScore2(score2: number): number{
    this.p2Game.totalScore = score2;
    return score2;
  }

  player1GoneOver(score1: number): Array<Game>{
    if(score1 == 21){
      //Player 1 won game
      alert(`Player 1 wins game with score: ${score1}`);
      this.p1Game.GamesWon += 1;
      this.p1Game.wonLastGame = true;
      this.p2Game.wonLastGame = false;
      this.p1Game.Turn = true;
      this.p2Game.Turn = false;
    }else if(score1 > 21){
      //Player 1 lost game
      alert(`Player 1 lost game with score: ${score1}`);
      this.p2Game.GamesWon += 1;
      this.p1Game.wonLastGame = false;
      this.p2Game.wonLastGame = true;
      this.p1Game.Turn = false;
      this.p2Game.Turn = true;
    }
    this.resetScores();
    return this.returnGameArray();
  }

  player2GoneOver(score2: number): Array<Game>{
    if(score2 == 21){
      //Player 2 won game
      alert(`Player 2 wins game with score: ${score2}`);
      this.p2Game.GamesWon += 1;
      this.p2Game.wonLastGame = true;
      this.p1Game.wonLastGame = false;
      this.p1Game.Turn = false;
      this.p2Game.Turn = true;
    }else if(score2 > 21){
      //Player 2 lost game
      alert(`Player 2 lost game with score: ${score2}`);
      this.p1Game.GamesWon += 1;
      this.p1Game.wonLastGame = true;
      this.p2Game.wonLastGame = false;
      this.p1Game.Turn = true;
      this.p2Game.Turn = false;
    }
    this.resetScores();
    return this.returnGameArray();
  }



  compareScores(): Array<Game>{
    if(this.p1Game.totalScore > this.p2Game.totalScore){
      //Player 1 wins - keeps their turn
      this.p1Game.GamesWon +=1;
      this.resetScores();
      this.p1Game.Turn = true;
      this.p2Game.Turn = false;
      this.p1Game.wonLastGame = true;
      this.p2Game.wonLastGame = false;
    }else if(this.p2Game.totalScore > this.p1Game.totalScore){
      //Player 2 wins - keeps their turn
      this.p2Game.GamesWon +=1;
      this.resetScores();
      this.p2Game.Turn = true;
      this.p1Game.Turn = false;
      this.p2Game.wonLastGame = true;
      this.p1Game.wonLastGame = false;
    }else if(this.p1Game.totalScore == this.p2Game.totalScore){
      alert("Draw!");
      this.resetScores(); //Just want to reset scores, no player has won. Keep the same turn
    }
    
    return this.returnGameArray();
  }

  resetScores(){
    this.p1Game.totalScore = 0;
    this.p2Game.totalScore = 0;
  }

  returnGameArray(): Array<Game>{
    this.gameArray = new Array<Game>();
    this.gameArray.push(this.p1Game, this.p2Game);
    return this.gameArray;
  }
}
