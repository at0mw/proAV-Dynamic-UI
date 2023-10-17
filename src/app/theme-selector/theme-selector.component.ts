import { Component, Renderer2 } from '@angular/core';
import { ProavThemesService } from '@proav/angular-lib';

@Component({
	selector: 'app-theme-selector',
	templateUrl: './theme-selector.component.html',
	styleUrls: [ './theme-selector.component.scss' ]
})
export class ThemeSelectorComponent {
	constructor(private themeService: ProavThemesService) {}
	themeWheelVisible = false;

	toggleThemeWheel() {
		this.themeWheelVisible = !this.themeWheelVisible;
	}

	selectTheme(selectedTheme: string) {
		console.log(`Selected theme: ${selectedTheme}`);
    
		this.themeService.setTheme(selectedTheme);

		this.themeWheelVisible = false;
	}
}
