import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as fromPrimaryMarkets from '../../store/reducers/primaryMarkets.reducer';

import { Store, select } from '@ngrx/store';
import { StoreState } from 'src/app/store/reducers';
import { Observable, Subscription } from 'rxjs';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketComponent extends BaseComponent implements OnInit {

  public selectionsIds$: Subscription;
  public selectionsIds: number[];

  @Input() id: number;

  constructor(
    private store: Store<StoreState>,
    private ref: ChangeDetectorRef
    ) {
      super();
  }

  ngOnInit() {
    this.selectionsIds$ = this.store.select(fromPrimaryMarkets.selectSelectionsIds, { id: this.id }).subscribe((value: number[]) => {
      this.selectionsIds = value;
      this.ref.detectChanges();
    });
  }

  rateButtonsTrackBy(index: number): number {
    return index;
  }

}
