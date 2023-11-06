import { Component } from '@angular/core';
import { MessageService } from '@proav/angular-lib';
import { AnalogJoins, DigitalJoins, StringJoins } from 'src/app/protocol/constants/constants.index';
import { AirMediaConfig } from 'src/app/protocol/interfaces/air-media.info';

declare var CrComLib: any;
@Component({
  selector: 'app-air-media-surface',
  templateUrl: './air-media-surface.component.html',
  styleUrls: ['./air-media-surface.component.scss']
})
export class AirMediaSurfaceComponent {
  ipAddress: string = "0.0.0.0";
  accessCode: string = "0000";
  userCount: number = 0;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    console.log(`CrComLib :::: Subscribing ::: Analog :: Join : ${AnalogJoins.AirMediaUserUpdate}`);
    CrComLib.subscribeState('n', AnalogJoins.AirMediaUserUpdate, (value: number) => this.updateUserCount(value));

    console.log(`CrComLib :::: Subscribing ::: Serial :: Join : ${StringJoins.AirMediaInfoUpdate}`);
    CrComLib.subscribeState('s', StringJoins.AirMediaInfoUpdate, (value: string) => this.updateAirMediaInfo(value));
  }
  
  updateUserCount(value: number) {
    if(!value) return;

    console.log(`CrComLib :::: Received Update ::: Serial :: Join ${AnalogJoins.AirMediaUserUpdate} : Value ${value}`);
    this.userCount = value;
  }

  updateAirMediaInfo(value: string) {
    if(!value) return;
    console.log(`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.AirMediaInfoUpdate} : Value ${value}`);

    try {
      const data = JSON.parse(value);
      if (data) {
        let infoConfig = data as AirMediaConfig;
        if(infoConfig) {
          this.ipAddress = infoConfig.ipaddress;
          this.accessCode = infoConfig.code;
        }
      } else {
        console.error('Invalid JSON structure: surfaces property is missing or not an array.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  disconnectAllUsers() {
    this.messageService.sendActionMessage(DigitalJoins.AirMediaDisconnectUsers);
  }
}
