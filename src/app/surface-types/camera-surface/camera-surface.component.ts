import { Component } from '@angular/core';
import { ActionType, MessageService, PresetConfig } from '@proav/angular-lib';
import { DigitalJoins } from 'src/app/protocol/constants/digital-joins';
import { StringJoins } from 'src/app/protocol/constants/string-joins';
import { environment } from 'src/app/protocol/environments/environment';
import { testCameraConfig } from 'src/app/testing-values/test-camera-msg';
import { testPresetsConfig } from 'src/app/testing-values/test-presets-msg';

declare var CrComLib: any;
@Component({
  selector: 'app-camera-surface',
  templateUrl: './camera-surface.component.html',
  styleUrls: ['./camera-surface.component.scss']
})
export class CameraSurfaceComponent {
  dpadUpJoin: string = DigitalJoins.CameraDpadUp;
  dpadDownJoin: string = DigitalJoins.CameraDpadDown;
  dpadLeftJoin: string = DigitalJoins.CameraDpadLeft;
  dpadRightJoin: string = DigitalJoins.CameraDpadRight;
  
  cameraOptions?: PresetConfig[];
  presets?: PresetConfig[];

  constructor(private messageService: MessageService) {
    if(!environment.production) {
      this.presets = testPresetsConfig.map(preset => {
        return {
          id: preset.id,
          label: preset.label,
          icon: preset.icon
        };
      });

      this.cameraOptions = testCameraConfig.map(preset => {
        return {
          id: preset.id,
          label: preset.label,
          icon: preset.icon
        };
      });
    }
  }

  
  ngOnInit() {
    console.log(`CrComLib :::: Subscribing ::: Serial :: Join : ${StringJoins.CameraOptionsConfig}`);
    CrComLib.subscribeState('s', StringJoins.CameraOptionsConfig, (value: string) => this.updateCameraOptions(value));

    console.log(`CrComLib :::: Subscribing ::: Serial :: Join : ${StringJoins.CameraPresetsConfig}`);
    CrComLib.subscribeState('s', StringJoins.CameraPresetsConfig, (value: string) => this.updateCameraPresets(value));
  }


  updateCameraOptions(value: string) {
    if(!value) return;
    console.log(`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.CameraOptionsConfig} : Value ${value}`);
    try {
      const data = JSON.parse(value);
      if (data && Array.isArray(data)) {
        this.cameraOptions = data as PresetConfig[];
      } else {
        console.error('Invalid JSON structure: surfaces property is missing or not an array.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  updateCameraPresets(value: string) {
    if(!value) return;
    console.log(`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.CameraPresetsConfig} : Value ${value}`);
    try {
      const data = JSON.parse(value);
      if (data && Array.isArray(data)) {
        this.presets = data as PresetConfig[];
      } else {
        console.error('Invalid JSON structure: surfaces property is missing or not an array.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  zoomInAction() {
    this.messageService.sendDigitalMessage(DigitalJoins.CameraZoomIn, true);
  }

  zoomOutAction() {
    this.messageService.sendDigitalMessage(DigitalJoins.CameraZoomOut, true);
  }

  stopAction() {
    this.messageService.sendDigitalMessage(DigitalJoins.CameraStop, true);
  }

  startAction() {
    this.messageService.sendDigitalMessage(DigitalJoins.CameraStart, true);
  }

  sleepAction() {
    this.messageService.sendDigitalMessage(DigitalJoins.CameraSleep, true);
  }

  wakeAction() {
    this.messageService.sendDigitalMessage(DigitalJoins.CameraWake, true);
  }

  getGridRowPreset(index: number): string {
    return (1 + index).toString() + '/ span 1';
  }

  presetTriggered(presetId: number) {
		let jsonSelectMessage = {
			id: presetId,
			action: ActionType.Press
		};
		const jsonSelectMessageString = JSON.stringify(jsonSelectMessage);
    this.messageService.sendStringMessage(StringJoins.LightingPresetUpdate, jsonSelectMessageString);
  }
}
