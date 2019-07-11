import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../interfaces/match.interface';

@Injectable()
export class MatchesService {

  constructor(
    private http: HttpClient) {
  }

  getLiveMatches() {
    return this.http.get<Match[]>('https://app.lvbet.pl/_api/v1/offer/matches/?is_live=true');
  }
}
