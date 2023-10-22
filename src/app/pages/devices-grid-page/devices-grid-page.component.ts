import { Component } from '@angular/core';
import { DeviceConfig } from '@proav/angular-lib';
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
}
