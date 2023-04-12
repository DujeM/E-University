import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyNewComponent } from './study-new.component';

describe('StudyNewComponent', () => {
  let component: StudyNewComponent;
  let fixture: ComponentFixture<StudyNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
