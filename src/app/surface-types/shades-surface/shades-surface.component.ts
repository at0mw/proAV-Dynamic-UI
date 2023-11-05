import { Component } from '@angular/core';

@Component({
  selector: 'app-shades-surface',
  templateUrl: './shades-surface.component.html',
  styleUrls: ['./shades-surface.component.scss']
})
export class ShadesSurfaceComponent {
  sliders = [
    { value: 10 },
    { value: 20 },
    { value: 20 },
    { value: 20 },
    { value: 20 }
  ];

  presets = [
    { id: 1, label: "Preset 1" },
    { id: 2, label: "Preset 2" },
    { id: 3, label: "Preset 3" },
    { id: 4, label: "Preset 4" },
    { id: 5, label: "Preset 5" },
    { id: 6, label: "Preset 6" },
    { id: 7, label: "Preset 7" },
    { id: 8, label: "Preset 8" },
    { id: 9, label: "Preset 9" }
  ];

  
  getGridColumnSlider(index: number): string {
    return (1 + index).toString() + '/ span 1';
  }

  getGridRowPreset(index: number): string {
    return (1 + index).toString() + '/ span 1';
  }

  presetTriggered(presetId: number) {
    console.log("Preset Triggered: ", presetId);
    if (presetId === 1) {
      this.sliders.forEach(slider => slider.value = 0);
    } else if (presetId === 2) {
      this.sliders.forEach(slider => slider.value = 100);
    }
  }
}
