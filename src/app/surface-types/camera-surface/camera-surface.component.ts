import { Component } from '@angular/core';
import { 
  CdkDragDrop, 
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList, } from '@angular/cdk/drag-drop';
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
  
	showRetirementVillage = false;
  animateRetirement = false;

  
  cameraOptions: PresetConfig[] = [];
  presets: PresetConfig[] = [];

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
    this.sendPresetUpdate(presetId, ActionType.Press);
  }

  cameraOptionTriggered(cameraId: number) {
    this.sendOptionsUpdate(cameraId, ActionType.Press);
  }
  
  drop(event: CdkDragDrop<PresetConfig[]>): void {
		if (event.previousContainer === event.container) {
			const movedPresetId = event.item.data;
			moveItemInArray(this.presets, event.previousIndex, event.currentIndex);

			this.sendPresetReorderUpdate(movedPresetId, event.currentIndex);
		} else {
			const movedPresetId = event.item.data;
			console.log('Let Delete Preset: ',movedPresetId);
      		this.presets = this.presets.filter(preset => preset.id !== movedPresetId);
      		this.sendPresetUpdate(movedPresetId, ActionType.Delete);
		}
	}

  animateArea(animate: boolean) {
    if(this.showRetirementVillage && animate) {
      this.animateRetirement = true;
    } else {
      this.animateRetirement = false;
    }
  }

  sendOptionsUpdate(presetId: number, actionType: ActionType) {
		let jsonMessage = {
			id: presetId,
			action: actionType
		};
		const jsonMessageString = JSON.stringify(jsonMessage);
		this.messageService.sendStringMessage(StringJoins.CameraOptionsUpdate, jsonMessageString);
	}

  sendPresetUpdate(presetId: number, actionType: ActionType) {
		let jsonMessage = {
			id: presetId,
			action: actionType
		};
		const jsonMessageString = JSON.stringify(jsonMessage);
		this.messageService.sendStringMessage(StringJoins.CameraPresetsUpdate, jsonMessageString);
	}

	sendPresetReorderUpdate(presetId: number, newIndex: number) {
		let jsonMessage = {
			id: presetId,
			action: ActionType.Reorder,
			newindex: newIndex
		};
		console.log('Object', jsonMessage);
		const jsonMessageString = JSON.stringify(jsonMessage);
		console.log('Json', jsonMessageString);
		this.messageService.sendStringMessage(StringJoins.LightingPresetUpdate, jsonMessageString);
	}
}
