import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageTimerComponent } from './app-stage-timer.component';

describe('StageTimerComponent', () => {
  let component: StageTimerComponent;
  let fixture: ComponentFixture<StageTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
