import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { DisconnectOverlayComponent } from './disconnect-overlay/disconnect-overlay.component';

import { WebXPanelService } from './services/web.xpanel.service';
import { NgxProAVLibModule } from '@proav/angular-lib';
import { DynamicModuleGridComponent } from './dynamic-module-grid/dynamic-module-grid.component';

import { SurfaceCollectionComponent } from './core-view/surface-collection/surface-collection.component';
import { HeaderBarComponent } from './core-view/header-bar/header-bar.component';
import { ControlBarComponent } from './core-view/control-bar/control-bar.component';
import { MainContentViewComponent } from './core-view/main-content-view/main-content-view.component';
import { ConnectionOverlayComponent } from './core-view/connection-overlay/connection-overlay.component';
import { SourceSurfaceComponent } from './surface-types/source-surface/source-surface.component';
import { FlipTopSurfaceComponent } from './surface-types/flip-top-surface/flip-top-surface.component';
import { UiInfoOverlayComponent } from './ui-info-overlay/ui-info-overlay.component';

const webXPanelFactory = (webService: WebXPanelService) => () => {
	webService.initializeWebXPanel();
};

@NgModule({
	declarations: [
		AppComponent,
		ThemeSelectorComponent,
		DisconnectOverlayComponent,
		DynamicModuleGridComponent,
		SurfaceCollectionComponent,
		HeaderBarComponent,
		ControlBarComponent,
		MainContentViewComponent,
		ConnectionOverlayComponent,
		SourceSurfaceComponent,
		FlipTopSurfaceComponent,
		UiInfoOverlayComponent
	],
	imports: [ BrowserModule, NgxProAVLibModule ],
	providers: [
		{ provide: APP_INITIALIZER, useFactory: webXPanelFactory, multi: true, deps: [ WebXPanelService ] },
		{ provide: APP_BASE_HREF, useValue: './proav-ui/' }
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
