import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import * as fromStats from '../../store/reducers/stats.reducer';
import { Store } from '@ngrx/store';
import { StoreState } from 'src/app/store/reducers';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeComponent extends BaseComponent implements OnInit {

  public currentMinute$: Subscription;
  public currentMinute: any;

  @Input() id: number;

  constructor(
    private store: Store<StoreState>,
    private ref: ChangeDetectorRef
    ) {
      super();
  }

  ngOnInit(): void {
    this.currentMinute$ = this.store.select(fromStats.selectCurrentMinute, { id: this.id }).subscribe(value => {
      this.currentMinute = value;
      this.ref.detectChanges();
    });
  }

}
