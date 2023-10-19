import { Component } from '@angular/core';
import { ConnectionEventService } from '@proav/angular-lib';

@Component({
  selector: 'app-disconnect-overlay',
  templateUrl: './disconnect-overlay.component.html',
  styleUrls: ['./disconnect-overlay.component.scss']
})
export class DisconnectOverlayComponent {
  isOverlayVisible = true;
  currentIcon = 'fa-solid fa-spinner';
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
    this.isOverlayVisible = false;
    this.currentIcon = 'fa-kit fa-solid-wifi-circle-check';
    this.connectionState = "Connected";
    this.infoText = "";
    this.isSpinning = false;
  }

  clientDisconnected() {
    console.log("Enable overlay...");
    this.isOverlayVisible = true;
    this.currentIcon = 'fa-kit fa-solid-wifi-circle-xmark';
    this.connectionState = "Disconnected";
    this.infoText = "";
    this.isSpinning = false;
  }

  clientConnecting() {
    this.currentIcon = 'fa-solid fa-spinner';
    this.connectionState = "Connecting";
    this.infoText = "";
    this.isSpinning = true;
  }

  clientAuthenticationRequired() {

  }

  clientFetchTokenFailed() {
    this.currentIcon = 'fa-kit fa-solid-wifi-circle-exclamation';
    this.isSpinning = false;
    this.connectionState = "Error";
    this.infoText = "Failed to fetch Token";
  }
}
