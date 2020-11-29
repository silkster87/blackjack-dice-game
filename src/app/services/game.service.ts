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
  }

  player2Sticked(score: number){
    this.p2Game.totalScore = score;
  }

  compareScores(){
    if(this.p1Game.totalScore > this.p2Game.totalScore){
      //Player 1 wins
      this.p1Game.GamesWon +=1;
      this.p1Game.totalScore = 0;
      this.p1Game.Turn = true;
      this.p2Game.Turn = false;
    }else if(this.p2Game.totalScore > this.p1Game.totalScore){
      //Player 2 wins
      this.p2Game.GamesWon +=1;
      this.p2Game.totalScore = 0;
      this.p2Game.Turn = true;
      this.p1Game.Turn = false;
    }else if(this.p1Game.totalScore == this.p2Game.totalScore){
      alert("Draw!");
    }
  }
}
