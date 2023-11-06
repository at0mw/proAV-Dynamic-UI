import { Component, HostListener } from '@angular/core';
import { SurfaceConfig } from 'src/app/protocol/interfaces/interface.index';
import { SurfaceType } from 'src/app/protocol/enums/enum.index';
import { StringJoins } from 'src/app/protocol/constants/string-joins';
import { environment } from 'src/app/protocol/environments/environment';
import { testSurfaceConfig } from 'src/app/testing-values/test-surfaces-msg';

declare var CrComLib: any;

@Component({
  selector: 'app-surface-collection',
  templateUrl: './surface-collection.component.html',
  styleUrls: ['./surface-collection.component.scss']
})
export class SurfaceCollectionComponent {
  constructor() {
    if (!environment.production) {
      this.surfaces = testSurfaceConfig.surfaces.map(surface => {
        return {
          id: surface.id,
          name: surface.name,
          icon: surface.icon
        };
      });
    }
  }
  SurfaceType = SurfaceType;
  surfaces?: SurfaceConfig[] | null;
  touchStartX: number = 0;
  expandedSurface: SurfaceConfig | null = null;

  ngOnInit() {
    CrComLib.subscribeState('s', StringJoins.SurfaceConfigJoin, (value: string) => this.updateSurfaces(value));
  }

  updateSurfaces(value: string){
    if(!value) return;
    console.log(`CrComLib :::: Received Update ::: Serial :: Join ${StringJoins.SurfaceConfigJoin} : Value ${value}`);
    
    try {
      const data = JSON.parse(value);
      if (data.surfaces && Array.isArray(data.surfaces)) {
        this.surfaces = data.surfaces as SurfaceConfig[];
      } else {
        console.error('Invalid JSON structure: surfaces property is missing or not an array.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  toggleExpansion(surface: SurfaceConfig) {
    this.expandedSurface = surface;
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
      console.log("Shift Left");
      this.touchStartX = touchEndX;
      this.shiftExpandedSurfaceLeft();
    } else if(swipeDistance < -150){
      console.log("Shift Right");
      this.touchStartX = touchEndX;
      this.shiftExpandedSurfaceRight();
    }
  }
  
  shiftExpandedSurfaceRight() {
    if(this.expandedSurface && this.surfaces) {
      const currentIndex = this.surfaces.findIndex(surface => surface === this.expandedSurface);
      const nextIndex = currentIndex + 1;
      if(nextIndex !== this.surfaces.length) {
        this.expandedSurface = this.surfaces[nextIndex];
      }
    }
  }

  shiftExpandedSurfaceLeft() {
    if(this.expandedSurface && this.surfaces) {
      const currentIndex = this.surfaces.findIndex(surface => surface === this.expandedSurface);
      const previousIndex = currentIndex - 1;
      if(previousIndex !== -1) {
        this.expandedSurface = this.surfaces[previousIndex];
      }
    }
  }
}
