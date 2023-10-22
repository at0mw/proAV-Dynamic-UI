import { Component } from '@angular/core';

@Component({
	selector: 'app-dynamic-module-grid',
	templateUrl: './dynamic-module-grid.component.html',
	styleUrls: [ './dynamic-module-grid.component.scss' ]
})
export class DynamicModuleGridComponent {
	gridConfig: any[] = [
		{
			moduletype: 'text-display',
			row: {
				position: 2,
				span: 1
			},
			column: {
				position: 5,
				span: 3
			},
			elementId: 1
		},
		{
			moduletype: 'dpad',
			row: {
				position: 2,
				span: 2
			},
			column: {
				position: 8,
				span: 2
			}
		},
		{
			moduletype: 'slider',
			row: {
				position: 7,
				span: 3
			},
			column: {
				position: 2,
				span: 3
			},
			elementId: 2
		},
		{
			moduletype: 'slider',
			row: {
				position: 6,
				span: 3
			},
			column: {
				position: 2,
				span: 3
			}
		},
		{
			moduletype: 'slider',
			row: {
				position: 5,
				span: 3
			},
			column: {
				position: 2,
				span: 3
			}
		},
		{
			moduletype: 'keypad',
			row: {
				position: 3,
				span: 5
			},
			column: {
				position: 5,
				span: 3
			}
		},
		{
			moduletype: 'dpad',
			row: {
				position: 2,
				span: 2
			},
			column: {
				position: 10,
				span: 2
			}
		},
		{
			moduletype: 'slider',
			row: {
				position: 5,
				span: 3
			},
			column: {
				position: 8,
				span: 4
			},
			initialValue: 50
		}
	];
}
