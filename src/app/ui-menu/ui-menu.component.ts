import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProavThemesService } from '@proav/angular-lib';

@Component({
  selector: 'app-ui-menu',
  templateUrl: './ui-menu.component.html',
  styleUrls: ['./ui-menu.component.scss'],
  animations: [
    trigger('dropdownAnimation', [
      state('open', style({ opacity: 1 })),
      state('closed', style({ opacity: 0, display: 'none' })),
      transition('open => closed', animate('300ms')),
      transition('closed => open', animate('300ms')),
    ]),
  ]
})
export class UiMenuComponent {
  uiInfoMenuActive: boolean = false;
  themesMenuActive: boolean = false;
  
  constructor(private el: ElementRef, private renderer: Renderer2, private themeService: ProavThemesService) {}
  ngOnInit() {
    this.renderer.listen('document', 'click', (event) => {
      if (!this.el.nativeElement.contains(event.target)) {
        this.closeMenu();
      }
    });
  }

  uiInfoMenuPressed(event: MouseEvent) {
    event?.stopPropagation();
    this.uiInfoMenuActive = !this.uiInfoMenuActive;
    this.themesMenuActive = false;
  }

  closeMenu() {
    this.uiInfoMenuActive = false;
    this.themesMenuActive = false;
  }

  triggerShowThemes() {
    console.log("Showing Themes...");
    this.themesMenuActive = true;
  }

  triggerShowNotifications() {
    console.log("Showing Notifications...");
    this.themesMenuActive = false;
  }

  triggerShowSystemInfo() {
    console.log("Showing System Info...");
    this.themesMenuActive = false;
  }

  changeTheme(theme: string) {
    this.themeService.setTheme(theme);
  }
}
