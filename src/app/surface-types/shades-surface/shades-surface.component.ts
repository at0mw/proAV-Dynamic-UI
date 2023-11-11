import { Component } from '@angular/core';
import { 
  CdkDragDrop, 
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList, } from '@angular/cdk/drag-drop';
import { MessageService, SliderConfig, PresetConfig, ActionType } from '@proav/angular-lib';
import { DigitalJoins, StringJoins } from 'src/app/protocol/constants/constants.index';
import { environment } from 'src/app/protocol/environments/environment';
import { testSlidersConfig, testPresetsConfig } from 'src/app/testing-values/testing.index';

declare var CrComLib: any;
@Component({
  selector: 'app-shades-surface',
  templateUrl: './shades-surface.component.html',
  styleUrls: ['./shades-surface.component.scss']
})
export class ShadesSurfaceComponent {
  shadeSlidersUpdate: string = StringJoins.ShadeSlidersUpdate
	showRetirementVillage = false;
  animateRetirement = false;

  constructor(private messageService: MessageService) {
    if(!environment.production) {
      this.sliders = testSlidersConfig.map(slider => {
        return {
          id: slider.id,
          label: slider.label,
          value: slider.value
        };
      });

      this.presets = testPresetsConfig.map(preset => {
        return {
          id: preset.id,
          label: preset.label,
          icon: preset.icon
        };
      });
    }
  }


  ngOnInit() {
    console.log(`CrComLib :::: Subscribing ::: Serial :: Join : ${StringJoins.ShadeSlidersConfig}`);
    CrComLib.subscribeState('s', StringJoins.ShadeSlidersConfig, (value: string) => this.updateShadeSliders(value));
    console.log(`CrComLib :::: Subscribing ::: Serial :: Join : ${StringJoins.ShadePresetsConfig}`);
    CrComLib.subscribeState('s', StringJoins.ShadePresetsConfig, (value: string) => this.updateShadePresets(value));
    // console.log(`CrComLib :::: Subscribing ::: Serial :: Join : ${StringJoins.ShadeSlidersUpdate}`);
    // CrComLib.subscribeState('s', StringJoins.ShadePresetsConfig, (value: string) => this.updateShadeValue(value));
  }

  sliders: SliderConfig[] = [];
  presets: PresetConfig[] = [];

  updateShadeSliders(value: string) {
    if(!value) return;
    console.log(`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.ShadeSlidersConfig} : Value ${value}`);
    
    try {
      const data = JSON.parse(value);
      if (data && Array.isArray(data)) {
        if(!this.sliders) {
          console.log("First Creation of Sliders");
          this.sliders = data as SliderConfig[];
        } else {
          data.forEach(updatedSlider => {
            const existingSlider = this.sliders?.find(slider => slider.id === updatedSlider.id);
            if (existingSlider) {
              // Update the existing slider's value
              existingSlider.value = updatedSlider.value;
            }
          });
        }
      } else {
        console.error('Invalid JSON structure: surfaces property is missing or not an array.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  updateShadePresets(value: string) {;
    if(!value) return;
    console.log(`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.ShadePresetsConfig} : Value ${value}`);
    
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

  animateArea(animate: boolean) {
    if(this.showRetirementVillage && animate) {
      this.animateRetirement = true;
    } else {
      this.animateRetirement = false;
    }
  }


  allOpen() {
    this.messageService.sendActionMessage(DigitalJoins.ShadesAllOpen);
  }

  allClose() {
    this.messageService.sendActionMessage(DigitalJoins.ShadesAllClose);
  }

  createPreset() {

  }
  
  getGridColumnSlider(index: number): string {
    return (1 + index).toString() + '/ span 1';
  }

  getGridRowPreset(index: number): string {
    return (1 + index).toString() + '/ span 1';
  }

  presetTriggered(presetId: number) {
    this.sendPresetUpdate(presetId, ActionType.Press);
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

  sendPresetUpdate(presetId: number, actionType: ActionType) {
		let jsonMessage = {
			id: presetId,
			action: actionType
		};
		const jsonMessageString = JSON.stringify(jsonMessage);
		this.messageService.sendStringMessage(StringJoins.LightingPresetUpdate, jsonMessageString);
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
