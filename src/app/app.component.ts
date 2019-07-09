import { Component, OnDestroy } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

// https://app.lvbet.pl/_api/v1/offer/matches/?is_live=true

  public matches = [];

  constructor(
    private webSocketService: WebSocketService,
    private http: HttpClient
    ) {
    this.webSocketService.message$.subscribe(data => {
      if (data.id && !this.matches.some(match => match.id === data.id) && this.matches.length < 10) {
        this.addNewData(data);
      }
    });
  }

  addNewData(data: any) {
    this.http.get('https://app.lvbet.pl/_api/v1/offer/matches/full/' + data.id).subscribe((incoming: any) => {
      this.matches.push(incoming);
      console.log('PRG: incoming', incoming); // TODO remove this
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

}
