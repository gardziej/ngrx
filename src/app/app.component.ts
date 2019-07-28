import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreState } from './store/reducers';
import * as MatchActions from './store/actions/match.actions';
import * as fromMatch from './store/reducers/match.reducer';
import { BaseComponent } from './components/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {

  public matchesIds$: Subscription;
  public matchesIds: string[] | number[];

  constructor(
    private webSocketService: WebSocketService,
    private store: Store<StoreState>,
    private ref: ChangeDetectorRef
    ) {
    super();
    this.store.dispatch(MatchActions.getLiveMatches());
  }

  ngOnInit(): void {
    this.matchesIds$ = this.store.select(fromMatch.selectIds).subscribe((value: string[] | number[]) => {
      this.matchesIds = value;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
  }

}
