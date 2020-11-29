import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-player1',
  templateUrl: './player1.component.html'
})

export class Player1Component{

totalScore1: number;
die1Number: number;
user1GamesWon: number;
player1Game: Game;

@Input() user1turn: boolean;

@Output('player1Sticked') player1StickedEventEmitter : EventEmitter<number> = new EventEmitter<number>();

constructor(private gameService: GameService){
  this.gameService = gameService;
  this.player1Game = this.gameService.getPlayer1Game();
  this.totalScore1 = this.player1Game.totalScore;
  this.user1GamesWon = this.player1Game.GamesWon;
  this.user1turn = this.player1Game.Turn;
}

handleRollDiceButtonClick1(): void{
  //Random die number between 1 and 6
  const randomDieNo: number = Math.floor((Math.random()*6) + 1);
  this.die1Number = randomDieNo;
  console.log(randomDieNo);
  this.totalScore1 = this.totalScore1 + randomDieNo;
}

handleStickButtonClick1(): void{
//Will eventually need to work out if other player beat the other one from total score
      //Reset the die back to zero
      this.die1Number = null;
      this.user1turn = false;
      //Send totalScore1 back up to the parent to compare with totalScore2
      this.player1StickedEventEmitter.emit(this.totalScore1);
    //  this.gameService.player1Sticked(this.totalScore1);

}
}
