import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-player2',
  templateUrl: './player2.component.html'
})
export class Player2Component {

  totalScore2: number;
  die2Number: number;
  user2GamesWon: number;
  player2Game: Game;

  @Input() user2turn: boolean;

  @Output('player2Sticked') player2StickedEventEmitter : EventEmitter<number> = new EventEmitter<number>();

constructor(private gameService: GameService) {
  this.gameService = gameService;
  this.player2Game = this.gameService.getPlayer2Game();
  this.totalScore2 = this.player2Game.totalScore;
  this.user2GamesWon = this.player2Game.GamesWon;
  this.user2turn = this.player2Game.Turn;
}

  handleRollDiceButtonClick2(): void{
//Random die number between 1 and 6
const randomDieNo: number = Math.floor((Math.random()*6) + 1);
this.die2Number = randomDieNo;
console.log(randomDieNo);

this.totalScore2 = this.totalScore2 + randomDieNo;
  }

  handleStickButtonClick2(): void{
    this.die2Number = null;
    this.user2turn = false;
    //Send totalScore2 back up to the parent to compare with totalScore1
    this.player2StickedEventEmitter.emit(this.totalScore2);
  //  this.gameService.player2Sticked(this.totalScore2);
  //  this.gameService.compareScores();
  }
}
