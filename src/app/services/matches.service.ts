import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../interfaces/match.interface';

@Injectable()
export class MatchesService {

  public matchData = new Map();
  public matchTopLiveData = [];

  constructor(private http: HttpClient) {
    this.http.get('https://app.lvbet.pl/_api/v1/offer/matches/?is_live=true').subscribe(data => {
      (<any>data).forEach(element => {
        this.matchData.set(element.id, {participants: element.participants, sportsGroups: element.sportsGroups});
      });
    });
    this.getTopLive();
  }

  getTopLive() {
    this.http.get('https://app.lvbet.pl/_api/v1/offer/matches/top/live/?limit=15').subscribe(data => {
      (<any>data).forEach(element => {
        this.matchTopLiveData.push(element.id);
      });
    });
  }

  getFullMatch(id: number) {
    return this.http.get('https://app.lvbet.pl/_api/v1/offer/matches/' + id).subscribe((match: Match) => {
      this.matchData.set(match.id, {participants: match.participants, sportsGroups: match.sportsGroups});
    });
  }

}