import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomNewComponent } from './classroom-new.component';

describe('ClassroomNewComponent', () => {
  let component: ClassroomNewComponent;
  let fixture: ComponentFixture<ClassroomNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
