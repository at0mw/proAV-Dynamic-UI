import { Component, ElementRef, Renderer2, ViewChild, HostListener   } from '@angular/core';
import { AvailablePages, ConnectionEventService, MessageService, MessageBase,  MessageType, PageConfig } from '@proav/angular-lib';

import { PageManagerService } from '../services/page-manager.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  currentIcon = 'fa-solid fa-spinner';
  isSpinning: boolean = true;
  initialConfigData?: AvailablePages;
  currentColour = "";

  constructor(messageService: MessageService, eventService: ConnectionEventService, private pageService: PageManagerService) {
    // Setup subscription to configs here...
    eventService.onConnected().subscribe(() => this.clientConnected());
    eventService.onDisconnected().subscribe(() => this.clientDisconnected());
    eventService.onFetchTokenFailed().subscribe(() => this.connectError());
    messageService.subscribeToMessageByID(MessageType.AvailablePages).subscribe((message: MessageBase) => this.receivedMessageUpdate(message));
    //messageService.messageBase$.subscribe((message: MessageBase) => this.receivedMessageUpdate(message));
    const pages: PageConfig[] = [
      { pageid: "home", pagename: 'These', pageicon: 'fa-solid fa-house' },
      { pageid: "devices", pagename: 'Faked', pageicon: 'fa-solid fa-computer-speaker' },
      { pageid: "from", pagename: 'From', pageicon: 'fa-kit fa-microsoft-teams' },
      { pageid: "test", pagename: 'Test', pageicon: 'fa-solid fa-newspaper' },
      { pageid: "data", pagename: 'Data', pageicon: 'fa-solid fa-coffee' },
    ];
    const temp : AvailablePages = {
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

  pageSelected(pageName : string) {
    console.log("Selected PageType: ", pageName);
    this.pageService.setPage(pageName);    
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
    if(message.messagetype === MessageType.AvailablePages){
      console.log("Message type is OnConnectConfig...");
      let onConnectConfigMessage = message as AvailablePages;
      if(onConnectConfigMessage) {
        console.log("Correctly handled...");
        this.initialConfigData = onConnectConfigMessage;
      }
    }
  }

  clientConnected() {
    console.log("Yessssssssssss Connected");
    this.currentIcon = 'fa-kit fa-solid-wifi-circle-check';
    this.isSpinning = false;
  }

  clientDisconnected() {
    console.log("Nooooooooooooooooo Disconnected");
    this.currentIcon = 'fa-kit fa-solid-wifi-circle-xmark error';
    this.isSpinning = false;
  }

  connectError() {
    console.log("Ahhhhhhhhh Error");
    this.currentIcon = 'fa-kit fa-solid-wifi-circle-exclamation error';
    this.isSpinning = false;
  }
}
