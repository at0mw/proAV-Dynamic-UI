import { Component, ElementRef, Renderer2, ViewChild, HostListener   } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isNavBarExpanded = false;
  touchStartX: number = 0;
  
  @ViewChild('navbar') navbar!: ElementRef;

  toggleNavBar() {
    this.isNavBarExpanded = !this.isNavBarExpanded;
  }

  @HostListener('touchstart', ['$event'])
  onSwipeStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onSwipeMove(event: TouchEvent) {
    const touchEndX = event.touches[0].clientX;
    const swipeDistance = touchEndX - this.touchStartX;
    
    if (swipeDistance > 150) {
      this.isNavBarExpanded = true;
      this.touchStartX = touchEndX;
    } else if(swipeDistance < -150){
      this.isNavBarExpanded = false;
      this.touchStartX = touchEndX;
    }
  }
}
