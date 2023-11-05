import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { MessageService, ActionType, ModuleUpdateMessage, MessageType } from '@proav/angular-lib';

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
  //@Input() width: string = '100%';
  
  // TODO Input correctly
  @Input() moduleId: string = "";
  @Input() elementId: string = "";

  ngOnInit() {
    this.checkIfModuleIdProvided();
    this.checkIfElementIdProvided();

    if(this.moduleId === "" && this.elementId !== "") {
      console.log('Slider Element Subscribing to CrComLib Join ID', this.elementId.toString());
      CrComLib.subscribeState('n', this.elementId.toString(), (value: number) => this.updateSliderValue(value));
    }
  }

  checkIfModuleIdProvided(): void {
    if (this.moduleId === "") {
      console.log('Module ID is not provided.');
      // console.error('Module ID is not provided for Slider Element!')
    } else {      
      console.log('Slider Module ID is provided : ', this.moduleId);
    }
  }

  sliderEvent(event: Event) {
    console.log("Is this happening?");
    event.stopPropagation();
    event.preventDefault();
    this.updateSliderVisuals(true);
  }

  preventDragEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  checkIfElementIdProvided(): void {
    if (this.elementId === "") {
      console.log('Element ID is not provided.');
      // console.error('Element ID is not provided for Slider Element!')
    } else {      
      console.log('Slider Element ID is provided : ', this.elementId);
    }
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

  // If a single slider then use elementId as join?
  sendSliderValue() {
    console.log('Final Slider Value: ', this.initialValue);
    if(this.moduleId === ""){
      this.messageService.sendAnalogMessage(this.elementId, this.initialValue);
    } else {      
      const message: ModuleUpdateMessage = {
        messagetype: MessageType.ModuleUpdate,
        moduleid: parseInt(this.moduleId, 10),
        elementid: parseInt(this.elementId, 10),
        action: ActionType.Press
      };
      this.messageService.sendJsonMessage(JSON.stringify(message));
    }
  }
}
