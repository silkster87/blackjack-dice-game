import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  private p1Game: Game;
  private p2Game: Game;
  

  constructor() {
    this.p1Game = {
      totalScore: 0,
      GamesWon: 0,
      Turn: true
  };

  this.p2Game = {
      totalScore: 0,
      GamesWon: 0,
      Turn: false
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
      //Player 1 wins
      this.p1Game.GamesWon +=1;
      this.resetScores();
      this.p1Game.Turn = true;
      this.p2Game.Turn = false;
    }else if(this.p2Game.totalScore > this.p1Game.totalScore){
      //Player 2 wins
      this.p2Game.GamesWon +=1;
      this.resetScores();
      this.p2Game.Turn = true;
      this.p1Game.Turn = false;
    }else if(this.p1Game.totalScore == this.p2Game.totalScore){
      alert("Draw!");
      this.resetScores();
      if(this.p1Game.Turn){
        this.p1Game.Turn = false;
        this.p2Game.Turn = true;
      }else{
        this.p1Game.Turn = true;
        this.p2Game.Turn = false;
      }
    }

    return [this.p1Game, this.p2Game];
  }

  resetScores(){
    this.p1Game.totalScore = 0;
    this.p2Game.totalScore = 0;
  }
}
