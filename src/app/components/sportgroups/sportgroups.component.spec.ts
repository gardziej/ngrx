import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportgroupsComponent } from './sportgroups.component';

describe('SportgroupsComponent', () => {
  let component: SportgroupsComponent;
  let fixture: ComponentFixture<SportgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
