import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListsComponent } from './task-lists.component';

describe('TaskListsComponent', () => {
  let component: TaskListsComponent;
  let fixture: ComponentFixture<TaskListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setValues', () => {
    component.setValues(["c"])
    expect(component.notAss).toBeTruthy();
  });
  it('setAss', () => {
    component.ass[0]="c";
    expect(component.ass[0]).toEqual("c");
  });
});
