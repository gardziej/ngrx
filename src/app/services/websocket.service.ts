import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WebSocketService {

  private socket: WebSocket;
  private wsUrl = 'wss://ws.lvbet.pl/_v3/ws/update/?language=pl';
  public message$ = new Subject<any>();

  constructor() {
    this.socket = new WebSocket(this.wsUrl);
    this.socket.onopen = (event: Event) => {
      this.socket.send('{"action":"subscribe","channel":"matches","params":{"filter":{"_sports_group":"live"}}}');
     };
    this.socket.onmessage = (event) => {
      if (event.data) {
        const data = JSON.parse(event.data);
        this.message$.next(data);
      }
    };
  }

  close() {
    this.socket.close();
  }

}