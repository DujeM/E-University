import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduelListComponent } from './scheduel-list.component';

describe('ScheduelListComponent', () => {
  let component: ScheduelListComponent;
  let fixture: ComponentFixture<ScheduelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
