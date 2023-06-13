import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduelEditComponent } from './scheduel-edit.component';

describe('ScheduelEditComponent', () => {
  let component: ScheduelEditComponent;
  let fixture: ComponentFixture<ScheduelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduelEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
