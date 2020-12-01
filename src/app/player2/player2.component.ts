import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-player2',
  templateUrl: './player2.component.html'
})

export class Player2Component {

  @Input() totalScore2: number;
  @Input() user2turn: boolean;
  @Input() user2GamesWon: number;

  die2Number: number;
   
  @Output() user2turnChange = new EventEmitter<boolean>();
  @Output('player2Sticked') player2StickedEventEmitter : EventEmitter<number> = new EventEmitter<number>();


  handleRollDiceButtonClick2(): void{
    //Random die number between 1 and 6
    const randomDieNo: number = Math.floor((Math.random()*6) + 1);
    this.die2Number = randomDieNo;
    this.totalScore2 += randomDieNo;
  }

  handleStickButtonClick2(): void{
    this.die2Number = null;
    this.user2turn = false;
    this.user2turnChange.emit(this.user2turn);
    //Send totalScore2 back up to the parent to compare with totalScore1
    this.player2StickedEventEmitter.emit(this.totalScore2);
    
  }
}
