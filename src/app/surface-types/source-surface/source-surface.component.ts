import { Component, HostListener } from '@angular/core';
import { MessageService } from '@proav/angular-lib';
import { DigitalJoins } from 'src/app/protocol/constants/digital-joins';

@Component({
  selector: 'app-source-surface',
  templateUrl: './source-surface.component.html',
  styleUrls: ['./source-surface.component.scss']
})
export class SourceSurfaceComponent {
  constructor(private messageService: MessageService) {}

  hdmiPressed() {
    this.messageService.sendActionMessage(DigitalJoins.HdmiSource);
  }

  airMediaPressed() {
    this.messageService.sendActionMessage(DigitalJoins.AirMediaSource);
  }

}
