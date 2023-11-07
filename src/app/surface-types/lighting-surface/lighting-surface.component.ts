import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MessageService, PresetConfig, ActionType } from '@proav/angular-lib';
import { AnalogJoins, DigitalJoins, StringJoins } from 'src/app/protocol/constants/constants.index';
import { environment } from 'src/app/protocol/environments/environment';
import { testPresetsConfig } from 'src/app/testing-values/testing.index';

declare var CrComLib: any;
@Component({
  selector: 'app-lighting-surface',
  templateUrl: './lighting-surface.component.html',
  styleUrls: ['./lighting-surface.component.scss']
})
export class LightingSurfaceComponent {
  @Input() colourInput: string = "#FF5733";
  brightnessSliderJoin: string = AnalogJoins.LightingBrightnessSlider;
  presets?: PresetConfig[];
  constructor(private messageService: MessageService) {
    if(!environment.production) {
      this.presets = testPresetsConfig.map(preset => {
        return {
          id: preset.id,
          label: preset.label,
          icon: preset.icon,
          order: preset.order
        };
      });
    }
  }

  ngOnInit() {
    console.log(`CrComLib :::: Subscribing ::: Serial :: Join : ${StringJoins.ShadePresetsConfig}`);
    CrComLib.subscribeState('s', StringJoins.ShadePresetsConfig, (value: string) => this.updateLightingPresets(value));

    console.log(`CrComLib :::: Subscribing ::: Serial :: Join : ${StringJoins.LightingColourInfo}`);
    CrComLib.subscribeState('s', StringJoins.LightingColourInfo, (value: string) => this.updateLightingColour(value));
  }

  updateLightingPresets(value: string) {
    if(!value) return;
    console.log(`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.LightingPresetsConfig} : Value ${value}`);
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

  handleUpdateColourVisuals(event: Event) {
    console.log("New Colour: ", this.colourInput);
	}

  updateLightingColour(value: string) {
    if(!value) return;
    console.log(`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.LightingColourInfo} : Value ${value}`);

    this.colourInput = value;
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

  handleTouchEvents(event: Event) {
    console.log('Child component - Touch Start');
    event.stopPropagation();
  }
}
