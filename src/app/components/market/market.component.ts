import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import * as fromPrimaryMarkets from '../../store/reducers/primaryMarkets.reducer';

import { Store, select } from '@ngrx/store';
import { StoreState } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketComponent extends BaseComponent implements OnInit {

  public selectionsIds$: Observable<any>;

  @Input() id: number;

  constructor(
    private store: Store<StoreState>
    ) {
      super();
  }

  ngOnInit() {
    this.selectionsIds$ = this.store.pipe(
      select(fromPrimaryMarkets.selectSelectionsIds, { id: this.id })
    );
  }

  rateButtonsTrackBy(index: number): number {
    return index;
  }

}
