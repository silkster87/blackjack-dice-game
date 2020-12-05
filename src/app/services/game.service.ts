import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})

export class GameService {

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
      //Wait for player 2's turn to stick
      this.p1Game.totalScore = score;
      this.p2Game.Turn = true;
      this.p1Game.Turn = false;
  }

  player2Sticked(score: number){
    this.p2Game.totalScore = score;
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
    
    this.gameArray = new Array<Game>();
    this.gameArray.push(this.p1Game, this.p2Game);
     
    return this.gameArray;
  }

  resetScores(){
    this.p1Game.totalScore = 0;
    this.p2Game.totalScore = 0;
  }
}
