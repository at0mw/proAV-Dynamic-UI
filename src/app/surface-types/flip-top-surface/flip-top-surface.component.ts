import { Component, HostListener } from '@angular/core';
import { MessageService } from '@proav/angular-lib';
import { DigitalJoins } from 'src/app/protocol/constants/digital-joins';

@Component({
  selector: 'app-flip-top-surface',
  templateUrl: './flip-top-surface.component.html',
  styleUrls: ['./flip-top-surface.component.scss']
})
export class FlipTopSurfaceComponent {
  buttonOne : boolean = false;
  buttonTwo : boolean = false;
  buttonThree : boolean = false;
  constructor(private messageService: MessageService) {}

  /*
  * Handle Retract Button Pressed
  */
  retractButtonOnePressed() {
    this.buttonOne = true;
    this.messageService.sendDigitalMessage(DigitalJoins.FlipTopsRetract1, true);
  }

  retractButtonTwoPressed() {
    this.buttonTwo = true;
    this.messageService.sendDigitalMessage(DigitalJoins.FlipTopsRetract2, true);
  }

  retractButtonThreePressed() {
    this.buttonThree = true;
    this.messageService.sendDigitalMessage(DigitalJoins.FlipTopsRetract3, true);
  }

  /*
  * Handle Retract Button Release
  */
  retractButtonOneReleased() {
    if(this.buttonOne) {
      this.buttonOne = false;
      this.messageService.sendDigitalMessage(DigitalJoins.FlipTopsRetract1, false);
    }    
  }

  retractButtonTwoReleased() {
    if(this.buttonTwo) {
      this.buttonTwo = false;
      this.messageService.sendDigitalMessage(DigitalJoins.FlipTopsRetract2, false);
    }    
  }

  retractButtonThreeReleased() {
    if(this.buttonThree) {
      this.buttonThree = false;
      this.messageService.sendDigitalMessage(DigitalJoins.FlipTopsRetract3, false);
    }    
  }
}
