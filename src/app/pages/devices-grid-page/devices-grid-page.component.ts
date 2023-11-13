import { Component } from '@angular/core';
import { DeviceConfig, MessageService, MessageType, MessageBase, AvailableDevices } from '@proav/angular-lib';
import { testDevices } from 'src/app/testing-values/test-devices-msg';

@Component({
  selector: 'app-devices-grid-page',
  templateUrl: './devices-grid-page.component.html',
  styleUrls: ['./devices-grid-page.component.scss']
})
export class DevicesGridPageComponent {
  deviceInfo: DeviceConfig[] = testDevices.devices.map(device => {
    return {
        deviceid: device.deviceid,
        devicelabel: device.devicelabel,
        deviceicon: device.deviceicon,
        devicesecondarylabel: device.devicesecondarylabel
    };
  });

  constructor(messageService : MessageService) {    
   // messageService.subscribeToMessageByID(MessageType.AvailableDevices).subscribe((message: MessageBase) => this.receivedMessageUpdate(message));
  }

  receivedMessageUpdate(message: MessageBase) {
    console.log("Received Message Update in Devices Grid...");
    if(message.messagetype === MessageType.AvailableDevices){
      let availableDevicesMessage = message as AvailableDevices;
      console.log("Available Devices Message: ",availableDevicesMessage);
      this.deviceInfo = availableDevicesMessage.devices;
      console.log("Device Info: ", this.deviceInfo);
    }
  }
}
