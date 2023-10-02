import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationScheduleComponent } from './station-schedule.component';

describe('StationScheduleComponent', () => {
  let component: StationScheduleComponent;
  let fixture: ComponentFixture<StationScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StationScheduleComponent]
    });
    fixture = TestBed.createComponent(StationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
