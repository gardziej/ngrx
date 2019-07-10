import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sportgroups',
  templateUrl: './sportgroups.component.html',
  styleUrls: ['./sportgroups.component.css']
})
export class SportgroupsComponent implements OnInit {

  @Input() data;

  ngOnInit() {
  }

}
