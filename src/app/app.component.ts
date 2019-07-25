import { Component, OnDestroy, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { Match } from './interfaces/match.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreState } from './store/reducers';
import * as MatchActions from './store/actions/match.actions';
import * as fromMatch from './store/reducers/match.reducer';
import { tap } from 'rxjs/operators';
import { BaseComponent } from './components/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {

  public matches$: Observable<Match[]>;

  constructor(
    private webSocketService: WebSocketService,
    private store: Store<StoreState>
    ) {
    super();
    this.store.dispatch(MatchActions.getLiveMatches());
  }

  ngOnInit(): void {
    // this.matches$ = this.store.select(fromMatch.selectAll);
    this.matches$ = this.store.select(fromMatch.selectAll).pipe(tap(console.log));
  }

  public matchTrackBy(index: number, item: Match): number {
    return item.id;
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

}
