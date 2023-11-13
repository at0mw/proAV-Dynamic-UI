import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ActionType, MessageService, PresetConfig } from '@proav/angular-lib';
import { environment } from 'src/app/protocol/environments/environment';
import { testPresetsConfig } from 'src/app/testing-values/test-presets-msg';

@Component({
	selector: 'app-matrix-surface',
	templateUrl: './matrix-surface.component.html',
	styleUrls: [ './matrix-surface.component.scss' ]
})
export class MatrixSurfaceComponent {
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
}
