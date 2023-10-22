import { Component, Input } from '@angular/core';
import { DeviceConfig } from '@proav/angular-lib';
import { PageManagerService } from '../services/page-manager.service';

@Component({
  selector: 'app-tile-device',
  templateUrl: './tile-device.component.html',
  styleUrls: ['./tile-device.component.scss']
})
export class TileDeviceComponent {
  @Input() DeviceInfo?: DeviceConfig;
  deviceId: string = "";

  constructor(private pageService: PageManagerService) {
    if(this.DeviceInfo){
      this.deviceId = this.DeviceInfo.deviceid
    }
  }

  tilePress(deviceId: string) : void {
    console.log(`Setting Subpage ::: Device :: Id : ${deviceId}`)
    this.pageService.setPage(deviceId);
  }
}
