import { Component, OnDestroy } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { HttpClient } from '@angular/common/http';
import { MatchesService } from './services/matches.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  public matches = [];

  public matchMap = new Map();

  public matchArray = [];
  public counterArray = [];

  constructor(
    private webSocketService: WebSocketService,
    private matchesService: MatchesService,
    private http: HttpClient
    ) {
    this.webSocketService.message$.subscribe(data => {

      if (data.id && data.channel) {
        let match = this.matchMap.get(data.id);
        if (match) {
          if (match[data.channel]) {
            match[data.channel]++;
          }
          else {
            match[data.channel] = 1;
          }
        }
        else {
          match = [];
          match[data.channel] = 1;
        }

        let counter = this.matchMap.get(0);
        if (counter) {
          if (counter[data.channel]) {
            counter[data.channel]++;
          }
          else {
            counter[data.channel] = 1;
          }
        }
        else {
          counter = [];
          counter[data.channel] = 1;
        }
        this.matchMap.set(data.id, match);
        this.matchMap.set(0, counter);
      }


      
      // if (data.id && !this.matches.some(match => match.id === data.id) && this.matches.length < 10) {
        //   this.addNewData(data);
        // }
      });
      
    setInterval(() => {
      this.matchArray = Array.from(this.matchMap);
      this.counterArray = this.matchMap.get(0);

      this.matchArray.forEach(match => {
        if (!this.matchesService.matchData.has(match[0])) {
          this.matchesService.getFullMatch(match[0]);
        }
      });

    }, 1000);

  }

  addNewData(data: any) {
    this.http.get('https://app.lvbet.pl/_api/v1/offer/matches/full/' + data.id).subscribe((incoming: any) => {
      this.matches.push(incoming);
    });
  }

  getData(id: number) {
    return this.matchesService.matchData.get(id);
  }

  isIntopLive(id: number) {
    console.log('PRG: this.matchesService.matchTopLiveData', this.matchesService.matchTopLiveData); // TODO remove this
    return this.matchesService.matchTopLiveData.includes(id) ? 'y' : 'n';
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

}
