import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduelNewComponent } from './scheduel-new.component';

describe('ScheduelNewComponent', () => {
  let component: ScheduelNewComponent;
  let fixture: ComponentFixture<ScheduelNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduelNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduelNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
