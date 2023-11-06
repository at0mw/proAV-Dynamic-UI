import { Component } from '@angular/core';
import { MessageService, PresetConfig, ActionType } from '@proav/angular-lib';
import { DigitalJoins, StringJoins } from 'src/app/protocol/constants/constants.index';
import { environment } from 'src/app/protocol/environments/environment';
import { testPresetsConfig } from 'src/app/testing-values/testing.index';

declare var CrComLib: any;
@Component({
  selector: 'app-lighting-surface',
  templateUrl: './lighting-surface.component.html',
  styleUrls: ['./lighting-surface.component.scss']
})
export class LightingSurfaceComponent {
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
    CrComLib.subscribeState('s', StringJoins.ShadePresetsConfig, (value: string) => this.updateLightingColour(value));
  }

  updateLightingPresets(value: string) {
    if(!value) return;
    console.log(`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.LightingPresetsConfig} : Value ${value}`);

  }

  updateLightingColour(value: string) {
    if(!value) return;
    console.log(`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.LightingColourInfo} : Value ${value}`);
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
