import { Component, OnInit, Input } from '@angular/core';
import { Market } from '../../interfaces/market.interface';
import { RateButtonData } from 'src/app/interfaces/rateButtonData.interface';
import { Selection } from 'src/app/interfaces/selection.interface';

@Component({
  selector: 'market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  public rateButtonsData: RateButtonData[] = [];

  @Input() set data(market: Market) {
    this.rateButtonsData = market.selections.map((selection: Selection, index: number) => ({
      selection,
      isIncreased: (this.rateButtonsData[index] && this.rateButtonsData[index].selection && this.rateButtonsData[index].selection.rate.decimal < selection.rate.decimal),
      isDecreased: (this.rateButtonsData[index] && this.rateButtonsData[index].selection && this.rateButtonsData[index].selection.rate.decimal > selection.rate.decimal)
    }));
  }


  constructor() { }

  ngOnInit() {
  }

  rateButtonsTrackBy(index: number): number {
    return index;
  }

}
