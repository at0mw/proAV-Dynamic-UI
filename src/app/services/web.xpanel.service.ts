import { Injectable } from '@angular/core';

import { getWebXPanel } from '@crestron/ch5-webxpanel';
import { ConnectionEventService } from '@proav/angular-lib';
import { environment } from '../protocol/environments/environment';

const { WebXPanel, WebXPanelConfigParams, WebXPanelEvents, isActive } = getWebXPanel(true);

const configuration: Partial<typeof WebXPanelConfigParams> = {
	// host: 'ip_address | hostname', // defaults to window.location.host
	ipId: environment.ipId // string representing a hex value. Might contain "0x" or not. Defaults to "0x03"
	// roomId: 'virtual_control_room_id', // defaults to empty string
};

@Injectable({
	providedIn: 'root'
})
export class WebXPanelService {
	constructor(private eventService: ConnectionEventService) {
		this.setupEventListeners();
	}

	private setupEventListeners() {
		WebXPanel.addEventListener(WebXPanelEvents.FETCH_TOKEN_FAILED, () => this.informFailedFetchToken());
		WebXPanel.addEventListener(WebXPanelEvents.CONNECT_WS, () => this.informConnecting());
		WebXPanel.addEventListener(WebXPanelEvents.CONNECT_CIP, (event: CustomEvent) => this.informConnectedToWebXpanel(event));
		WebXPanel.addEventListener(WebXPanelEvents.DISCONNECT_CIP, () => this.informDisconnectedToWebXpanel());
		WebXPanel.addEventListener(WebXPanelEvents.AUTHENTICATION_REQUIRED, () => this.informAuthenticationRequired());
		WebXPanel.addEventListener(WebXPanelEvents.AUTHENTICATION_FAILED, () => this.informAuthenticationFailed());
		WebXPanel.addEventListener(WebXPanelEvents.ERROR_WS, () => this.informError());
	}

	initializeWebXPanel() {
		if (isActive) {
			console.log('Attempting to initialise webxpanel connection...');
			WebXPanel.initialize(configuration);
		}
	}

	onConnect(callback: () => void) {
		WebXPanel.onConnect(callback);
	}

	informConnecting() {
		console.log('WebXpanel is connecting...');
		this.eventService.informConnecting();
	}

	informConnectedToWebXpanel(event: CustomEvent) {
		console.log('WebXpanel has connected...');
		const { url, ipId, roomId, tokenSource, tokenUrl } = event.detail;
		console.log(
			`Connected to ${url}, ipId: ${ipId}, roomId: ${roomId}, tokenSource: ${tokenSource}, tokenUrl: ${tokenUrl}`
		);

		this.eventService.informConnected();
	}

	informDisconnectedToWebXpanel() {
		console.log('WebXpanel has disconnected...');
		this.eventService.informDisconnected();
	}

	informFailedFetchToken() {
		console.log('WebXpanel has failed to fetch the token...');
		this.eventService.informFetchTokenFailed();
	}

	informAuthenticationRequired() {
		console.log('WebXpanel Authentication required...');
		this.eventService.onAuthenticationRequired();
	}

	informAuthenticationFailed() {
		console.log('WebXpanel Authentication failed...');
		this.eventService.onAuthenticationFailed();
	}

	informError() {
		console.log('WebXpanel Connection Error...');
		this.eventService.informErrorWs();
	}
}
