import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
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
  }

  closeMenu() {
    this.uiInfoMenuActive = false;
  }
}
