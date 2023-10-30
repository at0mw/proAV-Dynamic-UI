import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContentGridComponent } from './content-grid/content-grid.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { DisconnectOverlayComponent } from './disconnect-overlay/disconnect-overlay.component';

import { WebXPanelService } from "./services/web.xpanel.service";
import { ConnStatComponent } from './conn-stat/conn-stat.component';
import { DynamicModuleFlexComponent } from './dynamic-module-flex/dynamic-module-flex.component';
import { NgxProAVLibModule } from '@proav/angular-lib';
import { DynamicModuleGridComponent } from './dynamic-module-grid/dynamic-module-grid.component';
import { DevicePageComponent } from './pages/device-page/device-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TileDeviceComponent } from './tile-device/tile-device.component';
import { DevicesGridPageComponent } from './pages/devices-grid-page/devices-grid-page.component';

import { SurfaceCollectionComponent } from './core-view/surface-collection/surface-collection.component';
import { HeaderBarComponent } from './core-view/header-bar/header-bar.component';
import { ControlBarComponent } from './core-view/control-bar/control-bar.component';
import { MainContentViewComponent } from './core-view/main-content-view/main-content-view.component';
import { ConnectionOverlayComponent } from './core-view/connection-overlay/connection-overlay.component';

const webXPanelFactory = (webService: WebXPanelService) => () => {
  webService.initializeWebXPanel();
} 

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContentGridComponent,
    MainContentComponent,
    ThemeSelectorComponent,
    DisconnectOverlayComponent,
    ConnStatComponent,
    DynamicModuleFlexComponent,
    DynamicModuleGridComponent,
    DevicePageComponent,
    HomePageComponent,
    TileDeviceComponent,
    DevicesGridPageComponent,
		SurfaceCollectionComponent,
		HeaderBarComponent,
		ControlBarComponent,
		MainContentViewComponent,
		ConnectionOverlayComponent
  ],
  imports: [
    BrowserModule,    
    NgxProAVLibModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: webXPanelFactory, multi: true, deps: [WebXPanelService] },
    {provide: APP_BASE_HREF, useValue: './proav-ui/'}
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
