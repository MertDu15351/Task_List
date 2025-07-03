import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBlock } from './task-block';

describe('TaskBlock', () => {
  let component: TaskBlock;
  let fixture: ComponentFixture<TaskBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
