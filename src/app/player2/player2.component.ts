import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-player2',
  templateUrl: './player2.component.html'
})

export class Player2Component {

  @Input() totalScore2: number;
  @Input() user2turn: boolean;
  @Input() user2GamesWon: number;

  @Input() die2Number: number;
  private localTotalScore: number;

   
  @Output() user2turnChange = new EventEmitter<boolean>();
  @Output() totalScore2Change = new EventEmitter<number>();
  @Output('player2Sticked') player2StickedEventEmitter : EventEmitter<number> = new EventEmitter<number>();
  @Output('player2GoneOver') player2GoneOverEmitter : EventEmitter<number> = new EventEmitter<number>();

  handleRollDiceButtonClick2(): void{
    //Random die number between 1 and 6

    const randomDieNo: number = Math.floor((Math.random()*6) + 1);
    this.die2Number = randomDieNo;

    this.localTotalScore = this.totalScore2;
    this.localTotalScore += randomDieNo;
   
    if(this.localTotalScore < 21){
      this.totalScore2Change.emit(this.localTotalScore);
    }else{
      this.player2GoneOverEmitter.emit(this.localTotalScore);
      this.die2Number = null;
    }
  }

  handleStickButtonClick2(): void{
    this.die2Number = null;
    
    this.user2turnChange.emit(this.user2turn);
    //Send totalScore2 back up to the parent to compare with totalScore1
    this.totalScore2Change.emit(this.totalScore2);
    this.player2StickedEventEmitter.emit(this.totalScore2);
  }
}
