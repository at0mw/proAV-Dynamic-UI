import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {
  currentDateTime: Date = new Date();
  uiInfoMenuActive: boolean = false;

  uiInfoMenuPressed(event: MouseEvent) {
    event?.stopPropagation();
    this.uiInfoMenuActive = true;
  }

  @HostListener('click', ['$event'])
  screenClick(event: MouseEvent) {
    const clickedDiv = event.target as HTMLElement;
    console.log("Screen Clicked", clickedDiv.classList);
    
    if (clickedDiv.classList.contains('ui-info-overlay')) {
      this.uiInfoMenuActive = false;      
    }
  }
}
