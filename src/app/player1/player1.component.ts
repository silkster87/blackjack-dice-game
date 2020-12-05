import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-player1',
  templateUrl: './player1.component.html'
})

export class Player1Component{

@Input() totalScore1: number;
@Input() user1GamesWon: number;
@Input() user1turn: boolean;

@Input() die1Number: number;
localTotalScore: number;

@Output() user1turnChange = new EventEmitter<boolean>();
@Output() totalScore1Change = new EventEmitter<number>();
@Output('player1Sticked') player1StickedEventEmitter : EventEmitter<number> = new EventEmitter<number>();
@Output('player1GoneOver') player1GoneOverEmitter : EventEmitter<number> = new EventEmitter<number>();


handleRollDiceButtonClick1(): void{
  //Random die number between 1 and 6
  const randomDieNo: number = Math.floor((Math.random()*6) + 1);
  this.die1Number = randomDieNo;

  this.localTotalScore = this.totalScore1;
  this.localTotalScore += randomDieNo
  if(this.localTotalScore < 21){
    this.totalScore1 += randomDieNo;
  }else if(this.localTotalScore >= 21){
    //P1 has gone over - will determine if won or lost
    this.die1Number = null;
    this.player1GoneOverEmitter.emit(this.localTotalScore);
    this.totalScore1Change.emit(this.totalScore1);
    this.totalScore1 = 0;
  }
  
}

handleStickButtonClick1(): void{
      this.die1Number = null;
      this.user1turn = false;
      this.user1turnChange.emit(this.user1turn);
      //Send totalScore1 back up to the parent to compare with totalScore2
      this.player1StickedEventEmitter.emit(this.totalScore1);
      this.totalScore1Change.emit(this.totalScore1);
}
}
