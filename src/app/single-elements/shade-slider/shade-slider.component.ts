import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { MessageService, ActionType, ModuleUpdateMessage, MessageType } from '@proav/angular-lib';
import { AnalogJoins } from 'src/app/protocol/constants/analog-joins';
import { StringJoins } from 'src/app/protocol/constants/string-joins';

declare var CrComLib: any;
@Component({
  selector: 'proAV-shade-slider',
  templateUrl: './shade-slider.component.html',
  styleUrls: ['./shade-slider.component.scss']
})
export class ShadeSliderComponent {
  @ViewChild('sliderInput') sliderInput!: ElementRef;
  @ViewChild('sliderThumb') sliderThumb!: ElementRef;
  @ViewChild('sliderLine') sliderLine!: ElementRef;

  @Input() initialValue: number = 0;
  @Input() joinId: string = "";
  @Input() elementId: string = "";

  animateSliderMotion: Boolean = true;
  previousValue: number = 0;
  isIncreasing: boolean = false;
  isDecreasing: boolean = false;

  ngOnChanges() {
    this.animateSliderMotion = true;
  }

  sliderEvent(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    console.log("Previous Value", this.initialValue);
    console.log("Initial Value", this.previousValue);
    if (this.initialValue > this.previousValue) {
      this.isIncreasing = true;
      this.isDecreasing = false;
    } else if (this.initialValue < this.previousValue) {
      this.isIncreasing = false;
      this.isDecreasing = true;
    } else {
      this.isIncreasing = false;
      this.isDecreasing = false;
    }

    this.previousValue = this.initialValue;
    this.updateSliderVisuals(true);
  }

  preventDragEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  thumbActive: boolean = false;
  thumbDisappearTimeout: any;
  constructor(private messageService: MessageService) {}

  updateSliderValue(value: number) {
    if (this.sliderInput && this.sliderThumb && this.sliderLine) {
      const sliderInput = this.sliderInput.nativeElement;
      sliderInput.value = this.initialValue;
      this.updateSliderVisuals(false);
    }    
  }
  
  ngAfterViewInit() {
      this.updateSliderValue(this.initialValue);
  }

  updateSliderVisuals(showThumb: boolean) {
    const sliderInput = this.sliderInput.nativeElement;
    const sliderThumb = this.sliderThumb.nativeElement;
    const sliderLine = this.sliderLine.nativeElement;
    
    if (sliderInput && sliderThumb && sliderLine) {
      if(showThumb){
        this.showThumbStatus(sliderThumb, sliderInput);
        this.animateSliderMotion = false;
      } else {
        this.animateSliderMotion = true;
      }

      this.updateVisualsPositioning(sliderInput, sliderLine);
    }
  }

  showThumbStatus(sliderThumb: any, sliderInput: any) {
    sliderThumb.classList.add('active');
    const thumbText = sliderThumb.querySelector('.thumb-text');

    thumbText.innerHTML = sliderInput.value;
    thumbText.style.opacity = 1;
    // Clear any existing timeout
    if (this.thumbDisappearTimeout) {
      clearTimeout(this.thumbDisappearTimeout);
    }

    this.thumbDisappearTimeout = setTimeout(() => {
      thumbText.style.opacity = 0;
      sliderThumb.classList.remove('active');
    }, 1500);
  }

  updateVisualsPositioning(sliderInput: any, sliderLine: any) {
    sliderLine.style.height = sliderInput.value + '%';
  }

  sendSliderValue() {
    let jsonMessage = {
			id: this.elementId,
			value: this.initialValue
		};
    let jsonMessageString = JSON.stringify(jsonMessage);
    this.messageService.sendStringMessage(this.joinId, jsonMessageString);
  }
}
