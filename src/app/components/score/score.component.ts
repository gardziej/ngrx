import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  public score: string[];

  @Input() set data(value: string) {
      this.score = value ? value.split(':') : ['-', '-'];
  }

  ngOnInit() {
  }

}
