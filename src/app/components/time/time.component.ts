import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromStats from '../../store/reducers/stats.reducer';
import { select, Store } from '@ngrx/store';
import { StoreState } from 'src/app/store/reducers';

@Component({
  selector: 'time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  public currentMinute$: Observable<any>;

  @Input() id: number;

  constructor(
    private store: Store<StoreState>
    ) {
  }

  ngOnInit(): void {
    this.currentMinute$ = this.store.pipe(
      select(fromStats.selectCurrentMinute, { id: this.id })
    );
  }

}
