import { Component } from '@angular/core';
import { MessageService } from '@proav/angular-lib';
import { AnalogJoins } from 'src/app/protocol/constants/analog-joins';
import { DigitalJoins } from 'src/app/protocol/constants/digital-joins';

@Component({
	selector: 'app-control-bar',
	templateUrl: './control-bar.component.html',
	styleUrls: [ './control-bar.component.scss' ]
})
export class ControlBarComponent {
	volumeSliderJoin: string = AnalogJoins.VolumeControl;
	constructor(private messageService: MessageService) {}

	micMuteState: boolean = false;

	volumeMuteState: boolean = false;

	/*
  *   Handle Mics
  */
	micMutePressed() {
		this.micMuteState = !this.micMuteState;
		this.messageService.sendDigitalMessage(DigitalJoins.MicMute, this.micMuteState);
	}

	micsMenuPressed() {
		this.messageService.sendActionMessage(DigitalJoins.MicsMore);
	}

	/*
  *   Handle Volume
  */
  volumeMutePressed() {
    this.volumeMuteState = !this.volumeMuteState;
		this.messageService.sendDigitalMessage(DigitalJoins.VolumeMute, this.volumeMuteState);
  }

  volumeMenuPressed() {
		this.messageService.sendActionMessage(DigitalJoins.VolumeMore);
	}

  volumeUpPressed() {
		this.messageService.sendDigitalMessage(DigitalJoins.VolumeUp, true);
  }

  volumeUpReleased() {
		this.messageService.sendDigitalMessage(DigitalJoins.VolumeUp, false);
  }

  volumeDownPressed() {
		this.messageService.sendDigitalMessage(DigitalJoins.VolumeDown, true);
  }

  volumeDownReleased() {
		this.messageService.sendDigitalMessage(DigitalJoins.VolumeDown, false);    
  }
}
