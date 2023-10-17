import { Component, ElementRef, Renderer2, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isNavBarExpanded = false;

  toggleNavBar() {
    this.isNavBarExpanded = !this.isNavBarExpanded;
  }
}
