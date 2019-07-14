import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { StoreState } from 'src/app/store/reducers';

import * as fromStats from '../../store/reducers/stats.reducer';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent implements OnInit {

  public score$: Observable<any>;

  @Input() id: number;

  constructor(
    private store: Store<StoreState>
    ) {
  }

  ngOnInit(): void {
    this.score$ = this.store.pipe(
      select(fromStats.selectScore, { id: this.id })
    );
  }

}
