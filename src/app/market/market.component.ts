import { Component, OnInit, Input } from '@angular/core';
import { Market } from '../interfaces/market.interface';

@Component({
  selector: 'market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  @Input() data: Market;

  constructor() { }

  ngOnInit() {
    console.log('PRG: market', this.data); // TODO remove this
  }

}
