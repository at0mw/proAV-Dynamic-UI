import { Component } from '@angular/core';
import { ConnectionEventService } from '@proav/angular-lib';

@Component({
  selector: 'app-conn-stat',
  templateUrl: './conn-stat.component.html',
  styleUrls: ['./conn-stat.component.scss']
})
export class ConnStatComponent {
  connectionState = "Unknown";
  isSpinning: boolean = true;
  infoText = "";

  constructor(private eventService: ConnectionEventService) {
    this.eventService.onConnected().subscribe(() => this.clientConnected());
    this.eventService.onDisconnected().subscribe(() => this.clientDisconnected());
    this.eventService.onConnecting().subscribe(() => this.clientConnecting());
    this.eventService.onFetchTokenFailed().subscribe(() => this.clientFetchTokenFailed());
  }

  
  clientConnected() {
    console.log("Disable overlay...");
    //this.isOverlayVisible = false;
    // this.currentIcon = faCoffee;
    this.connectionState = "Connected";
    this.infoText = "";
    this.isSpinning = false;
  }

  clientDisconnected() {
    console.log("Enable overlay...");
    this.connectionState = "Disconnected";
    this.infoText = "";
    this.isSpinning = false;
  }

  clientConnecting() {
    this.connectionState = "Connecting";
    this.infoText = "";
    this.isSpinning = true;
  }

  clientAuthenticationRequired() {

  }

  clientFetchTokenFailed() {
    this.isSpinning = false;
    this.connectionState = "Error";
    this.infoText = "Invalid Token Received";
  }
}
