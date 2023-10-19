import { Component, ElementRef, Renderer2, ViewChild, HostListener   } from '@angular/core';
import { MessageService } from '@proav/angular-lib';
import { MessageType, PageConfig } from '@proav/angular-lib';

import { MessageBase, OnConnectConfigMessage } from '@proav/angular-lib';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  initialConfigData?: OnConnectConfigMessage;
  constructor(messageService: MessageService) {
    // Setup subscription to configs here...
    messageService.messageBase$.subscribe((message: MessageBase) => this.receivedMessageUpdate(message));
    const pages: PageConfig[] = [
      { pageid: 1, pagename: 'Home', pageicon: 'fa-solid fa-house' },
      { pageid: 2, pagename: 'Meeting', pageicon: 'fa-kit fa-microsoft-teams' },
      { pageid: 3, pagename: 'Devices', pageicon: 'fa-solid fa-computer-speaker' },
      { pageid: 4, pagename: 'News', pageicon: 'fa-solid fa-newspaper' },
    ];
    const temp : OnConnectConfigMessage = {
      messagetype: 1,
      pages: pages,
    };
    this.initialConfigData = temp;
  }
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

  receivedMessageUpdate(message: MessageBase) {
    console.log("Received Message Update in Nav Bar...");
    if(message.messagetype === MessageType.OnConnectConfig){
      console.log("Message type is OnConnectConfig...");
      let onConnectConfigMessage = message as OnConnectConfigMessage;
      if(onConnectConfigMessage) {
        console.log("Correctly handled...");
        this.initialConfigData = onConnectConfigMessage;
      }
    }
  }
}
