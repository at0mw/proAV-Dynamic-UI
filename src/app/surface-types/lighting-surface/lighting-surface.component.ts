import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MessageService, PresetConfig, ActionType } from '@proav/angular-lib';
import { AnalogJoins, DigitalJoins, StringJoins } from 'src/app/protocol/constants/constants.index';
import { environment } from 'src/app/protocol/environments/environment';
import { testPresetsConfig } from 'src/app/testing-values/testing.index';

declare var CrComLib: any;
@Component({
	selector: 'app-lighting-surface',
	templateUrl: './lighting-surface.component.html',
	styleUrls: [ './lighting-surface.component.scss' ]
})
export class LightingSurfaceComponent {
	@Input() colourInput: string = '#FF5733';
	brightnessSliderJoin: string = AnalogJoins.LightingBrightnessSlider;
	showRetirementVillage = false;
  deleteList: any;

	presets: PresetConfig[] = [];
	constructor(private messageService: MessageService) {
		if (!environment.production) {
			this.presets = testPresetsConfig.map((preset) => {
				return {
					id: preset.id,
					label: preset.label,
					icon: preset.icon
				};
			});
		}
	}

	ngOnInit() {
		console.log(`CrComLib :::: Subscribing ::: Serial :: Join : ${StringJoins.ShadePresetsConfig}`);
		CrComLib.subscribeState('s', StringJoins.ShadePresetsConfig, (value: string) =>
			this.updateLightingPresets(value)
		);

		console.log(`CrComLib :::: Subscribing ::: Serial :: Join : ${StringJoins.LightingColourInfo}`);
		CrComLib.subscribeState('s', StringJoins.LightingColourInfo, (value: string) =>
			this.updateLightingColour(value)
		);
	}

	updateLightingPresets(value: string) {
		if (!value) return;
		console.log(
			`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.LightingPresetsConfig} : Value ${value}`
		);
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
		console.log('New Colour: ', this.colourInput);
	}

	updateLightingColour(value: string) {
		if (!value) return;
		console.log(
			`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.LightingColourInfo} : Value ${value}`
		);

		this.colourInput = value;
	}

	getGridRowPreset(index: number): string {
		return (1 + index).toString() + '/ span 1';
	}

	presetTriggered(presetId: number) {
		this.sendPresetUpdate(presetId, ActionType.Press);
	}

	handleTouchEvents(event: Event) {
		console.log('Child component - Touch Start');
		event.stopPropagation();
	}

	drop(event: CdkDragDrop<PresetConfig[]>): void {
		if (event.previousContainer === event.container) {
			const movedPresetId = event.item.data;
			moveItemInArray(this.presets, event.previousIndex, event.currentIndex);
			// console.log(`Rearranged List Item ${movedPresetId}: Last Index ${event.previousIndex} New Index ${event.currentIndex}`);
			this.sendPresetReorderUpdate(movedPresetId, event.currentIndex);
		} else {
      console.log("Let go in a different area??")
			// Implement logic for moving items between different containers if needed.
		}
	}

	sendPresetUpdate(presetId: number, actionType: ActionType) {
		console.log('Action Type: ', ActionType.Delete);
		console.log('Action Type: ', ActionType.Reorder);
		console.log('Action Type: ', ActionType.Release);
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

	// deletePreset(event: CdkDragDrop<any[]>): void {
  //   console.log("Preset Deleted?");
	// 	const presetToDelete = event.item.data;
	// 	console.log('-----------------//Delete Preset', presetToDelete);
	// 	// Implement your delete logic here
	// 	// Remove the presetToDelete from the presets array or perform any other necessary actions
	// }
}
