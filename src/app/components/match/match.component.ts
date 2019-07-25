import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreState } from 'src/app/store/reducers';
import { Observable } from 'rxjs';

import * as fromMatches from '../../store/reducers/match.reducer';

import { Match } from 'src/app/interfaces/match.interface';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchComponent extends BaseComponent implements OnInit {

  public match$: Observable<Match>;

  @Input() id: number;

  constructor(
    private store: Store<StoreState>
    ) {
      super();
  }

  ngOnInit() {
    this.match$ = this.store.pipe(
      select(fromMatches.selectMatch, { id: this.id })
    );
  }

}
