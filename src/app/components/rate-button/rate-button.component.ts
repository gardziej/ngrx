import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromSelections from '../../store/reducers/selection.reducer';

import { Store, select } from '@ngrx/store';
import { StoreState } from 'src/app/store/reducers';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'rate-button',
  templateUrl: './rate-button.component.html',
  styleUrls: ['./rate-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateButtonComponent extends BaseComponent implements OnInit {

  public selection$: Observable<any>; // TODO any

  @Input() id: number;

  constructor(
    private store: Store<StoreState>
    ) {
      super();
  }

  ngOnInit(): void {
    this.selection$ = this.store.pipe(
      select(fromSelections.selectSelection, { id: this.id })
    );
  }

}
