import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sportgroups',
  templateUrl: './sportgroups.component.html',
  styleUrls: ['./sportgroups.component.css']
})
export class SportgroupsComponent implements OnInit {

  @Input() data;

  ngOnInit() {
    setTimeout(() => {
      console.log('PRG: this.data', this.data); // TODO remove this
    }, 2000);
  }

}
