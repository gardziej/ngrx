import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import * as fromSelections from '../../store/reducers/selection.reducer';

import { Store, select } from '@ngrx/store';
import { StoreState } from 'src/app/store/reducers';
import { BaseComponent } from '../base/base.component';

import { Selection } from '../../interfaces/selection.interface';

@Component({
  selector: 'rate-button',
  templateUrl: './rate-button.component.html',
  styleUrls: ['./rate-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateButtonComponent extends BaseComponent implements OnInit {

  public selection$: Subscription;
  public selection: Selection;

  @Input() id: number;

  constructor(
    private store: Store<StoreState>,
    private ref: ChangeDetectorRef
    ) {
      super();
  }

  ngOnInit(): void {
    this.selection$ = this.store.pipe(
      select(fromSelections.selectSelection, { id: this.id })
    ).subscribe((value: Selection) => {
      this.selection = value;
      this.ref.detectChanges();
    });
  }

}
