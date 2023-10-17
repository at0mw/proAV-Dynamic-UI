import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContentGridComponent } from './content-grid/content-grid.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContentGridComponent,
    MainContentComponent,
    ThemeSelectorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
