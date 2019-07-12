import { Component, OnInit, Input } from '@angular/core';

import * as fromPrimaryMarkets from '../../store/reducers/primaryMarkets.reducer';

import { Market } from '../../interfaces/market.interface';
import { RateButtonData } from 'src/app/interfaces/rateButtonData.interface';
import { Selection } from 'src/app/interfaces/selection.interface';
import { Store, select } from '@ngrx/store';
import { StoreState } from 'src/app/store/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  public selectionsIds$: Observable<any>;

  @Input() id: number;

  constructor(
    private store: Store<StoreState>
    ) {
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
