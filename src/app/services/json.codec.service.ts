import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
/*
*   A service for handling deserealising json messages. This could be moved to @proav-lib?
*/
export class JsonCodecService {

    validateMessage(message: string) : MessageBase | null {
        try {
            const baseMessage: MessageBase = JSON.parse(message);
        
            if (baseMessage != null) {
              return baseMessage; // Parsing was successful, return the parsed message
            } else {
              console.error('Invalid message: JSON parsing failed');
              return null;
            }
          } catch (error) {
            console.error('Invalid message:', error);
            return null;
          }
    }

    deserialiseJson(message: string) {
        let validatedMessage = this.validateMessage(message)
        if(!validatedMessage) return;

        switch(validatedMessage.messagetype) {
            case MessageType.OnConnectConfig:
                console.log("Received On Connect Message");
                const onConnectMessage = validatedMessage as OnConnectConfigMessage;
                break;
            case MessageType.Info:
                console.log("Received Info Message");
                break;
        }
    }    
}