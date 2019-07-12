import { Injectable } from '@angular/core';
import { StoreState } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import * as WebSocketActions from '../store/actions/ws.actions';
import { Match } from '../interfaces/match.interface';
import { take } from 'rxjs/operators';

@Injectable()
export class WebSocketService {

  private socket: WebSocket;
  private wsUrl = 'wss://ws.lvbet.pl/_v3/ws/update/?language=pl';

  constructor(
    private store: Store<StoreState>
    ) {
    // this.socket = new WebSocket(this.wsUrl);
    // this.socket.onopen = () => {
    //   this.socket.send('{"action":"subscribe","channel":"matches","params":{"filter":{"_sports_group":"1"}}}');
    //  };
    // this.socket.onmessage = (event: MessageEvent) => {
    //   if (event.data) {
    //     const data = JSON.parse(event.data);
    //     this.store.pipe(select('matches'), take(1)).subscribe((matches: Match[]) => {
    //       if (matches.some((match: Match) => match.id === data.id)) {
    //         this.store.dispatch(WebSocketActions.recivedWebSocketMatchData({ payload: data }));
    //       }
    //       else {
    //         this.store.dispatch(WebSocketActions.recivedIrrelevantWebSocketMatchData());
    //       }
    //     });
    //   }
    // };
  }

  close() {
    this.socket.close();
  }

}
