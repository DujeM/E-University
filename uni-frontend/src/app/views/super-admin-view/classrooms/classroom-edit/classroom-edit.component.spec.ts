import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomEditComponent } from './classroom-edit.component';

describe('ClassroomEditComponent', () => {
  let component: ClassroomEditComponent;
  let fixture: ComponentFixture<ClassroomEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
