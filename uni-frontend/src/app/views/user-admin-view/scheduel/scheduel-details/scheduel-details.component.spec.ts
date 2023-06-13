import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduelDetailsComponent } from './scheduel-details.component';

describe('ScheduelDetailsComponent', () => {
  let component: ScheduelDetailsComponent;
  let fixture: ComponentFixture<ScheduelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduelDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
