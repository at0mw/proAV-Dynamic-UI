import { Component, HostListener } from '@angular/core';
import { MessageService } from '@proav/angular-lib';
import { DigitalJoins } from 'src/app/protocol/constants/digital-joins';

@Component({
  selector: 'app-source-surface',
  templateUrl: './source-surface.component.html',
  styleUrls: ['./source-surface.component.scss']
})
export class SourceSurfaceComponent {
  // hdmiPressed : boolean = false;
  // airMediaPressed : boolean = false;
  // // Two Concurrent Timers for now (lot of hardcoding, just trial)
  // private hdmiPulseTimer: any;
  // private airMediaPulseTimer: any;

  constructor(private messageService: MessageService) {}

  // startPulse(button: string, event: Event) {
  //   event.stopPropagation();
  //   switch(button){
  //     case 'hdmi':
  //       // this.hdmiPressed = false;
  //       clearTimeout(this.hdmiPulseTimer);
  //       this.hdmiPressed = true;
  //       break;
  //     case 'air-media':
  //       // this.airMediaPressed = false;
  //       clearTimeout(this.airMediaPulseTimer);
  //       this.airMediaPressed = true;
  //       break;
  //   }
  // }

  // stopPulse(button: string) {
  //   console.log("Stopping");
  //   switch(button){
  //     case 'hdmi':
  //       this.hdmiPressed = false;
  //       break;
  //     case 'air-media':
  //       this.airMediaPressed = false;
  //       break;
  //   }
  // }

  // triggerButton(button: string, event: Event) {
  //   event.stopPropagation();
  //   console.log("Triggered");
  //   switch(button) {
  //     case 'hdmi':        
  //       this.hdmiPulseTimer = setTimeout(() => {
  //         this.stopPulse(button);
  //       }, 1500);
  //       this.messageService.sendActionMessage(DigitalJoins.HdmiSource);	
  //       break;
  //     case 'air-media':
  //       this.airMediaPulseTimer = setTimeout(() => {
  //         this.stopPulse(button);
  //       }, 1500);
  //       this.messageService.sendActionMessage(DigitalJoins.AirMediaSource);	
  //       break;
  //   }
  // }

  
  // @HostListener('window:touchend', ['$event'])
  // @HostListener('window:mouseup', ['$event'])
  // onMouseUp(event: MouseEvent) {
  //   // Check if the animation is active and the mouseup occurred outside the button
  //   if (this.hdmiPressed) {
  //     this.hdmiPulseTimer = setTimeout(() => {
  //       this.stopPulse('hdmi');
  //     }, 1500);
  //   }

  //   if (this.airMediaPressed) {
  //     this.airMediaPulseTimer = setTimeout(() => {
  //       this.stopPulse('air-media');
  //     }, 1500);
  //   }
  // }
}
