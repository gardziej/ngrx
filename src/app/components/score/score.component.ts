import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StoreState } from 'src/app/store/reducers';

import * as fromStats from '../../store/reducers/stats.reducer';
import { Store } from '@ngrx/store';
import { BaseComponent } from '../base/base.component';
import { eParticipant } from 'src/app/enums/eparticipant.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent extends BaseComponent implements OnInit {

  public score$: Subscription;
  public score: string;
  public eParticipant: typeof eParticipant = eParticipant;

  @Input() id: number;

  constructor(
    private store: Store<StoreState>,
    private ref: ChangeDetectorRef
    ) {
      super();
  }

  ngOnInit(): void {
    this.score$ = this.store.select(fromStats.selectScore, { id: this.id }).subscribe((value: string) => {
      this.score = value;
      this.ref.detectChanges();
    });
  }

}
