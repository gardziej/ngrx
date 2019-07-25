import { SimpleChanges, OnChanges } from '@angular/core';

export class BaseComponent implements OnChanges {

  public counter: number = 0;

  updatedView(): number {
    this.counter++;
    return this.counter;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('PRG: changes', changes); // TODO remove this
  }

}
