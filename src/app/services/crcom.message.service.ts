import { Injectable } from '@angular/core';
import { MessageService } from '@proav/angular-lib';
import { JsonCodecService } from './json.codec.service';
declare var CrComLib: any;

@Injectable({
  providedIn: 'root',
})
export class CrComMessageService {
  private messageCodec: JsonCodecService;

  constructor(proavMessageCore: MessageService, messageCodec: JsonCodecService) {
    this.messageCodec = messageCodec;
    CrComLib.subscribeState('s', "1", (value: string) => this.receiveJsonMessage(value));

    CrComLib.subscribeState('s', "2", (value: string) => {
      console.log("It moved");
      if (value) {
        console.log("Here with Value \"2\"", value);
      }
    });
  }

  sendActionMessage(actionJoinId: string): void {
    console.log(`CrComLib :::: Publish :: Action : Join Id ${actionJoinId}`);
    CrComLib.publishEvent('b', actionJoinId, true);
    CrComLib.publishEvent('b', actionJoinId, false);
  }

  sendAnalogMessage(analogJoinId: string, value: number): void {
    console.log(`CrComLib :::: Publish ::: Analog :: Join Id ${analogJoinId} : Value ${value}`);
    CrComLib.publishEvent('n', analogJoinId, value);
  }

  sendDigitalMessage(digitalJoinId: string, state: boolean): void {
    console.log(`CrComLib :::: Publish ::: Digital :: Join Id ${digitalJoinId} : State ${state}`);
    CrComLib.publishEvent('b', digitalJoinId, state);
  }

  sendStringMessage(stringJoinId: string, value: string): void {
    console.log(`CrComLib :::: Publish ::: String :: Join Id ${stringJoinId} : Value ${value}`);
    CrComLib.publishEvent('s', stringJoinId, value);
  }

  receiveJsonMessage(message: string): void {
    this.messageCodec.validateMessage(message);
  }
}
